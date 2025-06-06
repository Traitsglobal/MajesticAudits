"use client"

import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-[#003366] text-white border-t border-blue-800">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-sm">
                    {/* Left Section: Copyright and Links */}
                    <div className="md:flex flex-col space-y-3 text-blue-200 hidden">
                        <div className="whitespace-nowrap">
                            © {new Date().getFullYear()} Majestic.
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hover:text-white transition-colors text-xs">
                                Privacy Policy
                            </div>
                            <span>•</span>
                            <div className="hover:text-white transition-colors text-xs">
                                Terms
                            </div>
                        </div>
                    </div>

                    {/* Middle Section: Contact Info */}
                    <div className="flex flex-col space-y-3 text-blue-200">
                        <a 
                            href="tel:+971526069700" 
                            className="flex items-center hover:text-white transition-colors group"
                        >
                            <Phone size={16} className="mr-2 text-[#FF6B35] group-hover:text-white transition-colors" />
                            (+971)526069700
                        </a>
                        <a 
                            href="mailto:letstalk@majestic.com" 
                            className="flex items-center hover:text-white transition-colors group"
                        >
                            <Mail size={16} className="mr-2 text-[#FF6B35] group-hover:text-white transition-colors" />
                            letstalk@majestic.com
                        </a>
                    </div>

                    {/* Right Section: Address */}
                    <div className="flex text-blue-200 group">
                        <MapPin size={16} className="mr-2 mt-1 text-[#FF6B35] shrink-0 group-hover:text-white transition-colors" />
                        <div className="flex flex-col hover:text-white transition-colors">
                            <span>Office 111..083 Al Fajar Complex,</span>
                            <span>Oudmetha 1st Floor,</span>
                            <span>P.O.Box. 82450, Dubai-U.A.E</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

