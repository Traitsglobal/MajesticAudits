import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import dynamic from 'next/dynamic'
import type { Viewport } from "next"
import ApiService from "@/services/api.services"
import { Blocks } from "@/types/block"
import { blockRenderer } from "@/lib/block-renderer"
import WhatsAppWrapper from "@/components/layout/whatsapp-wrapper"
import { generatePageMetadata } from "@/lib/metadata"

// Dynamically import heavy components
const Footer = dynamic(() => import("@/components/layout/footer"), { loading: () => <div className="animate-pulse bg-gray-100 h-40" /> })

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let homepageData;
  try {
    homepageData = await ApiService.fetchHomepageData();
    // Generate metadata using the fetched data
    const metadata = homepageData.data.metadata;
    generatePageMetadata('home', {
      title: metadata.metaTitle,
      description: metadata.metaDescription,
      keywords: metadata.MetaKeywords,
      author: metadata.MetaAuthor,
    });
  } catch {
    // Generate default metadata if there's an error
    generatePageMetadata('home');
    homepageData = { data: { blocks: [] } };
  }

  const layoutBlocks = homepageData.data.blocks.filter(
    (block: Blocks) => block.__component === 'layout.topbar' || block.__component === 'layout.header'
  );

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
        <div className="md:block hidden">
          {layoutBlocks.map((block: Blocks) => (
            <React.Suspense
              key={`${block.__component}-${block.id}`}
              fallback={<div className="animate-pulse bg-gray-100 h-20" />}
            >
              {blockRenderer(block)}
            </React.Suspense>
          ))}
        </div>
        <div className="flex flex-col min-h-screen">
          {children}
          <Footer />
        </div>
        <WhatsAppWrapper />
      </body>
    </html>
  )
}

