"use client"

import React from "react"
import { Umbrella, Package, BarChart3, FileText, DollarSign, Briefcase } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useServices } from '@/hooks/useServices'

// Icon mapping for services
const serviceIcons: Record<string, React.ReactNode> = {
    'accounting-and-bookkeeping': <Umbrella size={32} />,
    'corporate-tax-related-services': <Package size={32} />,
    'management-consultancy-services': <BarChart3 size={32} />,
    'cfo-services': <FileText size={32} />,
    'corporate-finance-and-advisory-services': <DollarSign size={32} />,
    'business-setup-and-pro-services': <Briefcase size={32} />,
}

export default function ServicesSection() {
    const { services, isLoading, error } = useServices()

    // Loading state
    if (isLoading) {
        return (
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header skeleton with matching dimensions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <div className="h-6 bg-gray-200 w-32 mb-2"></div>
                            <div className="h-12 bg-gray-200 w-64"></div>
                        </div>
                        <div className="h-6 bg-gray-200 w-32 mt-4 md:mt-0"></div>
                    </div>

                    {/* Grid skeleton matching the service cards layout */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div 
                                key={i} 
                                className="animate-pulse bg-white p-3 md:p-6 rounded-xl border border-gray-200 h-[250px] flex flex-col"
                            >
                                {/* Icon placeholder */}
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 mb-3 md:mb-4"></div>
                                
                                {/* Title placeholder */}
                                <div className="h-7 bg-gray-200 w-3/4 mb-3"></div>
                                
                                {/* Content placeholder */}
                                <div className="space-y-2 flex-grow">
                                    <div className="h-4 bg-gray-200 w-full"></div>
                                    <div className="h-4 bg-gray-200 w-5/6"></div>
                                    <div className="h-4 bg-gray-200 w-4/6"></div>
                                </div>
                                
                                {/* Link placeholder */}
                                <div className="h-4 bg-gray-200 w-32 mt-auto"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500">Failed to load services</p>
            </div>
        )
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h3 className="text-gray-600 font-medium uppercase tracking-wider">OUR SERVICES</h3>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 text-[#003366]">What we bring to you</h2>
                    </div>
                    <Link href="/services" className="text-[#003366] hover:underline mt-4 md:mt-0">
                        View all services
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="flex flex-col h-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <motion.div
                                className="flex flex-col bg-white text-black p-3 md:p-6 rounded-xl h-full transition-all duration-300 ease-in-out border border-gray-200 overflow-hidden relative"
                                whileHover={{
                                    backgroundColor: "#003366",
                                    color: "#ffffff",
                                    scale: 1.05,
                                    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.1)",
                                    transition: {
                                        duration: 0.3,
                                        ease: "easeOut",
                                    },
                                }}
                            >
                                {/* Icon container with hide animation on hover */}
                                <motion.div
                                    className="mb-3 md:mb-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF6B35] flex items-center justify-center"
                                    initial={{ opacity: 1, y: 0 }}
                                    whileHover={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="scale-75 md:scale-100">
                                        {serviceIcons[service.slug] || <Briefcase size={32} />}
                                    </div>
                                </motion.div>

                                {/* Content container with text-up animation */}
                                <motion.div className="flex flex-col flex-grow" whileHover={{ y: -15, transition: { duration: 0.3 } }}>
                                    <motion.h3
                                        className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    >
                                        {service.title}
                                    </motion.h3>

                                    <motion.p
                                        className="text-sm md:text-base mb-3 md:mb-4 flex-grow line-clamp-3"
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    >
                                        {service.content[0]?.children[0]?.text}
                                    </motion.p>
                                </motion.div>

                                {/* Read more link that stays visible */}
                                <motion.div
                                    className="mt-auto"
                                    whileHover={{
                                        color: "#FF6B35",
                                        x: 5,
                                        transition: { duration: 0.2 },
                                    }}
                                >
                                    <Link 
                                        href={`/services/${service.slug}`} 
                                        className="text-xs md:text-sm font-medium hover:underline inline-block"
                                    >
                                        Read more about {service.title.toLowerCase()}
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

