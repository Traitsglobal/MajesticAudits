"use client"

import type React from "react"
import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { HeroBlock } from "@/types/block"
import { getStrapiMedia } from "@/lib/utils"

export default function HeroSection({ Carosel }: HeroBlock) {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === Carosel.length - 1 ? 0 : prev + 1))
    }, [Carosel.length])

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? Carosel.length - 1 : prev - 1))
    }, [Carosel.length])

    return (
        <section 
            className="relative w-full h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden mt-[72px] md:mt-0 md:pt-20 lg:pt-24"
        >
            {/* Background image only */}
            <Image
                src={getStrapiMedia(Carosel[currentSlide].bgImage.url) || "/images/placeholder.jpg"}
                alt="Background"
                fill
                quality={90}
                priority
                className="object-cover"
            />

            <div className="container mx-auto px-4 max-w-6xl h-full flex items-center">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-3/5 mb-10 md:mb-0 z-10">
                            <h3 className="text-[#003366] font-bold mb-2 text-lg md:text-xl">
                                {Carosel[currentSlide].subhead}
                            </h3>
                            <h1 className="text-3xl md:text-5xl font-bold text-[#003366] mb-6">
                                {Carosel[currentSlide].mainhead}
                            </h1>
                            <p className="text-lg text-gray-800 max-w-xl">
                                {Carosel[currentSlide].description}
                            </p>
                        </div>

                        {/* Keep only this slider image */}
                        <div className="w-full md:w-3/5 flex justify-center">
                            <div className="relative w-full h-[300px] md:h-[450px] rounded-lg overflow-hidden">
                                <Image
                                    src={getStrapiMedia(Carosel[currentSlide].sliderImage.url) || "/images/placeholder.jpg"}
                                    alt={Carosel[currentSlide].mainhead}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={currentSlide === 0}
                                    loading={currentSlide === 0 ? "eager" : "lazy"}
                                    className="object-contain"
                                    style={{ background: 'transparent' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows - Desktop only */}
            <div className="hidden md:block">
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-[#003366] rounded-full p-3 shadow-lg hover:bg-[#e8f0fa] transition-all z-10"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-[#003366] rounded-full p-3 shadow-lg hover:bg-[#e8f0fa] transition-all z-10"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    )
}

