import { Clock } from "lucide-react"
import { TopbarBlock } from "@/types/block"
import Image from "next/image"
import { getStrapiMedia } from "@/lib/utils"

type TopBarProps = Omit<TopbarBlock, '__component'>

export default function TopBar({ openinghours, DigitalPlatforms }: TopBarProps) {
    return (
        <div className="w-full bg-[#002147] text-white py-2 px-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    {DigitalPlatforms.map((platform) => (
                        <a 
                            key={platform.id} 
                            href={platform.Link} 
                            target={platform.isExternal ? "_blank" : "_self"}
                            rel={platform.isExternal ? "noopener noreferrer" : ""}
                            aria-label={platform.name}   
                        >
                            <Image
                                src={getStrapiMedia(platform.icon.url) || '/images/placeholder.png'}
                                alt={platform.name}
                                className="brightness-0 invert opacity-80 hover:opacity-100 transition-all duration-300"
                                width={18}
                                height={18}
                            />
                        </a>
                    ))}
                </div>
                <div className="flex items-center text-sm">
                    <Clock size={16} className="mr-2" />
                    <span>{openinghours}</span>
                </div>
            </div>
        </div>
    )
}

