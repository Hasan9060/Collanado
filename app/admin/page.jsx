"use client";

import Link from "next/link";
import { Newspaper, BookOpen, Calendar, BookCheck, Award } from "lucide-react";

export default function AdminDashboard() {
  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to GDC Admin</h1>
        <p className="text-gray-500 mb-8">Manage your website content from here.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Magazine Management Card */}
          <Link
            href="/admin/magazine"
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500" />
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:rotate-6 transition-transform">
              <BookCheck size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">College Magazine</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
              Upload new flipbooks (Heyzine), set cover images, and manage your digital publications.
            </p>
            <span className="text-green-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              Manage Now →
            </span>
          </Link>

          {/* News Management Card */}
          <Link
            href="/admin/news"
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600" />
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:-rotate-6 transition-transform">
              <Newspaper size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">Manage News</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
              Publish latest announcements, events, and updates to the homepage news ticker.
            </p>
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              Manage Now →
            </span>
          </Link>

          {/* Blog Management Card */}
          <Link
            href="/admin/blogs"
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:rotate-6 transition-transform">
              <BookOpen size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">Manage Blogs</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
              Write and publish educational articles, student stories, and faculty blogs.
            </p>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              Manage Now →
            </span>
          </Link>


          {/* Academic Calendar Card */}
          <Link
            href="/admin/academic-calendar"
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-600" />
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:-rotate-6 transition-transform">
              <Calendar size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">Academic Calendar</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
              Update college events, holidays, and important academic year dates.
            </p>
            <span className="text-purple-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              Manage Now →
            </span>
          </Link>

          {/* Results Management Card */}
          <Link
            href="/admin/results"
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-500" />
            <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-6 group-hover:rotate-6 transition-transform">
              <Award size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">Student Results</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
              Upload and manage student exam results, marks, and academic performance records.
            </p>
            <span className="text-yellow-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              Manage Now →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
