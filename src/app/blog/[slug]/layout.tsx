import { generatePageMetadata } from "@/lib/metadata"
import { Metadata } from "next"
import ApiService from "@/services/api.services"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const response = await ApiService.fetchBlogPost(params.slug);
        const post = response.data;
        
        return generatePageMetadata('blog', {
            title: `${post.title} | Majestic Audits`,
            description: post.content?.[0]?.children?.[0]?.text || '',
            keywords: post.tags,
            author: post.author
        });
    } catch (error) {
        console.error('Error generating metadata:', error);
        return generatePageMetadata('blog');
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 