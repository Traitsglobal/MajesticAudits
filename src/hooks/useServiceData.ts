"use client"

import { useState, useEffect } from 'react'
import ApiService from '@/services/api.services'

export interface Service {
    id: number;
    title: string;
    slug: string;
    content: {
        type: string;
        children: { text: string }[];
    }[];
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    image: string;
    features: { title: string; description: string }[];
    benefits: string[];
}

interface ServiceResponse {
    data: Service[];
}

export function useServiceData(slug?: string) {
    const [services, setServices] = useState<Service[]>([])
    const [currentService, setCurrentService] = useState<Service | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setIsLoading(true)
                const response: ServiceResponse = await ApiService.fetchServiceData()
                const allServices = response.data || []
                setServices(allServices)
                
                if (slug) {
                    const found = allServices.find(service => service.slug === slug)
                    setCurrentService(found || null)
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch services'))
            } finally {
                setIsLoading(false)
            }
        }

        fetchServices()
    }, [slug])

    return { services, currentService, isLoading, error }
} 