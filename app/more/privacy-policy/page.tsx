"use client"

import Link from "next/link"
import Image from "next/image"
import { Home, ChevronRight } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="pt-20 sm:pt-32 min-h-screen bg-yellow-50 text-gray-800">
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
            <span className="text-yellow-300 font-semibold">Privacy & Policy</span>
          </nav>

          {/* Main Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
             Privacy & Policy
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Layout Wrapper */}
      <div className="container mx-auto flex flex-col lg:flex-row px-6 py-12 gap-10">
        {/* Banner - moves above on mobile */}
        <aside className="w-full lg:w-1/3 order-first lg:order-last">
          <div className="relative h-56 lg:h-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://media.istockphoto.com/id/2149608739/photo/cybersecure-worldwide-internet-network-security-technology-privacy-digital-data-protection.jpg?s=612x612&w=0&k=20&c=tSkayS5mrNThfs0fcc-RiWGHtLty1vJ3XTrAmKh8NaQ="
              alt="Privacy Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-red-800/40 flex items-center justify-center">
              <h2 className="text-yellow-100 text-2xl lg:text-3xl font-bold drop-shadow-md text-center">
                Your Privacy Matters
              </h2>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-red-700 mb-3">1. Information We Collect</h2>
            <p>When you visit our website, we may collect the following information:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Personal Information such as name, email, and phone number.</li>
              <li>Non-Personal Information like IP address, browser type, and device info.</li>
              <li>Analytics Data via Google Analytics and Meta Pixel to improve user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-700 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>To improve website performance and user experience.</li>
              <li>To share updates about admissions, events, and services.</li>
              <li>To ensure security and prevent fraudulent activities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-700 mb-3">3. Security Measures</h2>
            <p>
              We prioritize user data protection and website security. Our site is safeguarded by Cloudflare’s firewall
              protection to prevent unauthorized access and data breaches.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-700 mb-3">4. Cookies & Tracking</h2>
            <p>
              We use cookies to enhance your browsing experience. You can modify cookie preferences anytime through your
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-700 mb-3">5. User Rights</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Request access to your personal data.</li>
              <li>Request correction or deletion of your information.</li>
              <li>Opt-out of analytics tracking via browser settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-700 mb-3">6. Policy Updates</h2>
            <p>
              This Privacy Policy may be updated periodically. Any changes will be reflected on this page with a new
              effective date.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}
