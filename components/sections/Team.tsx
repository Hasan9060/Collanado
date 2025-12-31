"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Linkedin, Twitter, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

// Team Data
const teamMembers = [
  {
    name: "Shabana Malik",
    role: "Founder & CEO",
    image: "/Images/team/shabana.png",
    bio: "English teacher & content creator, helping students learn with engaging lessons.",
    social: {
      twitter: "#",
      linkedin: "#",
      email: "mailto:jennifer@digitaledge.com",
    },
    achievements: ["Ex-Google", "15+ Years", "Top Marketer"],
  },
  {
    name: "Syed Hasan Rafay",
    role: "Digital Head & Developer",
    image: "/Images/team/hasan.png",
    bio: "Oversees all digital operations and development at Agentic AI. Making things happen online.",
    social: {
      twitter: "#",
      linkedin: "https://www.linkedin.com/in/hasanrafay",
      email: "mailto:hasanrafay2006@gmail.com",
    },
    achievements: ["Agentic AI", "Enterprise", "Content Strategy"],
  },
  {
    name: "Maryam Malik",
    role: "SEO Director",
    image: "/Images/team/maryam.png",
    bio: "Technical SEO and content strategy expert helping brands grow through data-driven optimization.",
    social: {
      twitter: "#",
      linkedin: "#",
      email: "mailto:marcus@digitaledge.com",
    },
    achievements: ["SEO Expert", "Enterprise", "Content Strategy"],
  },
  {
    name: "Benazir Abbasi",
    role: "Content Writer & Developer",
    image: "/Images/team/benazir.png",
    bio: "Content Writer and Developer who blends storytelling with code to create meaningful digital experiences.",
    social: {
      facebook: "https://www.facebook.com/fetchandflourish",
      linkedin: "https://www.linkedin.com/in/benazir-abbasi-ab5112283/",
      email: "mailto:sarah@digitaledge.com",
    },
    achievements: ["Front-End Developer", "Digital Marketer", "High-Growth"],
  },
  {
    name: "Annus Mughal",
    role: "Web Developer",
    image: "/Images/team/annus.png",
    bio: "Web Developer skilled in HTML, CSS, JavaScript, and Python, focused on building clean and responsive websites.",
    social: {
      facebook: "https://www.facebook.com/annus.mughal.92?mibextid=ZbWKwL",
      linkedin: "https://www.linkedin.com/in/annus-mughal-703324325/",
      email: "mailto:david@digitaledge.com",
    },
    achievements: ["Full Stack Developer", "School Website", "International Projects"],
  },
  {
    name: "Jibreal Malik",
    role: "Graphic & Video Editor",
    image: "/Images/team/jibreal.png",
    bio: "Creative Graphic and Video Editor passionate about visual storytelling and delivering engaging content.",
    social: {
      twitter: "#",
      linkedin: "#",
      email: "mailto:david@digitaledge.com",
    },
    achievements: ["Graphic Designer", "Content Writer", "Video Editor"],
  },
  {
    name: "Poonar Ali",
    role: "Web Developer",
    image: "/Images/team/poonar.png",
    bio: "Web Developer specialized in responsive design and functional digital experiences with creative precision.",
    social: {
      twitter: "https://x.com/PonaarAli?t=KRKQ9hSSwDt3LfVSI4balw&s=08",
      linkedin: "https://www.linkedin.com/in/ponaar-ali-0b3879291",
      email: "mailto:ponaarali@gmail.com",
    },
    achievements: ["Responsive Design", "Web Development", "Brand Storytelling"],
  },
  {
    name: "Mishal Hussain",
    role: "Graphic Designer",
    image: "/Images/team/mishal.png",
    bio: "Graphic Designer focused on creating visually appealing and user-centered web designs.",
    social: {
      twitter: "#",
      linkedin: "#",
      email: "mailto:mishal.hussain265@gmail.com",
    },
    achievements: ["Web Projects", "Theme Designs", "Page Development"],
  },
];


// Helper to create slug
const createSlug = (name: string) => name.toLowerCase().replace(/ /g, "-")

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
<>
    {/* Hero Section */}
      <section className="relative pt-28 pb-28 md:pt-40 md:pb-36 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 dark:from-slate-900 dark:via-green-800 dark:to-black overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Our Team
          </h1>

          <nav className="flex justify-center items-center text-sm md:text-base text-white/60">
            <a href="/" className="hover:text-white transition-colors flex items-center gap-2 group">
              <span>Home</span>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            </a>
            <span className="mx-3 text-white/40">/</span>
            <span className="text-white font-medium">Our Team</span>
          </nav>
        </div>
      </section>


    <section ref={ref} className="container mx-auto mt-12 px-4 md:px-8 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] dark:bg-black">
      <h2 className="text-4xl md:text-5xl font-bold mb-9 text-center text-gray-900 dark:text-white">Meet Our Team</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="w-[280px]">
           <div className="relative flex items-center justify-center">
  <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2">
    <Image
      src="/Images/team/picbg.svg"
      alt="Background"
      fill
      className="object-contain"
    />
  </div>
  <div className="relative z-10 h-[260px] w-[220px] rounded-lg overflow-hidden">
    <Image
      src={member.image}
      alt={member.name}
      fill
      className="object-cover"
    />
  </div>
</div>

            <div className="mb-14  mt-4 flex flex-col items-center bg-background rounded-xl p-4 shadow-lg text-center">
              <h2 className="text-lg font-medium">{member.name}</h2>
              <h3 className="text-sm text-gray-600">{member.role}</h3>
              <p className="text-sm mt-2">{member.bio}</p>

              <div className="flex items-center justify-center mt-3 space-x-3">
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="text-gray-500 hover:text-gray-900" size={18} />
                </a>
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="text-gray-500 hover:text-gray-900" size={18} />
                </a>
                <a href={member.social.email}>
                  <Mail className="text-gray-500 hover:text-gray-900" size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}
