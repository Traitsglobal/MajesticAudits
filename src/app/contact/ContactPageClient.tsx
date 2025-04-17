"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import MobileHeader from "@/components/layout/mobile-header"
import { useServices } from "@/hooks/useServices"
import { toast } from "sonner"
import ApiService from "@/services/api.services"
import { ContactPageData } from "@/types/contact"
import Image from "next/image"
import { getStrapiMedia } from "@/lib/utils"
import { Send } from "lucide-react"

interface FormErrors {
    name?: string;
    email?: string;
    service?: string;
    message?: string;
}

export default function ContactPageClient({ contactData }: { contactData: ContactPageData['data'] }) {
    // Add useServices hook
    const { services, isLoading: servicesLoading } = useServices()

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: "",
        message: "",
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Form validation
    const validateForm = () => {
        const newErrors: FormErrors = {}
        if (!formData.name) newErrors.name = "Name is required"
        if (!formData.email) newErrors.email = "Email is required"
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = "Invalid email address"
        }
        if (!formData.service) newErrors.service = "Please select a service"
        if (!formData.message) newErrors.message = "Message is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error("Please fill in all required fields correctly")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await ApiService.postContactForm({
                    name: formData.name,
                    email: formData.email,
                    service: formData.service,
                    message: formData.message,
                    date: new Date().toISOString(),
            })

            if (response && response.data) {
                setIsSubmitted(true)
                toast.success("Thank you for your message! We'll get back to you shortly.")
                
                // Reset form
                setFormData({ name: "", email: "", service: "", message: "" })
                
                // Reset success message after delay
                setTimeout(() => {
                    setIsSubmitted(false)
                }, 5000)
            } else {
                toast.error("Failed to send message. Please try again later.")
            }
        } catch {
            toast.error("Failed to send message. Please try again later.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="md:hidden">
                <MobileHeader />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {contactData.contactdetails.map((detail) => (
                        <div 
                            key={detail.id} 
                            className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center border border-gray-100 
                            transition-all duration-300 hover:scale-105 hover:shadow-md group"
                        >
                            <div className="w-12 h-12 bg-[#e8f0fa] rounded-full flex items-center justify-center mb-4 
                            transition-colors duration-300 group-hover:bg-[#2c8ccc]">
                                <Image 
                                    src={getStrapiMedia(detail.icon.url) || '/images/placeholder.jpg'}
                                    alt={detail.type}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 transition-colors duration-300 [filter:invert(12%)_sepia(71%)_saturate(1354%)_hue-rotate(194deg)_brightness(94%)_contrast(102%)] group-hover:brightness-0 group-hover:invert"
                                />
                            </div>
                            <h3 className="font-semibold text-primary text-lg mb-2">{detail.type}</h3>
                            {detail.type.toLowerCase() === 'address' ? (
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {detail.values}
                                </p>
                            ) : (
                                detail.values.split(',').map((value, index) => (
                                    <p key={index} className="text-gray-600 text-sm mb-1 hover:text-primary transition-colors">
                                        {value.trim()}
                                    </p>
                                ))
                            )}
                        </div>
                    ))}
                </div>

                {/* Form and Map Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Contact Form */}
                    <div className="lg:w-1/2">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Your Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"
                                                    } focus:outline-none focus:ring-2 focus:ring-primary`}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Your Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"
                                                    } focus:outline-none focus:ring-2 focus:ring-primary`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                                            Service
                                        </label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-md ${
                                                errors.service ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-primary bg-white`}
                                        >
                                            <option value="">Select a service</option>
                                            {servicesLoading ? (
                                                <option disabled>Loading services...</option>
                                            ) : (
                                                services?.map((service) => (
                                                    <option key={service.id} value={service.title}>
                                                        {service.title}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-md ${errors.message ? "border-red-500" : "border-gray-300"
                                                } focus:outline-none focus:ring-2 focus:ring-primary`}
                                            placeholder="Your message here..."
                                        ></textarea>
                                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-3 bg-[#002147] text-white font-medium rounded-md hover:bg-[#003366] transition-colors disabled:opacity-70 flex items-center"
                                        >
                                            {isSubmitting ? (
                                                <>Sending...</>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send size={16} className="ml-2" />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {isSubmitted && (
                                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                                            Thank you for your message! We&apos;ll get back to you shortly.
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="lg:w-1/2">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
                            <div className="p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-primary mb-6">Our Location</h2>

                                <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.9932118442714!2d55.27180491501113!3d25.197201983895075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sSheikh%20Zayed%20Rd%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1647887322329!5m2!1sen!2sus"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        title="Majestic Office Location"
                                        className="rounded-lg"
                                    ></iframe>
                                </div>

                                <div className="mt-6">
                                    <p className="text-gray-600">
                                        Visit our office at Sheikh Zayed Road, Dubai, UAE. We&apos;re conveniently located near the Dubai Metro
                                        station.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

