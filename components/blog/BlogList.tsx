"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { BlogPost } from "@/types/blog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { getSlugString } from "@/lib/blog-utils";

interface BlogListProps {
    blogs: BlogPost[];
}

export default function BlogList({ blogs }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...Array.from(new Set(blogs.flatMap(blog => blog.categories || [])))];

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || (blog.categories && blog.categories.includes(selectedCategory.toLowerCase()));
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-12">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search articles..."
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-red-500 focus:border-red-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                ? "bg-red-600 text-white shadow-md shadow-red-200"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredBlogs.map((blog, index) => (
                        <motion.article
                            key={blog._id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                        >
                            <Link href={`/blogs/${getSlugString(blog.slug)}`} className="relative h-56 overflow-hidden block">
                                {blog.mainImage && (
                                    <Image
                                        src={urlFor(blog.mainImage).url()}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                )}
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {blog.categories?.slice(0, 2).map((cat) => (
                                        <Badge key={cat} className="bg-red-600/90 text-white border-none backdrop-blur-sm">
                                            {cat}
                                        </Badge>
                                    ))}
                                </div>
                            </Link>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {format(new Date(blog.publishedAt), "MMM d, yyyy")}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <User className="h-3.5 w-3.5" />
                                        {blog.author.name}
                                    </span>
                                </div>

                                <Link href={`/blogs/${getSlugString(blog.slug)}`}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                                        {blog.title}
                                    </h3>
                                </Link>

                                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                                    {blog.excerpt}
                                </p>

                                <Link
                                    href={`/blogs/${getSlugString(blog.slug)}`}
                                    className="inline-flex items-center text-red-600 font-semibold text-sm hover:gap-2 transition-all"
                                >
                                    Read Article
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </div>

            {filteredBlogs.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="max-w-md mx-auto">
                        <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900">No articles found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
                        <Button
                            variant="link"
                            className="mt-4 text-red-600"
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
