'use client';

import React from 'react';
import { Blocks } from '@/types/block';
import { blockRenderer } from '@/lib/block-renderer';
import { useHomepageData } from '@/hooks/useHomepageData';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const Footer = dynamic(() => import("@/components/layout/footer"), { 
  loading: () => <div className="animate-pulse bg-gray-100 h-40" /> 
});

interface LayoutContentProps {
  children: React.ReactNode;
}

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Header Skeleton */}
      <div className="md:block hidden">
        {/* Topbar Skeleton */}
        <div className="w-full bg-[#003366] p-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center">
              <Skeleton className="h-10 w-[120px]" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Header Skeleton */}
        <div className="w-full bg-white shadow-md p-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center">
              <Skeleton className="h-12 w-[150px]" />
              <div className="flex gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-8 w-24" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header Skeleton */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#003366] z-40">
        <div className="flex justify-between items-center p-4">
          <Skeleton className="h-10 w-[60px]" />
          <Skeleton className="h-6 w-6" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="w-full bg-white pt-[60px] md:pt-0">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-20">
            {/* Hero Content */}
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-4/6" />
              </div>
              <div className="flex gap-4 pt-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
            {/* Hero Image */}
            <div className="hidden md:block">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-grow container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-16">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-[#003366] text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32 bg-gray-200/20" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-4 w-24 bg-gray-200/20" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LayoutContent({ children }: LayoutContentProps) {
  const { blocks, isLoading, error } = useHomepageData();

  const layoutBlocks = blocks.filter(
    (block: Blocks) => block.__component === 'layout.topbar' || block.__component === 'layout.header'
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>Error loading page data</div>;
  }

  return (
    <>
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
    </>
  );
} 