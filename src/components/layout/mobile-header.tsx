"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { getStrapiMedia } from "@/lib/utils"
import { useHomepageData } from "@/hooks/useHomepageData"
import type { Image as StrapiImage } from "@/types/block"
import { Skeleton } from "@/components/ui/skeleton"

export default function MobileHeader() {
    const [mounted, setMounted] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname()
    const { getHeaderLogo } = useHomepageData()
    const logo = getHeaderLogo() as StrapiImage | null

    useEffect(() => { setMounted(true) }, [])

    if (!mounted) {
        return null
    }

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === path
        }
        return pathname.startsWith(path)
    }

    const logoUrl = logo?.url ? getStrapiMedia(logo.url) || '/images/placeholder.jpg' : '/images/placeholder.jpg'

    return (
        <div className="md:hidden">
            {/* Header with menu button */}
            <header className="fixed top-0 left-0 right-0 bg-[#003366] text-white py-2 px-4 z-40 flex justify-between items-center">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center">
                    {!mounted ? (
                        <Skeleton className="h-10 w-[60px] rounded-sm bg-gray-200/20" />
                    ) : (
                        <Image
                            src={logoUrl}
                            alt={"Majestic Audits logo"}
                            width={60}
                            height={40}
                            className="rounded-sm object-contain object-center"
                            quality={100}
                            priority
                        />
                    )}
                </Link>

                {/* Right: Hamburger Menu */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="focus:outline-none"
                    aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                >
                    <Menu size={24} className="text-white" />
                </button>
            </header>

            {/* Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-0 left-0 bottom-0 w-[75%] max-w-[360px] bg-[#003366] text-white z-50 flex flex-col"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-blue-800">
                            <Link href="/" className="flex items-center" onClick={() => setIsSidebarOpen(false)}>
                                {!mounted ? (
                                    <Skeleton className="h-10 w-[60px] rounded-sm bg-gray-200/20" />
                                ) : (
                                    <Image
                                        src={logoUrl}
                                        alt={"Majestic Financial Audits"}
                                        width={60}
                                        height={40}
                                        className="rounded-sm object-contain object-center"
                                        quality={100}
                                        priority
                                    />
                                )}
                            </Link>
                            <motion.button
                                onClick={() => setIsSidebarOpen(false)}
                                className="focus:outline-none p-2 rounded-full hover:bg-[#002147]"
                                aria-label="Close menu"
                                whileTap={{ scale: 0.9 }}
                            >
                                <motion.div
                                    initial={{ rotate: -90 }}
                                    animate={{ rotate: 0 }}
                                    whileHover={{ rotate: 180, transition: { duration: 0.4 } }}
                                    transition={{ duration: 0.3, type: "spring" }}
                                >
                                    <X size={24} />
                                </motion.div>
                            </motion.button>
                        </div>

                        <nav className="flex flex-col p-2 overflow-y-auto flex-1">
                            <Link
                                href="/"
                                className={`py-3 px-4 hover:bg-[#002147] rounded-md flex items-center ${isActive("/") ? "bg-[#002147]" : ""}`}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                HOME
                            </Link>
                            <Link
                                href="/about"
                                className={`py-3 px-4 hover:bg-[#002147] rounded-md flex items-center ${isActive("/about") ? "bg-[#002147]" : ""}`}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                ABOUT
                            </Link>

                            <div>
                                <div className="flex items-center justify-between w-full py-3 px-4 hover:bg-[#002147] rounded-md">
                                    <Link
                                        href="/services/overview"
                                        className={`flex-grow ${isActive("/services") ? "text-blue-300" : ""}`}
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        SERVICES
                                    </Link>
                                </div>
                            </div>

                            <Link
                                href="/blog"
                                className={`py-3 px-4 hover:bg-[#002147] rounded-md flex items-center ${isActive("/blog") ? "bg-[#002147]" : ""}`}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                BLOG
                            </Link>
                            <Link
                                href="/contact"
                                className={`py-3 px-4 hover:bg-[#002147] rounded-md flex items-center ${isActive("/contact") ? "bg-[#002147]" : ""}`}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                CONTACT
                            </Link>
                        </nav>

                        <div className="p-4 border-t border-blue-800 text-sm text-center text-blue-300">
                            © 2025 Majestic Financial Audits
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

