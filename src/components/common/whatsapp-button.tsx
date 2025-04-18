"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function WhatsAppButton() {
    const [mounted, setMounted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)

    useEffect(() => {
        setMounted(true)
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
                    {/* Tooltip */}
                    <AnimatePresence>
                        {isTooltipVisible && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute bottom-full right-0 mb-3 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg max-w-[200px] text-sm font-medium"
                                style={{ transformOrigin: "bottom right" }}
                            >
                                Chat with us on WhatsApp
                                <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* WhatsApp Button */}
                    <motion.a
                        href="https://api.whatsapp.com/send/?phone=%2B971507258865&text=Hello+Majestic+Audits%2C+I+would+like+to+know+more+about+your+services.&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2,
                        }}
                        whileHover={{
                            scale: 1.1,
                            rotate: [0, -5, 5, -5, 0],
                            transition: { duration: 0.5 },
                        }}
                        onHoverStart={() => setIsTooltipVisible(true)}
                        onHoverEnd={() => setIsTooltipVisible(false)}
                        onTap={() => setIsTooltipVisible(false)}
                        aria-label="Chat with us on WhatsApp"
                    >
                        <div className="bg-[#25D366] p-4 md:p-5 rounded-full shadow-lg">
                            <Image
                                src="/images/whatsapp.svg"
                                alt="WhatsApp"
                                width={26}
                                height={26}
                                className="w-8 h-8 brightness-0 invert"
                            />
                        </div>
                    </motion.a>
                </div>
            )}
        </AnimatePresence>
    )
}

