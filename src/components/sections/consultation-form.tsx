"use client"

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

export default function ConsultationForm() {
    const { services, isLoading, error } = useServices()

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
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full min-h-[48px] bg-white/90 border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-[#FF6B35] transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <Select>
                                        <SelectTrigger className="w-full min-h-[48px] bg-white/90 border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-[#FF6B35] transition-all duration-200">
                                            <SelectValue placeholder={isLoading ? "Loading..." : "Select Service"} />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            {isLoading ? (
                                                <div className="flex items-center justify-center p-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                </div>
                                            ) : error ? (
                                                <div className="p-2 text-sm text-red-500">
                                                    Failed to load services
                                                </div>
                                            ) : (
                                                services.map((service) => (
                                                    <SelectItem 
                                                        key={service.id} 
                                                        value={service.slug}
                                                    >
                                                        {service.title}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full min-h-[48px] bg-white/90 border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-[#FF6B35] transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="w-full min-h-[48px] bg-white/90 border-0 ring-1 ring-white/10 focus:ring-2 focus:ring-[#FF6B35] transition-all duration-200"
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-center md:justify-start">
                                    <Button 
                                        className="w-full md:w-auto min-h-[48px] px-12 bg-[#FF6B35] hover:bg-[#ff8555] text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : null}
                                        Submit Request
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