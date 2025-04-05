"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { getStrapiMedia } from "@/lib/utils"
import { BlogPost } from '@/types/blog'
import BlogSidebar from "@/components/blog/blog-sidebar"
import Pagination from "@/components/blog/pagination"
import { Skeleton } from "@/components/ui/skeleton"

interface BlogContentProps {
    posts: BlogPost[];
}

// Add this type for search results
interface SearchResult {
    id: number;
    title: string;
    text: string;
    documentId: string;
}

export default function BlogContent({ posts }: BlogContentProps) {
    // State management
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [selectedTag, setSelectedTag] = useState<string>("")
    const [showResults, setShowResults] = useState(false)
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const searchRef = useRef<HTMLDivElement>(null)

    // Filtering logic
    const filteredPosts = posts.filter(post => {
        const matchesSearch = !searchQuery || (
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content[0]?.children[0]?.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.categories.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.toLowerCase().includes(searchQuery.toLowerCase())
        )

        const matchesCategory = !selectedCategory || post.categories === selectedCategory
        const matchesTag = !selectedTag || post.tags.split(',').map(tag => tag.trim()).includes(selectedTag)

        return matchesSearch && matchesCategory && matchesTag
    })

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Update handleSearch
    const handleSearch = (query: string) => {
        setSearchQuery(query)
        setIsSearching(true)

        if (query.length > 0) {
            const results = posts
                .filter(post => 
                    post.title.toLowerCase().includes(query.toLowerCase()) ||
                    post.content[0]?.children[0]?.text?.toLowerCase().includes(query.toLowerCase())
                )
                .map(post => ({
                    id: post.id,
                    title: post.title,
                    text: post.content[0]?.children[0]?.text || '',
                    documentId: post.documentId
                }))
                .slice(0, 5) // Limit to 5 results

            setSearchResults(results)
            setShowResults(true)
        } else {
            setSearchResults([])
            setShowResults(false)
        }

        setTimeout(() => setIsSearching(false), 300)
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        // setCurrentPage(1)
        // scrollToTop()
    }

    const handleTagChange = (tag: string) => {
        setSelectedTag(tag)
        // setCurrentPage(1)
        // scrollToTop()
    }

    // const scrollToTop = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //         left: 0
    //     })
    // }

    // Pagination
    const postsPerPage = 3
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
    const displayPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    )

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategory, selectedTag])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const BlogCardSkeleton = () => (
        <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8 flex flex-col">
            <div className="relative h-64 w-full">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Skeleton className="h-4 w-24" />
                    <span className="mx-2">|</span>
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    )

    return (
        <div className="bg-gray-100 py-6 md:py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {filteredPosts.length === 0 && !isSearching ? (
                    <div className="bg-white rounded-lg p-8 text-center shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-[#003366]">No posts found</h2>
                        <p className="text-gray-700 mb-4">
                            {selectedCategory && selectedTag
                                ? `There are currently no blog posts in the ${selectedCategory} category with the ${selectedTag} tag.`
                                : selectedCategory
                                    ? `There are currently no blog posts in the ${selectedCategory} category.`
                                    : selectedTag
                                        ? `There are currently no blog posts with the ${selectedTag} tag.`
                                        : "There are currently no blog posts available."}
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory("")
                                setSelectedTag("")
                                setSearchQuery("")
                            }}
                            className="text-[#003366] font-medium hover:underline"
                        >
                            View all posts
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Main Content */}
                        <div className="w-full md:w-2/3 md:pr-4">
                            {/* Desktop View */}
                            <div className="hidden md:block">
                                {isSearching ? (
                                    // Show skeletons while searching
                                    Array(3).fill(0).map((_, index) => (
                                        <BlogCardSkeleton key={index} />
                                    ))
                                ) : (
                                    // Show actual posts
                                    displayPosts.map((post) => (
                                        <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md mb-8 flex flex-col">
                                            <div className="relative h-64 w-full">
                                                <Image
                                                    src={getStrapiMedia(post.Image?.url) || "/images/placeholder.jpg"}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                                    <span>{formatDate(post.date)}</span>
                                                    <span className="mx-2">|</span>
                                                    <button
                                                        onClick={() => handleCategoryChange(post.categories)}
                                                        className="text-[#003366] hover:underline"
                                                    >
                                                        {post.categories}
                                                    </button>
                                                </div>
                                                <h2 className="text-2xl font-bold mb-4 text-[#003366] hover:text-[#002147] transition-colors">
                                                    <Link href={`/blog/${post.documentId}`} scroll={false}>
                                                        {post.title}
                                                    </Link>
                                                </h2>
                                                <p className="text-gray-700 mb-4">
                                                    {post.content[0]?.children[0]?.text || ''}
                                                </p>

                                                {/* Tags */}
                                                {post.tags && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {post.tags.split(',').map((tag) => (
                                                            <button
                                                                key={tag}
                                                                onClick={() => handleTagChange(tag.trim())}
                                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs hover:bg-[#003366] hover:text-white transition-colors"
                                                            >
                                                                {tag.trim()}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex justify-between items-center">
                                                    <Link
                                                        href={`/blog/${post.documentId}`}
                                                        className="inline-flex items-center text-[#003366] font-medium hover:text-[#002147] transition-colors group"
                                                    >
                                                        Read more
                                                        <svg
                                                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 5l7 7-7 7"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Mobile View */}
                            <div className="md:hidden">
                                {/* Mobile Search */}
                                <div className="mb-6" ref={searchRef}>
                                    <div className="relative">
                                        <input
                                            type="search"
                                            placeholder="Search news..."
                                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003366] pl-10 shadow-sm"
                                            onChange={(e) => handleSearch(e.target.value)}
                                            value={searchQuery}
                                            onFocus={() => setShowResults(true)}
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg 
                                                className="w-5 h-5 text-gray-400" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                                />
                                            </svg>
                                        </div>

                                        {/* Search Results */}
                                        {showResults && searchResults.length > 0 && (
                                            <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                                {searchResults.map((result) => (
                                                    <Link
                                                        key={result.id}
                                                        href={`/blog/${result.documentId}`}
                                                        className="block px-4 py-3 hover:bg-gray-50 border-b last:border-0"
                                                        onClick={() => {
                                                            setShowResults(false)
                                                            setSearchQuery("")
                                                        }}
                                                    >
                                                        <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                                                            {result.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 line-clamp-1">
                                                            {result.text}
                                                        </p>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Mobile Blog Cards */}
                                {isSearching ? (
                                    Array(3).fill(0).map((_, index) => (
                                        <BlogCardSkeleton key={index} />
                                    ))
                                ) : (
                                    displayPosts.map((post) => (
                                        <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
                                            <Link href={`/blog/${post.documentId}`}>
                                                <div className="relative h-48 w-full">
                                                    <Image
                                                        src={getStrapiMedia(post.Image?.url) || "/images/placeholder.jpg"}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                                        <span className="font-medium">{post.author || 'Anonymous'}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{formatDate(post.date)}</span>
                                                    </div>
                                                    <h2 className="text-lg font-bold mb-2 text-gray-900">
                                                        {post.title}
                                                    </h2>
                                                    <p className="text-gray-600 text-sm line-clamp-2">
                                                        {post.content[0]?.children[0]?.text || ''}
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </div>

                        {/* Sidebar - Desktop Only */}
                        <div className="hidden md:block md:w-1/3 md:pl-4">
                            <BlogSidebar
                                posts={posts}
                                onSearch={handleSearch}
                                onCategorySelect={handleCategoryChange}
                                onTagSelect={handleTagChange}
                                selectedCategory={selectedCategory}
                                selectedTag={selectedTag}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 