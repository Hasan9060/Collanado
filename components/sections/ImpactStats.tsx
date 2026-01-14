"use client";

import { useEffect, useState, useRef } from "react";
import { Users, GraduationCap, Calendar } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasStarted) return;

        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [hasStarted, value]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

export default function ImpactStats() {
    const currentYear = new Date().getFullYear();
    const startYear = 1979;
    const yearsOfLegacy = currentYear - startYear;

    const stats = [
        {
            label: "TOTAL STUDENTS",
            value: 50000,
            suffix: "+",
            icon: Users,
            description: `since ${startYear} - ${currentYear}`,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            label: "YEARS OF LEGACY",
            value: yearsOfLegacy,
            suffix: "",
            icon: Calendar,
            description: `${startYear} - ${currentYear}`,
            color: "text-red-600",
            bg: "bg-red-50",
        },
        {
            label: "EXPERT FACULTY",
            value: 60,
            suffix: "+",
            icon: GraduationCap,
            description: "Dedicated Professionals",
            color: "text-green-600",
            bg: "bg-green-50",
        },
    ];

    return (
        <section className={cn(jakarta.className, "py-16 sm:py-24 bg-white relative overflow-hidden")}>
            {/* Decorative Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 transition-all duration-700">
                        Our Impact Since <span className="text-red-600">{startYear}</span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Tracing a legacy of academic excellence and student success from the very beginning to the modern era.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300 text-center flex flex-col items-center group"
                        >
                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-[360deg]", stat.bg)}>
                                <stat.icon className={cn("w-8 h-8", stat.color)} />
                            </div>

                            <div className="mb-2">
                                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                                    <Counter value={stat.value} suffix={stat.suffix} />
                                </span>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                                    {stat.label}
                                </p>
                                <p className="text-sm font-medium text-slate-500">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
