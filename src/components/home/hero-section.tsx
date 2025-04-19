"use client"

import type React from "react"
import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroBlock } from "@/types/block"
import { getStrapiMedia } from "@/lib/utils"

export default function HeroSection({ Carosel }: HeroBlock) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [direction, setDirection] = useState(0)

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    }

    const nextSlide = useCallback(() => {
        setDirection(1)
        setCurrentSlide((prev) => (prev === Carosel.length - 1 ? 0 : prev + 1))
    }, [Carosel.length])

    const prevSlide = useCallback(() => {
        setDirection(-1)
        setCurrentSlide((prev) => (prev === 0 ? Carosel.length - 1 : prev - 1))
    }, [Carosel.length])

    return (
        <section className="relative w-full min-h-[650px] sm:min-h-[700px] md:min-h-[600px] bg-[#f5f9ff] overflow-hidden mt-[60px] md:mt-0">
            <div className="container mx-auto px-4 max-w-6xl h-full relative">
                <div className="flex flex-col md:flex-row items-center justify-between h-full py-8 md:py-12">
                    {/* Text Content - Left Side */}
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={currentSlide}
                            className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0 pt-4 md:pt-0 relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.h3 
                                className="text-[#003366] font-semibold mb-2 md:mb-3 text-sm sm:text-base md:text-lg uppercase tracking-wide"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {Carosel[currentSlide].subhead || "WE'RE MAJESTIC"}
                            </motion.h3>
                            <motion.h1 
                                className="text-[#003366] font-bold mb-3 md:mb-5 text-3xl sm:text-4xl md:text-[2.75rem] max-w-3xl md:max-w-none leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {Carosel[currentSlide].mainhead || "Accounting and book keeping Services"}
                            </motion.h1>
                            <motion.p 
                                className="text-[#003366]/80 text-base sm:text-lg max-w-xl md:max-w-none md:pr-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                {Carosel[currentSlide].description || "Simplify your financial management with our reliable and professional accounting and bookkeeping solutions."}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Slider Image - Right Side */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentSlide}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="relative w-full max-w-xl md:max-w-none h-[45vh] sm:h-[50vh] md:h-[450px]"
                            >
                                <Image
                                    src={getStrapiMedia(Carosel[currentSlide].sliderImage.url) || "/images/placeholder.jpg"}
                                    alt={Carosel[currentSlide].mainhead}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={currentSlide === 0}
                                    loading={currentSlide === 0 ? "eager" : "lazy"}
                                    className="object-contain"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows - Only show if multiple slides */}
            {Carosel.length > 1 && (
                <>
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-2 sm:px-4 z-20">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevSlide}
                            className="bg-white/90 text-[#003366] rounded-full p-2 sm:p-3 shadow-lg hover:bg-white transition-all z-20"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextSlide}
                            className="bg-white/90 text-[#003366] rounded-full p-2 sm:p-3 shadow-lg hover:bg-white transition-all z-20"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                        {Carosel.map((_, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    currentSlide === index ? 'bg-[#003366] w-4' : 'bg-[#003366]/50'
                                }`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}

