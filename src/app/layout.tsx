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
    });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    // Return default metadata if there's an error
    return generatePageMetadata('home');
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
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    // Generate default metadata if there's an error
    generatePageMetadata('home');
    homepageData = { data: { blocks: [] } };
  }

  const layoutBlocks = homepageData.data.blocks.filter(
    (block: Blocks) => block.__component === 'layout.topbar' || block.__component === 'layout.header'
  );

  return (
    <html lang="en">
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

