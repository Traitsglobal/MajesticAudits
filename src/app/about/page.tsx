import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"
import ApiService from "@/services/api.services"
import type { AboutPageData } from "@/types/about"
import { generatePageMetadata } from "@/lib/metadata"

const getAboutPageData = async () => ApiService.fetchAboutPageData() as Promise<AboutPageData>

export async function generateStaticParams() {
    try {
        await getAboutPageData()
        return []
    } catch (error) {
        console.error('Error pre-generating about page:', error)
        return []
    }
}

export async function generateMetadata(): Promise<Metadata> {
    try {
        const response = await getAboutPageData();
        const { metadata } = response.data;
        
        return generatePageMetadata('about', {
            title: metadata.metaTitle,
            description: metadata.metaDescription,
            keywords: metadata.MetaKeywords,
            author: metadata.MetaAuthor,
        });
    } catch (error) {
        console.error('Error generating metadata:', error);
        return generatePageMetadata('about');
    }
}

export default async function AboutPage() {
    try {
        const response = await getAboutPageData();
        
        // Validate that we have the required data
        if (!response?.data?.blocks) {
            console.error('Blocks data not found in the response');
            return (
                <main className="bg-white">
                    <div className="container mx-auto px-4 py-12 max-w-6xl">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading About Page</h1>
                            <p className="text-gray-600">We&apos;re sorry, but we couldn&apos;t load the about page content. Please try again later.</p>
                        </div>
                    </div>
                </main>
            );
        }

        return <AboutPageClient data={response.data} />
    } catch (error) {
        console.error('Error fetching about page:', error)
        return (
            <main className="bg-white">
                <div className="container mx-auto px-4 py-12 max-w-6xl">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading About Page</h1>
                        <p className="text-gray-600">We&apos;re sorry, but we couldn&apos;t load the about page content. Please try again later.</p>
                    </div>
                </div>
            </main>
        );
    }
}

