"use client";

import Link from "next/link";
import { Newspaper } from "lucide-react";

export default function AdminDashboard() {
  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to GDC Admin</h1>
        <p className="text-gray-500 mb-8">Manage your website content from here.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* News Management Card */}
          <Link
            href="/studio"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4 group-hover:scale-110 transition-transform">
              <Newspaper size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage News</h2>
            <p className="text-gray-500 text-sm">
              Create, edit, and publish news articles and updates via Sanity Studio.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
