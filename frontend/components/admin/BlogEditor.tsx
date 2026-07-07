// BlogEditor.tsx
"use client";
import React, { useState, useRef } from "react";
import { X, Bold, Heading2, Heading3, List, Quote, Table, Link as LinkIcon, Sparkles, FileText, Image as ImageIcon, Layout, ArrowLeft, ArrowRight, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DualImageUploader from "./DualImageUploader";

interface BlogEditorProps {
  open: boolean;
  onClose: () => void;
  blogForm: any;
  setBlogForm: React.Dispatch<React.SetStateAction<any>>;
  editingBlog: any;
  handleBlogSubmit: (e: React.FormEvent) => void;
}

type TabType = "metadata" | "banners" | "content";

export default function BlogEditor({
  open,
  onClose,
  blogForm,
  setBlogForm,
  editingBlog,
  handleBlogSubmit,
}: BlogEditorProps) {
  const [activeTab, setActiveTab] = useState<TabType>("metadata");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!open) return null;

  const insertMarkdown = (syntax: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    const selected = text.substring(start, end);
    let replacement = syntax;
    if (syntax.includes("text")) {
      replacement = syntax.replace("text", selected || "text");
    }
    const newContent = before + replacement + after;
    setBlogForm({ ...blogForm, content: newContent });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 0);
  };

  // Word & Character count calculation
  const getWordCount = (text: string) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const getCharCount = (text: string) => {
    return text ? text.length : 0;
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-neutral-200 rounded-2xl w-full max-w-7xl p-6 flex flex-col gap-6 overflow-hidden h-[92vh] text-neutral-800 shadow-2xl transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-crimson/10 text-crimson rounded-xl">
              <Sparkles size={20} />
            </span>
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-wider text-neutral-900">
                {editingBlog ? "Edit Article" : "Create Blog Article"}
              </h3>
              <p className="text-[11px] text-neutral-450 font-semibold mt-0.5">
                Draft and format high-quality articles with native responsive image uploads.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Main Grid (Scrollable Body) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 overflow-hidden h-full">
          
          {/* Left Side: Step-by-Step Editor Panel */}
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Step Navigation Tabs */}
            <div className="flex items-center gap-1 bg-neutral-50 border border-neutral-150 p-1 rounded-xl mb-4 shrink-0 select-none">
              <button
                type="button"
                onClick={() => setActiveTab("metadata")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
                  activeTab === "metadata"
                    ? "bg-white text-neutral-900 shadow-sm border border-neutral-200"
                    : "text-neutral-500 hover:text-neutral-800 hover:bg-white/50"
                }`}
              >
                <Layout size={13} />
                1. Metadata
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("banners")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
                  activeTab === "banners"
                    ? "bg-white text-neutral-900 shadow-sm border border-neutral-200"
                    : "text-neutral-500 hover:text-neutral-800 hover:bg-white/50"
                }`}
              >
                <ImageIcon size={13} />
                2. Banners
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
                  activeTab === "content"
                    ? "bg-white text-neutral-900 shadow-sm border border-neutral-200"
                    : "text-neutral-500 hover:text-neutral-800 hover:bg-white/50"
                }`}
              >
                <FileText size={13} />
                3. Content
              </button>
            </div>

            {/* Tab Contents Panel (Internal Scrollable) */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 text-xs font-semibold">
              
              {/* TAB 1: METADATA */}
              {activeTab === "metadata" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-neutral-400">Article Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Navigating WHO-GMP compliance in procurement..."
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full h-10 px-3 bg-neutral-55 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-neutral-400">Blog Category</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Quality Assurance"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full h-10 px-3 bg-neutral-55 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-neutral-400">Read Time</label>
                      <input
                        type="text"
                        placeholder="e.g. 5 min read"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        className="w-full h-10 px-3 bg-neutral-55 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-neutral-400">Author Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Regulatory Affairs R&D"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full h-10 px-3 bg-neutral-55 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-neutral-400">Excerpt / Short Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write a short summary (1-2 sentences) that displays on listing cards..."
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full p-3 bg-neutral-55 border border-neutral-200 rounded-lg focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 resize-none transition-all font-semibold"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-2 select-none">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={blogForm.featured}
                      onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
                      className="rounded text-crimson bg-neutral-55 border-neutral-200 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="featured" className="text-[10px] font-black uppercase text-neutral-600 cursor-pointer">
                      Feature this article at the top of the listing page
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: BANNERS */}
              {activeTab === "banners" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <p className="text-[10px] text-neutral-450 uppercase leading-relaxed font-semibold">
                    Upload separate aspect ratios optimized for mobile displays and desktop viewports.
                  </p>
                  <DualImageUploader
                    value={blogForm.image}
                    onChange={(url) => setBlogForm({ ...blogForm, image: url })}
                    label="Article Banner Images"
                  />
                </div>
              )}

              {/* TAB 3: CONTENT */}
              {activeTab === "content" && (
                <div className="flex flex-col h-full min-h-[350px] animate-fadeIn">
                  {/* Editor Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 bg-neutral-50 border border-neutral-200 border-b-0 rounded-t-xl p-2 select-none">
                    <button
                      type="button"
                      onClick={() => insertMarkdown("## Heading 2\n")}
                      className="p-1.5 bg-white border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 rounded text-[9px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1 transition"
                      title="Heading 2"
                    >
                      <Heading2 size={12} /> H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("### Heading 3\n")}
                      className="p-1.5 bg-white border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 rounded text-[9px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1 transition"
                      title="Heading 3"
                    >
                      <Heading3 size={12} /> H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("**bold text**")}
                      className="p-1.5 bg-white border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 rounded text-[9px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1 transition"
                      title="Bold"
                    >
                      <Bold size={12} /> Bold
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("- List item\n")}
                      className="p-1.5 bg-white border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 rounded text-[9px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1 transition"
                      title="List"
                    >
                      <List size={12} /> List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("> Quote text\n")}
                      className="p-1.5 bg-white border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 rounded text-[9px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1 transition"
                      title="Quote"
                    >
                      <Quote size={12} /> Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("| Header 1 | Header 2 |\n|---|---|\n| Cell 1 | Cell 2 |\n")}
                      className="p-1.5 bg-white border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 rounded text-[9px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1 transition"
                      title="Table"
                    >
                      <Table size={12} /> Table
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("[Link text](https://example.com)")}
                      className="p-1.5 bg-white border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 rounded text-[9px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1 transition"
                      title="Link"
                    >
                      <LinkIcon size={12} /> Link
                    </button>
                  </div>

                  <textarea
                    id="blog-textarea"
                    ref={textareaRef}
                    required
                    placeholder="Draft article content body using Markdown formatting..."
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full flex-1 p-3 bg-neutral-55 border border-neutral-200 rounded-b-xl focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 resize-none font-mono text-[11px] leading-relaxed transition-all h-64"
                  />

                  {/* Character & Word counter */}
                  <div className="flex items-center justify-between text-[9px] text-neutral-400 font-bold uppercase select-none mt-2">
                    <span>Markdown Formatting Active</span>
                    <span className="flex gap-3">
                      <span>Words: <strong className="text-neutral-600">{getWordCount(blogForm.content)}</strong></span>
                      <span>Characters: <strong className="text-neutral-600">{getCharCount(blogForm.content)}</strong></span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Next/Back Tab Action Controls */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-100 shrink-0 select-none">
              {activeTab === "metadata" ? (
                <div />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === "content") setActiveTab("banners");
                    else if (activeTab === "banners") setActiveTab("metadata");
                  }}
                  className="px-3.5 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-lg text-[10px] font-black uppercase transition flex items-center gap-1"
                >
                  <ArrowLeft size={11} /> Back
                </button>
              )}

              {activeTab === "content" ? (
                <div />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === "metadata") setActiveTab("banners");
                    else if (activeTab === "banners") setActiveTab("content");
                  }}
                  className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[10px] font-black uppercase transition flex items-center gap-1 ml-auto"
                >
                  Next Step <ArrowRight size={11} />
                </button>
              )}
            </div>
          </div>

          {/* Right Side: Fixed Premium Live Preview Pane */}
          <div className="flex flex-col h-full overflow-hidden border-l border-neutral-100 pl-6 pr-1">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5 shrink-0 select-none">
              <span className="text-[10px] font-black uppercase text-neutral-400">Live Render Preview</span>
              <span className="text-[8px] bg-green-50 border border-green-200 text-green-600 px-2 py-0.5 rounded font-black uppercase tracking-wider select-none animate-pulse">
                Active Sync
              </span>
            </div>

            {/* Styled Preview Container (Scrollable) */}
            <div className="flex-1 overflow-y-auto mt-4 pr-1 select-none">
              <div className="prose prose-sm max-w-none text-neutral-600 leading-relaxed">
                {blogForm.title && (
                  <h1 className="font-display text-2xl font-extrabold text-neutral-900 mb-2 leading-tight">
                    {blogForm.title}
                  </h1>
                )}
                
                {blogForm.category && (
                  <span className="bg-crimson/10 text-crimson border border-crimson/25 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest w-fit mb-4 inline-block rounded">
                    {blogForm.category}
                  </span>
                )}

                {blogForm.image && (
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-4 border border-neutral-200 shadow-sm relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={blogForm.image} 
                      alt="Banner Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {blogForm.content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ children }) => (
                        <h2 className="font-display text-base font-extrabold text-neutral-900 mt-6 mb-2 border-b border-neutral-100 pb-1">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="font-display text-sm font-bold text-neutral-900 mt-4 mb-2">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-xs text-neutral-600 leading-6 mb-3">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-4 space-y-1 mb-3">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-4 space-y-1 mb-3">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-xs text-neutral-600">
                          {children}
                        </li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-crimson pl-3 my-2 italic text-neutral-500 bg-neutral-50 py-1 rounded-r">
                          {children}
                        </blockquote>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-3">
                          <table className="w-full text-left text-[10px] border border-neutral-200 border-collapse rounded-lg overflow-hidden">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-neutral-100 text-neutral-800 border-b border-neutral-200 font-bold">
                          {children}
                        </thead>
                      ),
                      th: ({ children }) => (
                        <th className="p-2 font-black">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="p-2 border-b border-neutral-100">
                          {children}
                        </td>
                      ),
                      tr: ({ children }) => (
                        <tr className="hover:bg-neutral-50/50">
                          {children}
                        </tr>
                      ),
                      strong: ({ children }) => (
                        <strong className="text-neutral-900 font-bold">
                          {children}
                        </strong>
                      ),
                    }}
                  >
                    {blogForm.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-neutral-400 text-xs italic">
                    Start drafting in the editor to see it render here in real-time...
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Footer Submit Controls */}
            <div className="border-t border-neutral-100 pt-4 mt-6 flex gap-3 justify-end shrink-0 select-none">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[10px] font-bold uppercase transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  // Submit handling through proxying to form
                  const form = document.querySelector("form");
                  if (form) {
                    // Trigger native HTML validation / submit
                    if (!blogForm.title || !blogForm.author || !blogForm.content) {
                      setActiveTab("metadata");
                      if (!blogForm.content) setActiveTab("content");
                    }
                  }
                }}
                className="px-5 py-2.5 rounded-lg bg-crimson hover:bg-crimson-dark text-white text-[10px] font-bold uppercase shadow-sm transition flex items-center gap-1"
              >
                <Check size={12} />
                {editingBlog ? "Save Changes" : "Publish Article"}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
