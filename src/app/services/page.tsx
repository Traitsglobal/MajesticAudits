import { redirect } from "next/navigation"
import ApiService from '@/services/api.services'

export default async function ServicesPage() {
    try {
        const response = await ApiService.fetchServiceData()
        const firstService = response.data[0]
        
        if (!firstService) {
            redirect('/services/overview')
        }
        
        redirect(`/services/${firstService.attributes.slug}`)
    } catch {
        redirect('/services/overview')
    }
}

