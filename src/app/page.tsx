import React from 'react';
import dynamic from 'next/dynamic';
import ApiService from "@/services/api.services";
import { blockRenderer } from "@/lib/block-renderer";
import { Blocks } from "@/types/block";
import { Suspense } from 'react';
import ConsultationForm from "@/components/sections/consultation-form"

// Dynamically import components with proper loading states
const MobileHeaderWrapper = dynamic(() => import("@/components/layout/mobile-header-wrapper"));

const ServicesSection = dynamic(() => import("@/components/home/service-section"), {
  loading: () => <div className="animate-pulse bg-gray-100 h-96" />,
  ssr: true
});

const BlogSection = dynamic(() => import("@/components/home/blog-section"), {
  loading: () => <div className="animate-pulse bg-gray-100 h-96" />,
  ssr: true
});

// Add static page generation with longer revalidation
export const revalidate = 7200; // Revalidate every 2 hours

export default async function Home() {
  try {
    const homepageData = await ApiService.fetchHomepageData();
    console.log('homepageData', homepageData);
    const contentBlocks = homepageData.data.blocks?.filter(
      (block: Blocks) => block.__component === 'layout.hero'
    ) || [];
    return (
      <main>
        <div className="md:hidden">
          <MobileHeaderWrapper />
        </div>
        <Suspense fallback={
          <div className="w-full h-[500px] md:h-[550px] lg:h-[600px] bg-gray-200 animate-pulse" />
        }>
          {contentBlocks.length > 0 ? (
            contentBlocks.map((block: Blocks) => (
              <React.Suspense key={block.id} fallback={
                <div className="w-full h-[70vh] bg-gray-200 animate-pulse" />
              }>
                {blockRenderer(block)}
              </React.Suspense>
            ))
          ) : (
            <div className="w-full h-[70vh] bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Welcome to Majestic Audits</p>
            </div>
          )}
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-gray-100" />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-gray-100" />}>
          <BlogSection />
        </Suspense>
        <ConsultationForm />
      </main>
    )
  } catch (error) {
    console.error('Error rendering homepage:', error);
    // Return a minimal valid page structure
    return (
      <main>
        <div className="md:hidden">
          <MobileHeaderWrapper />
        </div>
        <div className="w-full h-[70vh] bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Welcome to Majestic Audits</p>
        </div>
        <Suspense fallback={<div className="h-96 bg-gray-100" />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-gray-100" />}>
          <BlogSection />
        </Suspense>
        <ConsultationForm />
      </main>
    )
  }
}

