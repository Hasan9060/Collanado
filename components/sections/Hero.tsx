"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const heroSlides = [
  {
    image: "/Images/hero/hero-image.jpeg",
    heading: "A legacy of learning that began in 1979.",
  },
  {
    image: "/Images/hero/hero-image-1.jpeg",
    heading: "Offering Science & Commerce education.",
  },
  {
    image: "/Images/hero/hero-image-2.jpeg",
    heading: "A journey of growth, excellence, and success.",
  },
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 200);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const { image, heading } = heroSlides[currentSlide];

  return (
    <section className="pt-20 sm:pt-24 relative min-h-[70vh] sm:min-h-screen flex items-center justify-center sm:justify-start overflow-hidden">
      {/* Background Images with Centered Overlay */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.image}
              alt={`Background ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover scale-105"
              quality={100}
            />
            {/* Dark centered gradient overlay */}
            <div className="absolute inset-0 bg-black/50 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div
            className={cn(
              "flex flex-col items-center text-center transition-all duration-1000 transform",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Logo with Glow */}
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-red-600 rounded-full blur-2xl opacity-40 "></div>
              <div className="relative  p-4 rounded-full ">
                <Image
                  src="/Images/logo.png"
                  alt="College Logo"
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 backdrop-blur-md rounded-full mb-6">
              <span className="text-green-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                Welcome to GOVERNMENT DEGREE SCIENCE & COMMERCE COLLEGE MALIR CANTT KARACHI
              </span>
            </div>

            {/* Glass Box for Heading */}
            <div className="relative group w-full mb-8">
              <div className="absolute -inset-1 transition duration-1000"></div>
              <div className="relative  p-6 sm:p-10 rounded-2xl shadow-2xl">
                <h1
                  key={heading}
                  className={`${poppins.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white transition-opacity duration-700`}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    {heading}
                  </span>
                </h1>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/academics/admission-procedure" className="flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white hover:text-red-600 px-8 py-6 rounded-xl text-md font-bold transition-all duration-300 w-full"
                >
                  Admission Procedure
                </Button>
              </Link>
              <Link href="/magazine" className="flex-1">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl text-md font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-red-500/20 w-full"
                >
                  Magazine
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators - Mobile Friendly */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-red-400 scale-125"
                : "bg-white/60 hover:bg-white/80"
            )}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}