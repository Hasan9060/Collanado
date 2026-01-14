"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { programsData, ProgramSlug } from "../program-data";
import { Button } from "@/components/ui/button";

export default function ProgramPage() {
    const params = useParams();
    const slug = params.slug as ProgramSlug;
    const program = programsData[slug];

    if (!program) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={program.bgImage}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>

                <div className="container relative z-10 px-4 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-2xl">
                            {program.title}
                        </h1>
                        <p className="text-xl md:text-2xl font-medium tracking-wide text-yellow-400 drop-shadow-md">
                            {program.tagline}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-8 tracking-tight">
                            Introduction
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 italic">
                            {program.introduction}
                        </p>
                        <Link href="/contact">
                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-14 px-10 rounded-xl shadow-lg shadow-yellow-200 transition-all hover:-translate-y-1 uppercase tracking-widest">
                                Enroll Here !
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Program Details Grid */}
            <section className="py-16">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Compulsory Subjects */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-emerald-700 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Check size={80} />
                            </div>
                            <h3 className="text-2xl font-black mb-8 border-b border-emerald-600 pb-4 tracking-tight">
                                Compulsory Subjects
                            </h3>
                            <ul className="space-y-4">
                                {program.compulsory.map((subject, idx) => (
                                    <li key={idx} className="flex items-center gap-3 font-bold group/item">
                                        <div className="bg-yellow-400 p-1 rounded-md text-emerald-900 shadow-lg group-hover/item:scale-110 transition-transform">
                                            <Check size={14} className="stroke-[4px]" />
                                        </div>
                                        <span className="text-emerald-50">{subject}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Elective Subjects */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-yellow-500 text-blue-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Check size={80} />
                            </div>
                            <h3 className="text-2xl font-black mb-8 border-b border-yellow-600 pb-4 tracking-tight">
                                Elective Subjects
                            </h3>
                            <ul className="space-y-4">
                                {program.electiveGroups.map((group, idx) => (
                                    <li key={idx} className="flex items-center gap-3 font-bold group/item">
                                        <div className="bg-blue-900 p-1 rounded-md text-yellow-400 shadow-lg group-hover/item:scale-110 transition-transform">
                                            <Check size={14} className="stroke-[4px]" />
                                        </div>
                                        <span className="leading-tight text-blue-900/90">{group}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Eligibility */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-blue-900 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Check size={80} />
                            </div>
                            <h3 className="text-2xl font-black mb-8 border-b border-blue-800 pb-4 tracking-tight">
                                Eligibility
                            </h3>
                            <div className="flex items-start gap-4 font-bold group/item">
                                <div className="bg-yellow-400 p-1.5 rounded-md text-blue-900 shadow-lg mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                    <Check size={16} className="stroke-[4px]" />
                                </div>
                                <p className="text-lg leading-relaxed text-blue-50">
                                    {program.eligibility}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Decoration background from image */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                    <div className="text-[20rem] font-black rotate-[-15deg]">GDCMC</div>
                </div>

                <div className="container relative z-10 px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-blue-950 mb-4 tracking-tighter">
                            ADMISSIONS <span className="text-emerald-600">OPEN</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-bold mb-12 uppercase tracking-[0.2em]">
                            Join GDCMC and be a part of progressing future
                        </p>

                        <Link href="/contact">
                            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white font-black h-16 px-12 text-lg rounded-xl shadow-2xl flex items-center gap-3 mx-auto transition-transform hover:scale-105 active:scale-95 uppercase tracking-widest">
                                Enroll Here !
                                <ArrowRight className="h-6 w-6" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
