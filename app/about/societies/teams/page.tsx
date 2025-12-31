"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Home, ChevronRight } from "lucide-react"

export default function SocietyTeamsPage() {
  const [activeWing, setActiveWing] = useState<
    "marshal" | "buzz" | "spark"
  >("marshal")

  const wingBanners = {
    marshal: {
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1920",
      gradient: "from-yellow-900/90 to-yellow-700/80",
    },
    buzz: {
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920",
      gradient: "from-blue-900/90 to-blue-700/80",
    },
    spark: {
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1920",
      gradient: "from-green-900/90 to-green-700/80",
    },
  }

  const wingImages = {
    marshal: [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800",
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=800",
    ],
    buzz: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800",
    ],
    spark: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800",
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HERO BANNER ================= */}
      {/* ================= HERO BANNER ================= */}
<section className="relative w-full overflow-hidden">
  {/* FIXED HORIZONTAL HEIGHT */}
  <div className="relative h-[360px] md:h-[460px] lg:h-[520px] w-full">
    
    {/* Banner Image */}
    <Image
      src={wingBanners[activeWing].image}
      alt="Society Banner"
      fill
      priority
      className="object-cover object-center"
    />

    {/* Gradient Overlay */}
    <div
      className={`absolute inset-0 bg-gradient-to-r ${wingBanners[activeWing].gradient}`}
    />

    {/* Content */}
    <div className="relative z-10 h-full flex items-center">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/90 mb-6 text-sm">
          <Link href="/" className="flex items-center gap-1 hover:text-white">
            <Home size={16} />
            Home
          </Link>
          <ChevronRight size={16} />
          <span>Society Teams</span>
        </div>

        <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-wide">
          Society Wings
        </h1>
      </div>
    </div>
  </div>
</section>


      {/* ================= WING BUTTONS ================= */}
      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <button
              onClick={() => setActiveWing("marshal")}
              className={`rounded-2xl px-8 py-6 font-bold text-xl transition-all
              ${
                activeWing === "marshal"
                  ? "bg-yellow-600 text-white scale-105 shadow-xl"
                  : "bg-gray-100 hover:bg-yellow-100"
              }`}
            >
              Marshal Wing
            </button>

            <button
              onClick={() => setActiveWing("buzz")}
              className={`rounded-2xl px-8 py-6 font-bold text-xl transition-all
              ${
                activeWing === "buzz"
                  ? "bg-blue-800 text-white scale-105 shadow-xl"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              Buzz Wing
            </button>

            <button
              onClick={() => setActiveWing("spark")}
              className={`rounded-2xl px-8 py-6 font-bold text-xl transition-all
              ${
                activeWing === "spark"
                  ? "bg-green-800 text-white scale-105 shadow-xl"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
            >
              Spark Wing
            </button>
          </div>
        </div>
      </section>

     {/* ================= HORIZONTAL IMAGES SECTION ================= */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 capitalize">
      {activeWing} Wing Gallery
    </h2>

    <div className="space-y-10 max-w-6xl mx-auto">
      {wingImages[activeWing].map((img, index) => (
        <div
          key={index}
          className="relative w-full h-[260px] md:h-[320px] lg:h-[380px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition"
        >
          <Image
            src={img}
            alt={`${activeWing} banner ${index + 1}`}
            fill
            className="object-cover object-center hover:scale-110 transition-transform duration-700"
          />
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  )
}
