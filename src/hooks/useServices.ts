"use client"

import { useState, useEffect } from 'react'
import ApiService from '@/services/api.services'
import { Service, ServiceResponse } from '@/types/service'

export function useServices() {
    const [services, setServices] = useState<Service[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setIsLoading(true)
                const response: ServiceResponse = await ApiService.fetchServiceData()
                setServices(response.data)
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch services'))
            } finally {
                setIsLoading(false)
            }
        }

        fetchServices()
    }, [])

    return { services, isLoading, error }
}

export function useService(slug: string) {
    const { services, isLoading, error } = useServices()
    const service = services.find(s => s.slug === slug)

    return {
        service,
        isLoading,
        error
    }
} 