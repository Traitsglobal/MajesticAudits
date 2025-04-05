"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BlogPost, ContentBlock } from "@/types/blog"

interface MobileBlogCardProps {
    post: BlogPost
    featured?: boolean
    featuredPosts?: BlogPost[]
}

export default function MobileBlogCard({ post, featured = false, featuredPosts = [] }: MobileBlogCardProps) {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Convert tags string to array
    const getTagsArray = (tagsString: string) => {
        return tagsString ? tagsString.split(',').map(tag => tag.trim()) : []
    }

    const slidePosts = featuredPosts.length > 0 ? featuredPosts : [post]
    const totalSlides = slidePosts.length

    useEffect(() => {
        if (!featured || totalSlides <= 1) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides)
        }, 5000)

        return () => clearInterval(interval)
    }, [featured, totalSlides])

    // Add the RichText component here as well
    const RichText = ({ content }: { content: ContentBlock[] }) => {
        return (
            <div className="prose prose-sm max-w-none">
                {content.map((block, blockIndex) => {
                    if (block.type === 'paragraph') {
                        return (
                            <p key={blockIndex} className="mb-2">
                                {block.children.map((child, childIndex: number) => {
                                    if (child.bold) {
                                        return (
                                            <strong key={childIndex} className="font-bold">
                                                {child.text}
                                            </strong>
                                        );
                                    }
                                    return <span key={childIndex}>{child.text}</span>;
                                })}
                            </p>
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    if (featured) {
        return (
            <div className="relative rounded-xl overflow-hidden mb-4">
                <div className="relative h-56 w-full">
                    <AnimatePresence mode="wait">
                        {slidePosts.map(
                            (slidePost, index) =>
                                index === currentSlide && (
                                    <motion.div
                                        key={slidePost.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={slidePost.Image?.url || "/images/placeholder.jpg"}
                                            alt={slidePost.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                                        <div className="absolute bottom-0 left-0 p-4 w-full">
                                            <div className="inline-block px-2 py-1 bg-[#003366] text-white text-xs rounded-md mb-2">
                                                {slidePost.categories}
                                            </div>
                                            <h3 className="text-white text-xl font-bold mb-1 line-clamp-2">
                                                <Link href={`/blog/${slidePost.documentId}`} scroll={false}>
                                                    {slidePost.title}
                                                </Link>
                                            </h3>
                                            <div className="flex items-center text-xs text-white/80">
                                                <span>{slidePost.date}</span>
                                            </div>
                                            {/* Display tags for featured posts */}
                                            {slidePost.tags && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {getTagsArray(slidePost.tags).slice(0, 2).map((tag) => (
                                                        <span key={tag} className="text-xs bg-white/20 text-white px-2 py-0.5 rounded">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ),
                        )}
                    </AnimatePresence>

                    {totalSlides > 1 && (
                        <>
                            <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-1">
                                {slidePosts.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/40"}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    }

    // Get tags array for the current post
    // const tagsArray = getTagsArray(post.tags)

    return (
        <Link href={`/blog/${post.documentId}`} className="flex gap-4 mb-4" scroll={false}>
            <div className="flex-shrink-0 w-32 h-32 relative rounded-lg overflow-hidden">
                <Image src={post.Image?.url || "/images/placeholder.jpg"} alt={post.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
                <h3 className="text-base font-bold line-clamp-2 mb-2">{post.title}</h3>
                <div className="text-sm text-gray-600 line-clamp-2">
                    <RichText content={post.content} />
                </div>
            </div>
        </Link>
    )
}

