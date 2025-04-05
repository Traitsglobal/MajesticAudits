import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="space-y-8">
                {/* Hero Section Skeleton */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2 space-y-4">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-5/6" />
                    </div>
                    <div className="md:w-1/2">
                        <Skeleton className="h-64 w-full rounded-lg" />
                    </div>
                </div>

                {/* Contact Info Skeleton */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-lg" />
                    ))}
                </div>

                {/* Form and Map Skeleton */}
                <div className="flex flex-col md:flex-row gap-8 py-8">
                    <div className="md:w-1/2 space-y-4">
                        <Skeleton className="h-10 w-1/2" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-12 w-1/3" />
                    </div>
                    <div className="md:w-1/2 space-y-4">
                        <Skeleton className="h-10 w-1/2" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-[400px] w-full rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

