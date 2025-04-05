"use client"

import Image from "next/image"
import MobileHeader from "@/components/layout/mobile-header"
import { CheckCircle2, Award, Users, Lightbulb, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { AboutPageClientProps, OurStoryBlock, VisionMissionBlock, CoreValuesBlock } from "@/types/about"
import { getStrapiMedia } from "@/lib/utils"

export default function AboutPageClient({ data }: AboutPageClientProps) {
    // Validate that we have blocks data
    if (!data?.blocks) {
        return null;
    }

    const ourStory = data.blocks.find((block): block is OurStoryBlock =>
        block.__component === "layout.ourstory"
    );

    const visionMission = data.blocks.find((block): block is VisionMissionBlock =>
        block.__component === "layout.vision-and-mission"
    );

    const coreValues = data.blocks.find((block): block is CoreValuesBlock =>
        block.__component === "layout.corevalues"
    );

    return (
        <main className="bg-white">
            <div className="md:hidden">
                <MobileHeader />
            </div>

            {/* About Us Section */}
            {ourStory && (
                <section className="py-20 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8f0fa] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e8f0fa] rounded-full translate-y-1/2 -translate-x-1/2 opacity-30"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col md:flex-row gap-12 items-stretch min-h-[600px]">
                            <motion.div
                                className="w-full md:w-1/2 h-[400px] md:min-h-[600px] flex"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="relative w-full h-full">
                                    <div className="absolute -top-4 -left-4 w-16 md:w-24 h-16 md:h-24 border-2 border-[#c0b283] z-0"></div>
                                    <div className="relative z-10 rounded-lg overflow-hidden shadow-xl w-full h-full">
                                        <Image
                                            src={getStrapiMedia(ourStory?.Image?.url) ?? "/images/placeholder.jpg"}
                                            alt={ourStory?.Image?.alternativeText ?? "Majestic Office"}
                                            fill
                                            className="object-cover"
                                            priority
                                            quality={85}
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-16 md:w-24 h-16 md:h-24 border-2 border-[#c0b283] z-0"></div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="w-full md:w-1/2"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-sm font-bold text-[#c0b283] uppercase tracking-wider">{ourStory.subtitle}</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mt-2 mb-6">{ourStory.title}</h2>

                                <div className="space-y-6 text-gray-700">
                                    {ourStory.content.map((block, index) => {
                                        if (block.type === "paragraph") {
                                            return (
                                                <p key={index} className="leading-relaxed">
                                                    {block.children.map((child, childIndex) => (
                                                        <span
                                                            key={childIndex}
                                                            className={`
                                                                ${child.bold ? 'font-bold' : ''}
                                                                ${child.italic ? 'italic' : ''}
                                                                ${child.underline ? 'underline' : ''}
                                                            `}
                                                        >
                                                            {child.text}
                                                        </span>
                                                    ))}
                                                </p>
                                            );
                                        }
                                        if (block.type === "list") {
                                            return (
                                                <ul key={index} className="list-disc pl-6 space-y-2">
                                                    {block.children.map((item, itemIndex) => (
                                                        <li key={itemIndex}>
                                                            {item.children.map((child, childIndex) => (
                                                                <span
                                                                    key={childIndex}
                                                                    className={`
                                                                        ${child.bold ? 'font-bold' : ''}
                                                                        ${child.italic ? 'italic' : ''}
                                                                        ${child.underline ? 'underline' : ''}
                                                                    `}
                                                                >
                                                                    {child.text}
                                                                </span>
                                                            ))}
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Vision & Mission Section */}
            {visionMission && (
                <section className="py-20 bg-gradient-to-b from-[#e8f0fa] to-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-sm font-bold text-[#c0b283] uppercase tracking-wider">{visionMission.subtitle}</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#003366] mt-2 mb-6">{visionMission.title}</h2>
                            <div className="w-20 h-1 bg-[#c0b283] mx-auto mb-6"></div>
                        </motion.div>

                        <div className="mt-16 grid md:grid-cols-2 gap-12">
                            {/* Mission Details */}
                            <motion.div
                                className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#f5a623]"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                            >
                                <h3 className="text-2xl font-bold text-[#003366] mb-6">{visionMission.mission.title}</h3>
                                <div className="space-y-4">
                                    {visionMission.mission.content.map((block, index) => {
                                        if (block.type === "paragraph") {
                                            return (
                                                <p key={index} className="text-gray-700 leading-relaxed">
                                                    {block.children.map((child, childIndex) => (
                                                        <span
                                                            key={childIndex}
                                                            className={`
                                                                ${child.bold ? 'font-bold' : ''}
                                                                ${child.italic ? 'italic' : ''}
                                                                ${child.underline ? 'underline' : ''}
                                                            `}
                                                        >
                                                            {child.text}
                                                        </span>
                                                    ))}
                                                </p>
                                            );
                                        }
                                        if (block.type === "list") {
                                            return (
                                                <ul key={index} className="space-y-2">
                                                    {block.children.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-start">
                                                            <CheckCircle2 size={20} className="text-[#f5a623] mt-1 mr-2 flex-shrink-0" />
                                                            {item.children.map((child, childIndex) => (
                                                                <span
                                                                    key={childIndex}
                                                                    className={`
                                                                        ${child.bold ? 'font-bold' : ''}
                                                                        ${child.italic ? 'italic' : ''}
                                                                        ${child.underline ? 'underline' : ''}
                                                                    `}
                                                                >
                                                                    {child.text}
                                                                </span>
                                                            ))}
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </motion.div>

                            {/* Vision Details */}
                            <motion.div
                                className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#8bc34a]"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                            >
                                <h3 className="text-2xl font-bold text-[#003366] mb-6">{visionMission.vision.title}</h3>
                                <div className="space-y-4">
                                    {visionMission.vision.content.map((block, index) => {
                                        if (block.type === "paragraph") {
                                            return (
                                                <p key={index} className="text-gray-700 leading-relaxed">
                                                    {block.children.map((child, childIndex) => (
                                                        <span
                                                            key={childIndex}
                                                            className={`
                                                                ${child.bold ? 'font-bold' : ''}
                                                                ${child.italic ? 'italic' : ''}
                                                                ${child.underline ? 'underline' : ''}
                                                            `}
                                                        >
                                                            {child.text}
                                                        </span>
                                                    ))}
                                                </p>
                                            );
                                        }
                                        if (block.type === "list") {
                                            return (
                                                <ul key={index} className="space-y-2">
                                                    {block.children.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-start">
                                                            <CheckCircle2 size={20} className="text-[#8bc34a] mt-1 mr-2 flex-shrink-0" />
                                                            {item.children.map((child, childIndex) => (
                                                                <span
                                                                    key={childIndex}
                                                                    className={`
                                                                        ${child.bold ? 'font-bold' : ''}
                                                                        ${child.italic ? 'italic' : ''}
                                                                        ${child.underline ? 'underline' : ''}
                                                                    `}
                                                                >
                                                                    {child.text}
                                                                </span>
                                                            ))}
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Core Values Section */}
            {coreValues && (
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-sm font-bold text-[#c0b283] uppercase tracking-wider">OUR FOUNDATION</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#003366] mt-2 mb-6">{coreValues.mainhead}</h2>
                            <div className="w-20 h-1 bg-[#c0b283] mx-auto mb-6"></div>
                            <p className="text-gray-700">{coreValues.description}</p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {coreValues.cards.map((value, index) => (
                                <motion.div
                                    key={value.id}
                                    className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[#003366]"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{
                                        y: -5,
                                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                    }}
                                >
                                    <div className="w-16 h-16 bg-[#e8f0fa] rounded-full flex items-center justify-center mb-6 mx-auto">
                                        {value.icon ? (
                                            <Image
                                                src={getStrapiMedia(value.icon.url) ?? "/images/placeholder.jpg"}
                                                alt={value.icon.alternativeText || value.mainhead}
                                                width={35}
                                                height={35}
                                                className="text-[#003366]"
                                            />
                                        ) : (
                                            getIconForValue(index)
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-center text-[#003366] mb-4">{value.mainhead}</h3>
                                    <p className="text-gray-700 text-center">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}

// Helper function to get icons
function getIconForValue(index: number) {
    const icons = [
        <Shield key="shield1" size={28} className="text-[#003366]" />,
        <Users key="users1" size={28} className="text-[#003366]" />,
        <Users key="users2" size={28} className="text-[#003366]" />,
        <Award key="award" size={28} className="text-[#003366]" />,
        <Lightbulb key="lightbulb" size={28} className="text-[#003366]" />,
        <Shield key="shield2" size={28} className="text-[#003366]" />
    ];
    return icons[index % icons.length];
}

