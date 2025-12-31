"use client"

import Link from "next/link"
import Image from "next/image"
import { Home, ChevronRight, Download, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

export default function AdmissionProcedure() {
  return (
    <div className="pt-20 sm:pt-32 min-h-screen bg-yellow-50 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-800 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-white mb-6">
            <Link href="/" className="flex items-center space-x-1 hover:text-yellow-200 transition-colors">
              <Home size={16} />
              <span>Home</span>
            </Link>
            <ChevronRight size={16} className="text-yellow-300" />
            <Link href="/admissions" className="hover:text-yellow-200 transition-colors">
              Admissions
            </Link>
            <ChevronRight size={16} className="text-yellow-300" />
            <span className="text-yellow-300 font-semibold">Admission Procedure</span>
          </nav>

          {/* Main Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admission Procedure
            </h1>
            <p className="text-yellow-100 text-lg md:text-xl max-w-2xl mx-auto">
              Through Sindh Electronic Centralized College Admission Program (SECCAP)
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mt-4"></div>
          </div>
        </div>
      </header>

      {/* Layout Wrapper */}
      <div className="container mx-auto flex flex-col lg:flex-row px-6 py-12 gap-10">
        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {/* Introduction */}
          <section className="bg-white rounded-xl shadow-md border border-red-100 p-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Admissions to this college are conducted through the <strong>Sindh Electronic Centralized College Admission Program (SECCAP)</strong>, 
              managed by the College Education Department, Government of Sindh. The admission process is merit-based and follows 
              the guidelines issued by SECCAP each academic year.
            </p>
          </section>

          {/* Eligibility Criteria */}
          <section className="bg-white rounded-xl shadow-md border border-red-100 p-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              2. Eligibility Criteria
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Students who have passed their 9th class examinations and have appeared in the 10th class annual exams
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Admission granted provisionally on the basis of 9th class marks sheet
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Must have passed from a recognized board (BSEK or any other approved educational board)
                </p>
              </div>
            </div>
          </section>

          {/* Online Registration */}
          <section className="bg-white rounded-xl shadow-md border border-red-100 p-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              3. Online Registration Through SECCAP
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium mb-2">All applicants must apply online through:</p>
                <a 
                  href="https://seccap.dgcs.gos.pk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold"
                >
                  https://seccap.dgcs.gos.pk
                  <ExternalLink size={16} />
                </a>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Program Selection</h4>
                  <p className="text-gray-600 text-sm">
                    Select desired group (Science, Commerce, Humanities, or Computer Science)
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">College Preference</h4>
                  <p className="text-gray-600 text-sm">
                    Choose our college as preferred institution in SECCAP form
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Document Submission */}
          <section className="bg-white rounded-xl shadow-md border border-red-100 p-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              4. Physical Submission of Documents
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 font-medium">
                After SECCAP placement, selected students must report to college within given dates
              </p>
            </div>

            <h4 className="font-semibold text-gray-800 mb-3">Required Documents:</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-sm">SECCAP placement form/confirmation slip</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-sm">9th class marks sheet (original + copy)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-sm">10th class admit card (if result pending)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-sm">B-Form/CNIC of student</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-sm">CNIC of parent/guardian</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 text-sm">04 recent passport-size photographs</span>
              </div>
            </div>
          </section>

          {/* Verification Process */}
          <section className="bg-white rounded-xl shadow-md border border-red-100 p-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              5. Verification Process & Admission Fee
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 font-medium">Document Verification</p>
                  <p className="text-gray-600 text-sm">All documents verified by college admission committee</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 font-medium">Free Education</p>
                  <p className="text-gray-600 text-sm">No admission or tuition fee charged as per government policy</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-800 text-center font-medium">
                  After successful verification, admission is confirmed and student registered officially
                </p>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <section className="bg-white rounded-xl shadow-md border border-red-100 p-6">
            <h2 className="text-2xl font-semibold text-red-700 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              6. Important Notes
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 text-sm">
                  <strong>Merit-Based:</strong> Admission purely on merit and subject to seat availability
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 text-sm">
                  <strong>Complete Applications:</strong> Incomplete or late applications not entertained
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <AlertCircle size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-blue-800 text-sm">
                  <strong>Regular Updates:</strong> Check SECCAP website and college notice board regularly
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Sidebar Banner */}
        <aside className="w-full lg:w-1/3">
          <div className="sticky top-32 space-y-6">
            {/* Main Banner */}
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/Images/hero/hero-image-3.jpeg"
                alt="College Students"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-red-800/40 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Start Your Journey
                  </h3>
                </div>
              </div>
            </div>
            </div>
        </aside>
      </div>
    </div>
  )
}