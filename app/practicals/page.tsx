"use client"

import {
    FlaskConical,
    Atom,
    Leaf,
    Bug,
    BarChart3,
    Monitor,
    ChevronRight,
    Home,
    Microscope,
    Clock,
    Users
} from "lucide-react"
import Link from "next/link"

export default function PracticalsPage() {
    const subjects = [
        {
            name: "Physics",
            slug: "physics",
            icon: Atom,
            color: "bg-blue-600",
            gradient: "from-blue-600 to-blue-700",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            description: "Explore the fundamental laws of nature through hands-on experiments"
        },
        {
            name: "Chemistry",
            slug: "chemistry",
            icon: FlaskConical,
            color: "bg-purple-600",
            gradient: "from-purple-600 to-purple-700",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            description: "Discover chemical reactions and molecular structures in our labs"
        },
        {
            name: "Botany",
            slug: "botany",
            icon: Leaf,
            color: "bg-green-600",
            gradient: "from-green-600 to-green-700",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            description: "Study plant life, structure, and biological processes"
        },
        {
            name: "Zoology",
            slug: "zoology",
            icon: Bug,
            color: "bg-orange-600",
            gradient: "from-orange-600 to-orange-700",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
            description: "Examine animal biology, behavior, and classification"
        },
        {
            name: "Statistics",
            slug: "statistics",
            icon: BarChart3,
            color: "bg-indigo-600",
            gradient: "from-indigo-600 to-indigo-700",
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
            description: "Analyze data and learn statistical methods and techniques"
        },
        {
            name: "Computer",
            slug: "computer",
            icon: Monitor,
            color: "bg-cyan-600",
            gradient: "from-cyan-600 to-cyan-700",
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-600",
            description: "Master programming, software, and computing fundamentals"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <header className="pt-28 pb-16 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 mb-6 text-sm text-white/90">
                        <Link href="/" className="flex items-center hover:text-white transition">
                            <Home size={16} />
                            <span className="ml-1">Home</span>
                        </Link>
                        <ChevronRight size={16} />
                        <span className="text-white font-semibold">Practicals</span>
                    </nav>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                            <Microscope size={40} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-2">
                                Laboratory Practicals
                            </h1>
                            <p className="text-white/90 text-lg">Hands-On Learning Experience</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Introduction */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Laboratory</h2>
                            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4"></div>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                Laboratory facilities equipped with modern instruments for comprehensive practical learning
                            </p>
                        </div>

                        {/* Subject Cards Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subjects.map((subject, index) => {
                                const Icon = subject.icon
                                return (
                                    <Link
                                        key={index}
                                        href={`/practicals/${subject.slug}`}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-2">
                                            {/* Card Header */}
                                            <div className={`bg-gradient-to-r ${subject.gradient} p-8 text-white relative overflow-hidden`}>
                                                <div className="absolute top-0 right-0 opacity-10">
                                                    <Icon size={120} />
                                                </div>
                                                <div className="relative z-10">
                                                    <div className={`w-16 h-16 ${subject.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                                                        <Icon size={32} className={subject.iconColor} />
                                                    </div>
                                                    <h3 className="text-3xl font-bold mb-2">{subject.name}</h3>
                                                    <p className="text-white/90 text-sm">Laboratory</p>
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-6">
                                                <p className="text-gray-700 leading-relaxed mb-4">
                                                    {subject.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all">
                                                    <span>View Details</span>
                                                    <ChevronRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>    
                    </div>
                </div>
            </section>
        </div>
    )
}
