"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { useServices } from "@/hooks/useServices"
import { HeaderBlock } from "@/types/block"
import { getStrapiMedia } from "@/lib/utils"
import { useState, useEffect } from "react"

export default function MainNavigation({ name, logo }: HeaderBlock) {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { services, isLoading } = useServices()

    useEffect(() => {
        setMounted(true)
    }, [])

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === path
        }
        return pathname.startsWith(path)
    }

    // Don't render services dropdown until data is loaded
    const renderServicesDropdown = () => {
        if (isLoading) {
            return (
                <div className="relative group">
                    <div className="flex items-center text-white font-medium">
                        SERVICES
                        <ChevronDown
                            size={16}
                            className="ml-1"
                        />
                    </div>
                </div>
            )
        }

        return (
            <div className="relative group">
                <Link
                    href={`/services/${services[0]?.slug}`}
                    className={`flex items-center hover:text-[#f26522] font-medium group-hover:text-[#f26522] ${isActive("/services") ? "text-[#f26522]" : ""}`}
                    aria-label="View our services"
                    aria-expanded="false"
                    aria-haspopup="true"
                >
                    SERVICES
                    <ChevronDown
                        size={16}
                        className="ml-1 transform transition-transform duration-200 group-hover:rotate-180"
                        aria-hidden="true"
                    />
                </Link>
                <div
                    className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 -translate-y-1 transition-all duration-200 bg-white min-w-[240px] shadow-lg z-50 mt-2 rounded-md border border-gray-100"
                    role="menu"
                >
                    <div className="py-2">
                        {services.map((service) => (
                            <Link
                                key={service?.id}
                                href={`/services/${service?.slug}`}
                                className="block px-5 py-3 hover:bg-gray-50 text-gray-700 hover:text-[#003366] transition-all duration-150 text-sm font-medium border-b border-gray-50 last:border-0 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#003366] before:transform before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-200 before:origin-top"
                                aria-label={`Learn more about our ${service?.title} service`}
                                role="menuitem"
                            >
                                <span className="inline-block transform transition-transform duration-150 hover:scale-[1.02]">
                                    {service?.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // If not mounted, render a placeholder to avoid hydration issues
    if (!mounted) {
        return (
            <div className="w-full bg-[#003366]">
                <nav className="container mx-auto text-white py-8 px-4">
                    <div className="flex justify-between items-center">
                        <div className="w-20 h-20 bg-gray-300 rounded-sm"></div>
                        <div className="hidden md:flex space-x-8">
                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }

    return (
        <div className="w-full bg-[#003366]">
            <nav className="container mx-auto text-white py-8 px-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center" aria-label={`${name} - Return to Homepage`}>
                        {logo ? (
                            <Image 
                                src={getStrapiMedia(logo?.url) || '/images/placeholder.png'}
                                alt={logo.alternativeText || name}
                                width={80}
                                height={80}
                                className="rounded-sm object-contain object-center"
                                quality={100}
                                priority
                            />
                        ) : (
                            <div className="text-4xl font-bold">
                                <span className="text-white">{name.charAt(0)}</span>
                            </div>
                        )}
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className={`hover:text-[#f26522] font-medium ${isActive("/") ? "text-[#f26522]" : ""}`}
                            aria-label="Return to Homepage"
                        >
                            HOME
                        </Link>
                        <Link
                            href="/about"
                            className={`hover:text-[#f26522] font-medium ${isActive("/about") ? "text-[#f26522]" : ""}`}
                            aria-label="Learn more about us"
                        >
                            ABOUT
                        </Link>
                        {renderServicesDropdown()}
                        <Link
                            href="/blog"
                            className={`hover:text-[#f26522] font-medium ${isActive("/blog") ? "text-[#f26522]" : ""}`}
                            aria-label="Read our blog"
                        >
                            BLOG
                        </Link>
                        <Link
                            href="/contact"
                            className={`hover:text-[#f26522] font-medium ${isActive("/contact") ? "text-[#f26522]" : ""}`}
                            aria-label="Contact us"
                        >
                            CONTACT
                        </Link>
                    </div>

                    <button
                        className="md:hidden"
                        aria-label="Toggle mobile menu"
                        aria-expanded="false"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
    )
}

