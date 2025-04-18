import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiURL(): string {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL ?? process.env.NEXT_PUBLIC_STRAPI_API_URL_DEV ?? "http://ec2-34-224-212-73.compute-1.amazonaws.com";
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}
