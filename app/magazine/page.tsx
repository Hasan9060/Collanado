"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Calendar, Users, Award, ExternalLink } from "lucide-react";

export default function MagazinePage() {
  return (
    <div className="md:pt-24 min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-900 via-red-800 to-red-700"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-yellow-300 text-sm font-semibold mb-6 border border-white/20">
            <BookOpen size={16} />
            <span>BUZZ WING PUBLICATION</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            College <span className="text-yellow-400">Magazine</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Exploring the creativity, achievements, and voices of Government Degree Science & Commerce College Malir Cantt.
          </p>
        </div>
      </section>

      {/* Main Content - Flipbook */}
      <section className="py-16 md:py-24 container mx-auto px-4 flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Magazine Info Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Edition</p>
                <p className="text-lg font-bold text-gray-800">2024 - 2025</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Team</p>
                <p className="text-lg font-bold text-gray-800">Buzz Wing Media</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <Award size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Status</p>
                <p className="text-lg font-bold text-gray-800">Latest Publication</p>
              </div>
            </div>
          </div>

          {/* Flipbook Container */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Toolbar decoration */}
              <div className="h-12 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  <span className="hidden sm:inline">Interactive Flipbook</span>
                  <ExternalLink size={12} />
                </div>
              </div>

              {/* The Flipbook Iframe */}
              <div className="relative w-full aspect-[4/3] min-h-[500px] sm:min-h-[700px] md:min-h-[800px]">
                <iframe
                  src="https://heyzine.com/flip-book/fb72a1d361.html"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  allow="clipboard-write"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              If the magazine does not load, you can <a href="https://heyzine.com/flip-book/fb72a1d361.html" target="_blank" rel="noopener noreferrer" className="text-red-600 font-bold hover:underline">view it directly here</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
