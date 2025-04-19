import { Skeleton } from "@/components/ui/skeleton"
import { BlogCardSkeleton } from "./blog-card-skeleton"

export function BlogGridSkeleton() {
  return (
    <div className="container mx-auto px-4 max-w-6xl py-8">
      {/* Search and filters skeleton */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Skeleton className="h-10 w-full md:w-72" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      {/* Blog grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-8 flex justify-center items-center gap-2">
        {Array(3).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-full" />
        ))}
      </div>
    </div>
  )
} 