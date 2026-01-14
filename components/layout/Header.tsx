"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Menu, X, ChevronDown, ChevronUp, BookOpen, Users,
  Calendar, FileText, ClipboardList, Shield, Copy, FileCheck,
  Award, BookMarked, UserCheck, Facebook,
  Instagram, Linkedin, MessageCircle, Search, Bell, ExternalLink, GraduationCap
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

interface SubMenuItem {
  name: string
  href?: string
  icon?: React.ComponentType<any>
  badge?: string
  items?: { name: string; href: string }[] // Nested items
}

interface NavItem {
  name: string
  href?: string
  icon?: React.ComponentType<any>
  submenu?: SubMenuItem[]
  badge?: string
}

const navItems: NavItem[] = [
  {
    name: "ABOUT US",
    submenu: [
      { name: "About College", href: "/about/aboutus" },
      { name: "Innovation", href: "/innovation" },
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
      { name: "Books", href: "https://www.watchtolead.com/books" },
      {
        name: "Associate Degrees",
        items: [
          { name: "Associate in Science (ADS)", href: "/academics/programs/bsc" },
          { name: "Associate in Commerce (ADC)", href: "/academics/programs/adc" },
        ]
      },
    ],
  },
  {
    name: "MAGAZINE",
    href: "/magazine",
    badge: "Latest"
  },
  {
    name: "MORE",
    submenu: [
      { name: "Make Green Nation", href: "/spark" },
      { name: "Blogs", href: "/blogs" },
      { name: "Downloads", href: "/downloads" },
      { name: "News & Events", href: "/news" },
      { name: "College Location", href: "/more/location" },
      { name: "Privacy & Policy", href: "/more/privacy-policy" },
      { name: "FAQs", href: "/more/frequently-asked-questions" },
    ],
  },
    {
    name: "Alumni",
    href: "/alumni",
  },

]

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/groups/gdcmalircanttofficial/?ref=share&mibextid=NSMWBT",
    icon: Facebook,
    color: "hover:bg-blue-600"
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/gdcmc1979.official/?igsh=NzV3dnQwZ2o2OHBi#",
    icon: Instagram,
    color: "hover:bg-pink-600"
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/govt-degree-science-commerce-college-malir-karachi/",
    icon: Linkedin,
    color: "hover:bg-blue-500"
  },
  {
    name: "WhatsApp",
    href: "https://www.whatsapp.com/channel/0029VadQT8C29752nnLuvr23",
    icon: MessageCircle,
    color: "hover:bg-green-600",
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [openNestedMenu, setOpenNestedMenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)

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

  const handleSubmenuToggle = (itemName: string) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName)
  }

  const closeAllMenus = () => {
    setIsOpen(false)
    setOpenSubmenu(null)
    setOpenNestedMenu(null)
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

            <div className="flex items-center space-x-6">
              <nav className="flex text-yellow-300 items-center space-x-6 text-sm">
                <Link href="/portal/login" className="hover:text-yellow-200 transition-colors flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Student & Teacher Portal</span>
                </Link>
                <Link href="/news" className="hover:text-yellow-200 transition-colors flex items-center gap-1">
                  <Bell size={14} />
                  <span>News & Updates</span>
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
          <Link href="/" className="flex items-center gap-3 group flex-1 min-w-0" onClick={closeAllMenus}>
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
              <div className="hidden sm:block">
                <h1 className="font-bold leading-tight break-words text-white text-sm">Govt. Degree College</h1>
                <p className="truncate text-white text-sm">Malir Cantt, Karachi</p>
              </div>
              <div className="block sm:hidden">
                <h1 className="font-bold leading-tight break-words text-white text-sm">Govt. Degree College</h1>
                <p className="truncate text-white text-xs">Malir Cantt, Karachi</p>
              </div>
            </div>
          </Link>

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
                      className={`flex items-center gap-2 text-xs px-4 py-2 rounded-xl transition-all duration-300 font-semibold relative ${openSubmenu === item.name
                        ? `${scrolled ? "bg-red-700 text-white" : "bg-white/20 text-white"} shadow-lg`
                        : `${scrolled ? "text-white hover:text-yellow-500" : "text-white/90 hover:text-white"} hover:bg-white/10`
                        }`}
                      onClick={() => handleSubmenuToggle(item.name)}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] px-1 rounded-full">{item.badge}</span>
                      )}
                      <ChevronDown size={16} className={`transition-transform duration-300 ${openSubmenu === item.name ? "rotate-180" : ""}`} />
                    </button>

                    {openSubmenu === item.name && (
                      <div className="absolute top-full mt-2 rounded-2xl shadow-2xl border border-gray-200/50 bg-white/95 backdrop-blur-lg z-[99] min-w-[280px] left-0 animate-in fade-in-0 zoom-in-95">
                        <div className="p-6">
                          <div className="grid gap-1">
                            {item.submenu.map((sub) => (
                              <div key={sub.name} className="relative group/nested">
                                {sub.items ? (
                                  <div className="relative">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenNestedMenu(openNestedMenu === sub.name ? null : sub.name);
                                      }}
                                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group border border-transparent hover:border-red-100"
                                    >
                                      <span className="font-semibold text-sm">{sub.name}</span>
                                      <ChevronDown size={14} className={`transition-transform ${openNestedMenu === sub.name ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openNestedMenu === sub.name && (
                                      <div className="pl-4 mt-1 space-y-1 bg-gray-50/50 rounded-xl p-2 animate-in slide-in-from-top-2">
                                        {sub.items.map((nested) => (
                                          <Link
                                            key={nested.name}
                                            href={nested.href}
                                            className="block px-4 py-2 text-sm text-gray-600 hover:text-red-700 hover:bg-red-100/50 rounded-lg transition-all"
                                            onClick={closeAllMenus}
                                          >
                                            {nested.name}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <Link
                                    href={sub.href || "#"}
                                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group border border-transparent hover:border-red-100"
                                    onClick={closeAllMenus}
                                  >
                                    <div className="flex-1 border-b border-red-300">
                                      <span className="font-semibold text-sm ">{sub.name}</span>
                                    </div>
                                    {sub.badge && (
                                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">{sub.badge}</span>
                                    )}
                                    <ExternalLink size={14} className="text-gray-400 group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all" />
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
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
                    <span className="text-xs">{item.name}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] px-1 rounded-full">{item.badge}</span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
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

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg text-gray-800 shadow-2xl border-t border-gray-200/50 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-5 duration-300">
          <nav className="flex flex-col p-4">
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

            <Link href="/" onClick={closeAllMenus} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActiveLink("/") ? "bg-red-700 text-white shadow-lg" : "hover:bg-red-50 hover:text-red-700"}`}>
              HOME
            </Link>

            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-200/50 last:border-b-0">
                {item.submenu ? (
                  <>
                    <button onClick={() => handleSubmenuToggle(item.name)} className="flex justify-between items-center w-full px-4 py-3 text-left font-semibold hover:bg-red-50 hover:text-red-700 rounded-xl transition-all">
                      <div className="flex items-center gap-3">
                        <span>{item.name}</span>
                        {item.badge && <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>}
                      </div>
                      {openSubmenu === item.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openSubmenu === item.name && (
                      <div className="pl-6 mt-2 bg-gray-50/50 rounded-xl mx-1 mb-2 space-y-1">
                        {item.submenu.map((sub) => (
                          <div key={sub.name}>
                            {sub.items ? (
                              <div className="space-y-1">
                                <button
                                  onClick={() => setOpenNestedMenu(openNestedMenu === sub.name ? null : sub.name)}
                                  className="flex justify-between items-center w-full px-3 py-2 text-sm font-semibold hover:bg-red-50 hover:text-red-700 rounded-lg transition-all"
                                >
                                  <span>{sub.name}</span>
                                  {openNestedMenu === sub.name ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                                {openNestedMenu === sub.name && (
                                  <div className="pl-4 space-y-1 bg-white/50 rounded-lg py-1">
                                    {sub.items.map((nested) => (
                                      <Link key={nested.name} href={nested.href} onClick={closeAllMenus} className="block px-3 py-2 text-xs text-gray-600 hover:text-red-700 rounded-lg transition-all">
                                        {nested.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <Link href={sub.href || "#"} onClick={closeAllMenus} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-red-50 hover:text-red-700 rounded-lg transition-all">
                                {sub.icon && <sub.icon size={14} className="text-red-600" />}
                                <span>{sub.name}</span>
                                {sub.badge && <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto">{sub.badge}</span>}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href ?? "#"} onClick={closeAllMenus} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActiveLink(item.href || "") ? "bg-red-700 text-white shadow-lg" : "hover:bg-red-50 hover:text-red-700"}`}>
                    <span>{item.name}</span>
                    {item.badge && <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full ml-auto">{item.badge}</span>}
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