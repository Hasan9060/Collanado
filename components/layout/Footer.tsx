import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#1a0003] text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Image
                  src="/Images/logo.png"
                  alt="Logo"
                  width={100}
                  height={45}
                />
              </Link>
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="font-medium">+92 3184 018443</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1" />
                <span>
                  <b>W6F3+C46, Bahawalpur Line, Near Cantt Bazar, Malir Cantt, Karachi</b>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-[#b90e0a] inline-block pb-1">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/admission" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>Admission Procedure</span></Link></li>
              <li><Link href="/facilities" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>Facilities</span></Link></li>
              <li><Link href="/scholarships" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>Apply for College Scholarship</span></Link></li>
              <li><Link href="/news" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>News & Updates</span></Link></li>
              <li><Link href="/alumni" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>Alumni</span></Link></li>
              <li><Link href="/success-stories" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>Success Stories</span></Link></li>
              <li><Link href="/events" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>Events & College Activities</span></Link></li>
              <li><Link href="/student-portal" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>GDC Malir Cantt Student Portal (LMS)</span></Link></li>
            </ul>
          </div>

          {/* Other Pages */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-[#b90e0a] inline-block pb-1">
              Other Pages
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>About</span></Link></li>
              <li><Link href="/contact" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>Contact</span></Link></li>
              <li><Link href="/faq" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>FAQ</span></Link></li>
              <li><Link href="/about/privacy-policy" className="flex items-center space-x-2 hover:text-white transition-colors font-medium"><span className="text-yellow-600 font-bold">››</span><span>Privacy & Policy</span></Link></li>
            </ul>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-[#b90e0a] inline-block pb-1">
              Email Box
            </h3>
            <p className="text-sm mb-4 leading-relaxed">
              Stay updated with the latest college news and activities.
            </p>
            <div className="flex items-center bg-white rounded-full overflow-hidden max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
              />
            </div>

            <div className="flex space-x-4 mt-6">
              <Link href="https://facebook.com" target="_blank" className="w-9 h-9 flex items-center justify-center bg-[#2c0005] hover:bg-[#b90e0a] rounded-full transition-colors"><Facebook size={16} /></Link>
              <Link href="https://twitter.com" target="_blank" className="w-9 h-9 flex items-center justify-center bg-[#2c0005] hover:bg-[#b90e0a] rounded-full transition-colors"><Twitter size={16} /></Link>
              <Link href="https://instagram.com" target="_blank" className="w-9 h-9 flex items-center justify-center bg-[#2c0005] hover:bg-[#b90e0a] rounded-full transition-colors"><Instagram size={16} /></Link>
              <Link href="https://linkedin.com" target="_blank" className="w-9 h-9 flex items-center justify-center bg-[#2c0005] hover:bg-[#b90e0a] rounded-full transition-colors"><Linkedin size={16} /></Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row justify-between text-sm text-gray-400">
          <p>
            © <b>GDC Malir Cantt Karachi</b> | All Rights Reserved
          </p>
        </div>

        {/* Divider */}
        <div className="flex mt-12 pt-6 justify-between text-sm text-gray-400">
          <p>
            <b>Website developed & maintained by</b>
          </p>
        </div>
      </div>
    </footer>
  )
}
