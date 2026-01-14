"use client"

import {
    Users,
    Shield,
    Zap,
    Sparkles,
    ChevronRight,
    Home,
    Award,
    Target,
    UserCheck,
    Camera,
    Code,
    Palette,
    Lightbulb,
    Heart
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SocietiesPage() {
    const societies = [
        {
            name: "Marshal Wing",
            icon: Shield,
            logo: "/Images/societies/marshal-wing.png",
            color: "bg-yellow-600",
            gradient: "from-yellow-600 to-yellow-700",
            members: 31,
            head: "Prof. Bushra Sheikh",
            headImage: "/Images/faculty/female-staff.jpeg",
            description: "The marshal ensures that rules are followed during school activities, assemblies, and daily routines, promoting safety and good behavior among students. By being fair, respectful, and approachable, the marshal supports teachers and school staff while encouraging cooperation and unity within the school community. Through leadership, punctuality, and integrity, the marshal plays an important role in creating a well-organized and respectful school environment.",
            responsibilities: [
                "Ensures rules are followed during activities and assemblies",
                "Promotes safety and good behavior among students",
                "Supports teachers and school staff",
                "Encourages cooperation and unity within the school",
                "Demonstrates leadership, punctuality, and integrity"
            ]
        },
        {
            name: "Buzz Wing",
            icon: Zap,
            logo: "/Images/societies/buzz-logo.jpg",
            color: "bg-blue-800",
            gradient: "from-blue-700 to-blue-900",
            members: 16,
            heads: [
                { name: "Sir Syed Younus", image: "/Images/faculty/syed-younus.jpeg" },
                { name: "Miss Aqsa Rao", image: "/Images/faculty/female-staff.jpeg" },
                { name: "Miss Alishba", image: "/Images/faculty/female-staff.jpeg" },
                { name: "Syed Hasan Rafay", image: "/Images/webdevelop.png" },
            ],
            description: "The Buzz Society is a group of students who work in different teams such as graphics, web development, and photography. Together, they help the college by providing digital support for events and projects. Students use their skills to design posters, manage websites, and take photos. The society helps students learn new skills, work as a team, and support the college digital needs.",
            teams: [
                { name: "Graphics Team" },
                { name: "Web Development Team" },
                { name: "Photography Team" },
                { name: "Magazine Team" }
            ],
            responsibilities: [
                "Design posters and graphics for college events",
                "Manage and maintain college websites",
                "Capture photos and videos of college activities",
                "Provide digital support for events and projects",
                "Help students learn new digital skills"
            ]
        },
        {
            name: "Spark Wing",
            icon: Sparkles,
            logo: "/Images/societies/spirx-logo.jpg",
            color: "bg-green-800",
            gradient: "from-green-800 to-green-900",
            members: 12,
            head: "Prof. Durdana",
            headImage: "/Images/faculty/female-staff.jpeg",
            description: "A Spark Society helps students develop creativity, leadership, and problem-solving skills. It organizes activities, events, and projects that encourage new ideas, teamwork, and personal growth. The society gives students a chance to explore their talents, build confidence, and make a positive impact in the school community.",
            responsibilities: [
                "Develop creativity and leadership skills",
                "Organize activities, events, and projects",
                "Encourage new ideas and innovation",
                "Promote teamwork and personal growth",
                "Build confidence and make positive impact"
            ]
        }
    ]

    return (
        <div className="pt-6 md:pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
                        <span className="text-white font-semibold">Student Societies</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                                <Users size={40} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-2">
                                    Student Societies
                                </h1>
                                <p className="text-white/90 text-lg">Building Leaders, Innovators & Changemakers</p>
                            </div>
                        </div>

                        {/* Session Year Badge */}
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/30 shadow-xl">
                            <p className="text-white/80 text-sm mb-1">Academic Session</p>
                            <p className="text-3xl font-bold text-white">2025 - 2026</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Society Organizer */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-3">
                                <Award className="text-yellow-300" size={28} />
                                <div>
                                    <p className="text-white/80 text-sm">Student Society Organizer</p>
                                    <p className="text-2xl font-bold text-white">Prof. Shabana Malik</p>
                                </div>
                            </div>
                        </div>

                        {/* View Teams Button */}
                        <Link href="/about/societies/teams" className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Users className="text-yellow-300" size={28} />
                                    <div>
                                        <p className="text-white/80 text-sm">View All</p>
                                        <p className="text-2xl font-bold text-white">Society Teams</p>
                                    </div>
                                </div>
                                <ChevronRight className="text-white group-hover:translate-x-2 transition-transform duration-300" size={32} />
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Societies Overview */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Student Societies</h2>
                            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4"></div>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                Empowering students through leadership, creativity, and teamwork
                            </p>
                        </div>

                        {/* Society Cards */}
                        <div className="space-y-8">
                            {societies.map((society, index) => {
                                const Icon = society.icon
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                                    >
                                        {/* Society Header */}
                                        <div className={`bg-gradient-to-r ${society.gradient} p-8 text-white relative overflow-hidden`}>
                                            <div className="absolute top-0 right-0 opacity-10">
                                                <Icon size={200} />
                                            </div>
                                            <div className="relative z-10">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-4">
                                                        {society.logo ? (
                                                            <div className="relative w-20 h-20 bg-white rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
                                                                <Image
                                                                    src={society.logo}
                                                                    alt={`${society.name} Logo`}
                                                                    fill
                                                                    className="object-contain p-2"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                                                <Icon size={32} />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h3 className="text-3xl font-bold">{society.name}</h3>
                                                            <p className="text-white/90">Student Society</p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                                                        <p className="text-sm text-white/80">Total Members</p>
                                                        <p className="text-3xl font-bold">{society.members}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Society Content */}
                                        <div className="p-8">
                                            {/* Head(s) Section */}
                                            <div className="mb-8">
                                                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <UserCheck className={society.color.replace('bg-', 'text-')} size={24} />
                                                    Society {society.heads ? 'Heads' : 'Head'}
                                                </h4>

                                                {society.heads ? (
                                                    <div className="grid md:grid-cols-3 gap-4">
                                                        {society.heads.map((head, idx) => (
                                                            <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                                                                        <Image
                                                                            src={head.image}
                                                                            alt={head.name}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-bold text-gray-900">{head.name}</p>
                                                                        <p className="text-sm text-gray-600">Society Head</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 inline-flex items-center gap-4">
                                                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                                            <Image
                                                                src={society.headImage!}
                                                                alt={society.head!}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-2xl font-bold text-gray-900">{society.head}</p>
                                                            <p className="text-gray-600">Society Head</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Teams (for Buzz Wing only) */}
                                            {society.teams && (
                                                <div className="mb-8">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                        <Target className={society.color.replace('bg-', 'text-')} size={24} />
                                                        Specialized Teams
                                                    </h4>
                                                    <div className="grid md:grid-cols-3 gap-4">
                                                        {society.teams.map((team, idx) => {
                                                            return (
                                                                <div key={idx} className={`bg-gradient-to-br ${society.gradient} rounded-2xl p-6 text-white hover:scale-105 transition-all duration-300`}>

                                                                    <p className="font-bold text-lg">{team.name}</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Description */}
                                            <div className="mb-8">
                                                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <Lightbulb className={society.color.replace('bg-', 'text-')} size={24} />
                                                    About {society.name}
                                                </h4>
                                                <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                                    {society.description}
                                                </p>
                                            </div>

                                            {/* Responsibilities */}
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <Heart className={society.color.replace('bg-', 'text-')} size={24} />
                                                    Key Responsibilities
                                                </h4>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    {society.responsibilities.map((item, idx) => (
                                                        <div key={idx} className="flex items-start gap-3 bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                                                            <ChevronRight className={society.color.replace('bg-', 'text-')} size={20} />
                                                            <span className="text-gray-700">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
