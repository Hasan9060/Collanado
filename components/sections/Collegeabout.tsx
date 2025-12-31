import React from "react";
import Image from "next/image";

export default function UniversitySection() {
  return (
    <section className="py-16 bg-white text-slate-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">

        {/* LEFT SIDE IMAGES */}
        <div className="relative flex justify-center items-center">
          {/* Main Image */}
          <div className="w-72 md:w-80 lg:w-96 rounded-md overflow-hidden shadow-lg z-10 relative">
            <Image
              src="https://tse1.mm.bing.net/th/id/OIP.L2s2h28kUJpyNboyOilxtAHaFj?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Students at university campus"
              width={400}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Second Image (overlay) */}
          <div className="absolute bottom-[-40px] left-[-30px] hidden md:block w-56 rounded-md overflow-hidden shadow-md z-0 border-4 border-white">
            <Image
              src="https://tse3.mm.bing.net/th/id/OIP.43CGUhr7fBnmzXAz2FcWCgHaFj?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="University building architecture"
              width={350}
              height={350}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Vertical Text */}
          <span className="absolute -left-8 top-1/3 -translate-y-1/2 -rotate-90 text-gray-400 font-semibold tracking-widest text-sm md:text-xl">
            EST 1979
          </span>

          {/* Circular Badge */}
          <div className="absolute -top-6 -right-6 bg-red-700 text-white w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-xs font-semibold uppercase tracking-widest z-20 shadow-lg border-4 border-white">
            College
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="relative">
          <p className="text-xl font-semibold tracking-widest text-red-700 uppercase mb-4">
           Welcome to
          </p>

          <h2 className="text-xl md:text-2xl font-bold leading-snug mb-4">
            GOVERNMENT DEGREE SCIENCE & COMMERCE COLLEGE <span className="text-red-700">MALIR CANTT</span> KARACHI
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            It is indeed a moment of immense pleasure and pride for the college in achieving the milestone of <strong>47 years</strong>.
            Govt Science College Malir Cantt was established on <strong>27th September, 1979</strong> with the co-operation of the
            governor of Sindh, Lt. S.M. Abbasi. The founder Principal, <strong>Prof. Muhammed Rafiq (late)</strong> made a ....
          </p>

          {/* Button */}
          <a href="/about" className="inline-flex items-center bg-red-700 text-white font-medium px-8 py-3 rounded-full hover:bg-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
            More About
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}