"use client"

import {
    Clock,
    ShirtIcon,
    Users,
    BookOpen,
    AlertCircle,
    Shield,
    Smartphone,
    Building2,
    UserCheck,
    Ban,
    FileText,
    ChevronRight,
    Home,
    Calendar,
    GraduationCap
} from "lucide-react"
import Link from "next/link"

export default function RulesPage() {
    const uniformColors = [
        { field: "Computer Science", color: "Maroon", bgColor: "bg-red-900", textColor: "text-red-900" },
        { field: "Pre-Medical", color: "Green", bgColor: "bg-green-600", textColor: "text-green-600" },
        { field: "Pre-Engineering", color: "Blue", bgColor: "bg-blue-600", textColor: "text-blue-600" },
        { field: "Commerce", color: "Brown", bgColor: "bg-amber-800", textColor: "text-amber-800" },
    ]

    const rules = [
        {
            icon: Users,
            title: "Attendance & Presence",
            color: "bg-blue-600",
            items: [
                "Students must remain present during official college hours",
                "75% attendance is mandatory for examination eligibility",
                "Leaving classrooms, laboratories, or campus without permission is prohibited"
            ]
        },
        {
            icon: UserCheck,
            title: "Discipline & Conduct",
            color: "bg-green-600",
            items: [
                "Discipline, good behavior, and moral conduct must be maintained at all times",
                "Respect towards teachers and college staff is compulsory",
                "Immoral activities or inappropriate dressing are not allowed"
            ]
        },
        {
            icon: Building2,
            title: "College Property",
            color: "bg-purple-600",
            items: [
                "Any damage to college buildings, furniture, or property is strictly prohibited",
                "Writing or marking on walls, benches, or any college property is forbidden",
                "Students are responsible for maintaining cleanliness"
            ]
        },
        {
            icon: Smartphone,
            title: "Mobile & Technology",
            color: "bg-orange-600",
            items: [
                "Unnecessary use of mobile phones inside the college is not allowed",
                "Electronic devices should be used only when permitted",
                "Photography/recording without permission is prohibited"
            ]
        },
        {
            icon: Ban,
            title: "Prohibited Activities",
            color: "bg-red-600",
            items: [
                "Political activities, slogans, or gatherings are strictly banned",
                "Fighting or physical altercations of any kind are strictly prohibited",
                "Bringing unauthorized or unknown persons into the college is not allowed",
                "Cheating during classes or examinations is a serious offense"
            ]
        },
        {
            icon: Shield,
            title: "General Rules",
            color: "bg-indigo-600",
            items: [
                "Making noise, misbehavior, or disturbance during classes is prohibited",
                "Students must obey all instructions issued by the college administration",
                "Disciplinary action will be taken in case of rule violations"
            ]
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
                        <span className="text-white font-semibold">Rules & Regulations</span>
                    </nav>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                            <FileText size={40} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-2">
                                Rules & Regulations
                            </h1>
                            <p className="text-white/90 text-lg">Academic Guidelines</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* College Timings Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100 shadow-lg">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <Clock className="text-white" size={24} />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">College Timings</h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Calendar className="text-blue-600" size={24} />
                                        <h3 className="font-bold text-gray-900">College Hours</h3>
                                    </div>
                                    <p className="text-3xl font-bold text-blue-600">8:30 AM - 1:20 PM</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <GraduationCap className="text-green-600" size={24} />
                                        <h3 className="font-bold text-gray-900">Assembly Time</h3>
                                    </div>
                                    <p className="text-3xl font-bold text-green-600">8:30 AM - 8:40 AM</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-red-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <AlertCircle className="text-red-600" size={24} />
                                        <h3 className="font-bold text-gray-900">Entry Deadline</h3>
                                    </div>
                                    <p className="text-3xl font-bold text-red-600">9:00 AM</p>
                                    <p className="text-sm text-gray-600 mt-2">No entry after this time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Uniform Requirements Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                            <div className="flex items-center gap-3 mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Uniform Requirements</h2>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
                                <p className="text-lg font-semibold text-gray-900">
                                    ⚠️ Proper uniform and wearing ID card is mandatory in college.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                {/* Boys Uniform */}
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                                        <Users size={24} />
                                        For Boys
                                    </h3>
                                    <ul className="space-y-3">
                                        {["White shirt", "Grey pant", "Tie", "Black school shoes"].map((item, index) => (
                                            <li key={index} className="flex items-center gap-3 text-gray-700">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                <span className="font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Girls Uniform */}
                                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border border-pink-200">
                                    <h3 className="text-2xl font-bold text-pink-900 mb-6 flex items-center gap-2">
                                        <Users size={24} />
                                        For Girls
                                    </h3>
                                    <ul className="space-y-3">
                                        {["White shirt", "White trousers", "Faculty coloured scarf", "Black school shoes"].map((item, index) => (
                                            <li key={index} className="flex items-center gap-3 text-gray-700">
                                                <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                                                <span className="font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Color Allotment */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Scarf Colour Allotment by Field (For Girls)</h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {uniformColors.map((item, index) => (
                                        <div key={index} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-gray-300">
                                            <div className={`w-full h-3 ${item.bgColor} rounded-full mb-4`}></div>
                                            <p className="font-bold text-gray-900 mb-1">{item.field}</p>
                                            <p className={`text-sm font-semibold ${item.textColor}`}>{item.color} Scarf</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rules Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Academic Rules & Code of Conduct</h2>
                            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {rules.map((category, index) => {
                                const Icon = category.icon
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                                    >
                                        <div className={`${category.color} p-6 text-white`}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                                    <Icon size={24} />
                                                </div>
                                                <h3 className="text-2xl font-bold">{category.title}</h3>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <ul className="space-y-4">
                                                {category.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                        <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={18} />
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Note Section */}
            <section className="py-12 bg-gradient-to-br from-red-50 to-orange-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-red-200">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <AlertCircle className="text-white" size={32} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Important Notice</h2>
                                    <p className="text-gray-600">Please read carefully</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-8 border-l-4 border-red-600">
                                <p className="text-lg text-gray-800 leading-relaxed">
                                    <span className="font-bold text-red-700">In case of violation of these rules,</span> the College Principal has the authority to take strict disciplinary action, which may include suspension or expulsion from the college.
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-3 text-gray-600">
                                <BookOpen size={20} />
                                <p className="text-sm">
                                    For any queries, please contact the college administration
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
