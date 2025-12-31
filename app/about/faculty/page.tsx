"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

import { Rancho } from "next/font/google";

const rancho = Rancho({
  weight: "400",
  subsets: ["latin"],
});

// ==========================
// Faculty Data
// ==========================
const facultyData: Record<string, any[]> = {
  Principal: [
    {
      slug: "idrees-ahmed",
      name: "Prof. Idrees Ahmed",
      position: "Principal / Professor BPS-20",
      department: "Mathematics Department",
      image: "/Images/faculty/idrees-ahmed.jpeg",
            },
  ],

  "Associate Professor": [
    {
      slug: "ghulam-akbar",
      name: "Ghulam Akbar",
      position: "Vice Principal / Associate Professor BPS-19",
      department: "Statistics Department",
      image: "/Images/faculty/ghulam-akbar.jpeg",
      
        },
    {
      slug: "shariq-zuberi",
      name: "Shariq Zuberi",
      position: "Associate Professor BPS-19",
      department: "Statistics Department",
      image: "/Images/faculty/shariq-zuberi.jpeg",
        },
    {
      slug: "bushra-shaikh",
      name: "Bushra Shaikh",
      position: "Associate Professor BPS-19",
      department: "English Department",
      image: "/Images/faculty/female-staff.jpeg",
        },
    {
      slug: "durdana",
      name: "Durdana",
      position: "Associate Professor BPS-19",
      department: "Urdu Department",
      image: "/Images/faculty/female-staff.jpeg",
          },
    {
      slug: "rozina-naz",
      name: "Rozina Naz",
      position: "Associate Professor BPS-19",
      department: "Physics Department",
      image: "/Images/faculty/female-staff.jpeg",
             },
    {
      slug: "nasima-shaheen",
      name: "Nasima Shaheen",
      position: "Associate Professor BPS-19",
      department: "Chemistry Department",
      image: "/Images/faculty/female-staff.jpeg"
        },
  ],

  "Assistant Professor": [
    {
      slug: "dr-faheem",
      name: "Dr. Muhammad Faheem",
      position: "Assistant Professor",
      department: "Zoology Department",
      image: "/Images/faculty/dr-faheem.jpeg",
         },
    {
      slug: "ambreen-akbar",
      name: "Ambreen Akbar",
      position: "Assistant Professor",
      department: "Computer Science Department",
      image: "/Images/faculty/female-staff.jpeg",
      },
    {
      slug: "shehlaa-amjad",
      name: "Shehla Amjad",
      position: "Assistant Professor",
      department: "Chemistry Department",
      image: "/Images/faculty/female-staff.jpeg",
      },
    {
      slug: "shabana-malik",
      name: "Shabana Malik",
      position: "Assistant Professor",
      department: "English Department",
      image: "/Images/faculty/female-staff.jpeg",
      },
      {
      slug: "hiba-haq",
      name: "Hiba Haq",
      position: "Assistant Professor",
      department: "Physics Department",
      image: "/Images/faculty/female-staff.jpeg",
      },
      
  ],

  Lecturer: [
  {
    slug: "marvi-bhutto",
    name: "Marvi Bhutto",
    position: "Lecturer",
    department: "Urdu Department",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "eidal-khan",
    name: "Eidal Khan",
    position: "Lecturer",
    department: "Chemistry Department",
    image: "/Images/faculty/eidal-khan.jpeg",
  },
  {
    slug: "shafique-ahmed",
    name: "Shafique Ahmed",
    position: "Lecturer",
    department: "Botany Department",
    image: "/Images/faculty/shafique-ahmed.jpeg",
  },
  {
    slug: "erum-abbas",
    name: "Erum Abbas",
    position: "Lecturer",
    department: "Urdu Department",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "sana-ishrat",
    name: "Sana Ishrat",
    position: "Lecturer",
    department: "Physics Department",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "usman-ali-mangrio",
    name: "Usman Ali Mangrio",
    position: "Lecturer",
    department: "Accounts Department",
    image: "/Images/faculty/usman-ali-mangrio.jpeg",
  },
  {
    slug: "tashkeel-ahmed",
    name: "Tashkeel Ahmed",
    position: "Lecturer",
    department: "Pak-Studies Department",
    image: "/Images/faculty/tashkeel-ahmed.jpeg",
  },
  {
    slug: "laraib",
    name: "Laraib",
    position: "Lecturer",
    department: "Maths Department",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "syed-salman-ali",
    name: "Syed Salman Ali",
    position: "Lecturer",
    department: "Commerce Department",
    image: "/Images/faculty/syed-salman-ali.jpeg",
  },
  {
    slug: "ali-imran",
    name: "Ali Imran",
    position: "Lecturer",
    department: "Islamiat Department",
    image: "/Images/faculty/ali-imran.jpeg",
  },
  {
    slug: "aqsa-rao",
    name: "Aqsa Rao",
    position: "Lecturer",
    department: "Commerce Department",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "alishbah-khan",
    name: "Alishbah Khan",
    position: "Lecturer",
    department: "Computer Science Department",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "syed-ahsan-kamal",
    name: "Syed Ahsan Kamal",
    position: "Lecturer",
    department: "Maths Department",
    image: "/Images/faculty/syed-ahsan-kamal.jpeg",
  },
  {
    slug: "m-asfandyar-anssari",
    name: "M. Asfandyar Anssari",
    position: "Lecturer",
    department: "Chemistry Department",
    image: "/Images/faculty/m-asfandyar-anssari.jpeg",
  },
  {
    slug: "mudassir-siddiqui",
    name: "Mudassir Siddiqui",
    position: "Lecturer",
    department: "English Department",
    image: "/Images/faculty/mudassir-siddiqui.jpeg",
  },
  {
    slug: "samra-sibtain",
    name: "Samra Sibtain",
    position: "Lecturer",
    department: "Physics Department",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "shujaat-hussain",
    name: "Shujaat Hussain",
    position: "Lecturer",
    department: "Economics Department",
    image: "/Images/faculty/shujaat-hussain.jpeg",
  },
  {
    slug: "syed-younus",
    name: "Syed Younus",
    position: "Honorary-Lecturer",
    department: "Islamiat Department",
    image: "/Images/faculty/syed-younus.jpeg",
  },
],
  "Non-Teaching Staff": [
  {
    slug: "ayaz-ali",
    name: "Ayaz Ali",
    position: "Sr. Clerk",
    department: "Admin Office",
    image: "/Images/faculty/non-teaching/ayaz-ali.jpeg",
  },
  {
    slug: "mehjabeen",
    name: "Mehjabeen",
    position: "Lab. Sup.",
    department: "Lab. Physics",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "shahana-mehar",
    name: "Shahana Mehar",
    position: "Lab. Sup.",
    department: "Lab. Physics",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "sahib-d-lashari",
    name: "Sahib D. Lashari",
    position: "Jr. Clerk",
    department: "Admin Office",
    image: "/Images/faculty/non-teaching/sahib-d-lashari.jpeg",
  },
  {
    slug: "hassan-ali-jakhio",
    name: "Hassan Ali Jakhio",
    position: "Jr. Clerk",
    department: "Admin Office",
    image: "/Images/faculty/non-teaching/hassan-ali-jakhio.jpeg",
  },
  {
    slug: "shagufta-jumani",
    name: "Shagufta Jumani",
    position: "Sr. Lab. Asstt",
    department: "Lab. Zoology",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "zoya-jumani",
    name: "Zoya Jumani",
    position: "Sr. Lab. Asstt",
    department: "Lab. Computer",
    image: "/Images/faculty/female-staff.jpeg",
  },
  {
    slug: "m-rashid-khan",
    name: "M. Rashid Khan",
    position: "Sr. Lab. Asstt",
    department: "Lab. Chemistry",
    image: "/Images/faculty/non-teaching/m-rashid-khan.jpeg",
  },
  {
    slug: "anwar-hussain",
    name: "Anwar Hussain",
    position: "Lab. Atted",
    department: "Library",
    image: "/Images/faculty/non-teaching/anwar-hussain.jpeg",
  },
  {
    slug: "syed-amjad-ali-shah",
    name: "Syed Amjad Ali Shah",
    position: "Lab. Atted",
    department: "Principal Office",
    image: "/Images/faculty/non-teaching/syed-amjad-ali-shah.jpeg",
  },
  {
    slug: "rahim-bux",
    name: "Rahim Bux",
    position: "Lab. Atted",
    department: "Principal Office",
    image: "/Images/faculty/non-teaching/rahim-bux.jpeg",
  },
  {
    slug: "s-m-imran",
    name: "S. M. Imran",
    position: "Lab. Atted",
    department: "Lab. Botany",
    image: "/Images/faculty/non-teaching/s-m-imran.jpeg",
  },
  {
    slug: "m-kamran",
    name: "M. Kamran",
    position: "Chowkidar",
    department: "College Main Gate",
    image: "/Images/faculty/non-teaching/m-kamran.jpeg",
  },
  {
    slug: "asif-mujtaba",
    name: "Asif Mujtaba",
    position: "Chowkidar",
    department: "College Main Gate",
    image: "/Images/faculty/non-teaching/asif-mujtaba.jpeg",
  },
  {
    slug: "ali-asghar",
    name: "Ali Asghar",
    position: "Chowkidar",
    department: "Admin Office",
    image: "/Images/faculty/non-teaching/ali-asghar.jpeg",
  },
  {
    slug: "ali-akbar",
    name: "Ali Akbar",
    position: "Mai",
    department: "Garden",
    image: "/Images/faculty/non-teaching/ali-akbar.jpeg",
  },
  {
    slug: "nazar-masih",
    name: "Nazar Masih",
    position: "Sweeper",
    department: "Cleaning",
    image: "/Images/faculty/non-teaching/nazar-masih.jpeg",
  },
],
};

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
    const result: Record<string, any[]> = {};

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
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
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
function FacultyCard({ faculty, isHovered, onHover, onLeave }: { faculty: any; isHovered: boolean; onHover: () => void; onLeave: () => void }) {
  return (
    <div 
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-red-100 transform hover:-translate-y-2"
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
    </div>
  );
}