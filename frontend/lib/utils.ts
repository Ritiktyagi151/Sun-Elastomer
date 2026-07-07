import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function getBannerSrc(src: string, device: "desktop" | "mobile") {
  if (!src || !src.startsWith("/banners/")) return src;

  const cleanSrc = src
    .replace("/banners/desktop/", "/banners/")
    .replace("/banners/mobile/", "/banners/");

  return cleanSrc.replace("/banners/", `/banners/${device}/`);
}
