"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useServices } from "@/hooks/useServices"
import { Loader2 } from "lucide-react"

export default function ServicesOverviewContent() {
    const { services, isLoading, error } = useServices();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-[#003366]" />
            </div>
        )
    }

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
                {/* <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">Our Services</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Comprehensive financial solutions tailored to your business needs
                    </p>
                </div> */}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/services/${service.slug}`}>
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h2 className="text-xl font-bold text-[#003366] mb-3">
                                        {service.title}
                                    </h2>
                                    <p className="text-gray-600 line-clamp-3">
                                        {service.content[0]?.children[0]?.text}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

