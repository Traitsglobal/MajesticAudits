import { Skeleton } from "@/components/ui/skeleton"

export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
      {/* Image skeleton */}
      <div className="relative w-full aspect-[16/9]">
        <Skeleton className="h-full w-full" />
      </div>
      
      <div className="p-4 md:p-6 space-y-4">
        {/* Meta info skeleton */}
        <div className="flex items-center space-x-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-[80%]" />
          <Skeleton className="h-6 w-[60%]" />
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>
        
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
  )
} 