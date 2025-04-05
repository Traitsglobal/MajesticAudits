import ContactPageClient from "./ContactPageClient"
import { generatePageMetadata } from "@/lib/metadata"
import Link from "next/link"
import { Metadata } from "next"
import ApiService from "@/services/api.services"
import { ContactPageData } from "@/types/contact"

export async function generateMetadata(): Promise<Metadata> {
    try {
        const contactData = await ApiService.fetchContactusPageData() as ContactPageData;
        return generatePageMetadata('contact', {
            title: contactData.data.metadata.metaTitle,
            description: contactData.data.metadata.metaDescription,
            keywords: contactData.data.metadata.MetaKeywords,
        });
    } catch (error) {
        console.error('Error generating metadata:', error);
        return generatePageMetadata('contact');
    }
}

export default async function ContactPage() {
    try {
        const contactData = await ApiService.fetchContactusPageData() as ContactPageData;
        
        // Validate that we have the required data
        if (!contactData?.data?.contactdetails) {
            console.error('Contact details not found in the response');
            return (
                <main>
                    <div className="container mx-auto px-4 py-12 max-w-6xl">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Contact Information</h1>
                            <p className="text-gray-600">We&apos;re sorry, but we couldn&apos;t load the contact information. Please try again later.</p>
                        </div>
                    </div>
                </main>
            );
        }

        return (
            <main>
                {/* Desktop Hero Section */}
                <div className="relative w-full py-16 min-h-[120px] hidden md:block"
                    style={{
                        backgroundImage: "url('/images/bg-header.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="container mx-auto px-4 max-w-6xl relative z-10">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-white">
                                Contact Us
                            </h1>
                            <div className="flex items-center text-sm text-white/80">
                                <Link href="/" className="hover:text-white">Home</Link>
                                <span className="mx-2">›</span>
                                <span className="text-white">Contact</span>
                            </div>
                        </div>
                    </div>
                </div>

                <ContactPageClient contactData={contactData.data} />
            </main>
        )
    } catch (error) {
        console.error('Error loading contact page:', error);
        return (
            <main>
                <div className="container mx-auto px-4 py-12 max-w-6xl">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Contact Information</h1>
                        <p className="text-gray-600">We&apos;re sorry, but we couldn&apos;t load the contact information. Please try again later.</p>
                    </div>
                </div>
            </main>
        );
    }
}

