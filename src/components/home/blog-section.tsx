"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getStrapiMedia } from "@/lib/utils"
import { BlogPost } from '@/types/blog'
import { useBlogData } from '@/hooks/useBlogData'

const getCategoryCounts = (posts: BlogPost[]) => {
    const counts: Record<string, number> = {}
    posts.forEach((post) => {
        const category = post.categories
        if (category) {
            counts[category] = (counts[category] || 0) + 1
        }
    })
    return counts
}

export default function BlogSection() {
    const { posts, isLoading } = useBlogData()
    const [currentIndex, setCurrentIndex] = useState(0)

    const visiblePosts = 3
    const totalSlides = Math.max(1, Math.ceil((posts?.length || 0) / visiblePosts))
    const categoryCounts = getCategoryCounts(posts)

    const getCurrentPosts = () => {
        if (!posts?.length) return []

        const startIndex = currentIndex * visiblePosts
        const endIndex = startIndex + visiblePosts
        const currentPosts = posts.slice(startIndex, Math.min(endIndex, posts.length))

        return currentPosts
    }

    const nextSlide = useCallback(() => {
        if (!posts?.length) return

        if (window.innerWidth >= 768) {
            setCurrentIndex((prevIndex) => {
                const lastIndex = Math.ceil(posts.length / visiblePosts) - 1
                return prevIndex >= lastIndex ? 0 : prevIndex + 1
            })
        } else {
            setCurrentIndex((prevIndex) =>
                prevIndex >= posts.length - 1 ? 0 : prevIndex + 1
            )
        }
    }, [posts, visiblePosts])

    const prevSlide = useCallback(() => {
        if (!posts?.length) return

        if (window.innerWidth >= 768) {
            setCurrentIndex((prevIndex) => {
                const lastIndex = Math.ceil(posts.length / visiblePosts) - 1
                return prevIndex <= 0 ? lastIndex : prevIndex - 1
            })
        } else {
            setCurrentIndex((prevIndex) =>
                prevIndex <= 0 ? posts.length - 1 : prevIndex - 1
            )
        }
    }, [posts, visiblePosts])


    useEffect(() => { setCurrentIndex(0) }, [posts])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    // Loading skeleton
    if (isLoading) {
        return (
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header skeleton with matching dimensions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <div className="h-6 bg-gray-200 w-24 mb-2"></div>
                            <div className="h-12 bg-gray-200 w-64"></div>
                        </div>
                        <div className="h-6 bg-gray-200 w-28 mt-4 md:mt-0"></div>
                    </div>

                    {/* Category Stats skeleton - Desktop Only */}
                    <div className="hidden md:flex flex-wrap gap-4 mb-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-100 px-4 py-2 rounded-full w-32 h-8"></div>
                        ))}
                    </div>

                    {/* Blog posts grid skeleton */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex flex-col h-[400px] border border-gray-200 rounded-xl overflow-hidden"
                            >
                                {/* Image placeholder */}
                                <div className="relative h-52 w-full bg-gray-200"></div>

                                <div className="p-4 flex flex-col flex-grow animate-pulse">
                                    {/* Date and category placeholder */}
                                    <div className="flex gap-2 mb-2">
                                        <div className="h-5 bg-gray-200 w-24"></div>
                                        <div className="h-5 bg-gray-200 w-32"></div>
                                    </div>

                                    {/* Title placeholder */}
                                    <div className="h-12 bg-gray-200 w-full mb-2"></div>

                                    {/* Content placeholder */}
                                    <div className="space-y-2 flex-grow">
                                        <div className="h-4 bg-gray-200 w-full"></div>
                                        <div className="h-4 bg-gray-200 w-5/6"></div>
                                        <div className="h-4 bg-gray-200 w-4/6"></div>
                                    </div>

                                    {/* Read more link placeholder */}
                                    <div className="h-5 bg-gray-200 w-24 mt-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation dots skeleton */}
                    <div className="flex justify-center mt-8 gap-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-gray-200"></div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h3 className="text-gray-600 font-medium uppercase tracking-wider">OUR BLOG</h3>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 text-black">Our latest news</h2>
                    </div>
                    <Link
                        href="/blog"
                        className="text-[#003366] hover:underline mt-4 md:mt-0"
                        aria-label="View all blog posts"
                    >
                        View all posts
                    </Link>
                </div>

                {/* Category Stats - Desktop Only */}
                <div className="hidden md:flex flex-wrap gap-4 mb-8">
                    <div className="bg-gray-100 px-4 py-2 rounded-full">
                        <span className="font-medium">All</span>
                        <span className="ml-2 bg-[#003366] text-white text-xs px-2 py-1 rounded-full">
                            {posts.length}
                        </span>
                    </div>
                    {Object.entries(categoryCounts).map(([category, count]) => (
                        <div key={category} className="bg-gray-100 px-4 py-2 rounded-full">
                            <span className="font-medium">{category}</span>
                            <span className="ml-2 bg-[#003366] text-white text-xs px-2 py-1 rounded-full">
                                {count}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Desktop View */}
                <div className="relative mt-8 hidden md:block">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {getCurrentPosts().map((post) => (
                            <div
                                key={post.id}
                                className="flex flex-col h-[400px] border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="relative h-52 w-full">
                                    <Image
                                        src={getStrapiMedia(post.Image?.url) || "/images/placeholder.jpg"}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="mb-2 text-sm text-gray-500">
                                        {formatDate(post.date)} |{" "}
                                        <Link
                                            href={{
                                                pathname: '/blog/category/[category]',
                                                query: { category: post.categories }
                                            }}
                                            className="text-[#003366] font-medium border-b border-[#003366] px-2 py-0.5 rounded-sm"
                                            prefetch={false}
                                            aria-label={`View all posts in category: ${post.categories}`}
                                        >
                                            {post.categories}
                                        </Link>

                                    </div>

                                    <h3 className="text-lg font-bold mb-2 hover:text-[#003366] transition-colors line-clamp-2">
                                        <Link
                                            href={`/blog/${post.documentId}`}
                                            aria-label={`Read full article: ${post.title}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-gray-600 mb-3 flex-grow text-sm line-clamp-3">
                                        {post.content[0]?.children[0]?.text || ''}
                                    </p>

                                    <Link
                                        href={`/blog/${post.documentId}`}
                                        className="text-[#003366] font-medium hover:underline mt-auto inline-block text-sm"
                                        aria-label={`Read full article: ${post.title}`}
                                    >
                                        Read more about {post.title}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white text-[#003366] rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white text-[#003366] rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Slide Indicators */}
                    <div className="flex justify-center mt-8">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 mx-1 rounded-full transition-all ${currentIndex === index ? "bg-[#003366] w-6" : "bg-gray-300"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile View */}
                <div className="relative mt-8 md:hidden">
                    <div className="overflow-hidden">
                        <div
                            className="flex flex-nowrap"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                                transition: 'transform 0.3s ease-out'
                            }}
                        >
                            {posts.map((post) => (
                                <div key={post.id} className="w-full flex-shrink-0 px-1">
                                    <div className="flex flex-col h-full border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="relative h-40 w-full">
                                            <Image
                                                src={getStrapiMedia(post.Image?.url) || "/images/placeholder.jpg"}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <div className="mb-2 text-xs text-gray-500">
                                                {formatDate(post.date)} |{" "}
                                                <Link
                                                    href={{
                                                        pathname: '/blog/category/[category]',
                                                        query: { category: post.categories }
                                                    }}
                                                    className="text-[#003366] font-medium border-b border-[#003366] px-2 py-0.5 rounded-sm"
                                                    prefetch={false}
                                                    aria-label={`View all posts in category: ${post.categories}`}
                                                >
                                                    {post.categories}
                                                </Link>
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 line-clamp-2">
                                                <Link
                                                    href={`/blog/${post.documentId}`}
                                                    aria-label={`Read full article: ${post.title}`}
                                                >
                                                    {post.title}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                                                {post.content[0]?.children[0]?.text || ''}
                                            </p>
                                            <Link
                                                href={`/blog/${post.documentId}`}
                                                className="text-[#003366] text-sm font-medium hover:underline mt-auto inline-block"
                                                aria-label={`Read full article: ${post.title}`}
                                            >
                                                Read more about {post.title}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Navigation Dots */}
                    <div className="flex justify-center mt-4">
                        {posts.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 mx-1 rounded-full transition-all ${currentIndex === index ? "bg-[#003366] w-6" : "bg-gray-300"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

