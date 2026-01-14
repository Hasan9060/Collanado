import React from "react";
import Image from "next/image";

export default function UniversitySection() {
  return (
    <section className="py-16 bg-white text-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">

        {/* LEFT SIDE IMAGES */}
        <div className="relative flex justify-center items-center">

          {/* Main Image */}
          <div className="relative w-72 md:w-80 lg:w-96 rounded-md overflow-hidden shadow-lg z-10">
            <Image
              src="/Images/about/collegeabout.png"
              alt="Students at Government Degree College Malir Cantt"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Overlay Image */}
          <div className="absolute -bottom-10 -left-6 hidden md:block w-56 rounded-md overflow-hidden shadow-md border-4 border-white">
            <Image
              src="/Images/about/collegeabout1.jpeg"
              alt="College building architecture"
              width={350}
              height={350}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Vertical Text */}
          <span className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 bg-white rounded-full px-2 text-gray-400 font-semibold tracking-widest text-sm md:text-lg">
            EST 1979
          </span>

          {/* Circular Badge */}
          <div className="absolute -top-6 -right-6 bg-red-700 text-white w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-xs font-semibold uppercase tracking-widest z-20 shadow-lg border-4 border-white">
            College
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div>
          <p className="text-sm md:text-base font-semibold tracking-widest text-red-700 uppercase mb-4">
            Welcome to
          </p>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug mb-5">
            GOVERNMENT DEGREE SCIENCE & COMMERCE COLLEGE{" "}
            <span className="text-red-700">MALIR CANTT</span> KARACHI
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            It is indeed a moment of immense pleasure and pride for the college in
            achieving the milestone of <strong>47 years</strong>. Government
            Science College Malir Cantt was established on{" "}
            <strong>27th September, 1979</strong> with the cooperation of the
            Governor of Sindh, Lt. S. M. Abbasi. The founder Principal,{" "}
            <strong>Prof. Muhammed Rafiq (Late)</strong>, laid the foundation of
            academic excellence.
          </p>

          {/* Button */}
          <a
            href="/about"
            className="inline-flex items-center bg-red-700 text-white font-medium px-8 py-3 rounded-full hover:bg-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            More About
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
