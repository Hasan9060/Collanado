"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Home, Phone, Mail, MapPin } from "lucide-react";

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "What is the minimum attendance required to sit an exam?",
      answer: "Students must maintain at least 75% attendance  in each subject to be eligible to appear in examinations, as per college and board regulations."
    },
    {
      question: "What are the rules for retaking a failed subject?",
      answer: "Students who fail a subject may reappear in the supplementary examination according to the rules set by the Board of Intermediate Education."
    },
    {
      question: "How can I apply for a leaving certificate or transfer certificate?",
      answer: "Students must submit a written application to the administration office along with required documents to apply for a leaving or transfer certificate."
    },
    {
      question: "Where is the college located?",
      answer: "Government Degree College Malir Cantt is located in Malir Cantonment, Karachi, and is easily accessible through public and private transport."
    },
    {
      question: "What are the college timings?",
      answer: "Government Degree College Malir Cantt operates from 8:30 AM to 1:30 PM, from Monday to Friday. Timings may vary during examinations or official activities as notified by the college administration."
    }
  ];

  return (
    <div className="pt-20 md:pt-32 min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-white mb-4">
            <Link href="/" className="flex items-center space-x-1 hover:text-yellow-200 transition-colors">
              <Home size={16} />
              <span>Home</span>
            </Link>
            <span className="text-yellow-300">›</span>
            <span className="text-yellow-300 font-semibold">FAQ</span>
          </nav>

          {/* Main Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          {/* FAQ Items */}
          <div className="space-y-4 mb-16">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border-l-4 border-yellow-500 hover:border-red-500 transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-red-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">★</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                      {item.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-red-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-5">
                    <div className="pl-11 pr-4">
                      <div className="w-full h-px bg-gradient-to-r from-yellow-400 to-red-400 mb-4"></div>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl">❓</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  Didn't find what you were looking for?
                </h2>
                
                <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
Don’t worry, we’re here to help! Reach out to us on our Contact page
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-3 bg-yellow-400 hover:bg-yellow-300 text-red-700 font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Help Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          href="/contact"
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <span>Need Help?</span>
          <span className="text-xl">💬</span>
        </Link>
      </div>

      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #fef2f2 0%, #fefce8 50%, #fef2f2 100%);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #fef2f2;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
        
        /* Animation for FAQ items */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .faq-item {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FAQPage;