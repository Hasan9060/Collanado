"use client";

import { useState, useEffect } from "react";

export default function ScholarshipBanner() {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      author: "Prophet Muhammad (PBUH)",
      text: "Seeking knowledge is a duty upon every Muslim.",
    },
    {
      author: "Quaid-e-Azam",
      text: "Education is a matter of life and death for our nation.",
    },
    {
      author: "Allama Iqbal",
      text: "The purpose of education is to create balanced individuals who can think critically and act wisely.",
    },
    {
      author: "Sir Syed Ahmed Khan",
      text: "Acquisition of knowledge of science and technology is the only solution for the problems of Muslims.",
    },
    {
      author: "Nelson Mandela",
      text: "Education is the most powerful weapon which you can use to change the world.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const currentAuthor = quotes[currentQuote].author;

  return (
    <section className="w-full items-center bg-gradient-to-r from-blue-50 via-white to-green-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          {/* Quote Carousel */}
          <div className="w-full max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-red-800 text-center transition-all duration-500 min-h-[300px] sm:min-h-[350px] flex flex-col justify-between items-center">
              <div className="flex-1 flex flex-col justify-center items-center w-full">
                <span className="inline-block px-4 py-1 mb-6 bg-red-800 text-yellow-300 rounded-full text-sm font-medium animate-in fade-in zoom-in duration-300">
                  {currentAuthor}
                </span>
                <p className="text-gray-800 text-lg sm:text-xl md:text-3xl italic leading-relaxed font-serif min-h-[120px] flex items-center justify-center">
                  “{quotes[currentQuote].text}”
                </p>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center mt-4 space-x-2">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    aria-label={`Go to quote ${index + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentQuote
                      ? "bg-red-800 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
