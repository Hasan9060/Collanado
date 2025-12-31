"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Search, Calendar, ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface NewsItem {
    _id: string;
    title: string;
    description: string;
    image: any;
    publishedAt: string;
    isFeatured?: boolean;
    slug?: { current: string };
}

const ITEMS_PER_PAGE = 9;

export default function NewsFeed({ initialNews }: { initialNews: NewsItem[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter Logic
    const filteredNews = useMemo(() => {
        return initialNews.filter(item => {
            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesDate = filterDate
                ? item.publishedAt.startsWith(filterDate)
                : true;

            const matchesFeatured = showOnlyFeatured ? item.isFeatured : true;

            return matchesSearch && matchesDate && matchesFeatured;
        });
    }, [initialNews, searchTerm, filterDate, showOnlyFeatured]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const paginatedNews = filteredNews.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-12">
            {/* Filters Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search news..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none bg-gray-50/50 focus:bg-white"
                        />
                    </div>

                    {/* Date Picker */}
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none bg-gray-50/50 focus:bg-white text-gray-600"
                        />
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${showOnlyFeatured
                                ? "bg-red-50 border-red-200 text-red-700 font-semibold shadow-sm"
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <Star className={`w-5 h-5 ${showOnlyFeatured ? "fill-red-700" : ""}`} />
                            {showOnlyFeatured ? "Showing Important Only" : "Show All Updates"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between text-sm text-gray-500 px-2">
                <p>Showing {filteredNews.length} update{filteredNews.length !== 1 ? 's' : ''}</p>
                {searchTerm || filterDate || showOnlyFeatured ? (
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setFilterDate("");
                            setShowOnlyFeatured(false);
                            setCurrentPage(1);
                        }}
                        className="text-red-600 hover:text-red-700 font-medium underline"
                    >
                        Clear Filters
                    </button>
                ) : null}
            </div>

            {/* News Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedNews.map((item) => (
                    <Link key={item._id} href={`/news/${item.slug?.current || '#'}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block h-full">
                        <article className="flex flex-col h-full">
                            {/* Image */}
                            <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                                {item.image ? (
                                    <Image
                                        src={urlFor(item.image).url()}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <Clock className="w-12 h-12" />
                                    </div>
                                )}
                                {item.isFeatured && (
                                    <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                                        <Star className="w-3 h-3 fill-yellow-900" />
                                        Review This
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-3 text-xs font-medium text-gray-500">
                                    <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-100">
                                        News
                                    </span>
                                    <span>•</span>
                                    <span>{new Date(item.publishedAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-700 transition-colors">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                    {item.description}
                                </p>

                                <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-sm mt-auto">
                                    <span className="text-gray-400 flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                                    </span>
                                    <span className="text-red-600 font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Read Article <ChevronRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredNews.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm mb-4">
                        <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No updates found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search term.</p>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-8">
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-1 px-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                    ? "bg-red-600 text-white shadow-md shadow-red-200"
                                    : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
