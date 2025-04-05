import Link from "next/link"

export default function BlogBreadcrumb() {
    return (
        <div className="flex items-center text-sm text-white/80">
            <Link href="/" className="hover:text-white">
                Home
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-white">Blog</span>
        </div>
    )
}

