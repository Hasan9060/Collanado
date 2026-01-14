"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["700", "900"],
});

const heroSlides = [
  {
    image: "/images/hero/hero-image.webp",
    title: "The Standard of Excellence in Public Education Since 1970",
    subtitle: "Quality Education in Science & Commerce",
  },
  {
    image: "/images/hero/hero-image-5.webp",
    title: "Empowering Students for the Future",
    subtitle: "Academic Excellence & Discipline",
  },
  {
    image: "/images/hero/hero-image-2.webp",
    title: "A Trusted Institution Since Years",
    subtitle: "Serving Education in Karachi",
  },
  {
    image: "/images/hero/hero-image-3.webp",
    title: "A Trusted Institution Since Years",
    subtitle: "Serving Education in Karachi",
  },
  {
    image: "/images/hero/hero-image-4.webp",
    title: "A Trusted Institution Since Years",
    subtitle: "Serving Education in Karachi",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-label="Government Degree College Malir Hero Section"
      className="relative mt-16 lg:mt-20 h-[420px] sm:h-[520px] md:h-[540px] overflow-hidden bg-gray-900"
    >
      {/* Background Images Stack - Preloaded & Smooth Transition */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={slide.image}
            alt="GDC Campus"
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
            quality={80}
          />
          {/* Static Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Content Layer */}
      <div className="relative z-20 h-full px-4 text-center">
        <div className="pt-14 sm:pt-20 md:pt-24 flex flex-col items-center">

          {/* Bismillah Badge */}
          <div className="mb-4 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl px-6 py-2">
            <p className={cn(jakarta.className, "text-yellow-500 font-semibold text-sm sm:text-base uppercase")}>
              بسم اللہ الرحمٰن الرحیم
            </p>
          </div>

          {/* College Name Badge */}
          <div className="mb-6 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl px-6 py-2">
            <p className={cn(jakarta.className, "text-white font-semibold text-sm sm:text-base uppercase")}>
              Government Degree College Malir Cantt, Karachi
            </p>
          </div>

          {/* Animated Text Content */}
          <div className="h-28 sm:h-32 flex flex-col items-center justify-center relative w-full">
            <div
              className={cn(
                "flex flex-col items-center absolute w-full transition-all duration-500",
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              )}
            >
              <h1 className={cn(outfit.className, "text-white text-xl sm:text-2xl md:text-4xl lg:text-4xl font-black mb-4 drop-shadow-xl text-balance max-w-4xl leading-tight")}>
                {heroSlides[current].title}
              </h1>
              <p className={cn(jakarta.className, "text-white/90 text-sm sm:text-base md:text-lg drop-shadow-lg max-w-2xl px-2")}>
                {heroSlides[current].subtitle}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 sm:mt-10 flex gap-4 sm:gap-6 z-30 relative">
            <Link href="/academics/admission-procedure">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-full text-sm font-bold transition shadow-lg hover:shadow-red-600/20 transform hover:-translate-y-0.5">
                Admissions
              </button>
            </Link>
            <Link href="/magazine">
              <button className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-6 sm:px-8 py-3 rounded-full text-sm transition shadow-lg hover:shadow-yellow-600/20 transform hover:-translate-y-0.5">
                Magazine
              </button>
            </Link>
          </div>

        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              current === i ? "w-8 bg-red-600" : "w-1.5 bg-white/50 hover:bg-white"
            )}
          />
        ))}
      </div>

    </section>
  );
}
