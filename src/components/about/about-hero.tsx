import Image from "next/image"
import Link from "next/link"

export default function AboutHero() {
    return (
        <div className="relative w-full bg-primary py-12 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>

                <div className="flex items-center text-sm text-white/80">
                    <Link href="/" className="hover:text-white">
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-white">About Us</span>
                </div>
            </div>

            {/* Background Image Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <Image
                src="/images/placeholder.jpg"
                alt="About Majestic"
                width={1200}
                height={600}
                className="object-cover z-[-1]"
                priority
            />
        </div>
    )
}

