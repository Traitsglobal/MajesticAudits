import MobileHeader from "@/components/layout/mobile-header"
import BlogBreadcrumb from "@/components/blog/blog-brudcrumb"
import BlogContent from "@/components/blog/blog-content"
import { getBlogPosts } from "@/lib/blog-utils"
import { generatePageMetadata } from "@/lib/metadata"
import ApiService from "@/services/api.services"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    try {
        // If you have blog metadata from API   
        const blogData = await ApiService.fetchBlogPageData();
        return generatePageMetadata('blog', {
            title: blogData.data.metadata.metaTitle,
            description: blogData.data.metadata.metaDescription,
            keywords: blogData.data.metadata.MetaKeywords,
        });
    } catch (error) {
        console.error('Error generating metadata:', error);
        return generatePageMetadata('blog');
    }
}

export default async function BlogPage() {
    const posts = await getBlogPosts()

    return (
        <div>
            <div className="relative w-full py-16 min-h-[120px] hidden md:block"
                style={{
                    backgroundImage: "url('/images/bg-header.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold text-white">
                            Blog
                        </h1>
                        <BlogBreadcrumb />
                    </div>
                </div>
            </div>

            <div className="md:hidden">
                <MobileHeader />
                <div className="h-16"></div>
            </div>

            <div className="md:hidden bg-white px-4 pb-4"></div>
            <BlogContent posts={posts} />
        </div>
    )
}

