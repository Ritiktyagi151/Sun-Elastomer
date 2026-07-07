"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  FolderOpen,
  Newspaper,
  Edit2,
  Trash2,
  Plus,
  Download,
  Upload,
  Check,
  X,
  FileText,
  AlertTriangle,
  RefreshCw,
  PlusCircle,
  FolderPlus,
  Mail,
  Users,
  Lock,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { products as defaultProducts, type Product, company } from "@/data/products";
import { productCategories as defaultCategories } from "@/data/constants";
import BlogEditor from "./BlogEditor";
import DualImageUploader from "./DualImageUploader";

// Shadow fetch to automatically prefix NEXT_PUBLIC_API_URL for API calls
const fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  if (typeof input === "string" && input.startsWith("/api/")) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";
    return window.fetch(`${apiBase}${input}`, init);
  }
  return window.fetch(input, init);
};

type ActiveTab = "overview" | "products" | "categories" | "blogs" | "inquiries" | "admins";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  // Admin user accounts states
  const [currentUser, setCurrentUser] = useState<{ _id: string; username: string; name: string } | null>(null);
  const [admins, setAdmins] = useState<any[]>([]);
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [addAdminForm, setAddAdminForm] = useState({ name: "", username: "", password: "" });
  const [myProfileForm, setMyProfileForm] = useState({ name: "", username: "", password: "" });

  // Inquiry management states
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "unread" | "read" | "resolved">("all");

  // Company info metadata editor state
  const [companyForm, setCompanyForm] = useState({
    name: "",
    gstin: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    shortName: "",
  });

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Feedback states
  const [notif, setNotif] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Check auth session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("sun_admin_session");
      const userStr = sessionStorage.getItem("sun_admin_user");
      if (session === "active" && userStr) {
        setIsAuthenticated(true);
        const parsedUser = JSON.parse(userStr);
        setCurrentUser(parsedUser);
        setMyProfileForm({
          name: parsedUser.name || "",
          username: parsedUser.username || "",
          password: "",
        });
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        setMyProfileForm({
          name: data.user.name || "",
          username: data.user.username || "",
          password: "",
        });
        sessionStorage.setItem("sun_admin_session", "active");
        sessionStorage.setItem("sun_admin_user", JSON.stringify(data.user));
        setLoginError("");
        loadAllData();
      } else {
        const err = await res.json();
        setLoginError(err.error || "Invalid username or password");
      }
    } catch (err) {
      setLoginError("Failed to connect to authentication service.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem("sun_admin_session");
    sessionStorage.removeItem("sun_admin_user");
  };

  // Modal / Form states
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<{
    brand: string;
    generic: string;
    form: string;
    strength: string;
    pack: string;
    category: string;
    composition: { ingredient: string; quantity: string; standard: string }[];
    description: string;
  }>({
    brand: "",
    generic: "",
    form: "Dry Powder Injection",
    strength: "",
    pack: "",
    category: "Antibiotics - Injectable",
    composition: [{ ingredient: "", quantity: "", standard: "" }],
    description: "",
  });

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    title: "",
    category: "",
    description: "",
    region: "",
    image: "",
  });

  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    readTime: "",
    image: "",
    category: "",
    featured: false,
  });

  const [isDbOnline, setIsDbOnline] = useState<boolean>(true);

  // ================= MONGO DB LIVE SYNC HOOK =================
  const loadAllData = async () => {
    try {
      const [prodsRes, catsRes, blogsRes, inquiriesRes, companyRes, adminsRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
        fetch("/api/blogs"),
        fetch("/api/inquiries"),
        fetch("/api/company"),
        fetch("/api/admin/users")
      ]);

      const allOk = prodsRes.ok && catsRes.ok && blogsRes.ok && inquiriesRes.ok && companyRes.ok;
      setIsDbOnline(allOk);

      if (prodsRes.ok) setProducts(await prodsRes.json());
      if (catsRes.ok) setCategories(await catsRes.json());
      if (blogsRes.ok) setBlogs(await blogsRes.json());
      if (inquiriesRes.ok) setInquiries(await inquiriesRes.json());
      if (adminsRes.ok) setAdmins(await adminsRes.json());
      if (companyRes.ok) {
        const parsed = await companyRes.json();
        setCompanyForm({
          name: parsed.name || "",
          gstin: parsed.gstin || "",
          address: parsed.address || "",
          contactEmail: parsed.contactEmail || "",
          contactPhone: parsed.contactPhone || "",
          shortName: parsed.shortName || "",
        });
      }
    } catch (err) {
      console.error("Failed to load MongoDB datasets:", err);
      setIsDbOnline(false);
      showNotification("Failed to connect to database. Verify configurations.", "error");
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companyForm),
      });
      if (res.ok) {
        showNotification("Company metadata updated successfully! Reloading...");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const errData = await res.json();
        showNotification(errData.error || "Failed to update company info", "error");
      }
    } catch (err) {
      showNotification("Network error updating company info", "error");
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      const payload: any = {
        name: myProfileForm.name,
        username: myProfileForm.username,
      };
      if (myProfileForm.password) {
        payload.password = myProfileForm.password;
      }
      const res = await fetch(`/api/admin/users/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        sessionStorage.setItem("sun_admin_user", JSON.stringify(data.user));
        setMyProfileForm((prev) => ({ ...prev, password: "" }));
        showNotification("Profile updated successfully", "success");
        loadAllData();
      } else {
        const err = await res.json();
        showNotification(err.error || "Failed to update profile", "error");
      }
    } catch (err) {
      showNotification("Failed to connect to backend", "error");
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addAdminForm),
      });
      if (res.ok) {
        setAddAdminForm({ name: "", username: "", password: "" });
        setAddAdminModalOpen(false);
        showNotification("Administrator added successfully", "success");
        loadAllData();
      } else {
        const err = await res.json();
        showNotification(err.error || "Failed to add administrator", "error");
      }
    } catch (err) {
      showNotification("Failed to connect to backend", "error");
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm("Are you sure you want to delete this administrator account?")) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showNotification("Administrator account deleted", "success");
        loadAllData();
      } else {
        const err = await res.json();
        showNotification(err.error || "Failed to delete account", "error");
      }
    } catch (err) {
      showNotification("Failed to connect to backend", "error");
    }
  };

  const updateInquiryStatus = async (id: string, newStatus: "unread" | "read" | "resolved") => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updatedInq = await res.json();
        const updated = inquiries.map((inq) => (inq._id || inq.id) === id ? updatedInq : inq);
        setInquiries(updated);
        showNotification(`Inquiry marked as ${newStatus}!`);
      } else {
        showNotification("Failed to update inquiry status", "error");
      }
    } catch (err) {
      showNotification("Network error updating inquiry", "error");
    }
  };



  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setNotif({ text, type });
    setTimeout(() => setNotif(null), 3000);
  };

  // ================= PRODUCTS HANDLERS =================
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.brand || !productForm.generic) {
      showNotification("Brand Name and Generic Formulation are required!", "error");
      return;
    }

    const slug = productForm.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const productPayload = {
      slug,
      brand: productForm.brand,
      generic: productForm.generic,
      form: productForm.form,
      strength: productForm.strength || undefined,
      pack: productForm.pack || undefined,
      category: productForm.category as any,
      composition: productForm.composition.filter(c => c.ingredient !== ""),
      description: productForm.description || undefined,
    };

    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productPayload),
        });
        if (res.ok) {
          const updatedProd = await res.json();
          setProducts(products.map((p) => (p.slug === editingProduct.slug ? updatedProd : p)));
          showNotification("Product updated successfully!");
          setProductModalOpen(false);
          resetProductForm();
        } else {
          const errData = await res.json();
          showNotification(errData.error || "Failed to update product", "error");
        }
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productPayload),
        });
        if (res.ok) {
          const newProd = await res.json();
          setProducts([newProd, ...products]);
          showNotification("New product created successfully!");
          setProductModalOpen(false);
          resetProductForm();
        } else {
          const errData = await res.json();
          showNotification(errData.error || "Failed to create product", "error");
        }
      }
    } catch (err) {
      showNotification("Network error submitting product", "error");
    }
  };

  const deleteProduct = async (slug: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/products/${slug}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setProducts(products.filter((p) => p.slug !== slug));
          showNotification("Product deleted successfully!");
        } else {
          showNotification("Failed to delete product", "error");
        }
      } catch (err) {
        showNotification("Network error deleting product", "error");
      }
    }
  };

  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      brand: prod.brand,
      generic: prod.generic,
      form: prod.form,
      strength: prod.strength || "",
      pack: prod.pack || "",
      category: prod.category,
      composition: prod.composition.length > 0 ? prod.composition : [{ ingredient: "", quantity: "", standard: "" }],
      description: prod.description || "",
    });
    setProductModalOpen(true);
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProductForm({
      brand: "",
      generic: "",
      form: "Dry Powder Injection",
      strength: "",
      pack: "",
      category: "Antibiotics - Injectable",
      composition: [{ ingredient: "", quantity: "", standard: "" }],
      description: "",
    });
  };

  // ================= CATEGORIES HANDLERS =================
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.title || !categoryForm.category) {
      showNotification("Category Title and System Category Key are required!", "error");
      return;
    }

    const categoryPayload = {
      title: categoryForm.title,
      category: categoryForm.category,
      description: categoryForm.description,
      region: categoryForm.region || undefined,
      image: categoryForm.image || "/category-img/antibiotics-oral.png",
      iconName: "PackageCheck",
    };

    try {
      if (editingCategory) {
        const res = await fetch(`/api/categories/${editingCategory.category}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryPayload),
        });
        if (res.ok) {
          const updatedCat = await res.json();
          setCategories(categories.map((c) => (c.category === editingCategory.category ? updatedCat : c)));
          showNotification("Category updated successfully!");
          setCategoryModalOpen(false);
          resetCategoryForm();
        } else {
          const errData = await res.json();
          showNotification(errData.error || "Failed to update category", "error");
        }
      } else {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryPayload),
        });
        if (res.ok) {
          const newCat = await res.json();
          setCategories([...categories, newCat]);
          showNotification("New Category added successfully!");
          setCategoryModalOpen(false);
          resetCategoryForm();
        } else {
          const errData = await res.json();
          showNotification(errData.error || "Failed to add category", "error");
        }
      }
    } catch (err) {
      showNotification("Network error submitting category", "error");
    }
  };

  const deleteCategory = async (catKey: string) => {
    if (confirm("Are you sure you want to delete this Category? (Warning: This will orphan products inside it)")) {
      try {
        const res = await fetch(`/api/categories/${catKey}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setCategories(categories.filter((c) => c.category !== catKey));
          showNotification("Category deleted successfully!");
        } else {
          showNotification("Failed to delete category", "error");
        }
      } catch (err) {
        showNotification("Network error deleting category", "error");
      }
    }
  };

  const openEditCategory = (cat: any) => {
    setEditingCategory(cat);
    setCategoryForm({
      title: cat.title,
      category: cat.category,
      description: cat.description,
      region: cat.region || "",
      image: cat.image || "",
    });
    setCategoryModalOpen(true);
  };

  const resetCategoryForm = () => {
    setEditingCategory(null);
    setCategoryForm({
      title: "",
      category: "",
      description: "",
      region: "",
      image: "",
    });
  };

  // ================= BLOGS HANDLERS =================
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.author) {
      showNotification("Blog Title and Author are required!", "error");
      return;
    }

    const slug = blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const blogPayload = {
      slug,
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      author: blogForm.author,
      readTime: blogForm.readTime || "5 min read",
      image: blogForm.image || "/banners/desktop/banner.jpeg",
      category: blogForm.category || "General",
      featured: blogForm.featured,
      date: editingBlog ? editingBlog.date : new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    try {
      if (editingBlog) {
        const res = await fetch(`/api/blogs/${editingBlog.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogPayload),
        });
        if (res.ok) {
          const updatedBlog = await res.json();
          setBlogs(blogs.map((b) => (b.slug === editingBlog.slug ? updatedBlog : b)));
          showNotification("Blog article updated!");
          setBlogModalOpen(false);
          resetBlogForm();
        } else {
          const errData = await res.json();
          showNotification(errData.error || "Failed to update blog", "error");
        }
      } else {
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogPayload),
        });
        if (res.ok) {
          const newBlog = await res.json();
          setBlogs([newBlog, ...blogs]);
          showNotification("New blog article published!");
          setBlogModalOpen(false);
          resetBlogForm();
        } else {
          const errData = await res.json();
          showNotification(errData.error || "Failed to publish blog", "error");
        }
      }
    } catch (err) {
      showNotification("Network error submitting blog", "error");
    }
  };

  const deleteBlog = async (slug: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const res = await fetch(`/api/blogs/${slug}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setBlogs(blogs.filter((b) => b.slug !== slug));
          showNotification("Blog post deleted successfully!");
        } else {
          showNotification("Failed to delete blog post", "error");
        }
      } catch (err) {
        showNotification("Network error deleting blog post", "error");
      }
    }
  };

  const openEditBlog = (blog: any) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      readTime: blog.readTime,
      image: blog.image,
      category: blog.category,
      featured: blog.featured,
    });
    setBlogModalOpen(true);
  };

  const resetBlogForm = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      readTime: "",
      image: "",
      category: "",
      featured: false,
    });
  };

  const insertMarkdown = (syntax: string) => {
    const textarea = document.getElementById("blog-textarea") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);
      const val = before + syntax + after;
      setBlogForm({ ...blogForm, content: val });
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + syntax.length;
      }, 0);
    } else {
      setBlogForm({ ...blogForm, content: blogForm.content + syntax });
    }
  };

  // ================= SYSTEM IMPORT/EXPORT =================
  const exportBackup = () => {
    const backup = {
      products,
      categories,
      blogs,
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `sun_elastomers_backup_${Date.now()}.json`);
    dlAnchorElem.click();
    showNotification("Data exported successfully!");
  };

  const importBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.products && parsed.categories && parsed.blogs) {
            setProducts(parsed.products);
            setCategories(parsed.categories);
            setBlogs(parsed.blogs);

            localStorage.setItem("sun_products", JSON.stringify(parsed.products));
            localStorage.setItem("sun_categories", JSON.stringify(parsed.categories));
            localStorage.setItem("sun_blogs", JSON.stringify(parsed.blogs));

            showNotification("Backup imported successfully!");
          } else {
            showNotification("Invalid file schema. Backup must contain products, categories, and blogs lists.", "error");
          }
        } catch (err) {
          showNotification("Error parsing backup JSON file.", "error");
        }
      };
    }
  };

  const resetToFactoryDefaults = () => {
    if (confirm("This will overwrite all changes and restore original factory catalog parameters. Proceed?")) {
      localStorage.removeItem("sun_products");
      localStorage.removeItem("sun_categories");
      localStorage.removeItem("sun_blogs");
      window.location.reload();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center py-10 px-6 text-neutral-800">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-xl p-8 flex flex-col gap-6"
        >
          <div className="text-center">
            <h1 className="text-xl font-black text-ink uppercase tracking-wider">Admin Control Panel</h1>
            <p className="text-xs text-neutral-400 mt-1">Authenticate to access database dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-xs font-semibold">
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-655 p-3 rounded-lg text-[11px] font-bold">
                {loginError}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-neutral-400">Username</label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-crimson"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-neutral-400">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="w-full h-10 px-3 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-crimson"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded bg-crimson hover:bg-crimson-dark text-xs font-black uppercase text-white tracking-widest shadow-md transition"
            >
              Sign In
            </button>
          </form>

          <div className="border-t border-neutral-200 pt-4 text-center text-[10px] text-neutral-450 leading-relaxed">
            <Link href="/" className="inline-block text-crimson hover:underline">
              &larr; Return to Home Page
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 text-neutral-800 flex flex-col md:flex-row pt-0">

      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-neutral-200/80 flex flex-col p-6 gap-8 shrink-0 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.02)] z-10 select-none">
        <div className="flex items-center gap-3 border-b border-neutral-100 pb-5">
          <div className="h-8 w-8 rounded-lg bg-crimson flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-crimson/20">
            S
          </div>
          <div>
            <h2 className="text-xs font-black uppercase text-neutral-900 tracking-wider">Sun Elastomers</h2>
            <p className="text-[9px] text-neutral-400 font-black uppercase tracking-widest mt-0.5">Control Center</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "products", label: "Products", icon: ShoppingCart },
            { id: "categories", label: "Categories", icon: FolderOpen },
            { id: "blogs", label: "Blogs", icon: Newspaper },
            { id: "inquiries", label: "Inquiries", icon: Mail },
            { id: "admins", label: "Admin Accounts", icon: Users },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                  active
                    ? "bg-crimson/10 text-crimson border border-crimson/15 shadow-sm"
                    : "hover:bg-neutral-50 text-neutral-500 hover:text-neutral-950 border border-transparent"
                }`}
              >
                <Icon size={14} className={active ? "text-crimson" : "text-neutral-400"} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-neutral-100 pt-5 flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-xl bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-100 hover:border-red-500 text-[10px] font-black uppercase tracking-wider text-center transition-all duration-200 active:scale-95 shadow-sm"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main panel container */}
      <main className="flex-1 p-6 md:p-10 flex flex-col gap-8 overflow-y-auto max-w-7xl">

        {/* Top Header Bar */}
        <header className="flex items-center justify-between border-b border-neutral-150 pb-5 shrink-0 select-none">
          <div>
            <h1 className="text-base font-black text-neutral-900 tracking-tight flex items-center gap-2 uppercase">
              Control Console
            </h1>
            <p className="text-[10px] text-neutral-450 font-semibold mt-0.5">
              Configure active catalogs, track contact enquiries, and update blog bulletins.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div 
              title={isDbOnline ? "Database Online" : "Database Offline"}
              className={`h-2.5 w-2.5 rounded-full shadow-sm cursor-help ${isDbOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`} 
            />
          </div>
        </header>

        {/* Floating Notification */}
        {notif && (
          <div
            className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase shadow-2xl border transition-all duration-300 ${
              notif.type === "success" ? "bg-white border-green-500 text-green-600" : "bg-white border-red-500 text-red-650"
            }`}
          >
            {notif.type === "success" ? <Check size={12} /> : <AlertTriangle size={12} />}
            {notif.text}
          </div>
        )}

        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            {/* Quick stats grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 select-none">
              <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-2xl p-6 flex items-center justify-between border-t-4 border-t-crimson transition-transform hover:scale-[1.01]">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Inventory Catalog</span>
                  <span className="text-3xl font-black text-neutral-850">{products.length} Products</span>
                </div>
                <div className="p-3 bg-crimson/5 rounded-xl text-crimson">
                  <ShoppingCart size={20} />
                </div>
              </div>
              
              <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-2xl p-6 flex items-center justify-between border-t-4 border-t-neutral-800 transition-transform hover:scale-[1.01]">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Class Divisions</span>
                  <span className="text-3xl font-black text-neutral-850">{categories.length} Categories</span>
                </div>
                <div className="p-3 bg-neutral-900/5 rounded-xl text-neutral-800">
                  <FolderOpen size={20} />
                </div>
              </div>

              <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-2xl p-6 flex items-center justify-between border-t-4 border-t-crimson transition-transform hover:scale-[1.01]">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Published Blogs</span>
                  <span className="text-3xl font-black text-neutral-850">{blogs.length} Articles</span>
                </div>
                <div className="p-3 bg-crimson/5 rounded-xl text-crimson">
                  <Newspaper size={20} />
                </div>
              </div>
            </div>

            {/* Edit Company Metadata Info */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900">Company Information Profile</h3>
                <p className="text-[10px] text-neutral-450 font-semibold mt-1">Configure active contact details (Email, Phone, Address, GSTIN) referenced globally across public routing headers and footers.</p>
              </div>

              <form onSubmit={handleCompanySubmit} className="grid gap-5 sm:grid-cols-2 text-xs font-semibold border-t border-neutral-100 pt-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/65 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">GSTIN Registration</label>
                  <input
                    type="text"
                    required
                    value={companyForm.gstin}
                    onChange={(e) => setCompanyForm({ ...companyForm, gstin: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/65 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={companyForm.contactEmail}
                    onChange={(e) => setCompanyForm({ ...companyForm, contactEmail: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/65 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Contact Phone Number</label>
                  <input
                    type="text"
                    required
                    value={companyForm.contactPhone}
                    onChange={(e) => setCompanyForm({ ...companyForm, contactPhone: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/65 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Registered Office Address</label>
                  <input
                    type="text"
                    required
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/65 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-crimson hover:bg-crimson-dark text-xs font-black uppercase text-white shadow-sm transition-all duration-200 active:scale-[0.98]"
                  >
                    Save Company Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= PRODUCTS TAB ================= */}
        {activeTab === "products" && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
              <div>
                <h1 className="text-base font-black text-neutral-900 uppercase tracking-wider">Product Catalog</h1>
                <p className="text-[10px] text-neutral-450 font-semibold mt-1">Manage standard pharma catalog ranges and detailed compositions.</p>
              </div>
              <button
                onClick={() => { resetProductForm(); setProductModalOpen(true); }}
                className="px-4 py-2.5 rounded-xl bg-crimson hover:bg-crimson-dark text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 active:scale-[0.97] text-white shadow-sm shadow-crimson/10"
              >
                <Plus size={14} /> Add Product
              </button>
            </div>

            {/* Products grid / table */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50/75 text-neutral-450 border-b border-neutral-200 text-[10px] font-black uppercase tracking-wider select-none">
                    <th className="py-3.5 px-5">Brand / Generic</th>
                    <th className="py-3.5 px-5">Form</th>
                    <th className="py-3.5 px-5">Specs / Package</th>
                    <th className="py-3.5 px-5">Category</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs font-semibold">
                  {products.map((prod) => (
                    <tr key={prod.slug} className="hover:bg-neutral-50/40 transition">
                      <td className="py-3.5 px-5">
                        <div className="font-extrabold text-neutral-905">{prod.brand}</div>
                        <div className="text-[10px] text-neutral-400 font-semibold mt-0.5">{prod.generic}</div>
                      </td>
                      <td className="py-3.5 px-5 text-neutral-550">{prod.form}</td>
                      <td className="py-3.5 px-5">
                        <div className="text-neutral-600">{prod.strength || "N/A"}</div>
                        <div className="text-[10px] text-neutral-400 font-semibold mt-0.5">{prod.pack || "N/A"}</div>
                      </td>
                      <td className="py-3.5 px-5 select-none">
                        <span className="inline-block bg-neutral-50 border border-neutral-200 text-neutral-500 px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider">
                          {prod.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right select-none">
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => openEditProduct(prod)}
                            className="p-2 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 rounded-lg transition"
                            title="Edit Product"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.slug)}
                            className="p-2 hover:bg-neutral-55 text-red-500 hover:text-red-700 rounded-lg transition"
                            title="Delete Product"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= CATEGORIES TAB ================= */}
        {activeTab === "categories" && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
              <div>
                <h1 className="text-base font-black text-neutral-900 uppercase tracking-wider">Product Categories</h1>
                <p className="text-[10px] text-neutral-450 font-semibold mt-1">Manage the top category grids displayed on live routing ranges.</p>
              </div>
              <button
                onClick={() => { resetCategoryForm(); setCategoryModalOpen(true); }}
                className="px-4 py-2.5 rounded-xl bg-crimson hover:bg-crimson-dark text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 active:scale-[0.97] text-white shadow-sm shadow-crimson/10"
              >
                <Plus size={14} /> Add Category
              </button>
            </div>

            {/* Categories Listing Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {categories.map((cat) => (
                <div key={cat.category} className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:scale-[1.005] transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-neutral-900 text-sm leading-tight uppercase tracking-wider">{cat.title}</h3>
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400 block mt-1">Key: {cat.category}</span>
                    </div>
                    <div className="inline-flex gap-1 select-none">
                      <button
                        onClick={() => openEditCategory(cat)}
                        className="p-2 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 rounded-lg transition"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => deleteCategory(cat.category)}
                        className="p-2 hover:bg-neutral-55 text-red-500 hover:text-red-700 rounded-lg transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed flex-1 font-semibold">{cat.description}</p>
                  {cat.region && (
                    <div className="text-[9px] font-black uppercase text-crimson tracking-wider select-none bg-crimson/5 border border-crimson/10 px-2 py-0.5 rounded w-fit">
                      Region Locked: {cat.region}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= BLOGS TAB ================= */}
        {activeTab === "blogs" && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
              <div>
                <h1 className="text-base font-black text-neutral-900 uppercase tracking-wider">Articles & Insights</h1>
                <p className="text-[10px] text-neutral-450 font-semibold mt-1">Manage, format, and edit details of published news dossiers.</p>
              </div>
              <button
                onClick={() => { resetBlogForm(); setBlogModalOpen(true); }}
                className="px-4 py-2.5 rounded-xl bg-crimson hover:bg-crimson-dark text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 active:scale-[0.97] text-white shadow-sm shadow-crimson/10"
              >
                <Plus size={14} /> New Article
              </button>
            </div>

            {/* Blogs List */}
            <div className="bg-white border border-neutral-200/80 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50/75 text-neutral-450 border-b border-neutral-200 font-black uppercase tracking-wider text-[10px] select-none">
                    <th className="py-3.5 px-5">Title</th>
                    <th className="py-3.5 px-5">Author</th>
                    <th className="py-3.5 px-5">Category</th>
                    <th className="py-3.5 px-5">Date</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs font-semibold">
                  {blogs.map((blog) => (
                    <tr key={blog.slug} className="hover:bg-neutral-50/40 transition">
                      <td className="py-3.5 px-5 font-extrabold text-neutral-850 max-w-xs truncate">{blog.title}</td>
                      <td className="py-3.5 px-5 text-neutral-600">{blog.author}</td>
                      <td className="py-3.5 px-5 select-none">
                        <span className="inline-block bg-neutral-50 border border-neutral-200 text-neutral-500 px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider">
                          {blog.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-neutral-450 font-bold uppercase text-[9px]">{blog.date}</td>
                      <td className="py-3.5 px-5 text-right select-none">
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => openEditBlog(blog)}
                            className="p-2 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 rounded-lg transition"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => deleteBlog(blog.slug)}
                            className="p-2 hover:bg-neutral-55 text-red-500 hover:text-red-700 rounded-lg transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= INQUIRIES TAB ================= */}
        {activeTab === "inquiries" && (() => {
          const filteredInquiries = inquiries.filter((inq) => {
            const status = inq.status || "unread";
            if (inquiryFilter === "all") return true;
            return status === inquiryFilter;
          });
          const selectedInquiry = inquiries.find((inq) => (inq._id || inq.id) === selectedInquiryId);

          return (
            <div className="flex flex-col gap-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
                <div>
                  <h1 className="text-base font-black text-neutral-900 uppercase tracking-wider">Contact Inquiries</h1>
                  <p className="text-[10px] text-neutral-450 font-semibold mt-1">Review contact forms and product inquiry submissions from B2B buyers.</p>
                </div>

                {/* Status Filters */}
                <div className="flex items-center gap-1 bg-white border border-neutral-200/80 rounded-xl p-1 shadow-sm shrink-0">
                  {(["all", "unread", "read", "resolved"] as const).map((status) => {
                    const active = inquiryFilter === status;
                    return (
                      <button
                        key={status}
                        onClick={() => {
                          setInquiryFilter(status);
                          setSelectedInquiryId(null);
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-200 ${
                          active
                            ? "bg-crimson text-white shadow-sm shadow-crimson/15"
                            : "bg-white hover:bg-neutral-50 text-neutral-500 hover:text-neutral-950"
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Split Pane Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 items-start">

                {/* Left Column: List */}
                <div className="flex flex-col gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
                  {filteredInquiries.length === 0 ? (
                    <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center text-neutral-400 font-bold uppercase tracking-wider text-[10px] shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
                      No inquiries found.
                    </div>
                  ) : (
                    filteredInquiries.map((inq) => {
                      const status = inq.status || "unread";
                      const currentId = inq._id || inq.id;
                      return (
                        <div
                          key={currentId}
                          onClick={() => setSelectedInquiryId(currentId)}
                          className={`p-5 bg-white border rounded-2xl cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex flex-col gap-2.5 ${
                            selectedInquiryId === currentId
                              ? "border-crimson ring-1 ring-crimson bg-crimson/[0.01]"
                              : "border-neutral-200/80 hover:border-neutral-350"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-extrabold text-sm text-neutral-850 truncate leading-snug">{inq.name}</h4>
                            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border shrink-0 ${
                              status === "resolved"
                                ? "bg-green-50/50 border-green-200 text-green-700"
                                : status === "read"
                                ? "bg-blue-50/50 border-blue-200 text-blue-600"
                                : "bg-amber-50/50 border-amber-200 text-amber-600"
                            }`}>
                              {status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-neutral-400 font-black uppercase tracking-wider">
                            <span>{inq.company || "No Company"}</span>
                            <span>{inq.date}</span>
                          </div>
                          <p className="text-xs text-neutral-500 font-semibold line-clamp-2 leading-relaxed">
                            {inq.message}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Right Column: Detail Panel */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[450px] flex flex-col justify-between">
                  {selectedInquiry ? (
                    <div className="flex flex-col gap-6 h-full justify-between flex-1">
                      <div className="flex flex-col gap-5">
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-neutral-100 pb-4 gap-4">
                          <div>
                            <h3 className="text-base font-extrabold text-neutral-900 leading-snug">{selectedInquiry.name}</h3>
                            <span className="text-[9px] text-neutral-400 font-black uppercase tracking-widest block mt-1">{selectedInquiry.date}</span>
                          </div>
                          <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border select-none ${
                            selectedInquiry.type === "Product Inquiry"
                              ? "bg-amber-50/50 border-amber-205 text-amber-700"
                              : "bg-blue-50/50 border-blue-200 text-blue-600"
                          }`}>
                            {selectedInquiry.type}
                          </span>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid gap-4 sm:grid-cols-2 text-xs font-semibold bg-neutral-50/60 p-4 rounded-xl border border-neutral-200/60 select-text">
                          <div>
                            <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Company</span>
                            <span className="text-neutral-800 mt-1 block font-bold">{selectedInquiry.company || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">City / Country</span>
                            <span className="text-neutral-800 mt-1 block font-bold">{selectedInquiry.country || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Email Address</span>
                            <span className="text-neutral-800 mt-1 block font-bold select-all">{selectedInquiry.email}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Phone Line</span>
                            <span className="text-neutral-800 mt-1 block font-bold select-all">{selectedInquiry.phone || "N/A"}</span>
                          </div>
                          {selectedInquiry.product && (
                            <div className="sm:col-span-2 border-t border-neutral-200/65 pt-3 mt-1">
                              <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Requested Product</span>
                              <span className="text-crimson font-black uppercase tracking-wider mt-1 block text-[11px]">{selectedInquiry.product}</span>
                            </div>
                          )}
                          {selectedInquiry.quantity && (
                            <div className="sm:col-span-2 border-t border-neutral-200/65 pt-3">
                              <span className="text-[9px] uppercase font-black text-neutral-400 block tracking-wider">Required Quantity</span>
                              <span className="text-neutral-800 font-extrabold mt-1 block text-sm">{selectedInquiry.quantity} Units</span>
                            </div>
                          )}
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[9px] uppercase font-black text-neutral-400 tracking-wider">Message Requirements</span>
                          <p className="text-xs text-neutral-600 leading-relaxed font-semibold bg-white border border-neutral-200/70 p-4 rounded-xl whitespace-pre-line select-text">
                            {selectedInquiry.message}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="border-t border-neutral-100 pt-5 mt-6 flex flex-wrap items-center gap-2 select-none">
                        <button
                          onClick={() => updateInquiryStatus(selectedInquiry._id || selectedInquiry.id, "unread")}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border transition ${(selectedInquiry.status || "unread") === "unread"
                            ? "bg-amber-50 border-amber-300 text-amber-700"
                            : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-500"
                          }`}
                        >
                          Unread
                        </button>
                        <button
                          onClick={() => updateInquiryStatus(selectedInquiry._id || selectedInquiry.id, "read")}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border transition ${selectedInquiry.status === "read"
                            ? "bg-blue-50 border-blue-300 text-blue-600"
                            : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-500"
                          }`}
                        >
                          Read
                        </button>
                        <button
                          onClick={() => updateInquiryStatus(selectedInquiry._id || selectedInquiry.id, "resolved")}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border transition ${selectedInquiry.status === "resolved"
                            ? "bg-green-50 border-green-300 text-green-700"
                            : "bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-500"
                          }`}
                        >
                          Resolved
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm("Delete this inquiry?")) {
                              const inqId = selectedInquiry._id || selectedInquiry.id;
                              try {
                                const res = await fetch(`/api/inquiries/${inqId}`, {
                                  method: "DELETE",
                                });
                                if (res.ok) {
                                  setInquiries(inquiries.filter((i) => (i._id || i.id) !== inqId));
                                  setSelectedInquiryId(null);
                                  showNotification("Inquiry deleted successfully!");
                                } else {
                                  showNotification("Failed to delete inquiry", "error");
                                }
                              } catch (err) {
                                showNotification("Network error deleting inquiry", "error");
                              }
                            }
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-500 hover:text-white border border-red-200 hover:border-red-500 text-[9px] font-black uppercase tracking-wider transition ml-auto flex items-center gap-1 text-red-600 shadow-sm"
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-3.5 text-neutral-400 select-none">
                      <Mail size={32} className="text-neutral-300 animate-bounce" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Select an inquiry to view details</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })()}

        {/* ================= ADMIN ACCOUNTS TAB ================= */}
        {activeTab === "admins" && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column: Manage Admins */}
              <div className="lg:col-span-2 bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-2xl p-6 flex flex-col gap-6 select-none">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900">Manage Administrator Accounts</h3>
                    <p className="text-[10px] text-neutral-450 font-semibold mt-0.5">Add, view, and delete panel control access accounts.</p>
                  </div>
                  <button
                    onClick={() => setAddAdminModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-crimson hover:bg-crimson-dark text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition active:scale-95 animate-fadeIn"
                  >
                    <PlusCircle size={14} /> Add Admin
                  </button>
                </div>

                <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-1">
                  {admins.map((user) => (
                    <div key={user._id} className="flex items-center justify-between p-4 bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-200/60 rounded-xl transition-all">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-neutral-200 text-neutral-600 flex items-center justify-center font-bold text-sm">
                          {user.name ? user.name[0].toUpperCase() : "A"}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-neutral-800">{user.name}</h4>
                          <p className="text-[10px] text-neutral-450 font-semibold mt-0.5">@{user.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {currentUser && currentUser._id === user._id && (
                          <span className="px-2.5 py-1 rounded bg-green-50 border border-green-150 text-[9px] font-black uppercase tracking-wider text-green-600">
                            You
                          </span>
                        )}
                        <button
                          onClick={() => handleDeleteAdmin(user._id)}
                          disabled={admins.length <= 1 || currentUser?._id === user._id}
                          className="p-2 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-red-50 disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition"
                          title="Delete Administrator"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Edit My Profile */}
              <div className="bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-2xl p-6 flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900">Edit My Credentials</h3>
                  <p className="text-[10px] text-neutral-450 font-semibold mt-0.5">Update your administrator details and password.</p>
                </div>

                <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4 text-xs font-semibold">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-neutral-400">Display Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={myProfileForm.name}
                      onChange={(e) => setMyProfileForm({ ...myProfileForm, name: e.target.value })}
                      className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-neutral-400">Username</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. johndoe"
                      value={myProfileForm.username}
                      onChange={(e) => setMyProfileForm({ ...myProfileForm, username: e.target.value })}
                      className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-neutral-400">New Password (Leave blank to keep current)</label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={myProfileForm.password}
                        onChange={(e) => setMyProfileForm({ ...myProfileForm, password: e.target.value })}
                        className="w-full h-10 pl-9 pr-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                      />
                      <Lock size={12} className="absolute left-3.5 top-3.5 text-neutral-400" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 rounded-lg bg-crimson hover:bg-crimson-dark text-white text-[10px] font-bold uppercase shadow-sm transition active:scale-[0.98]"
                  >
                    Save My Credentials
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-400 font-bold w-full">
          &copy; {new Date().getFullYear()} Sun Elastomers Private Limited. All rights reserved.
        </footer>

      </main>

      {/* ================= PRODUCT FORM MODAL ================= */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-100 rounded-2xl w-full max-w-xl p-6 flex flex-col gap-5 overflow-y-auto max-h-[88vh] text-neutral-800 shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5 select-none">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900">
                {editingProduct ? "Edit Product Specifications" : "Add New Product Record"}
              </h3>
              <button 
                onClick={() => setProductModalOpen(false)} 
                className="text-neutral-500 hover:text-neutral-800 p-1 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-neutral-400">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ELSEFPIME-1000mg"
                  value={productForm.brand}
                  onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                  className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-neutral-400">Generic Formulation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cefepime for Injection USP"
                  value={productForm.generic}
                  onChange={(e) => setProductForm({ ...productForm, generic: e.target.value })}
                  className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Dosage Form</label>
                  <select
                    value={productForm.form}
                    onChange={(e) => setProductForm({ ...productForm, form: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
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
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.category} value={c.category}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Strength (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 1000mg"
                    value={productForm.strength}
                    onChange={(e) => setProductForm({ ...productForm, strength: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Package Format (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Vial + SWFI"
                    value={productForm.pack}
                    onChange={(e) => setProductForm({ ...productForm, pack: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-neutral-400">Product Description (Optional)</label>
                <textarea
                  placeholder="Describe key indications, product uses, packaging, or pharmacological properties..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full h-20 p-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 resize-none transition-all font-semibold"
                />
              </div>

              {/* Composition list dynamic form */}
              <div className="border-t border-neutral-100 pt-4 flex flex-col gap-2">
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

                <div className="flex flex-col gap-2.5 max-h-40 overflow-y-auto pr-1">
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
                        className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-4 flex gap-3 justify-end select-none">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-bold uppercase transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-crimson hover:bg-crimson-dark text-white text-[10px] font-bold uppercase shadow-sm transition"
                >
                  Save Product Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CATEGORY FORM MODAL ================= */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-150 rounded-2xl w-full max-w-md p-6 flex flex-col gap-5 text-neutral-800 shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5 select-none">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900">
                {editingCategory ? "Edit Category Details" : "Create New Product Category"}
              </h3>
              <button 
                onClick={() => setCategoryModalOpen(false)} 
                className="text-neutral-500 hover:text-neutral-800 p-1 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-neutral-400">Category Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gastrointestinal Care"
                  value={categoryForm.title}
                  onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                  className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-neutral-400">System Category Key</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gastroenterology"
                  value={categoryForm.category}
                  disabled={!!editingCategory}
                  onChange={(e) => setCategoryForm({ ...categoryForm, category: e.target.value })}
                  className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-neutral-400">Description</label>
                <textarea
                  placeholder="Brief description of product categories..."
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full h-24 p-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 resize-none transition-all font-semibold"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400">Region Locked (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Myanmar"
                    value={categoryForm.region}
                    onChange={(e) => setCategoryForm({ ...categoryForm, region: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                  />
                </div>

                <DualImageUploader
                  value={categoryForm.image}
                  onChange={(url) => setCategoryForm({ ...categoryForm, image: url })}
                  label="Thumbnail Image"
                />
              </div>

              <div className="border-t border-neutral-100 pt-4 flex gap-3 justify-end select-none">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-bold uppercase transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-crimson hover:bg-crimson-dark text-white text-[10px] font-bold uppercase shadow-sm transition"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= BLOG FORM MODAL ================= */}
      <BlogEditor
        open={blogModalOpen}
        onClose={() => setBlogModalOpen(false)}
        blogForm={blogForm}
        setBlogForm={setBlogForm}
        editingBlog={editingBlog}
        handleBlogSubmit={handleBlogSubmit}
      />

      {/* ================= ADD ADMIN MODAL ================= */}
      {addAdminModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-100 rounded-2xl w-full max-w-md p-6 flex flex-col gap-5 text-neutral-800 shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5 select-none">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900">
                Add New Administrator
              </h3>
              <button 
                onClick={() => setAddAdminModalOpen(false)} 
                className="text-neutral-500 hover:text-neutral-800 p-1 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddAdmin} className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-neutral-400">Display Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Smith"
                  value={addAdminForm.name}
                  onChange={(e) => setAddAdminForm({ ...addAdminForm, name: e.target.value })}
                  className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-neutral-400">Username</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. janesmith"
                  value={addAdminForm.username}
                  onChange={(e) => setAddAdminForm({ ...addAdminForm, username: e.target.value })}
                  className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-neutral-400">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter initial password"
                  value={addAdminForm.password}
                  onChange={(e) => setAddAdminForm({ ...addAdminForm, password: e.target.value })}
                  className="w-full h-10 px-3 bg-neutral-50/60 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                />
              </div>

              <div className="border-t border-neutral-100 pt-4 flex gap-3 justify-end select-none">
                <button
                  type="button"
                  onClick={() => setAddAdminModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-bold uppercase transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-crimson hover:bg-crimson-dark text-white text-[10px] font-bold uppercase shadow-sm transition"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
