// ImageUploader.tsx
"use client";
import React, { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Upload Image",
  placeholder = "Drag and drop your image, or click to browse",
}: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    setIsUploading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";
        const response = await fetch(`${apiBase}/api/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: file.name,
            data: base64Data,
          }),
        });

        const result = await response.json();
        if (response.ok && result.success) {
          onChange(result.url);
        } else {
          setError(result.error || "Failed to upload image.");
        }
        setIsUploading(false);
      };
      
      reader.onerror = () => {
        setError("Error reading file.");
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-[10px] font-black uppercase text-neutral-400">{label}</label>}
      
      {value ? (
        <div className="relative group w-full h-40 border border-neutral-200 rounded-lg overflow-hidden bg-neutral-55 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded Preview"
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-neutral-800 text-[10px] font-bold rounded shadow hover:bg-neutral-100 transition uppercase"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded shadow transition flex items-center justify-center"
              title="Remove Image"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all ${
            isDragOver
              ? "border-crimson bg-crimson/5 text-crimson"
              : "border-neutral-350 bg-neutral-55 hover:border-neutral-400 text-neutral-500"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin text-crimson" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">Uploading Image...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="text-neutral-400" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-800">
                {placeholder}
              </span>
              <span className="text-[9px] text-neutral-400 font-medium">
                Supports JPG, PNG, GIF, WEBP up to 10MB
              </span>
            </div>
          )}
        </div>
      )}

      {error && (
        <span className="text-[10px] font-bold uppercase text-red-500 mt-1 select-none">
          {error}
        </span>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
