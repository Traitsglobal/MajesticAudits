import { Twitter, Facebook, Linkedin, Clock } from "lucide-react"

export default function TopBar() {
    return (
        <div className="w-full bg-[#002147] text-white py-2 px-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <a href="#" aria-label="Twitter" className="hover:text-blue-300">
                        <Twitter size={18} />
                    </a>
                    <a href="#" aria-label="Facebook" className="hover:text-blue-300">
                        <Facebook size={18} />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-blue-300">
                        <Linkedin size={18} />
                    </a>
                </div>
                <div className="flex items-center text-sm">
                    <Clock size={16} className="mr-2" />
                    <span>Opening Hours: Sun - Thu: 9:00 AM - 6:00 PM</span>
                </div>
            </div>
        </div>
    )
}

