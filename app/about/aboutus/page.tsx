"use client"

import {
    GraduationCap,
    Target,
    Award,
    Users,
    BookOpen,
    ChevronRight,
    Home,
    Calendar,
    Trophy,
    Sparkles,
    Building2,
    Heart
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutUsPage() {
    const faculties = [
        { name: "Computer Science", description: "Teaching important skills and new technologies with dedication" },
        { name: "Pre-Medical", description: "Committed team working hard despite limited resources" },
        { name: "Pre-Engineering", description: "Building strong foundation in Mathematics, Physics, and Chemistry" },
        { name: "Commerce", description: "Quality education in accounting, economics, and business studies" }
    ]

    const departments = [
        { name: "Commerce", head: "Prof. Ghulam Akbar", description: "Trade, finance, accounting, marketing, and economics" },
        { name: "Chemistry", head: "Prof. Naseema Shaheen", description: "Physical, organic, and inorganic chemistry with lab techniques" },
        { name: "Zoology", head: "Dr. Fahim", description: "Animal biology, genetics, ecology, and conservation" },
        { name: "Botany", head: "Dr. Farah Naz", description: "Plant physiology, genetics, evolution, and ecology" },
        { name: "Physics", head: "Prof. Rozina Naz", description: "Mechanics, electromagnetism, and quantum physics" },
        { name: "Mathematics", head: "Prof. Idrees Ahmed", description: "Algebra, calculations, and mathematical modeling" },
        { name: "Urdu", head: "Prof. Durdana", description: "Poetry, prose, and linguistics" },
        { name: "English", head: "Prof. Bushra Sheikh", description: "Literature, language, and writing skills" },
        { name: "Islamiat", head: "Mr. Ali Imran", description: "Quran, Hadith, and Islamic history" },
        { name: "Pakistan Studies", head: "Mr. Tashkeel Ahmed", description: "Politics, independence, and constitution" }
    ]
    const studentActivities = [
        { name: "Picnics", description: "Relax and spend time together, making memories with friends" },
        { name: "Quizzes", description: "Improve knowledge, confidence, and efficient thinking" },
        { name: "Student Week", description: "Fun cultural activities including debates, games, and poetry competitions" },
        { name: "Sports", description: "Cricket, football, tennis, and badminton for health and teamwork" }
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
                        <span className="text-white font-semibold">About Us</span>
                    </nav>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                            <Building2 size={40} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-2">
                                About College
                            </h1>
                            <p className="text-white/90 text-lg">47 Years of Excellence in Education</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-12">

                        {/* History & Establishment */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
                                <div className="flex items-center gap-3">
                                    <Calendar size={32} />
                                    <h2 className="text-3xl font-bold">History & Establishment</h2>
                                </div>
                            </div>
                            <div className="p-8 text-2xl">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    It is indeed a moment of immense pleasure and pride for the college in achieving the milestone of <strong>47 years</strong>.
                                    Govt Science College Malir Cantt was established on <strong>27th September, 1979</strong> with the co-operation of the
                                    governor of Sindh, Lt. S.M. Abbasi. It was housed in three barracks, each barrack consisting of five rooms. The fourth
                                    barrack was acquired in the year 1994.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    The founder Principal, <strong>Prof. Muhammed Rafiq (late)</strong> made a valuable contribution in building the college
                                    from scratch. He laid the foundation of the college on which it continues to flourish till now. Under his principalship,
                                    the college had the honor of securing first position in the intermediate science examination in the year 1983. He also
                                    took out the first issue of college magazine and named it <strong>'Ravish'</strong>. He transformed challenges into
                                    opportunities for growth. His commitment to excellence has inspired both faculty and students alike. Every corner of this
                                    institution reflects his hard work and foresight.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    In <strong>1996</strong>, Government College Malir Cantt became <strong>Government Degree College</strong> where degree
                                    classes such as B.SC, B.A and B.COM were introduced. After facing lots of hardships and problems, it came to be known as
                                    <strong> GOVERNMENT DEGREE COLLEGE MALIR CANTT</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Vision & Mission */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                                    <div className="flex items-center gap-3">
                                        <Target size={28} />
                                        <h3 className="text-2xl font-bold">Vision</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        Our vision is to provide quality education that empowers every student to learn, grow, and achieve their full
                                        potential, regardless of their background. We are committed to offering free and accessible education. We also
                                        provide opportunities to participate in student societies such as Marshals, Buzz, and Photography, helping students
                                        develop leadership, creativity, and teamwork skills.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                                    <div className="flex items-center gap-3">
                                        <Award size={28} />
                                        <h3 className="text-2xl font-bold">Mission</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        The mission of the college is to provide quality and inclusive education that supports students in their academic
                                        and personal growth. The college is committed to offering free and equal access to education, discipline-wise
                                        learning, and opportunities in academics, computer education, and skill development.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Principal Section */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-8 text-white">
                                <div className="flex items-center gap-3">
                                    <GraduationCap size={32} />
                                    <h2 className="text-3xl font-bold">Principal</h2>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Prof. Idrees Ahmed</h3>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        The Principal of Government Degree College Malir Cantt, <strong>Prof. Idrees Ahmed</strong>, has shown remarkable
                                        vision and leadership by introducing the <strong>first-ever digital attendance system and CCTV surveillance</strong> in
                                        a government college, a major milestone in the institution's history. With his guidance, the college became the first
                                        government college to implement these modern systems, ensuring transparency, discipline, and better security across
                                        the campus. His efforts have made the college more organized, safe, and forward-looking for both students and staff.
                                        Through his visionary guidance, the college has achieved significant progress in both academics and administration.
                                    </p>
                                    <div className="bg-white rounded-xl p-6 border-l-4 border-yellow-600">
                                        <p className="text-gray-800 italic text-lg">
                                            "Education is the key that unlocks the doors of possibility, turning curiosity into wisdom and dreams into reality."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Faculties */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
                                <div className="flex items-center gap-3">
                                    <BookOpen size={32} />
                                    <h2 className="text-3xl font-bold">Faculties</h2>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {faculties.map((faculty, index) => (
                                        <div key={index} className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 border border-indigo-200">
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">Faculty of {faculty.name}</h4>
                                            <p className="text-gray-700">{faculty.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Departments */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
                                <div className="flex items-center gap-3">
                                    <Building2 size={32} />
                                    <h2 className="text-3xl font-bold">Departments</h2>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {departments.map((dept, index) => (
                                        <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                                            <h4 className="text-xl font-bold text-gray-900 mb-1">Department of {dept.name}</h4>
                                            <p className="text-sm text-cyan-600 font-semibold mb-2">Head: {dept.head}</p>
                                            <p className="text-gray-700 text-sm">{dept.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Student Life */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-3xl font-bold">Student Life</h2>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Government Degree College Malir Cantt provides students with a variety of extracurricular activities to enhance their
                                    overall development. Events like Students' Week allow students to display their talents through cultural programs, debates,
                                    and competitions, encouraging creativity and teamwork. Sports activities, such as cricket, football, and athletics, help
                                    students stay physically fit while promoting discipline, teamwork, and a spirit of healthy competition.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {studentActivities.map((activity, index) => (
                                        <div key={index} className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 border border-pink-200">
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">{activity.name}</h4>
                                            <p className="text-gray-700 text-sm">{activity.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
        </div>
    )
}
