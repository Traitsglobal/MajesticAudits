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
        return <AboutPageClient data={response.data} />
    } catch (error) {
        console.error('Error fetching about page:', error)
        return <div>Something went wrong loading the about page. Please try again later.</div>
    }
}

