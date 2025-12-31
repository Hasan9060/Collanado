"use client"

import {
    MapPin,
    Navigation,
    Shield,
    CreditCard,
    Bus,
    ChevronRight,
    Home,
    Clock,
    Info,
    CheckCircle,
    AlertCircle,
    Zap
} from "lucide-react"
import Link from "next/link"

export default function LocationPage() {
    const locationDetails = [
        {
            icon: MapPin,
            title: "College Address",
            description: "E Malir Cantt Road, Malir Cantonment, Karachi, Sindh, Pakistan",
            color: "from-red-600 to-red-700",
            iconBg: "bg-red-100",
            iconColor: "text-red-600"
        },
        {
            icon: Navigation,
            title: "Nearby Landmark",
            description: "Near Cantt Bazaar in the cantonment area",
            color: "from-blue-600 to-blue-700",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            icon: Shield,
            title: "Cantonment Area",
            description: "Located within Malir Cantonment, a secure military-administered zone",
            color: "from-green-600 to-green-700",
            iconBg: "bg-green-100",
            iconColor: "text-green-600"
        }
    ]

    const entryRequirements = [
        {
            icon: CreditCard,
            title: "CNIC Required",
            description: "Present your CNIC at the gate for entry verification"
        },
        {
            icon: CheckCircle,
            title: "Vehicle Documents",
            description: "Keep your vehicle registration documents ready"
        },
        {
            icon: Shield,
            title: "Cantt Pass for Students",
            description: "Students must have a valid Cantonment Pass for entry"
        },
        {
            icon: Clock,
            title: "Frequent Visitor Pass",
            description: "Regular visitors can obtain a pass for smoother routine entry"
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
                        <span className="text-white font-semibold">Location</span>
                    </nav>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                            <MapPin size={40} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-2">
                                College Location
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Location Cards */}
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {locationDetails.map((detail, index) => {
                                const Icon = detail.icon
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                                    >
                                        <div className={`bg-gradient-to-r ${detail.color} p-6 text-white relative overflow-hidden`}>
                                            <div className="absolute top-0 right-0 opacity-10">
                                                <Icon size={120} />
                                            </div>
                                            <div className={`w-14 h-14 ${detail.iconBg} rounded-2xl flex items-center justify-center mb-4 relative z-10`}>
                                                <Icon size={28} className={detail.iconColor} />
                                            </div>
                                            <h3 className="text-2xl font-bold relative z-10">{detail.title}</h3>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-gray-700 leading-relaxed">{detail.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Map Section */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
                            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                                <div className="flex items-center gap-3">
                                    <MapPin size={32} />
                                    <div>
                                        <h2 className="text-3xl font-bold">Campus Map</h2>
                                        <p className="text-white/90">Government Degree Science & Commerce College - Malir Cantonment</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative w-full h-[500px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.8234567890123!2d67.2005876!3d24.9235356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3379d3f7c276f%3A0x1e15e5fc061ae2a4!2sGovernment%20Degree%20Science%20%26%20Commerce%20College%20-%20Malir%20Cantonment!5e0!3m2!1sen!2s!4v1735449299000!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                            <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
                                <a
                                    href="https://www.google.com/maps/place/Government+Degree+Science+%26+Commerce+College+-+Malir+Cantonment/@24.9239119,67.2018876,18.25z/data=!4m10!1m2!2m1!1sgovt+degree+college+malir+cantt!3m6!1s0x3eb3379d3f7c276f:0x1e15e5fc061ae2a4!8m2!3d24.9235356!4d67.2027669!15sCh9nb3Z0IGRlZ3JlZSBjb2xsZWdlIG1hbGlyIGNhbnR0kgESZ292ZXJubWVudF9jb2xsZWdl4AEA!16s%2Fm%2F0cr567z?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <Navigation size={20} />
                                    Open in Google Maps
                                </a>
                            </div>
                        </div>

                        {/* Entry Requirements */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
                            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 opacity-10">
                                    <Shield size={200} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <AlertCircle size={32} />
                                        <h2 className="text-3xl font-bold">Cantonment Entry Requirements</h2>
                                    </div>
                                    <p className="text-white/90 text-lg">Important documents needed for entry</p>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {entryRequirements.map((req, index) => {
                                        const Icon = req.icon
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <Icon size={24} className="text-yellow-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 mb-1">{req.title}</h4>
                                                    <p className="text-gray-600 text-sm">{req.description}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-2xl">
                                    <div className="flex items-start gap-3">
                                        <Info className="text-yellow-600 flex-shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">Important Note</h4>
                                            <p className="text-gray-700">
                                                Entry into the cantonment requires presenting your CNIC and vehicle documents at the gate.
                                                Students are also required to have a valid Cantt Pass to enter. Frequent visitors can use
                                                a cantonment pass to make routine entry smoother.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Travel & Accessibility */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 opacity-10">
                                    <Bus size={200} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Bus size={32} />
                                        <h2 className="text-3xl font-bold">Travel & Accessibility</h2>
                                    </div>
                                    <p className="text-white/90 text-lg">Convenient transport options to reach the campus</p>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border-2 border-green-200">
                                    <div className="flex items-start gap-6">
                                        <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <Zap size={40} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">EV-1 Electric Bus</h3>
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                For travel, you can use the <strong>EV-1 electric bus</strong>. It is a convenient and
                                                reliable public transport option, and it drops passengers directly in front of the college,
                                                making it easy for students and visitors to reach the campus.
                                            </p>
                                            <div className="flex flex-wrap gap-3">
                                                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
                                                    <CheckCircle size={18} />
                                                    Eco-Friendly
                                                </div>
                                                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
                                                    <CheckCircle size={18} />
                                                    Direct Drop-off
                                                </div>
                                                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
                                                    <CheckCircle size={18} />
                                                    Reliable Service
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Transport Info */}
                                <div className="mt-6 grid md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <Bus className="text-blue-600" size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-1">Public Transport</h4>
                                        <p className="text-gray-600 text-sm">Multiple bus routes available</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <Navigation className="text-purple-600" size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-1">Easy Navigation</h4>
                                        <p className="text-gray-600 text-sm">Well-connected location</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <MapPin className="text-red-600" size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-1">Prime Location</h4>
                                        <p className="text-gray-600 text-sm">Near Cantt Bazaar</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
