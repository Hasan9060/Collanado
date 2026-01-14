"use client";

import { motion } from "framer-motion";
import { Download, FileText, ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { downloadCategories } from "@/lib/downloads-data";
import { Button } from "@/components/ui/button";

export default function DownloadsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCategories = downloadCategories.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            {/* Header Section */}
            <section className="container px-4 mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black text-blue-950 mb-6 tracking-tighter">
                        Student <span className="text-red-700">Downloads</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-medium">
                        Access all the necessary BIEK forms, registration documents, and verification applications in one place.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute inset-0 bg-red-100 blur-xl opacity-50 group-hover:opacity-100 transition-opacity rounded-full"></div>
                        <div className="relative flex items-center bg-white border-2 border-gray-100 group-focus-within:border-red-500 rounded-2xl px-6 py-4 shadow-xl transition-all">
                            <Search className="text-gray-400 mr-4" size={24} />
                            <input
                                type="text"
                                placeholder="Search for a form (e.g., Migration, Certificate)..."
                                className="bg-transparent border-none outline-none w-full text-lg font-medium text-gray-800 placeholder:text-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Categories Section */}
            <div className="container px-4 mx-auto">
                <div className="space-y-20">
                    {filteredCategories.map((category, catIdx) => (
                        <motion.section
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                        >
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                                <div>
                                    <h2 className="text-3xl font-black text-blue-900 mb-2 tracking-tight flex items-center gap-3">
                                        <div className="w-10 h-2 bg-red-600 rounded-full"></div>
                                        {category.title}
                                    </h2>
                                    <p className="text-lg text-gray-500 font-medium">{category.description}</p>
                                </div>
                                <div className="hidden md:block h-[2px] flex-1 bg-gray-200 ml-8 mb-4 opacity-50"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((item, itemIdx) => (
                                    <motion.div
                                        key={item.name}
                                        whileHover={{ y: -5 }}
                                        className="group bg-white rounded-3xl p-6 border-2 border-transparent hover:border-red-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="p-4 bg-red-50 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                                <item.icon size={28} strokeWidth={2.5} />
                                            </div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors">
                                                PDF FORM
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-black text-gray-800 mb-6 group-hover:text-red-700 transition-colors leading-tight">
                                            {item.name}
                                        </h3>

                                        <Link href={item.href}>
                                            <Button className="w-full bg-gray-50 hover:bg-red-700 text-gray-700 hover:text-white border-none shadow-none h-12 rounded-xl flex items-center justify-between px-5 font-bold transition-all">
                                                <span>Download Now</span>
                                                <Download size={18} />
                                            </Button>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ))}

                    {filteredCategories.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-2xl text-gray-400 font-bold">No forms found matching "{searchQuery}"</p>
                            <Button
                                variant="ghost"
                                onClick={() => setSearchQuery("")}
                                className="mt-4 text-red-600 hover:text-red-700"
                            >
                                Clear Search
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Need Help Section */}
            <section className="container px-4 mx-auto mt-32">
                <div className="bg-blue-950 rounded-[3rem] p-12 relative overflow-hidden text-center text-white shadow-2xl">
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight relative z-10">
                        Need Help with Form Submission?
                    </h2>
                    <p className="text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto font-medium relative z-10">
                        Our administration desk is open from Monday to Saturday (9:00 AM - 2:00 PM) to assist you with any registration or verification queries.
                    </p>
                    <Link href="/contact">
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-black h-14 px-10 rounded-xl relative z-10 transition-transform hover:scale-105 active:scale-95 uppercase tracking-widest">
                            Contact Administration
                            <ExternalLink size={18} className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
