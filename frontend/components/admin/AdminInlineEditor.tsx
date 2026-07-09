"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import TurndownService from "turndown";
import { marked } from "marked";

// Configure marked for GFM-compatible output (enables table parsing)
marked.setOptions({ gfm: true, breaks: true });

// Helper: convert Markdown string to HTML for Tiptap
const markdownToHtml = (md: string): string => {
  if (!md) return "";
  // If already looks like HTML, pass through
  if (md.trim().startsWith("<")) return md;
  return marked.parse(md) as string;
};
import {
  Save,
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Check,
  X,
  PlusCircle,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  Table as TableIcon,
  Columns2
} from "lucide-react";
import DualImageUploader from "@/components/admin/DualImageUploader";

// Setup Turndown for HTML -> Markdown conversion with TABLE support
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced"
});

// Turndown rule: convert <table> elements to GitHub-Flavored Markdown tables
turndownService.addRule("table", {
  filter: "table",
  replacement: (_content: string, node: any) => {
    const rows: string[][] = [];
    const tableEl = node as HTMLTableElement;
    tableEl.querySelectorAll("tr").forEach((tr: HTMLTableRowElement) => {
      const cells: string[] = [];
      tr.querySelectorAll("th, td").forEach((cell: Element) => {
        cells.push((cell.textContent || "").replace(/\|/g, "\\|").replace(/\n/g, " ").trim());
      });
      rows.push(cells);
    });
    if (rows.length === 0) return "";
    const header = `| ${rows[0].join(" | ")} |`;
    const separator = `| ${rows[0].map(() => "---").join(" | ")} |`;
    const body = rows.slice(1).map(r => `| ${r.join(" | ")} |`).join("\n");
    return `\n\n${header}\n${separator}${body ? "\n" + body : ""}\n\n`;
  }
});

// Prevent default turndown behavior from mangling table cell/row content
turndownService.addRule("tableCell", { filter: ["th", "td"], replacement: (content: string) => content });
turndownService.addRule("tableRow", { filter: "tr", replacement: (content: string) => content });

interface AdminInlineEditorProps {
  type: "product" | "category" | "blog";
  slug: string | null; // null for creating new
  onClose: () => void;
  onSave: () => void;
}

