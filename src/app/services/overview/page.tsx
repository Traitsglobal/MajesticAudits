import type { Metadata } from "next"
import MobileHeader from "@/components/layout/mobile-header"
import ServicesOverviewContent from "@/components/services/service-overview-content"

export const metadata: Metadata = {
    title: "Our Services | Majestic - CFO Services",
    description:
        "Explore our comprehensive range of financial services including CFO services, accounting, tax advisory, business setup, and management consultancy.",
    keywords:
        "CFO services, accounting, tax advisory, VAT services, business setup, management consultancy, corporate finance, Dubai, UAE",
    openGraph: {
        title: "Our Services | Majestic - CFO Services",
        description:
            "Explore our comprehensive range of financial services including CFO services, accounting, tax advisory, business setup, and management consultancy.",
        // images: [
        //     {
        //         url: "/images/services-og.jpg",
        //         width: 1200,
        //         height: 630,
        //         alt: "Majestic Services",
        //     },
        // ],
    },
}

export default function ServicesOverviewPage() {
    return (
        <main>
            <div className="md:hidden">
                <MobileHeader />
            </div>
            <ServicesOverviewContent />
        </main>
    )
}

