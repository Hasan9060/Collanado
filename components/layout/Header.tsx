"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Menu, X, ChevronDown, ChevronUp, BookOpen, Users,
  Calendar, FileText, ClipboardList, Shield, Copy, FileCheck,
  Award, BookMarked, UserCheck, Facebook, Youtube,
  Instagram, Linkedin, Search, Bell, ExternalLink
} from "lucide-react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

// Enhanced theme configuration
const theme = {
  primary: {
    light: "bg-gradient-to-r from-red-800 to-red-900",
    dark: "bg-gradient-to-r from-red-900 to-red-950",
    hover: "hover:bg-red-700",
    border: "border-red-600",
    text: "text-white"
  },
  secondary: {
    light: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    dark: "bg-gradient-to-r from-yellow-600 to-yellow-700",
    hover: "hover:from-yellow-400 hover:to-yellow-500",
    text: "text-white"
  },
  accent: {
    text: "text-yellow-300",
    hover: "hover:text-yellow-200",
    bg: "bg-yellow-500/10"
  }
}

interface NavItem {
  name: string
  href?: string
  icon?: React.ComponentType<any>
  submenu?: { name: string; href: string; icon?: React.ComponentType<any>; badge?: string }[]
  badge?: string
}

const navItems: NavItem[] = [
  {
    name: "ABOUT US",
    submenu: [
      { name: "About College", href: "/about/aboutus" },
      { name: "Faculty", href: "/about/faculty" },
      { name: "Principal", href: "/about/principal" },
      { name: "Departments", href: "/about/departments" },
      { name: "Societies", href: "/about/societies" },
    ],
  },
  {
    name: "ACADEMICS",
    submenu: [
      { name: "Admission Procedure", href: "/academics/admission-procedure" },
      { name: "Academic Calendar", href: "/academics/academic-calendar" },
      { name: "Admission Policy", href: "/academics/about-college" },
      { name: "Rules & Regulations", href: "/academics/rules" },
    ],
  },
  {
    name: "MAGAZINE",
    href: "/magazine",
    badge: "Latest"
  },
  {
    name: "DOWNLOADS",
    submenu: [
      // BIEK Forms
      { name: "Certificate Form", href: "/downloads/certificate", icon: FileText },
      { name: "Scrutiny Form", href: "/downloads/scrutiny", icon: ClipboardList },
      { name: "Provisional Certification Form", href: "/downloads/provisional-certificate", icon: Award },
      { name: "Migration Form", href: "/downloads/migration", icon: BookMarked },
      { name: "Registration Form Commerce", href: "/downloads/registration-commerce", icon: FileText },
      { name: "Registration Form Humanities", href: "/downloads/registration-humanities", icon: FileText },

      // Verification & Cancellation Forms
      { name: "Verification Certificate Form", href: "/downloads/verification-certificate", icon: Shield },
      { name: "Verification Provisional Certificate", href: "/downloads/verification-provisional", icon: Shield },
      { name: "Verification Marksheet Form", href: "/downloads/verification-marksheet", icon: Shield },
      { name: "Verification Migration Form", href: "/downloads/verification-migration", icon: Shield },
      { name: "Cancellation Of Enrolment", href: "/downloads/cancellation-enrolment", icon: FileCheck },
      { name: "Cancellation Of Registration", href: "/downloads/cancellation-registration", icon: FileCheck },

      // Duplicate & Other Testimonials Forms
      { name: "Duplicate Marksheet", href: "/downloads/duplicate-marksheet", icon: Copy },
      { name: "Duplicate Enrolment Card", href: "/downloads/duplicate-enrolment-card", icon: Copy },
      { name: "Duplicate Computerized Admit Card", href: "/downloads/duplicate-computerized-admit-card", icon: Copy },
      { name: "Duplicate Registration Card", href: "/downloads/duplicate-registration-card", icon: Copy },
      { name: "Duplicate Manual Admit Card", href: "/downloads/duplicate-manual-admit-card", icon: Copy },
      { name: "Profirma Of Special Chance", href: "/downloads/profirma-special-chance", icon: FileText },
      { name: "Improvement Of Division", href: "/downloads/improvement-division", icon: Award },
      { name: "Registration Of All Groups", href: "/downloads/registration-all-groups", icon: UserCheck },
      { name: "Examination Forms", href: "/downloads/examination-forms", icon: ClipboardList },
      { name: "Permission Forms", href: "/downloads/permission-forms", icon: FileCheck },
    ],
  },
  {
    name: "MORE",
    submenu: [
      { name: "News & Events", href: "/news" },
      { name: "College Location", href: "/more/location" },
      { name: "Gallery", href: "/gallery" },
      { name: "Privacy & Policy", href: "/more/privacy-policy" },
      { name: "FAQs", href: "/more/frequently-asked-questions" },
    ],
  },
  {
    name: "ALUMNI",
    href: "/alumni",
  },
]

