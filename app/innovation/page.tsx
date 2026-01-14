"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    Zap, Target, Cpu, Handshake, Trophy, Users2,
    ShieldCheck, Fingerprint, LineChart, Laptop,
    Flame, Radio, Shield, Rocket, Network
} from "lucide-react";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["700", "900"],
});

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

export default function InnovationPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* --- Hero Section --- */}
            <section className="bg-red-700 relative h-[60vh] flex items-center justify-center overflow-hidden">

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={cn(outfit.className, "text-5xl md:text-7xl font-black text-white mb-6 tracking-tight")}
                    >
                        INNOVATION
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className={cn(jakarta.className, "text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed")}
                    >
                        Transforming the educational landscape through technology, discipline, and strategic development.
                    </motion.p>
                </div>
            </section>

            {/* --- Vision & Mission --- */}
            <section className="py-24 px-4 bg-white relative -mt-20 z-20">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div {...fadeInUp} className="bg-gradient-to-br from-red-50 to-white p-8 md:p-12 rounded-[2rem] border border-red-100 shadow-xl shadow-red-900/5 group hover:shadow-2xl hover:shadow-red-900/10 transition-all">
                            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-red-600/30 transform group-hover:rotate-12 transition-transform">
                                <Target size={32} />
                            </div>
                            <h2 className={cn(outfit.className, "text-3xl font-bold text-gray-900 mb-6")}>Vision Statement</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To transform the educational experience at Government College Malir Cantt by providing a quality education that is individually focused and comprehensive. We aim to polish every student to the high standards seen in private colleges and prepare them for future success through a highly disciplined and supportive environment.
                            </p>
                        </motion.div>

                        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-yellow-50 to-white p-8 md:p-12 rounded-[2rem] border border-yellow-100 shadow-xl shadow-yellow-900/5 group hover:shadow-2xl hover:shadow-yellow-900/10 transition-all">
                            <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-yellow-600/30 transform group-hover:rotate-12 transition-transform">
                                <Rocket size={32} />
                            </div>
                            <h2 className={cn(outfit.className, "text-3xl font-bold text-gray-900 mb-6")}>Mission Statement</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To ensure every student becomes capable of self-discovery. We strive to create an environment where students can search for and identify their unique skills while they study, thereby empowering them to find their true path and purpose after graduation in this competitive world of technology.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Projects & Solutions --- */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="text-red-600 font-bold tracking-widest uppercase text-sm">Strategic Improvements</span>
                        <h2 className={cn(outfit.className, "text-4xl md:text-5xl font-black text-gray-900 mt-2")}>PROJECTS</h2>
                        <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6 rounded-full" />
                    </div>

                    <div className="space-y-24">
                        {/* Digital Attendance */}
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <motion.div {...fadeInUp} className="flex-1">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-red-600 font-bold">
                                        <Fingerprint size={24} />
                                        <span className="uppercase tracking-widest text-sm">Smart Systems</span>
                                    </div>
                                    <h3 className={cn(outfit.className, "text-3xl md:text-4xl font-bold text-gray-900")}>Digital Attendance System</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Implementation of a state-of-the-art barcode scanning system for student arrival. This mechanism ensures real-time transparency regarding student attendance.
                                    </p>
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm inline-block">
                                        <div className="flex items-start gap-4">
                                            <div>
                                                <h4 className="font-bold text-gray-900">Message to Parentes </h4>
                                                <p className="text-sm text-gray-500">Immediate notifications are sent to parents, ensuring mutual assurance and security.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="flex-1 relative">
                                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden">
                                    <Image src="/Images/innovation/digital-attendance.jpeg" alt="Digital Attendance" fill className="rounded-full object-cover" />
                                </div>
                            </motion.div>
                        </div>

                        {/* CCTV */}
                        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                            <motion.div {...fadeInUp} className="flex-1">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-blue-600 font-bold">
                                        <ShieldCheck size={24} />
                                        <span className="uppercase tracking-widest text-sm">Security & Safety</span>
                                    </div>
                                    <h3 className={cn(outfit.className, "text-3xl md:text-4xl font-bold text-gray-900")}>CCTV Surveillance Network</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        A comprehensive campus-wide security implementation monitoring every classroom, corridor, and entrance gate.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "Enhanced student safety & belonging security",
                                            "Protected and controlled learning environment",
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-700 font-medium font-bold">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="flex-1 relative">
                                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden">
                                    <Image src="/Images/innovation/cctv-surveillance.jpeg" alt="CCTV Surveillance" fill className="rounded-full object-cover" />
                                </div>
                            </motion.div>
                        </div>

                        

                        {/* Academics */}
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <motion.div {...fadeInUp} className="flex-1">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-yellow-600 font-bold">
                                        <Trophy size={24} />
                                        <span className="uppercase tracking-widest text-sm">Academic Monitoring</span>
                                    </div>
                                    <h3 className={cn(outfit.className, "text-3xl md:text-4xl font-bold text-gray-900")}>Compulsory Examination Pattern</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Introduction of a mandatory, year-long assessment structure that fostered a culture of sustained studying and historic achievements.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                                            <p className="font-bold text-yellow-700">Monthly Tests</p>
                                            <p className="text-xs text-yellow-600 italic">Continuous feedback</p>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                                            <p className="font-bold text-red-700">1st Position</p>
                                            <p className="text-xs text-red-600 italic">Board Achievement</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="flex-1 flex gap-4 h-[400px]">
                                <div className="flex-1 bg-gray-100 rounded-[2rem] overflow-hidden relative">
                                    <Image src="/Images/hero/hero-image-5.png" alt="Students Studying" fill className="object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="flex-1 bg-red-100 rounded-[2rem] overflow-hidden relative">
                                        <Image src="/Images/hero/hero-image-2.png" alt="Academic Excellence" fill className="object-cover" />
                                    </div>
                                    <div className="h-1/3 bg-red-600 rounded-[2rem] flex items-center justify-center text-white text-center p-4">
                                        <p className="font-bold text-xs uppercase tracking-widest">Excellence Guaranteed</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Library */}
