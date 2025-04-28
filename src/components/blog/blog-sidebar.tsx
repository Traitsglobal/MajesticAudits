"use client"

import React from "react"
import { BlogPost } from "@/types/blog"
import { Input } from "../ui/input"
import Image from "next/image"
import { getStrapiMedia } from "@/lib/utils"

interface BlogSidebarProps {
    posts: BlogPost[]
    onSearch: (query: string) => void
    onCategorySelect?: (category: string) => void
    onTagSelect?: (tag: string) => void
    selectedCategory?: string
    selectedTag?: string
}

export default function BlogSidebar({
    posts,
    onSearch,
    onCategorySelect,
    onTagSelect,
    selectedCategory,
    selectedTag
}: BlogSidebarProps) {
    // Get unique categories and their counts
    const categories = posts.reduce((acc, post) => {
        const category = post.categories
        acc[category] = (acc[category] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    console.log('categories', categories)


    // Get unique tags and their counts
    const tags = posts.reduce((acc, post) => {
        post.tags.split(',').forEach(tag => {
            const trimmedTag = tag.trim()
            acc[trimmedTag] = (acc[trimmedTag] || 0) + 1
        })
        return acc
    }, {} as Record<string, number>)

    // Get latest posts
    const latestPosts = [...posts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 2)

    // Add this helper function at the top of your component
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <aside className="bg-white rounded-lg p-6 shadow-md">
            {/* Search Box */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="text-[#003366] text-xl font-bold mb-4">Search</h3>
                <Input
                    type="search"
                    placeholder="Search posts..."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
            </div>

            {/* Categories */}
            <div className="py-6 border-b border-gray-200">
                <h3 className="text-[#003366] text-xl font-bold mb-4">Categories</h3>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => {
                                onCategorySelect?.("");
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md transition-all duration-300 flex items-center justify-between group ${!selectedCategory
                                    ? "bg-[#003366]/10 text-[#003366] font-semibold"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <span>All Posts</span>
                            <span className="text-sm text-gray-500 group-hover:text-[#003366] transition-colors duration-300">
                                ({posts.length})
                            </span>
                        </button>
                    </li>
                    {Object.entries(categories).map(([category, count]) => (
                        <li key={category}>
                            <button
                                onClick={() => { onCategorySelect?.(category); }}
                                className={`w-full text-left px-3 py-2 rounded-md transition-all duration-300 flex items-center justify-between group ${selectedCategory === category
                                        ? "bg-[#003366]/10 text-[#003366] font-semibold"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <span>{category}</span>
                                <span className="text-sm text-gray-500 group-hover:text-[#003366] transition-colors duration-300">
                                    ({count})
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Latest Posts */}
            <div className="py-6 border-b border-gray-200">
                <h3 className="text-[#003366] text-xl font-bold mb-4">Latest Updates</h3>
                <div className="space-y-4">
                    {latestPosts.map((post) => (
                        <div key={post.id} className="group border-b border-gray-100 pb-4 last:border-0">
                            <a href={`/blog/${post.documentId}`} className="flex gap-3">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src={getStrapiMedia(post.Image?.url) || "/images/placeholder.jpg"}
                                        alt={post.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-gray-700 group-hover:text-[#003366] transition-colors font-medium mb-1 line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div className="pt-6">
                <h3 className="text-[#003366] text-xl font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(tags).map(([tag, count]) => (
                        <button
                            key={tag}
                            onClick={() => {
                                onTagSelect?.(selectedTag === tag ? "" : tag);
                            }}
                            className={`px-3 py-1.5 rounded-md text-sm transition-all duration-300 flex items-center gap-2 ${selectedTag === tag
                                    ? "bg-[#003366] text-white"
                                    : "bg-gray-50 text-gray-600 hover:bg-[#003366] hover:text-white"
                                }`}
                        >
                            <span>{tag} ({count})</span>
                            {selectedTag === tag && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="hover:scale-110 transition-transform duration-300"
                                >
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}

