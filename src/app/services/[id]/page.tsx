import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
// Update imports for service detail page
import MobileHeader from "@/components/layout/mobile-header"
import ServiceSidebar from "@/components/services/service-sidebar"
import ContactSupport from "@/components/services/contact-support"
import { ChevronLeft } from "lucide-react"
import ServicesOverviewContent from "@/components/services/service-overview-content"
import React from "react"
import ApiService from "@/services/api.services"
import { Service, ServiceContent } from "@/types/service"
import { ElementType } from 'react'
import { generatePageMetadata } from "@/lib/metadata"

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const resolvedParams = await params

        if (resolvedParams.id === "overview") {
            return generatePageMetadata('services');
        }

        const response = await ApiService.fetchServiceData()
        const service = response.data.find((s: Service) => s.slug === resolvedParams.id)

        if (!service) {
            return generatePageMetadata('services');
        }

        return generatePageMetadata('services', {
            title: `${service.title} | Majestic Audits - Dubai Trusted Financial Partners`,
            description: service.content[0].children[0].text,
            keywords: service.metaKeywords?.join(', '),
        });
    } catch (error) {
        console.error('Error generating metadata:', error)
        return generatePageMetadata('services');
    }
}

export async function generateStaticParams() {
    const response = await ApiService.fetchServiceData()
    const services = response.data
    return [...services.map((service: Service) => ({ id: service.id.toString() })), { id: "overview" }]
}

function RichText({ content }: { content: ServiceContent[] }) {
    return (
        <div className="rich-text-content">
            {content.map((block, index) => {
                switch (block.type) {
                    case 'paragraph':
                        return (
                            <div key={index} className="mb-4">
                                {block.children.map((child, childIndex) => {
                                    const textStyles = [];
                                    if (child.bold) textStyles.push('font-bold');
                                    if (child.italic) textStyles.push('italic');
                                    if (child.underline) textStyles.push('underline');

                                    return (
                                        <span
                                            key={childIndex}
                                            className={textStyles.join(' ')}
                                        >
                                            {child.text}
                                        </span>
                                    );
                                })}
                            </div>
                        );
                    case 'heading':
                        const HeadingTag = `h${block.level}` as ElementType;
                        return (
                            <HeadingTag
                                key={index}
                                className="text-xl md:text-2xl font-bold text-[#003366] mb-4"
                            >
                                {block.children.map((child, childIndex) => (
                                    <span key={childIndex}>{child.text}</span>
                                ))}
                            </HeadingTag>
                        );
                    case 'list':
                        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
                        const listStyles = block.format === 'ordered'
                            ? 'list-decimal ml-6 mb-4 space-y-2'
                            : 'list-disc ml-6 mb-4 space-y-2';

                        return (
                            <ListTag key={index} className={listStyles}>
                                {block.children.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        {item.children?.map((child, childIndex) => {
                                            const textStyles = [];
                                            if (child.bold) textStyles.push('font-bold');
                                            if (child.italic) textStyles.push('italic');
                                            if (child.underline) textStyles.push('underline');

                                            return (
                                                <span
                                                    key={childIndex}
                                                    className={textStyles.join(' ')}
                                                >
                                                    {child.text}
                                                </span>
                                            );
                                        })}
                                    </li>
                                ))}
                            </ListTag>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}

export default async function ServicePage({ params }: Props) {
    const resolvedParams = await params

    if (resolvedParams.id === "overview") {
        return (
            <main>
                <div className="md:hidden">
                    <MobileHeader />
                </div>
                <ServicesOverviewContent />
            </main>
        )
    }

    const response = await ApiService.fetchServiceData()
    const service = response.data.find((s: Service) => s.slug.toString() === resolvedParams.id);

    if (!service) {
        notFound()
    }

    return (
        <main>
            <div className="md:hidden">
                <MobileHeader />
            </div>

            {/* Desktop Hero Section */}
            <div className="relative w-full py-16 min-h-[120px] hidden md:block"
                style={{
                    backgroundImage: "url('/images/bg-header.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-white max-w-[500px] leading-tight line-clamp-2">{service.title}</h1>

                        <div className="flex items-center text-sm text-white/80">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <span className="mx-2">›</span>
                            <Link href="/services/overview" className="hover:text-white">Services</Link>
                            <span className="mx-2">›</span>
                            <span className="text-white">{service.title}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="hidden md:block md:w-1/4">
                            <ServiceSidebar activeId={resolvedParams.id} />
                        </div>

                        <div className="w-full md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                                <div className="flex items-center mb-6 md:hidden">
                                    <Link href="/services/overview" className="mr-3">
                                        <ChevronLeft size={24} className="text-primary" />
                                    </Link>
                                    <h1 className="text-2xl font-bold text-primary">{service.title}</h1>
                                </div>

                                <RichText content={service.content} />

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary mt-8">
                                    <p className="text-gray-700">
                                        With our {service.title}, you get a strategic partner to help you navigate complex challenges,
                                        optimize your operations, and achieve your business objectives with confidence and precision.
                                    </p>
                                </div>

                                <div className="mt-10 text-center">
                                    <Link
                                        href="/contact"
                                        className="inline-block bg-[#FF6B35] text-white font-bold py-3 px-8 rounded-md hover:bg-[#e55a24] transition-colors"
                                    >
                                        Request a Consultation
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="md:hidden px-4 py-8 bg-gray-100">
                <ContactSupport />
            </div>
        </main>
    )
}

