"use client"

import Link from "next/link"
import Image from "next/image"
import {
    Home,
    ChevronRight,
    BookOpen,
    FlaskConical,
    Languages,
    BookText,
    Calculator,
    Globe2,
    Atom,
    Microscope,
} from "lucide-react"

export default function Departments() {
    const departments = [
         {
            id: 1,
            name: "Islamiat",
            slug: "islamiat",
            desc: "Understanding Islamic teachings, history, and values for spiritual growth.",
            image: "https://images.unsplash.com/photo-1553755088-ef1973c7b4a1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            color: "bg-emerald-600",
            students: "220+",
        },
            {
            id: 2,
            name: "Urdu",
            slug: "urdu",
            desc: "Preserving our rich literary heritage through classical and modern Urdu literature.",
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=500&q=80",
            color: "bg-green-600",
            students: "180+",
        },
        {
            id: 3,
            name: "Pakistan-Studies",
            slug: "pakistanstudies",
            desc: "Understanding Earth's physical features, climate, and human-environment interactions.",
            image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=500&q=80",
            color: "bg-cyan-600",
            students: "150+",
        },
        {
            id: 4,
            name: "English",
            slug: "english",
            desc: "Mastering language, literature, and communication skills for global excellence.",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=500&q=80",
            color: "bg-blue-600",
            students: "250+",
        },
        {
            id: 5,
            name: "Mathematics",
            slug: "mathematics",
            desc: "Building logical thinking and problem-solving skills through pure and applied mathematics.",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=80",
            color: "bg-orange-600",
            students: "190+",
        },
        {
            id: 6,
            name: "Physics",
            slug: "physics",
            desc: "Discovering the fundamental laws of nature through experimentation and theory.",
            image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=500&q=80",
            color: "bg-indigo-600",
            students: "170+",
        },
        {
            id: 7,
            name: "Chemistry",
            slug: "chemistry",
            desc: "Exploring the molecular world through practical experiments and theoretical knowledge.",
            image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=500&q=80",
            color: "bg-purple-600",
            students: "200+",
        },
        {
            id: 8,
            name: "Computer Science",
            slug: "computerscience",
            desc: "Exploring life sciences from cellular level to ecosystems and biodiversity.",
            image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            color: "bg-teal-600",
            students: "210+",
        },
        {
            id: 9,
            name: "Botany",
            slug: "botany",
            desc: "Understanding Earth's physical features, climate, and human-environment interactions.",
            image: "https://images.unsplash.com/photo-1558966151-762ec9755ce3?q=80&w=802&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            color: "bg-cyan-600",
            students: "150+",
        }, 
        {
            id: 10,
            name: "Zoology",
            slug: "zoology",
            desc: "Understanding Earth's physical features, climate, and human-environment interactions.",
            image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=1122&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            color: "bg-cyan-600",
            students: "150+",
        },
        {
            id: 11,
            name: "Commerce",
            slug: "commerce",
            desc: "Understanding Earth's physical features, climate, and human-environment interactions.",
            image: "https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            color: "bg-cyan-600",
            students: "150+",
        },
        {
            id: 12,
            name: "Economics",
            slug: "economics",
            desc: "Understanding Earth's physical features, climate, and human-environment interactions.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            color: "bg-cyan-600",
            students: "150+",
        },
        {
            id: 13,
            name: "Statistics",
            slug: "statistics",
            desc: "Understanding Earth's physical features, climate, and human-environment interactions.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            color: "bg-cyan-600",
            students: "150+",
        },
    ]

    return (
        <div className="pt-6 md:pt-32 min-h-screen bg-white">
            {/* ===== Header ===== */}
            <header className="pt-32 pb-16 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25px_25px,white_2%,transparent_0)] bg-[length:100px_100px]" />
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10 px-4">
                    <nav className="flex items-center justify-center space-x-2 mb-6 text-sm">
                        <Link href="/" className="flex items-center hover:text-red-200 transition">
                            <Home size={16} />
                            <span className="ml-1">Home</span>
                        </Link>
                        <ChevronRight size={16} className="text-red-200" />
                        <span className="text-red-100 font-semibold">
                            Departments
                        </span>
                    </nav>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Departments
                    </h1>
                    <p className="text-red-100 text-lg max-w-2xl mx-auto">
                        Excellence in Education Through Dedicated Faculty and Comprehensive Curriculum
                    </p>
                </div>
            </header>

            {/* ===== Departments Grid ===== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Explore Our Departments
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4" />
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Each department is committed to academic excellence and student development
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {departments.map((dept) => (
                            <Link
                                key={dept.id}
                                href={`/departments/${dept.slug}`}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 h-full">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={dept.image}
                                            alt={dept.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-white text-xl font-bold mb-1">
                                                {dept.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                                            {dept.desc}
                                        </p>
                                        <div className="group inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-red-600 font-semibold text-sm 
                transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-lg">
  <span className="tracking-wide">View Department</span>
  <ChevronRight
    size={16}
    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
  />
</div>

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
