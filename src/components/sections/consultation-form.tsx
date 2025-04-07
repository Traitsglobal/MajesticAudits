"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useServices } from "@/hooks/useServices"
import { Loader2 } from "lucide-react"
import ApiService from "@/services/api.services"
import { ContactFormData } from "@/types/contactform"

type FormData = {
    name: string
    email: string
    service: string
    phone: string
    message: string
}

export default function ConsultationForm() {
    const { services, isLoading: servicesLoading, error: servicesError } = useServices()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        setError(null)

        try {
            const contactData: ContactFormData = {
                name: data.name,
                email: data.email,
                service: data.service,
                message: `Consultation request`,
                phonenumber: data.phone,
                date: new Date().toISOString()
            }

            const response = await ApiService.postContactForm(contactData)
            
            if (response && response.data) {
                setIsSubmitted(true)
                reset()

                // Reset success message after 5 seconds
                setTimeout(() => {
                    setIsSubmitted(false)
                }, 5000)
            } else {
                setError('Failed to submit request. Please try again later.')
            }
        } catch {
            setError('Failed to submit request. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="bg-[#003366] text-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="py-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-6 md:py-6">
                            <h2 className="text-4xl font-bold leading-tight">
                                Free Consultation
                            </h2>
                            <p className="text-blue-200 text-lg">
                                Take the first step towards better business decisions
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="bg-[#004380]/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                            {isSubmitted ? (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                                    Thank you for your request! We&apos;ll get back to you shortly.
                                </div>
                            ) : null}

                            {error ? (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                    {error}
                                </div>
                            ) : null}

                            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Your Name"
                                        className={`w-full min-h-[48px] bg-white/90 border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-[#FF6B35] transition-all duration-200 text-black ${errors.name ? "ring-red-500" : ""}`}
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <Select 
                                        onValueChange={(value) => {
                                            register("service").onChange({
                                                target: { 
                                                    name: "service",
                                                    value: value 
                                                }
                                            });
                                        }}
                                        aria-label="Select Service"
                                    >
                                        <SelectTrigger className={`w-full min-h-[48px] bg-white/90 border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-[#FF6B35] transition-all duration-200 text-black ${errors.service ? "ring-red-500" : ""}`}>
                                            <SelectValue placeholder={servicesLoading ? "Loading..." : "Select Service"} />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            {servicesLoading ? (
                                                <div className="flex items-center justify-center p-2" role="status" aria-label="Loading services">
                                                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                                                </div>
                                            ) : servicesError ? (
                                                <div className="p-2 text-sm text-red-500" role="alert">
                                                    Failed to load services
                                                </div>
                                            ) : (
                                                services.map((service) => (
                                                    <SelectItem 
                                                        key={service.id} 
                                                        value={service.title}
                                                        aria-label={`Select ${service.title}`}
                                                    >
                                                        {service.title}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors.service && <p className="text-red-500 text-xs mt-1" role="alert">{errors.service.message}</p>}
                                </div>
                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        aria-label="Email Address"
                                        className={`w-full min-h-[48px] bg-white/90 border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-[#FF6B35] transition-all duration-200 text-black ${errors.email ? "ring-red-500" : ""}`}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <Input
                                        type="tel"
                                        placeholder="Phone Number"
                                        aria-label="Phone Number"
                                        className={`w-full min-h-[48px] bg-white/90 border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-[#FF6B35] transition-all duration-200 text-black ${errors.phone ? "ring-red-500" : ""}`}
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9+\s-()]+$/,
                                                message: "Invalid phone number",
                                            },
                                        })}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1" role="alert">{errors.phone.message}</p>}
                                </div>
                                <div className="md:col-span-2 flex justify-center md:justify-start">
                                    <Button 
                                        type="submit"
                                        className="w-full md:w-auto min-h-[48px] px-12 bg-[#FF6B35] hover:bg-[#ff8555] text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                                        disabled={isSubmitting || servicesLoading}
                                        aria-label={isSubmitting ? "Submitting consultation request" : "Submit consultation request"}
                                        aria-busy={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit Request"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 