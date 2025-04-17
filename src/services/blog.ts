import ApiService from './api.services';
import { BlogPost } from '@/types/blog';

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await ApiService.fetchBlogData();
    return response.data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const response = await ApiService.fetchBlogPost(id);
    return response.data || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
} 