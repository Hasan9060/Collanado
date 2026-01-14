import React from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function PrincipalMessage() {
  return (
    <section className={cn(jakarta.className, "w-full py-12 px-4 bg-gray-50")}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden bg-white shadow-xl">

          {/* IMAGE — TOP ON MOBILE, RIGHT ON DESKTOP */}
          <div className="relative w-full sm:w-[40%] h-[260px] sm:h-auto bg-gray-100 order-1 sm:order-2">
            <Image
              src="/Images/home/principal-message.jpeg"
              alt="Principal Prof. Idrees Ahmed"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* CONTENT */}
          <div className="w-full sm:w-[60%] p-6 sm:p-10 md:p-14 flex flex-col justify-center gap-5 order-2 sm:order-1">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-8 h-[2px] bg-gray-300" />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">
                Principal's Message
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              Empowering Students for a <br />
              <span className="text-blue-600">Brighter Tomorrow</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Education is the greatest equalizer in society. At Government Degree
              College Malir Cantt, we are dedicated to providing accessible,
              zero-cost, high-standard education to the leaders of tomorrow. Our
              goal is to foster a community of thinkers and innovators who will
              serve Pakistan with excellence. We don't just teach subjects; we
              build futures. Welcome to a journey of transformation.
            </p>

            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                Prof. Idrees Ahmed
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Principal / Professor (BPS-20)
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