const socialLinks = [
  {
    name: "Facebook",
    href: "",
    icon: Facebook,
    color: "hover:bg-blue-600"
  },
  {
    name: "Instagram",
    href: "",
    icon: Instagram,
    color: "hover:bg-pink-600"
  },
  {
    name: "YouTube",
    href: "",
    icon: Youtube,
    color: "hover:bg-red-600"
  },
  {
    name: "LinkedIn",
    href: "",
    icon: Linkedin,
    color: "hover:bg-blue-500"
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)


    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])




  const isActiveLink = (href: string) => pathname === href

  // Group downloads by category for better organization
  const downloadCategories = [
    {
      title: "BIEK Forms",
      items: navItems.find(item => item.name === "DOWNLOADS")?.submenu?.slice(0, 6) || []
    },
    {
      title: "Verification & Cancellation",
      items: navItems.find(item => item.name === "DOWNLOADS")?.submenu?.slice(6, 12) || []
    },
    {
      title: "Duplicate & Other Forms",
      items: navItems.find(item => item.name === "DOWNLOADS")?.submenu?.slice(12) || []
    }
  ]

  const handleSubmenuToggle = (itemName: string) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName)
  }

  const closeAllMenus = () => {
    setIsOpen(false)
    setOpenSubmenu(null)
    setSearchOpen(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? " bg-gradient-to-r from-red-800 to-red-900 shadow-2xl border-b border-gray-200/50"
        : "bg-gradient-to-r from-red-800 to-red-900"
        }`}
    >
      {/* Top Bar */}
      <div className={`hidden lg:block transition-all duration-500 ${scrolled ? "h-0 opacity-0" : "h-auto opacity-100"
        }`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Left - Social Links */}
            <div className="flex items-center space-x-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="nofollow noreferrer"
                  className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 ${social.color} group`}
                  aria-label={social.name}
                >
                  <social.icon size={16} className="text-white group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            {/* Right - Top Navigation and Search */}
            <div className="flex items-center space-x-6">
              {/* Top Navigation Menu */}
              <nav className="flex text-yellow-300 items-center space-x-6 text-sm">
                <Link href="/news" className="hover:text-yellow-200 transition-colors flex items-center gap-1">
                  <Bell size={14} />
                  <span>News & Updates</span>
                </Link>
                <Link href="/events" className="hover:text-yellow-200 transition-colors flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Events</span>
                </Link>
                <Link href="/contact" className="hover:text-yellow-200 transition-colors flex items-center gap-1">
                  <span>Contact Us</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`container mx-auto px-4 transition-all duration-500 ${scrolled ? "py-2" : "py-3"
        }`}>
        <div className="flex items-center justify-between">
          {/* Logo + College Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-1 min-w-0"
            onClick={closeAllMenus}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
              <Image
                src="/Images/logo.png"
                alt="College Logo"
                width={scrolled ? 60 : 70}
                height={scrolled ? 60 : 70}
                className="relative transition-all duration-300 group-hover:scale-105 z-10"
                priority
              />
            </div>
            <div className="min-w-0">
              {/* Desktop & Tablet Version */}
              <div className="hidden sm:block">
                <h1 className={`font-bold leading-tight break-words transition-colors duration-500 ${scrolled ? "text-white text-sm" : "text-white text-sm"
                  }`}>
                  GDCMC
                </h1>
                <p className={`truncate transition-colors duration-500 ${scrolled ? "text-white text-sm" : "text-white/90 text-sm"
                  }`}>
                  Karachi
                </p>
              </div>

              {/* Mobile Version */}
              <div className="block sm:hidden">
                <h1 className={`font-bold leading-tight break-words transition-colors duration-500 ${scrolled ? "text-white text-sm" : "text-white text-sm"
                  }`}>
                  Govt. Degree Science & Commerce
                </h1>
                <p className={`truncate transition-colors duration-500 ${scrolled ? "text-white text-xs" : "text-white/90 text-xs"
                  }`}>
                  College Malir Cantt, Karachi
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 mx-8">
            <Link
              href="/"
              className={`flex items-center text-xs gap-1 px-4 py-2 rounded-xl transition-all duration-300 font-semibold ${isActiveLink("/")
                ? `${scrolled ? "bg-red-700 text-white" : "bg-white/20 text-white"} shadow-lg`
                : `${scrolled ? "text-white hover:text-red-700" : "text-white/90 hover:text-white"} hover:bg-white/10`
                }`}
              onClick={closeAllMenus}
            >
              HOME
            </Link>

            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <div className="relative">
                    <button
                      className={`flex items-center gap-2 text-xs px-4 py-2 rounded-xl transition-all duration-300 font-semibold relative ${openSubmenu === item.name || pathname.startsWith(item.submenu[0]?.href.split('/')[1] || '')
                        ? `${scrolled ? "bg-red-700 text-white" : "bg-white/20 text-white"} shadow-lg`
                        : `${scrolled ? "text-white hover:text-yellow-500" : "text-white/90 hover:text-white"} hover:bg-white/10`
                        }`}
                      onClick={() => handleSubmenuToggle(item.name)}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] px-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${openSubmenu === item.name ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Desktop Submenu */}
                    {openSubmenu === item.name && (
                      <div
                        className={`absolute top-full mt-2 rounded-2xl shadow-2xl border border-gray-200/50 bg-white/95 backdrop-blur-lg z-[99] transition-all duration-300 animate-in fade-in-0 zoom-in-95 ${item.name === "DOWNLOADS"
                          ? "left-1/2 -translate-x-1/2 min-w-[800px]"
                          : "left-0 min-w-[280px]"
                          }`}
                      >
                        <div className="p-6">
                          {item.name === "DOWNLOADS" ? (
                            // Special layout for DOWNLOADS with categories
                            <div className="grid grid-cols-3 gap-6">
                              {downloadCategories.map((category, index) => (
                                <div key={index} className="space-y-3">
                                  <h3 className="font-bold text-red-700 text-sm uppercase tracking-wider border-b border-red-200 pb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    {category.title}
                                  </h3>
                                  <div className="space-y-2">
                                    {category.items.map((sub) => (
                                      <Link
                                        key={sub.name}
                                        href={sub.href}
                                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group border border-transparent hover:border-red-100"
                                        onClick={closeAllMenus}
                                      >
                                        {sub.icon && (
                                          <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                                            <sub.icon
                                              size={16}
                                              className="text-red-600 group-hover:text-red-700 transition-colors flex-shrink-0"
                                            />
                                          </div>
                                        )}
                                        <span className="text-sm font-medium leading-tight flex-1">{sub.name}</span>
                                        <ExternalLink size={14} className="text-gray-400 group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all" />
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            // Standard layout for other submenus
                            <div className="grid ">
                              {item.submenu.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group border border-transparent hover:border-red-100"
                                  onClick={closeAllMenus}
                                >
                                  <div className="flex-1 border-b border-red-300">
                                    <span className="font-semibold text-sm ">{sub.name}</span>
                                  </div>
                                  {sub.badge && (
                                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                                      {sub.badge}
                                    </span>
                                  )}
                                  <ExternalLink size={14} className="text-gray-400 group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 relative ${isActiveLink(item.href || "")
                      ? `${scrolled ? "bg-red-700 text-white" : "bg-white/20 text-white"} shadow-lg`
                      : `${scrolled ? "text-white hover:text-red-700" : "text-white/90 hover:text-white"} hover:bg-white/10`
                      }`}
                    onClick={closeAllMenus}
                  >
                    {/* Magazine name and faq */}
                    {item.icon && <item.icon size={16} />}
                    <span className="text-xs">{item.name}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] px-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-300 border ${scrolled
                ? "border-gray-300 hover:border-red-300 text-gray-700 hover:text-red-700"
                : "border-white/20 hover:border-white/40 text-white hover:text-yellow-300"
                }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg text-gray-800 shadow-2xl border-t border-gray-200/50 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-5 duration-300">
          <nav className="flex flex-col p-4">
            {/* Search in Mobile */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </form>
            </div>

            <Link
              href="/"
              onClick={closeAllMenus}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActiveLink("/")
                ? "bg-red-700 text-white shadow-lg"
                : "hover:bg-red-50 hover:text-red-700"
                }`}
            >
              HOME
            </Link>

            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-200/50 last:border-b-0">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => handleSubmenuToggle(item.name)}
                      className="flex justify-between items-center w-full px-4 py-3 text-left font-semibold hover:bg-red-50 hover:text-red-700 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {openSubmenu === item.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openSubmenu === item.name && (
                      <div className="pl-6 mt-2 bg-gray-50/50 rounded-xl mx-1 mb-2 space-y-1">
                        {item.name === "DOWNLOADS" ? (
                          // Group downloads in mobile too
                          <>
                            {downloadCategories.map((category, index) => (
                              <div key={index} className="mt-3 first:mt-0">
                                <h3 className="font-semibold text-red-700 text-xs uppercase tracking-wide px-2 py-2 border-b border-red-100">
                                  {category.title}
                                </h3>
                                <div className="space-y-1">
                                  {category.items.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      href={sub.href}
                                      onClick={closeAllMenus}
                                      className="flex items-center gap-3 px-2 py-2 text-sm hover:bg-red-50 hover:text-red-700 rounded-lg transition-all"
                                    >
                                      {sub.icon && <sub.icon size={14} className="text-red-600" />}
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          // Standard mobile submenu
                          item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={closeAllMenus}
                              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-red-50 hover:text-red-700 rounded-lg transition-all"
                            >
                              {sub.icon && <sub.icon size={14} className="text-red-600" />}
                              <span>{sub.name}</span>
                              {sub.badge && (
                                <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                                  {sub.badge}
                                </span>
                              )}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    onClick={closeAllMenus}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActiveLink(item.href || "")
                      ? "bg-red-700 text-white shadow-lg"
                      : "hover:bg-red-50 hover:text-red-700"
                      }`}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}