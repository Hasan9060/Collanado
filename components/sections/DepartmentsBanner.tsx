import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FlaskConical,
  Calculator,
  Atom,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const departments = [
  {
    name: "Chemistry",
    icon: FlaskConical,
    bg: "bg-purple-700",
    desc: "Advanced chemical sciences with modern labs.",
    slug: "chemistry",
  },
  {
    name: "Mathematics",
    icon: Calculator,
    bg: "bg-red-600",
    desc: "Analytical thinking and problem-solving skills.",
    slug: "mathematics",
  },
  {
    name: "Physics",
    icon: Atom,
    bg: "bg-blue-600",
    desc: "Exploring matter, energy, and the universe.",
    slug: "physics",
  },
  {
    name: "Computer Science",
    icon: BookOpen,
    bg: "bg-emerald-600",
    desc: "Computing, programming, and modern technology.",
    slug: "computerscience",
  },
];

export default function DepartmentsBanner() {
  return (
    <section className={cn(jakarta.className, "w-full py-14 bg-slate-50")}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl text-center font-extrabold text-slate-900">
            Our Departments
          </h2>

          <Link
            href="/about/departments"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {departments.map((dept) => (
            <Link
              key={dept.name}
              href={`/about/departments/${dept.slug}`}
              className="group"
            >
              <div
                className={cn(
                  "relative h-full rounded-2xl p-6 text-white overflow-hidden transition-transform duration-300 hover:-translate-y-1",
                  dept.bg
                )}
              >
                {/* IMAGE BACKGROUND */}
                <Image
                  src="/Images/home/rose-flowers.png"
                  alt=""
                  width={220}
                  height={220}
                  className="absolute -right-12 top-12 md:left-28 md:top-12 object-contain opacity-15 pointer-events-none"
                />

                {/* CONTENT */}
                <div className="relative z-10">
                  {/* icon */}
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
                    <dept.icon size={26} />
                  </div>

                  {/* text */}
                  <h3 className="text-lg font-bold mb-2 leading-tight">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-white/90 mb-6">
                    {dept.desc}
                  </p>

                  {/* read more */}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    Read More
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE VIEW ALL */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/about/departments"
            className="inline-flex items-center gap-2 text-sm font-bold text-red-600"
          >
            View All Departments
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
