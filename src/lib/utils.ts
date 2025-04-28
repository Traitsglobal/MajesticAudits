import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiURL(): string {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL ?? process.env.NEXT_PUBLIC_STRAPI_API_URL_DEV ?? ""
}

export function getStrapiMedia(url: string | null) {
  console.log('url', url);
  console.log('getStrapiURL()', getStrapiURL());
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}
