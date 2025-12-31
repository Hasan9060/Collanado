"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
    Home,
    ChevronRight,
    Award,
    BookOpen,
    Users,
    Target,
} from "lucide-react"
import { departmentsData } from "../departmentsData"


export default function DepartmentPage({ params }: { params: { slug: string } }) {
    const department = departmentsData[params.slug as keyof typeof departmentsData]

    if (!department) {
        notFound()
    }

    const Icon = department.icon

    return (
        <div className="min-h-screen bg-white">
            {/* ===== Header with Hero Image ===== */}
            <header className="pt-28 pb-0 relative">
                <div className="relative h-[400px] overflow-hidden">
                    <Image
                        src={department.image}
                        alt={department.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-4">
                            <nav className="flex items-center space-x-2 mb-6 text-sm text-white/90">
                                <Link href="/" className="flex items-center hover:text-white transition">
                                    <Home size={16} />
                                    <span className="ml-1">Home</span>
                                </Link>
                                <ChevronRight size={16} />
                                <Link href="/departments" className="hover:text-white transition">
                                    Departments
                                </Link>
                                <ChevronRight size={16} />
                                <span className="text-white font-semibold">{department.name}</span>
                            </nav>

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-20 h-20 ${department.color} rounded-2xl flex items-center justify-center text-white shadow-2xl`}>
                                    <Icon size={40} />
                                </div>
                                <div>
                                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
                                        {department.name}
                                    </h1>
                                    <p className="text-white/90 text-lg">Department of {department.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ===== Department Info ===== */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <BookOpen className="text-red-600" size={32} />
                                About the Department
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                {department.description}
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Target className="text-red-600" size={24} />
                                        Our Vision
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {department.vision}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Award className="text-red-600" size={24} />
                                        Objectives
                                    </h3>
                                    <ul className="space-y-2">
                                        {department.objectives.map((obj, index) => (
                                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                                                <span>{obj}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Faculty Section ===== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                            <Users className="text-red-600" size={36} />
                            Our Faculty
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4" />
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Meet our dedicated and experienced faculty members
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {department.teachers.map((teacher, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                            >
                                <div className="relative h-64 overflow-hidden bg-gray-100">
                                    <Image
                                        src={teacher.image}
                                        alt={teacher.name}
                                        fill
                                        className="object-fill group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {teacher.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
