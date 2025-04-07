"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
    name: string
    email: string
    phone?: string
    location?: string
    message: string
}

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit = async () => {
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitted(true)
        setIsSubmitting(false)
        reset()

        // Reset success message after 5 seconds
        setTimeout(() => {
            setIsSubmitted(false)
        }, 5000)
    }

    return (
        <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                    Thank you for your message! We&apos;ll get back to you shortly.
                </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Your Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Your Email *
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        {...register("phone")}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        {...register("location")}
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        rows={5}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366] ${errors.message ? "border-red-500" : "border-gray-300"
                            }`}
                        {...register("message", { required: "Message is required" })}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-md hover:bg-[#e55a24] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 disabled:opacity-70"
                    >
                        {isSubmitting ? "Submitting..." : "SUBMIT"}
                    </button>
                </div>
            </form>
        </div>
    )
}

