// DualImageUploader.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2, Monitor, Smartphone } from "lucide-react";
import { getBannerSrc } from "@/lib/utils";

interface DualImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function DualImageUploader({
  value,
  onChange,
  label = "Upload Images",
}: DualImageUploaderProps) {
  const [desktopPreview, setDesktopPreview] = useState<string>("");
  const [mobilePreview, setMobilePreview] = useState<string>("");
  
  const [desktopBase64, setDesktopBase64] = useState<string>("");
  const [mobileBase64, setMobileBase64] = useState<string>("");
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Initialize previews from existing URL value
  useEffect(() => {
    if (value) {
      setDesktopPreview(getBannerSrc(value, "desktop"));
      setMobilePreview(getBannerSrc(value, "mobile"));
    } else {
      setDesktopPreview("");
      setMobilePreview("");
      setDesktopBase64("");
      setMobileBase64("");
      setSelectedFileName("");
    }
  }, [value]);

  const handleUpload = async (
    deskBase64: string,
    mobBase64: string,
    fileName: string
  ) => {
    // Only upload if at least one base64 image is provided
    const isDeskBase64 = deskBase64 && deskBase64.startsWith("data:image/");
    const isMobBase64 = mobBase64 && mobBase64.startsWith("data:image/");
    if (!isDeskBase64 && !isMobBase64) return;

    setIsUploading(true);
    setError(null);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";
      const response = await fetch(`${apiBase}/api/upload-banner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fileName,
          desktopData: deskBase64 || "",
          mobileData: mobBase64 || "",
        }),
      });

      // Handle unexpected token error by checking response headers
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(text.includes("Payload Too Large") ? "Payload Too Large: Please compress your images before uploading." : `Server error: ${response.status}`);
      }

      const result = await response.json();
      if (response.ok && result.success) {
        onChange(result.url);
        setError(null);
      } else {
        setError(result.error || "Failed to upload banner images.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "desktop" | "mobile"
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }

      setSelectedFileName(file.name);

      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Str = event.target?.result as string;
        if (type === "desktop") {
          setDesktopPreview(base64Str);
          setDesktopBase64(base64Str);

          // Get mobile data if already set, otherwise pass fallback
          const targetMobile = mobileBase64 || (mobilePreview && !mobilePreview.startsWith("http") ? mobilePreview : "");
          await handleUpload(base64Str, targetMobile, file.name);
        } else {
          setMobilePreview(base64Str);
          setMobileBase64(base64Str);

          // Get desktop data if already set, otherwise pass fallback
          const targetDesktop = desktopBase64 || (desktopPreview && !desktopPreview.startsWith("http") ? desktopPreview : "");
          await handleUpload(targetDesktop, base64Str, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setDesktopPreview("");
    setMobilePreview("");
    setDesktopBase64("");
    setMobileBase64("");
    setSelectedFileName("");
    onChange("");
    if (desktopInputRef.current) desktopInputRef.current.value = "";
    if (mobileInputRef.current) mobileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase text-neutral-400">{label}</label>
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-[9px] font-black uppercase text-red-500 hover:text-red-700 flex items-center gap-1 select-none transition"
          >
            <X size={10} /> Clear Both
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Desktop Card */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1 text-[9px] font-black uppercase text-neutral-500 mb-0.5">
            <Monitor size={12} /> Desktop Version (16:9 aspect)
          </div>
          
          {desktopPreview ? (
            <div className="relative group w-full h-36 border border-neutral-200 rounded-lg overflow-hidden bg-neutral-55 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={desktopPreview}
                alt="Desktop Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => desktopInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white text-neutral-800 text-[10px] font-bold rounded shadow hover:bg-neutral-100 transition uppercase"
                  disabled={isUploading}
                >
                  Replace Desktop
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => desktopInputRef.current?.click()}
              className="w-full h-36 border-2 border-dashed border-neutral-300 bg-neutral-55 hover:border-neutral-400 rounded-lg flex flex-col items-center justify-center p-3 text-center cursor-pointer transition"
            >
              <Upload className="text-neutral-400 mb-1" size={20} />
              <span className="text-[9px] font-bold uppercase text-neutral-800">Upload Desktop image</span>
            </div>
          )}
          <input
            type="file"
            ref={desktopInputRef}
            onChange={(e) => handleFileChange(e, "desktop")}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Mobile Card */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1 text-[9px] font-black uppercase text-neutral-500 mb-0.5">
            <Smartphone size={12} /> Mobile Version (4:5 aspect)
          </div>
          
          {mobilePreview ? (
            <div className="relative group w-full h-36 border border-neutral-200 rounded-lg overflow-hidden bg-neutral-55 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mobilePreview}
                alt="Mobile Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => mobileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white text-neutral-800 text-[10px] font-bold rounded shadow hover:bg-neutral-100 transition uppercase"
                  disabled={isUploading}
                >
                  Replace Mobile
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => mobileInputRef.current?.click()}
              className="w-full h-36 border-2 border-dashed border-neutral-300 bg-neutral-55 hover:border-neutral-400 rounded-lg flex flex-col items-center justify-center p-3 text-center cursor-pointer transition"
            >
              <Upload className="text-neutral-400 mb-1" size={20} />
              <span className="text-[9px] font-bold uppercase text-neutral-800">Upload Mobile image</span>
            </div>
          )}
          <input
            type="file"
            ref={mobileInputRef}
            onChange={(e) => handleFileChange(e, "mobile")}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {isUploading && (
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 font-bold uppercase select-none mt-1 animate-pulse">
          <Loader2 className="animate-spin text-crimson" size={12} />
          Uploading banner packages...
        </div>
      )}

      {error && (
        <span className="text-[10px] font-bold uppercase text-red-500 mt-1 select-none">
          {error}
        </span>
      )}
    </div>
  );
}
