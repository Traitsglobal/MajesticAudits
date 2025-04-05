import ApiService from '@/services/api.services'
import { BlogResponse, BlogPost } from '@/types/blog'

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
    try {
        const response: BlogResponse = await ApiService.fetchBlogData()
        const allPosts = response.data || []
        return limit ? allPosts.slice(0, limit) : allPosts
    } catch (error) {
        console.error('Error fetching blog posts:', error)
        return []
    }
} 