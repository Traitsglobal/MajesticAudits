"use client"

import { useRef, useEffect, useState, ElementType } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import BlogSidebar from "@/components/blog/blog-sidebar"
import { ChevronLeft, Bookmark, MoreVertical } from "lucide-react"
import { getStrapiMedia } from "@/lib/utils"
import { BlogPost } from "@/types/blog"
import React from "react"
import ApiService from "@/services/api.services"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter()
    const contentRef = useRef<HTMLDivElement>(null)
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

    const resolvedParams = React.use(params)
    const documentId = resolvedParams.slug;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await ApiService.fetchBlogPost(documentId);
                setPost(response.data)
            } catch {
            } finally {
                setLoading(false)
            }
        }

        const fetchBlogPosts = async () => {
            try {
                const response = await ApiService.fetchBlogData();
                setBlogPosts(response.data || []);
            } catch {
            }
        }

        fetchPost();
        fetchBlogPosts();
    }, [documentId])

    if (loading) {
        return (
            <div>
                {/* Desktop Skeleton */}
                <div className="hidden md:block">
                    {/* Hero Section Skeleton */}
                    <div className="relative w-full bg-[#003366]/50 py-12">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <Skeleton className="h-10 w-32 mb-2" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="bg-gray-100 py-8">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Main Content Skeleton */}
                                <div className="w-full md:w-2/3 md:pr-4">
                                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                                        <Skeleton className="h-64 w-full" />
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-4 w-2" />
                                                <Skeleton className="h-4 w-20" />
                                            </div>
                                            <Skeleton className="h-8 w-3/4 mb-4" />

                                            {/* Author Skeleton */}
                                            <div className="flex items-center mb-6">
                                                <Skeleton className="h-10 w-10 rounded-full" />
                                                <div className="ml-3">
                                                    <Skeleton className="h-4 w-32 mb-1" />
                                                    <Skeleton className="h-3 w-24" />
                                                </div>
                                            </div>

                                            {/* Content Skeleton */}
                                            <div className="space-y-4">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-5/6" />
                                                <Skeleton className="h-4 w-4/6" />
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-3/4" />
                                            </div>

                                            {/* Tags Skeleton */}
                                            <div className="mt-8 flex items-center">
                                                <Skeleton className="h-4 w-12 mr-3" />
                                                <div className="flex gap-2">
                                                    <Skeleton className="h-6 w-16" />
                                                    <Skeleton className="h-6 w-20" />
                                                    <Skeleton className="h-6 w-24" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar Skeleton */}
                                <div className="hidden md:block md:w-1/3 md:pl-4">
                                    <Skeleton className="h-12 w-full mb-4" />
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex gap-4">
                                                <Skeleton className="h-20 w-24" />
                                                <div className="flex-1">
                                                    <Skeleton className="h-4 w-full mb-2" />
                                                    <Skeleton className="h-3 w-24" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Skeleton */}
                <div className="md:hidden">
                    {/* Header Image Skeleton */}
                    <div className="relative h-[50vh] w-full">
                        <Skeleton className="h-full w-full" />
                        {/* Header Controls Skeleton */}
                        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pt-16">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="flex space-x-2">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <Skeleton className="h-10 w-10 rounded-full" />
                            </div>
                        </div>
                        {/* Title Area Skeleton */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <Skeleton className="h-6 w-20 mb-2" />
                            <Skeleton className="h-8 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>

                    {/* Author Info Skeleton */}
                    <div className="p-4 flex items-center border-b border-gray-200">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="ml-3 flex-1">
                            <Skeleton className="h-4 w-32 mb-1" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="p-4">
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/6" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>

                    {/* Tags Skeleton */}
                    <div className="p-4 border-t border-gray-200">
                        <Skeleton className="h-6 w-24 mb-4" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        notFound()
    }

    const handleBackClick = () => {
        router.back()
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleSearch = () => {
    }

    return (
        <div ref={contentRef}>
            <div className="hidden md:block">
                <div className="relative w-full py-16 min-h-[120px] hidden md:block" 
                    style={{
                        backgroundImage: "url('/images/bg-header.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="container mx-auto px-4 max-w-6xl relative z-10">
                        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                            <h1 className="text-2xl md:text-3xl font-bold text-white max-w-[500px] leading-tight line-clamp-2">
                                {post.title}
                            </h1>
                            <nav aria-label="Breadcrumb" className="flex-shrink-0 mt-2 md:mt-0">
                                <ol className="flex items-center text-sm whitespace-nowrap">
                                    <li>
                                        <Link
                                            href="/"
                                            className="text-white/80 hover:text-white transition-colors"
                                            scroll={false}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="mx-2 text-white/60">›</li>
                                    <li>
                                        <Link
                                            href="/blog"
                                            className="text-white/80 hover:text-white transition-colors"
                                            scroll={false}
                                        >
                                            Blog
                                        </Link>
                                    </li>
                                    <li className="mx-2 text-white/60">›</li>
                                    <li>
                                        <span className="text-white/80 line-clamp-1 max-w-[150px]" title={post.title}>
                                            {post.title}
                                        </span>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Blog Content */}
                <div className="bg-gray-100 py-8">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Main Content */}
                            <div className="w-full md:w-2/3 md:pr-4">
                                <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8 flex flex-col">
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
                                            <Link
                                                href={{
                                                    pathname: '/blog/category/[category]',
                                                    query: { category: post.categories }
                                                }}
                                                className="text-[#003366] hover:underline"
                                                scroll={false}
                                            >
                                                {post.categories}
                                            </Link>
                                        </div>
                                        <h2 className="text-2xl font-bold mb-4 text-[#003366]">{post.title}</h2>

                                        {/* Author Info */}
                                        <div className="flex items-center mb-6">
                                            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 relative overflow-hidden">
                                                <Image
                                                    src={getStrapiMedia(post.profilepicture?.url) || "/images/placeholder.jpg"}
                                                    alt={post.author}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{post.author}</p>
                                                <p className="text-sm text-gray-500">{post.designation}</p>
                                            </div>
                                        </div>

                                        <div className="prose max-w-none text-gray-700">
                                            {post.content.map((block, index) => {
                                                switch (block.type) {
                                                    case 'paragraph':
                                                        return (
                                                            <div key={index} className="mb-4">
                                                                {block.children.map((child, childIndex) => {
                                                                    if (child.type === 'link') {
                                                                        return (
                                                                            <a
                                                                                key={childIndex}
                                                                                href={child.url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-[#003366] hover:underline"
                                                                            >
                                                                                {child.children?.[0]?.text}
                                                                            </a>
                                                                        );
                                                                    }

                                                                    const textStyles = [];
                                                                    if (child.bold) textStyles.push('font-bold');
                                                                    if (child.italic) textStyles.push('italic');
                                                                    if (child.underline) textStyles.push('underline');

                                                                    return (
                                                                        <span
                                                                            key={childIndex}
                                                                            className={textStyles.join(' ')}
                                                                        >
                                                                            {child.text}
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        );
                                                    case 'heading':
                                                        const HeadingTag = `h${block.level}` as ElementType;
                                                        return (
                                                            <HeadingTag key={index} className="font-bold mb-4">
                                                                {block.children.map((child, childIndex) => (
                                                                    <span key={childIndex}>{child.text}</span>
                                                                ))}
                                                            </HeadingTag>
                                                        );
                                                    case 'list':
                                                        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
                                                        return (
                                                            <ListTag key={index} className="mb-4 ml-4">
                                                                {block.children.map((item, itemIndex) => (
                                                                    <li key={itemIndex}>
                                                                        {item.children?.map((child, childIndex) => (
                                                                            <span key={childIndex}>{child.text}</span>
                                                                        ))}
                                                                    </li>
                                                                ))}
                                                            </ListTag>
                                                        );
                                                    default:
                                                        return (
                                                            <div key={index} className="mb-4">
                                                                {block.children.map((child, childIndex) => (
                                                                    <span key={childIndex}>{child.text}</span>
                                                                ))}
                                                            </div>
                                                        );
                                                }
                                            })}
                                        </div>

                                        {/* Tags */}
                                        {post.tags && (
                                            <div className="mt-8">
                                                <div className="flex items-center">
                                                    <span className="font-medium text-gray-700 mr-3">Tags:</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {post.tags.split(',').map((tag) => (
                                                            <Link
                                                                key={tag}
                                                                href={{
                                                                    pathname: '/blog/tag/[tag]',
                                                                    query: { tag: tag.trim() }
                                                                }}
                                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-[#003366] hover:text-white transition-colors"
                                                                scroll={false}
                                                            >
                                                                {tag.trim()}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="md:w-1/3 md:pl-4">
                                <BlogSidebar
                                    posts={blogPosts}
                                    onSearch={handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                {/* Header Image */}
                <div className="relative h-[50vh] w-full">
                    <Image
                        src={getStrapiMedia(post.Image?.url) || "/images/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Header Controls */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pt-16">
                        <button
                            onClick={handleBackClick}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        >
                            <ChevronLeft size={24} className="text-white" />
                        </button>

                        <div className="flex space-x-2">
                            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Bookmark size={20} className="text-white" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <MoreVertical size={20} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Title Area */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="inline-block px-2 py-1 bg-[#003366] text-white text-xs rounded-md mb-2">
                            {post.categories}
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">{post.title}</h1>
                        <div className="flex items-center text-white/80 text-sm">
                            <span>{formatDate(post.date)}</span>
                        </div>
                    </div>
                </div>

                {/* Author Info */}
                <div className="p-4 flex items-center border-b border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 relative overflow-hidden">
                        <Image
                            src={getStrapiMedia(post.profilepicture?.url) || "/images/placeholder.jpg"}
                            alt={post.author}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center">
                            <h3 className="font-bold">{post.author}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{post.designation}</p>
                    </div>
                </div>

                {/* Article Content */}
                <div className="p-4">
                    <div className="prose prose-sm max-w-none">
                        {post.content.map((block, index) => {
                            switch (block.type) {
                                case 'paragraph':
                                    return (
                                        <p key={index} className="mb-4">
                                            {block.children.map((child, childIndex) => {
                                                if (child.type === 'link') {
                                                    return (
                                                        <a
                                                            key={childIndex}
                                                            href={child.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[#003366] hover:underline"
                                                        >
                                                            {child.children?.[0]?.text}
                                                        </a>
                                                    );
                                                }

                                                const textStyles = [];
                                                if (child.bold) textStyles.push('font-bold');
                                                if (child.italic) textStyles.push('italic');
                                                if (child.underline) textStyles.push('underline');

                                                return (
                                                    <span
                                                        key={childIndex}
                                                        className={textStyles.join(' ')}
                                                    >
                                                        {child.text}
                                                    </span>
                                                );
                                            })}
                                        </p>
                                    );
                                case 'heading':
                                    const HeadingTag = `h${block.level}` as ElementType;
                                    return (
                                        <HeadingTag key={index} className="font-bold mb-4">
                                            {block.children.map((child, childIndex) => (
                                                <span key={childIndex}>{child.text}</span>
                                            ))}
                                        </HeadingTag>
                                    );
                                case 'list':
                                    const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
                                    return (
                                        <ListTag key={index} className="mb-4 ml-4">
                                            {block.children.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    {item.children?.map((child, childIndex) => (
                                                        <span key={childIndex}>{child.text}</span>
                                                    ))}
                                                </li>
                                            ))}
                                        </ListTag>
                                    );
                                default:
                                    return (
                                        <div key={index} className="mb-4">
                                            {block.children.map((child, childIndex) => (
                                                <span key={childIndex}>{child.text}</span>
                                            ))}
                                        </div>
                                    );
                            }
                        })}
                    </div>
                </div>

                {/* Tags */}
                {post.tags && (
                    <div className="p-4 border-t border-gray-200">
                        <h3 className="text-lg font-bold mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.split(',').map((tag) => (
                                <Link
                                    key={tag}
                                    href={{
                                        pathname: '/blog/tag/[tag]',
                                        query: { tag: tag.trim() }
                                    }}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-[#003366] hover:text-white transition-colors"
                                    scroll={false}
                                >
                                    {tag.trim()}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

