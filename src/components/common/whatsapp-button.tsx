"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
                        <div className="bg-[#25D366] p-3 rounded-full shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
                            </svg>
                        </div>
                    </motion.a>
                </div>
            )}
        </AnimatePresence>
    )
}

