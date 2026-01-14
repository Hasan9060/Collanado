"use client";

import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import Image from "next/image";

interface NewsItem {
    _id: string;
    title: string;
    description: string;
    image: any;
    publishedAt: string;
    isFeatured?: boolean;
    slug?: { current: string };
}

export default function NewsSection({ news }: { news: NewsItem[] }) {
    const scrollContainerId = "news-scroll-container";

    const scroll = (direction: 'left' | 'right') => {
        const container = document.getElementById(scrollContainerId);
        if (container) {
            const cardWidth = container.querySelector('div')?.clientWidth || 300;
            const scrollAmount = cardWidth + 24; // Width + gap
            container.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!news || news.length === 0) return null;

    return (
        <section className="py-12 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-red-100/50 text-red-600 text-xs font-bold tracking-wider mb-3 border border-red-100">
                            COLLEGE HAPPENINGS
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">News & Events</span>
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-orange-400 mt-3 rounded-full"></div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:text-red-600 hover:scale-110 transition-all duration-300 group"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full bg-red-600 shadow-md shadow-red-200 border border-red-500 flex items-center justify-center text-white hover:bg-red-700 hover:scale-110 transition-all duration-300 group"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="relative -mx-4 px-4 overflow-hidden">
                    <div
                        id={scrollContainerId}
                        className="flex overflow-x-auto gap-6 pb-8 pt-2 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {news.map((item, index) => {
                            const date = new Date(item.publishedAt);
                            const imageUrl = item.image ? urlFor(item.image).url() : null;

                            return (
                                <Link
                                    href={`/news/${item.slug?.current || '#'}`}
                                    key={item._id}
                                    className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[calc(25%-1.25rem)] snap-start group"
                                >
                                    <div className="h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col group-hover:-translate-y-1.5 relative isolate">

                                        {/* Image Container */}
                                        <div className="relative h-48 w-full overflow-hidden">
                                            {imageUrl ? (
                                                <Image
                                                    src={urlFor(item.image).width(400).quality(80).auto('format').url()}
                                                    alt={item.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                                    <Bell className="w-10 h-10" />
                                                </div>
                                            )}
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                                            {/* Date Badge */}
                                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg border border-white/20 flex flex-col items-center min-w-[50px]">
                                                <span className="text-lg font-bold text-gray-900 leading-none">{date.getDate()}</span>
                                                <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider">{date.toLocaleString('default', { month: 'short' })}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-1 relative bg-white">
                                            <div className="mb-3">
                                                <div className="flex items-center gap-1.5 mb-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                                    <span className="text-[10px] font-semibold text-red-600 uppercase tracking-widest">Update</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-red-700 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                                <span className="text-xs font-medium text-gray-400">
                                                    {formatDistanceToNow(date, { addSuffix: true })}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                                                    Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/news"
                        className="relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-semibold text-red-600 transition-all duration-300 ease-out border-2 border-red-600 rounded-full group hover:text-white"
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-600 group-hover:translate-x-0 ease">
                            <ArrowRight className="w-5 h-5" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-red-600 transition-all duration-300 transform group-hover:translate-x-full ease">More Updates</span>
                        <span className="relative invisible">More Updates</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
