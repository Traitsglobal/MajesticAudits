"use client"

import Link from "next/link"
import { useServices } from "@/hooks/useServices"
import { Skeleton } from "@/components/ui/skeleton"

export default function ServiceSidebar({ activeId }: { activeId: string }) {
    const { services, isLoading, error } = useServices()

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-[#003366] mb-4 pb-2 border-b-2 border-[#003366]/20 relative">
                    Our Services
                    <span className="absolute bottom-[-2px] left-0 w-1/3 h-[2px] bg-[#003366]"></span>
                </h2>
                <nav>
                    <ul className="space-y-2">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <li key={index}>
                                <Skeleton className="h-10 w-full rounded" />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        )
    }

    if (error) return null

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-[#003366] mb-4 pb-2 border-b-2 border-[#003366]/20 relative">
                Our Services
                <span className="absolute bottom-[-2px] left-0 w-1/3 h-[2px] bg-[#003366]"></span>
            </h2>
            <nav>
                <ul className="space-y-2">
                    {services.map((service) => (
                        <li key={service.id}>
                            <Link
                                href={`/services/${service.slug}`}
                                className={`block py-2 px-3 rounded transition-colors ${
                                    activeId === service.slug
                                        ? "bg-[#003366] text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {service.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

