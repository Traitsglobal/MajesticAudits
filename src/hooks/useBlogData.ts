"use client"

import { useState, useEffect } from 'react'
import ApiService from '@/services/api.services'
import { BlogResponse, BlogPost } from '@/types/blog'

export function useBlogData(limit?: number) {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setIsLoading(true)
                const response: BlogResponse = await ApiService.fetchBlogData()
                const allPosts = response.data || []
                
                // If limit is provided, slice the array
                const limitedPosts = limit ? allPosts.slice(0, limit) : allPosts
                setPosts(limitedPosts)
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch blog data'))
            } finally {
                setIsLoading(false)
            }
        }

        fetchBlogData()
    }, [limit])

    return { posts, isLoading, error }
} 