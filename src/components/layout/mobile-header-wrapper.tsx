'use client'

import dynamic from 'next/dynamic'

const MobileHeader = dynamic(() => import("@/components/layout/mobile-header"), {
  loading: () => <div className="animate-pulse bg-gray-100 h-16 md:hidden" />,
  ssr: false
})

export default function MobileHeaderWrapper() {
  return <MobileHeader />
} 