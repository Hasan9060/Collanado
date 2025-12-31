"use client"

import { Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProgramsSection() {
    const intermediatePrograms = [
        { name: "Pre-Engineering", available: true },
        { name: "Pre-Medical", available: true },
        { name: "Computer Science", available: true },
        { name: "Commerce (Girls Only)", available: true },
    ]

    const graduationPrograms = [
        { name: "ADS (Associate Degree in Science)", available: true },
        { name: "ADC (Associate Degree in Commerce) (Girls Only)", available: true },
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* RIGHT SIDE - Programs List */}
                    <div className="relative">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Programs
                        </h2>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            GOVT. DEGREE SCIENCE & COMMERCE COLLEGE MALIR CANTT KARACHI OFFERING PROGRAMS
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            {/* Intermediate Programs */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-red-600 rounded"></span>
                                    Intermediate
                                </h3>
                                <div className="space-y-3">
                                    {intermediatePrograms.map((program, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 group cursor-pointer"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mt-0.5">
                                                <Check className="text-white" size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                                                {program.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Graduation Programs */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-red-600 rounded"></span>
                                    Graduation
                                </h3>
                                <div className="space-y-3">
                                    {graduationPrograms.map((program, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 group cursor-pointer"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mt-0.5">
                                                <Check className="text-white" size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                                                {program.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Programs Details Link */}
                        <Link
                            href="/about"
                            className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-300 group"
                        >
                            <span>Programs Details</span>
                            <svg
                                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>



                    {/* LEFT SIDE - Image Collage */}
                    <div className="relative">
                        {/* Main decorative elements */}
                        <div className="absolute -top-8 -left-8 w-24 h-24 opacity-20">
                            <svg viewBox="0 0 100 100" className="text-purple-600">
                                <circle cx="10" cy="10" r="3" fill="currentColor" />
                                <circle cx="10" cy="25" r="3" fill="currentColor" />
                                <circle cx="10" cy="40" r="3" fill="currentColor" />
                                <circle cx="25" cy="10" r="3" fill="currentColor" />
                                <circle cx="25" cy="25" r="3" fill="currentColor" />
                                <circle cx="25" cy="40" r="3" fill="currentColor" />
                                <circle cx="40" cy="10" r="3" fill="currentColor" />
                                <circle cx="40" cy="25" r="3" fill="currentColor" />
                                <circle cx="40" cy="40" r="3" fill="currentColor" />
                            </svg>
                        </div>

                        {/* Triangle decoration */}
                        <div className="absolute -top-12 left-20 w-20 h-20 opacity-30">
                            <svg viewBox="0 0 100 100" className="text-teal-500">
                                <polygon points="50,10 90,90 10,90" fill="currentColor" />
                            </svg>
                        </div>

                        {/* Images Grid */}
                       <div className="relative grid grid-cols-2 gap-6">
  {/* Image Card */}
  {[
    { src: "/Images/programcompo/pic2.jpeg", alt: "Engineering Lab" },
    { src: "/Images/programcompo/pic1.jpeg", alt: "Computer Lab" },
    { src: "/Images/programcompo/pic3.jpeg", alt: "Students" },
    { src: "/Images/programcompo/pic4.jpeg", alt: "Science Lab" },
  ].map((item, index) => (
    <div
      key={index}
      className="relative h-45 md:h-60 rounded-2xl overflow-hidden shadow-lg 
                 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover"
      />
    </div>
  ))}
</div>


                        {/* Bottom decorative arrows */}
                        <div className="absolute -bottom-8 left-0 w-16 h-16 opacity-20">
                            <svg viewBox="0 0 100 100" className="text-green-600">
                                <path d="M10,50 L30,30 L30,45 L50,45 L50,55 L30,55 L30,70 Z" fill="currentColor" />
                                <path d="M50,50 L70,30 L70,45 L90,45 L90,55 L70,55 L70,70 Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