export default function AdminInlineEditor({
  type,
  slug,
  onClose,
  onSave
}: AdminInlineEditorProps) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [notif, setNotif] = useState<{ text: string; type: "success" | "error" } | null>(null);
  // Stores HTML content to be loaded into editor once it is ready
  const pendingContent = React.useRef<string | null>(null);

  // Form States
  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    author: "",
    readTime: "",
    category: "",
    image: "",
    featured: false
  });

  const [productForm, setProductForm] = useState<{
    brand: string;
    generic: string;
    form: string;
    strength: string;
    pack: string;
    category: string;
    image: string;
    composition: { ingredient: string; quantity: string; standard: string }[];
  }>({
    brand: "",
    generic: "",
    form: "Dry Powder Injection",
    strength: "",
    pack: "",
    category: "",
    image: "",
    composition: [{ ingredient: "", quantity: "", standard: "" }]
  });

  const [categoryForm, setCategoryForm] = useState({
    title: "",
    category: "",
    region: "",
    image: ""
  });

  // Tiptap Rich Editor Instance
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "tiptap-editor-content focus:outline-none min-h-[300px] max-h-[500px] overflow-y-auto p-4 w-full",
      },
    },
  });

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setNotif({ text, type });
    setTimeout(() => setNotif(null), 3000);
  };

  const getApiUrl = (endpoint: string) => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";
    return `${apiBase}${endpoint}`;
  };

  const handleInsertImage = () => {
    if (!editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        try {
          const res = await window.fetch(getApiUrl("/api/upload"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: file.name, data: base64Data })
          });
          if (res.ok) {
            const data = await res.json();
            editor.chain().focus().setImage({ src: data.url }).run();
            showNotification("Image inserted successfully!");
          } else {
            showNotification("Failed to upload image.", "error");
          }
        } catch (err) {
          showNotification("Network error uploading image.", "error");
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  // 1. Fetch dependencies and initial form values
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Load categories list for product category select dropdown
        const catRes = await window.fetch(getApiUrl("/api/categories"));
        if (catRes.ok) {
          const catList = await catRes.json();
          setCategories(catList);
          // Set default product category if empty
          if (catList.length > 0) {
            setProductForm((prev) => ({ ...prev, category: catList[0].category }));
          }
        }

        if (slug) {
          // Fetch existing record details to populate form
          let endpoint = "";
          if (type === "product") endpoint = `/api/products/${slug}`;
          else if (type === "category") endpoint = `/api/categories/${slug}`;
          else if (type === "blog") endpoint = `/api/blogs/${slug}`;

          const res = await window.fetch(getApiUrl(endpoint));
          if (res.ok) {
            const data = await res.json();
            if (type === "product") {
              setProductForm({
                brand: data.brand || "",
                generic: data.generic || "",
                form: data.form || "Dry Powder Injection",
                strength: data.strength || "",
                pack: data.pack || "",
                category: data.category || "",
                image: data.image || "",
                composition: data.composition?.length ? data.composition : [{ ingredient: "", quantity: "", standard: "" }]
              });
              const htmlContent = markdownToHtml(data.description || "");
              pendingContent.current = htmlContent;
              if (editor) editor.commands.setContent(htmlContent);
            } else if (type === "category") {
              setCategoryForm({
                title: data.title || "",
                category: data.category || "",
                region: data.region || "",
                image: data.image || ""
              });
              const htmlDescCat = markdownToHtml(data.description || "");
              pendingContent.current = htmlDescCat;
              if (editor) editor.commands.setContent(htmlDescCat);
            } else if (type === "blog") {
              setBlogForm({
                title: data.title || "",
                excerpt: data.excerpt || "",
                author: data.author || "",
                readTime: data.readTime || "",
                category: data.category || "",
                image: data.image || "",
                featured: !!data.featured
              });
              const htmlContent = markdownToHtml(data.content || "");
              pendingContent.current = htmlContent;
              if (editor) editor.commands.setContent(htmlContent);
            }
          } else {
            showNotification("Failed to retrieve record details.", "error");
          }
        } else {
          // Reset form fields for brand new records
          setProductForm({
            brand: "",
            generic: "",
            form: "Dry Powder Injection",
            strength: "",
            pack: "",
            category: categories[0]?.category || "",
            image: "",
            composition: [{ ingredient: "", quantity: "", standard: "" }]
          });
          setCategoryForm({
            title: "",
            category: "",
            region: "",
            image: ""
          });
          setBlogForm({
            title: "",
            excerpt: "",
            author: "",
            readTime: "",
            category: "",
            image: "",
            featured: false
          });
          editor?.commands.setContent("");
        }
      } catch (err) {
        console.error("Error loading editor data:", err);
        showNotification("Failed to fetch backend configuration.", "error");
      } finally {
        setLoading(false);
      }
    }

    if (editor) {
      loadData();
    }
  }, [slug, type, editor]);

  // 1b. When editor becomes ready, apply any content that was fetched before it was initialized
  useEffect(() => {
    if (editor && !editor.isDestroyed && pendingContent.current !== null) {
      editor.commands.setContent(pendingContent.current);
      pendingContent.current = null;
    }
  }, [editor]);

  // 2. Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    // Convert Tiptap rich HTML content to Markdown
    const htmlContent = editor.getHTML();
    const markdownContent = turndownService.turndown(htmlContent);

    try {
      let bodyData: any = {};
      let endpoint = "";
      let method = slug ? "PUT" : "POST";

      if (type === "product") {
        if (!productForm.brand || !productForm.generic) {
          showNotification("Brand and Generic fields are required.", "error");
          return;
        }
        if (!productForm.category) {
          showNotification("Please select a Product Category.", "error");
          return;
        }
        // Filter out blank composition rows (keep only rows with at least an ingredient)
        const cleanComposition = productForm.composition
          .filter(c => c.ingredient.trim() !== "")
          .map(c => ({
            ingredient: c.ingredient.trim(),
            quantity: c.quantity.trim() || "—",
            standard: c.standard.trim() || "—"
          }));
        bodyData = {
          ...productForm,
          composition: cleanComposition,
          slug: slug || productForm.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
          description: markdownContent
        };
        endpoint = slug ? `/api/products/${slug}` : "/api/products";
      } else if (type === "category") {
        if (!categoryForm.title || !categoryForm.category) {
          showNotification("Title and Category Key are required.", "error");
          return;
        }
        bodyData = {
          ...categoryForm,
          description: markdownContent
        };
        endpoint = slug ? `/api/categories/${slug}` : "/api/categories";
      } else if (type === "blog") {
        if (!blogForm.title || !blogForm.author) {
          showNotification("Title and Author are required.", "error");
          return;
        }
        bodyData = {
          ...blogForm,
          slug: slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
          content: markdownContent,
          date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        };
        endpoint = slug ? `/api/blogs/${slug}` : "/api/blogs";
      }

      const res = await window.fetch(getApiUrl(endpoint), {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });

      if (res.ok) {
        showNotification("Record saved successfully!", "success");
        setTimeout(() => {
          onSave();
        }, 1000);
      } else {
        const err = await res.json();
        showNotification(err.error || "Failed to commit record updates", "error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      showNotification("Failed to connect to backend api.", "error");
    }
  };

  return (
    <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] animate-fadeIn select-text">
      {/* Floating status alert */}
      {notif && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase shadow-2xl border transition-all duration-300 ${
          notif.type === "success" ? "bg-white border-green-500 text-green-600 animate-fadeIn" : "bg-white border-red-500 text-red-600 animate-fadeIn"
        }`}>
          {notif.type === "success" ? <Check size={12} /> : <X size={12} />}
          {notif.text}
        </div>
      )}

      {/* Editor Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4 select-none">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-neutral-800 transition"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900">
              {slug ? `Modify ${type}` : `Add New ${type}`}
            </h2>
            <p className="text-[10px] text-neutral-450 font-semibold mt-0.5">
              Fill details and write description using the Tiptap rich editor workspace.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 text-[10px] font-black uppercase tracking-wider transition active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-crimson hover:bg-crimson-dark text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition active:scale-95"
          >
            <Save size={12} /> Save
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crimson"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-xs font-semibold">
          
          {/* ================= PRODUCT SPECIFIC FIELDS ================= */}
          {type === "product" && (
            <div className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2 text-xs font-semibold">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                    placeholder="e.g. ELSEFPIME-1000mg"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Generic Formulation</label>
                  <input
                    type="text"
                    required
                    value={productForm.generic}
                    onChange={(e) => setProductForm({ ...productForm, generic: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                    placeholder="e.g. Cefepime for Injection USP"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Dosage Form</label>
                  <select
                    value={productForm.form}
                    onChange={(e) => setProductForm({ ...productForm, form: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                  >
                    <option value="Dry Powder Injection">Dry Powder Injection</option>
                    <option value="Oral Strip">Oral Strip</option>
                    <option value="Film Coated Tablet">Film Coated Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Ointment">Ointment</option>
                    <option value="Oral Suspension">Oral Suspension</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Product Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.category} value={c.category}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Strength (Optional)</label>
                  <input
                    type="text"
                    value={productForm.strength}
                    onChange={(e) => setProductForm({ ...productForm, strength: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                    placeholder="e.g. 1000mg"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Package Format (Optional)</label>
                  <input
                    type="text"
                    value={productForm.pack}
                    onChange={(e) => setProductForm({ ...productForm, pack: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                    placeholder="e.g. Vial + SWFI"
                  />
                </div>
              </div>

              {/* Chemical Matrix */}
              <div className="border-t border-neutral-100 pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between select-none">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Chemical Composition Matrix</label>
                  <button
                    type="button"
                    onClick={() => setProductForm({
                      ...productForm,
                      composition: [...productForm.composition, { ingredient: "", quantity: "", standard: "" }]
                    })}
                    className="text-[9px] font-black uppercase text-crimson hover:text-crimson-dark flex items-center gap-1.5 transition"
                  >
                    <PlusCircle size={12} /> Add Ingredient
                  </button>
                </div>

                <div className="flex flex-col gap-2.5 max-h-40 overflow-y-auto pr-1 select-text">
                  {productForm.composition.map((comp, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Ingredient"
                        value={comp.ingredient}
                        onChange={(e) => {
                          const updated = [...productForm.composition];
                          updated[idx].ingredient = e.target.value;
                          setProductForm({ ...productForm, composition: updated });
                        }}
                        className="flex-1 h-9 px-2.5 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none font-semibold text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Qty"
                        value={comp.quantity}
                        onChange={(e) => {
                          const updated = [...productForm.composition];
                          updated[idx].quantity = e.target.value;
                          setProductForm({ ...productForm, composition: updated });
                        }}
                        className="w-24 h-9 px-2.5 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none font-semibold text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Std"
                        value={comp.standard}
                        onChange={(e) => {
                          const updated = [...productForm.composition];
                          updated[idx].standard = e.target.value;
                          setProductForm({ ...productForm, composition: updated });
                        }}
                        className="w-24 h-9 px-2.5 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none font-semibold text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = productForm.composition.filter((_, i) => i !== idx);
                          setProductForm({ ...productForm, composition: updated.length ? updated : [{ ingredient: "", quantity: "", standard: "" }] });
                        }}
                        className="p-1.5 text-neutral-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <DualImageUploader
                value={productForm.image}
                onChange={(url) => setProductForm({ ...productForm, image: url })}
                label="Product Image / Pack Shot"
              />
            </div>
          )}

          {/* ================= CATEGORY SPECIFIC FIELDS ================= */}
          {type === "category" && (
            <div className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2 text-xs font-semibold">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Category Title</label>
                  <input
                    type="text"
                    required
                    value={categoryForm.title}
                    onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                    placeholder="e.g. Gastrointestinal Care"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">System Category Key (Disabled if editing)</label>
                  <input
                    type="text"
                    required
                    disabled={!!slug}
                    value={categoryForm.category}
                    onChange={(e) => setCategoryForm({ ...categoryForm, category: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold disabled:opacity-50"
                    placeholder="e.g. Gastroenterology"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Region Locked (Optional)</label>
                  <input
                    type="text"
                    value={categoryForm.region}
                    onChange={(e) => setCategoryForm({ ...categoryForm, region: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                    placeholder="e.g. Myanmar"
                  />
                </div>
              </div>

              <DualImageUploader
                value={categoryForm.image}
                onChange={(url) => setCategoryForm({ ...categoryForm, image: url })}
                label="Thumbnail Image"
              />
            </div>
          )}

          {/* ================= BLOG SPECIFIC FIELDS ================= */}
          {type === "blog" && (
            <div className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2 text-xs font-semibold">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Article Title</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                    placeholder="Enter post title"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Author</label>
                  <input
                    type="text"
                    required
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                    placeholder="e.g. Quality Assurance Team"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Read Time (minutes)</label>
                  <input
                    type="text"
                    required
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                    placeholder="e.g. 5 min read"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Category Tag</label>
                  <input
                    type="text"
                    required
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition font-semibold"
                    placeholder="e.g. Compliance, Innovation"
                  />
                </div>

                <div className="flex items-center gap-2 mt-5">
                  <input
                    type="checkbox"
                    id="featured-inline"
                    checked={blogForm.featured}
                    onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
                    className="h-4 w-4 rounded text-crimson focus:ring-crimson border-neutral-300"
                  />
                  <label htmlFor="featured-inline" className="text-[10px] font-black uppercase text-neutral-500 cursor-pointer">
                    Feature this Article on Home Screen
                  </label>
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Excerpt / Short Description</label>
                  <textarea
                    required
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full h-20 p-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 resize-none transition font-semibold text-xs"
                    placeholder="Enter short snippet summarizing this post..."
                  />
                </div>
              </div>

              <DualImageUploader
                value={blogForm.image}
                onChange={(url) => setBlogForm({ ...blogForm, image: url })}
                label="Article Header Banner"
              />
            </div>
          )}

          {/* ================= TIPTAP RICH EDITOR ================= */}
          <div className="flex flex-col gap-4 border-t border-neutral-100 pt-4">
            <h2 className="text-[10px] font-black uppercase text-neutral-400">
              {type === "blog" ? "Article Body Content" : "Detailed Description"}
            </h2>

            {/* Editor Formatting Toolbar */}
            {editor && (
              <div className="flex flex-wrap items-center gap-1 bg-neutral-50 border border-neutral-200 p-2 rounded-xl select-none">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 rounded-lg transition ${editor.isActive("bold") ? "bg-crimson/15 text-crimson" : "hover:bg-neutral-200/60 text-neutral-500"}`}
                  title="Bold"
                >
                  <Bold size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded-lg transition ${editor.isActive("italic") ? "bg-crimson/15 text-crimson" : "hover:bg-neutral-200/60 text-neutral-500"}`}
                  title="Italic"
                >
                  <Italic size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={`p-2 rounded-lg transition ${editor.isActive("strike") ? "bg-crimson/15 text-crimson" : "hover:bg-neutral-200/60 text-neutral-500"}`}
                  title="Strikethrough"
                >
                  <Strikethrough size={14} />
                </button>

                <div className="w-px h-5 bg-neutral-200 mx-1.5" />

                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`p-2 rounded-lg transition ${editor.isActive("heading", { level: 1 }) ? "bg-crimson/15 text-crimson" : "hover:bg-neutral-200/60 text-neutral-500"}`}
                  title="Heading 1"
                >
                  <Heading1 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`p-2 rounded-lg transition ${editor.isActive("heading", { level: 2 }) ? "bg-crimson/15 text-crimson" : "hover:bg-neutral-200/60 text-neutral-500"}`}
                  title="Heading 2"
                >
                  <Heading2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={`p-2 rounded-lg transition ${editor.isActive("heading", { level: 3 }) ? "bg-crimson/15 text-crimson" : "hover:bg-neutral-200/60 text-neutral-500"}`}
                  title="Heading 3"
                >
                  <Heading3 size={14} />
                </button>

                <div className="w-px h-5 bg-neutral-200 mx-1.5" />

                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`p-2 rounded-lg transition ${editor.isActive("bulletList") ? "bg-crimson/15 text-crimson" : "hover:bg-neutral-200/60 text-neutral-500"}`}
                  title="Bullet List"
                >
                  <List size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`p-2 rounded-lg transition ${editor.isActive("orderedList") ? "bg-crimson/15 text-crimson" : "hover:bg-neutral-200/60 text-neutral-500"}`}
                  title="Ordered List"
                >
                  <ListOrdered size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={`p-2 rounded-lg transition ${editor.isActive("blockquote") ? "bg-crimson/15 text-crimson" : "hover:bg-neutral-200/60 text-neutral-500"}`}
                  title="Quote"
                >
                  <Quote size={14} />
                </button>

                <div className="w-px h-5 bg-neutral-200 mx-1.5" />

                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`p-2 rounded-lg transition ${editor.isActive("codeBlock") ? "bg-crimson/15 text-crimson" : "hover:bg-neutral-200/60 text-neutral-500"}`}
                  title="Code Block"
                >
                  <Code size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setHorizontalRule().run()}
                  className="p-2 rounded-lg hover:bg-neutral-200/60 text-neutral-500 transition"
                  title="Horizontal Divider"
                >
                  <Minus size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleInsertImage}
                  className="p-2 rounded-lg hover:bg-neutral-200/60 text-neutral-500 transition"
                  title="Insert Image"
                >
                  <ImageIcon size={14} />
                </button>

                <div className="w-px h-5 bg-neutral-200 mx-1.5" />

                {/* Table Controls */}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                  className="p-2 rounded-lg hover:bg-neutral-200/60 text-neutral-500 transition"
                  title="Insert Table"
                >
                  <TableIcon size={14} />
                </button>
                {editor.isActive("table") && (
                  <>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().addColumnAfter().run()}
                      className="px-2 py-1 rounded text-[9px] font-bold uppercase hover:bg-neutral-200/60 text-neutral-500 transition"
                      title="Add Column"
                    >
                      +Col
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().addRowAfter().run()}
                      className="px-2 py-1 rounded text-[9px] font-bold uppercase hover:bg-neutral-200/60 text-neutral-500 transition"
                      title="Add Row"
                    >
                      +Row
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().deleteColumn().run()}
                      className="px-2 py-1 rounded text-[9px] font-bold uppercase hover:bg-red-50 text-red-400 transition"
                      title="Delete Column"
                    >
                      -Col
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().deleteRow().run()}
                      className="px-2 py-1 rounded text-[9px] font-bold uppercase hover:bg-red-50 text-red-400 transition"
                      title="Delete Row"
                    >
                      -Row
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().deleteTable().run()}
                      className="px-2 py-1 rounded text-[9px] font-bold uppercase hover:bg-red-50 text-red-500 transition"
                      title="Delete Table"
                    >
                      Del Table
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Editor Workspace Container */}
            <div className="border border-neutral-200 rounded-xl hover:border-neutral-300 focus-within:border-crimson/40 focus-within:ring-1 focus-within:ring-crimson/10 transition bg-neutral-50/20 shadow-inner">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="border-t border-neutral-100 pt-4 flex gap-3 justify-end select-none">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-bold uppercase transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-crimson hover:bg-crimson-dark text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition active:scale-[0.97]"
            >
              <Save size={12} /> Save Changes
            </button>
          </div>

        </form>
      )}
    </div>
  );
}
