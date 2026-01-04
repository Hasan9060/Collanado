"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

import { Rancho } from "next/font/google";

const rancho = Rancho({
  weight: "400",
  subsets: ["latin"],
});

import { facultyData, Teacher } from "./faculty";
import Link from "next/link";

// ====================================================
// MAIN COMPONENT
// ====================================================
export default function FacultyDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Get all categories for filter
  const categories = useMemo(() => ["All", ...Object.keys(facultyData)], []);

  // Filter logic
  const filteredFaculty = useMemo(() => {
    if (!searchTerm.trim() && selectedCategory === "All") return facultyData;

    const term = searchTerm.toLowerCase();
    const result: Record<string, Teacher[]> = {};

    Object.entries(facultyData).forEach(([category, list]) => {
      if (selectedCategory !== "All" && selectedCategory !== category) return;

      const match = list.filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          f.position.toLowerCase().includes(term) ||
          f.department.toLowerCase().includes(term)
      );

      if (match.length) result[category] = match;
    });

    return result;
  }, [searchTerm, selectedCategory]);

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-yellow-50">
      {/* Enhanced HEADER with modern design */}
      <header className="relative bg-gradient-to-r from-red-800 to-red-900 shadow-2xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12 lg:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Faculty Directory
            </h1>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Meet our distinguished faculty members who are dedicated to excellence in education and research
            </p>

            {/* Enhanced SEARCH */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, position, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-2xl focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                />
                <svg
                  className="absolute left-5 top-4 h-6 w-6 text-red-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-red-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                  ? "bg-red-800 text-white shadow-lg shadow-red-800/30"
                  : "bg-white text-gray-700 border border-red-200 hover:bg-red-50 hover:border-red-300 hover:text-red-800"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main className="container mx-auto px-4 py-12">
        {Object.keys(filteredFaculty).length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No faculty members found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search terms or filter criteria to find what you're looking for.
            </p>
          </div>
        ) : (
          Object.entries(filteredFaculty).map(([category, list]) => (
            <section key={category} className="mb-16">
              {/* Enhanced Category Header */}
              <div className="relative mb-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-red-100"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-gradient-to-r from-red-800 to-red-700 px-8 py-4 rounded-2xl shadow-2xl transform -skew-x-6">
                    <h2 className="text-2xl font-bold text-white skew-x-6 text-center">
                      {category}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Faculty Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {list.map((faculty) => (
                  <FacultyCard
                    key={faculty.slug}
                    faculty={faculty}
                    isHovered={hoveredCard === faculty.slug}
                    onHover={() => setHoveredCard(faculty.slug)}
                    onLeave={() => setHoveredCard(null)}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}

// ====================================================
// ENHANCED FACULTY CARD COMPONENT
// ====================================================
function FacultyCard({ faculty, isHovered, onHover, onLeave }: { faculty: Teacher; isHovered: boolean; onHover: () => void; onLeave: () => void }) {
  return (
    <Link
      href={`/about/faculty/${faculty.slug}`}
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-red-100 transform hover:-translate-y-2 block"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br from-red-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`}></div>

      {/* Header with Image */}
      <div className="relative pt-8 px-6 flex flex-col items-center">
        {/* Image Container with Enhanced Design */}
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-yellow-400 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <Image
              src={faculty.image || "/default-avatar.jpg"}
              alt={faculty.name}
              width={128}
              height={128}
              className="object-fill w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {/* Status Indicator */}
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
        </div>

        {/* Name with Hover Effect */}
        <h3 className=" text-xl font-bold text-gray-900 text-center mb-2 relative">
          {faculty.name}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 group-hover:w-full transition-all duration-500"></span>
        </h3>
      </div>

      {/* Content */}
      <div className="relative px-6 pb-8 text-center">
        {/* Position */}
        <p className="text-red-800 font-semibold text-sm mb-2">{faculty.position}</p>

        {/* Department */}
        <p className={`${rancho.className} text-gray-600 text-lg`}>{faculty.department}</p>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Link>
  );
}