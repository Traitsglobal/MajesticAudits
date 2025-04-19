import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type { Viewport } from "next"
import WhatsAppWrapper from "@/components/layout/whatsapp-wrapper"
import { generatePageMetadata } from "@/lib/metadata"
import ApiService from "@/services/api.services"
import LayoutContent from "@/components/layout/layout-content"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
})

// Generate metadata with fallback
export async function generateMetadata(): Promise<Metadata> {
  try {
    const homepageData = await ApiService.fetchHomepageData();
    const metadata = homepageData.data.metadata;
    return generatePageMetadata('home', {
      title: metadata.metaTitle,
      description: metadata.metaDescription,
      keywords: metadata.MetaKeywords,
      author: metadata.MetaAuthor,
      icons: {
        icon: [
          { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
          { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
          {
            rel: 'mask-icon',
            url: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            rel: 'mask-icon',
            url: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    });
  } catch  {
    // Return default metadata if there's an error
    return generatePageMetadata('home', {
      icons: {
        icon: [
          { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
          { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
          {
            rel: 'mask-icon',
            url: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            rel: 'mask-icon',
            url: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    });
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#003366' },
    { media: '(prefers-color-scheme: dark)', color: '#002147' },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" sizes="180x180" type="image/png" />
        <link rel="mask-icon" href="/icons/android-chrome-192x192.png" sizes="192x192" type="image/png" color="#003366" />
        <link rel="mask-icon" href="/icons/android-chrome-512x512.png" sizes="512x512" type="image/png" color="#003366" />
        <meta name="theme-color" content="#003366" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        <LayoutContent>
          {children}
        </LayoutContent>
        <WhatsAppWrapper />
      </body>
    </html>
  )
}

