import { generatePageMetadata } from "@/lib/metadata"
import { Metadata } from "next"
import ApiService from "@/services/api.services"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const resolvedParams = await params;
        const response = await ApiService.fetchBlogPost(resolvedParams.slug);
        const post = response.data;

        return generatePageMetadata('blog', {
            title: `${post.title} | Majestic Audits`,
            description: post.content?.[0]?.children?.[0]?.text || '',
            keywords: post.tags,
            author: post.author
        });
    } catch {
        return generatePageMetadata('blog');
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children
} 