<div className="flex flex-col lg:flex-row items-center gap-16">
  <motion.div {...fadeInUp} className="flex-1">
    <div className="space-y-6">
      <div className="flex items-center gap-4 text-emerald-600 font-bold">
        <span className="uppercase tracking-widest text-sm">
          Learning Resources
        </span>
      </div>

      <h3
        className={cn(
          outfit.className,
          "text-3xl md:text-4xl font-bold text-gray-900"
        )}
      >
        Central College Library
      </h3>

      <p className="text-gray-600 text-lg leading-relaxed">
        The Goverment Degree College Malir Cantt library is housed in a spacious and well-organized section
        of the college building, providing a calm and resource-rich environment
        for study, reading, and academic research.
      </p>

      <ul className="space-y-4">
        {[
          "Extensive collection of prescribed and reference books",
          "Periodicals and journals recommended by BIEK",
          "Standard books in Science, Engineering, and Commerce",
          "Systematically arranged resources for easy access"
        ].map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 text-gray-700 font-medium"
          >
            <div className="w-2 h-2 bg-emerald-600 rounded-full" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>

  <motion.div
    {...fadeInUp}
    transition={{ delay: 0.2 }}
    className="flex-1 relative"
  >
    <div className="aspect-[4/3] rounded-[3rem] overflow-hidden">
      <Image
        src="/Images/innovation/library.jpeg"
        alt="College Library"
        fill
        className="rounded-full object-cover"
      />
    </div>
  </motion.div>
</div>

                </div>
            </section>

           

            {/* --- Collaborations --- */}
            <section className="py-24 bg-green-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-green-600 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-green-800 blur-3xl rounded-full" />
                </div>
                <div className="container mx-auto px-4 relative z-10 font-bold">
                    <div className="text-center mb-16">
                        <h2 className={cn(outfit.className, "text-4xl md:text-5xl font-black text-white mt-2 uppercase")}>COLLABORATIONS</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                org: "Chhaon Organization Pakistan",
                                action: "Vast plant donation & college beautification",
                                impact: "Enhanced campus ambience with fruits and vegetables.",
                                icon: Network
                            },
                            {
                                org: "Quiz Society of Hafiz Naseem Uddin",
                                action: "All Pakistan Quiz Society Collaboration",
                                impact: "Demonstrated student brilliance at national talent platforms.",
                                icon: Trophy
                            },
                            {
                                org: "25th Mechanized Division Malir Cantt",
                                action: "Distinguished Army Unit Partnership",
                                impact: "Legacy of cooperation with military leadership for student development.",
                                icon: ShieldCheck
                            }
                        ].map((col, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/20 transition-all group"
                            >
                                <div className="w-12 h-12 bg-white text-red-900 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                                    <col.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 italic uppercase">{col.org}</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <Handshake className="text-red-400 shrink-0" size={18} />
                                        <p className="text-red-100 text-sm leading-snug">{col.action}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <LineChart className="text-red-400 shrink-0" size={18} />
                                        <p className="text-white/80 text-sm leading-snug">{col.impact}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 py-8 border-y border-white/10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 opacity-60">
                        <span className="text-white font-bold tracking-widest text-xs uppercase px-4 py-2 border border-white/20 rounded-lg">Innovation Driven</span>
                        <span className="text-white font-bold tracking-widest text-xs uppercase px-4 py-2 border border-white/20 rounded-lg">Excellence Mindset</span>
                        <span className="text-white font-bold tracking-widest text-xs uppercase px-4 py-2 border border-white/20 rounded-lg">Future Ready</span>
                    </div>
                </div>
            </section>
        </main>
    );
}
