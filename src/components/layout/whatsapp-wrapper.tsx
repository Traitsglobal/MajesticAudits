'use client'

import dynamic from 'next/dynamic'

const WhatsAppButton = dynamic(() => import("@/components/common/whatsapp-button"), {
  ssr: false,
  loading: () => <div className="hidden md:block fixed bottom-4 right-4 w-14 h-14" />
})

export default function WhatsAppWrapper() {
  return <WhatsAppButton />
} 