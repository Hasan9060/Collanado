import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, User, ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/button";

interface BlogSectionProps {
    blogs: BlogPost[];
}

import { getSlugString } from "@/lib/blog-utils";

export default function BlogSection({ blogs }: BlogSectionProps) {
    if (!blogs || blogs.length === 0) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-60" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="inline-block py-1 px-4 rounded-full bg-red-100 text-red-700 text-xs font-bold tracking-widest uppercase mb-4">
                            Knowledge Hub
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Latest from our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Blog</span>
                        </h2>
                        <p className="text-lg text-gray-500 mt-4 leading-relaxed">
                            Stay updated with academic tips, campus stories, and educational insights from GDC scholars.
                        </p>
                    </div>
                    <Link href="/blogs">
                        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 h-14 rounded-2xl font-bold group">
                            Explore All Posts
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.slice(0, 3).map((blog) => (
                        <article key={blog._id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
                            <Link href={`/blogs/${getSlugString(blog.slug)}`} className="relative h-64 overflow-hidden block">
                                {blog.mainImage && (
                                    <Image
                                        src={urlFor(blog.mainImage).width(600).quality(80).auto('format').url()}
                                        alt={blog.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-red-600/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter backdrop-blur-sm">
                                        {blog.categories?.[0] || 'Article'}
                                    </span>
                                </div>
                            </Link>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5 text-red-600" />
                                        {format(new Date(blog.publishedAt), "MMM d, yyyy")}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5 text-red-600" />
                                        {blog.author.name}
                                    </span>
                                </div>

                                <Link href={`/blogs/${getSlugString(blog.slug)}`}>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                                        {blog.title}
                                    </h3>
                                </Link>

                                <p className="text-gray-500 text-sm line-clamp-3 mb-8 flex-grow leading-relaxed">
                                    {blog.excerpt}
                                </p>

                                <Link
                                    href={`/blogs/${getSlugString(blog.slug)}`}
                                    className="inline-flex items-center font-extrabold text-sm text-gray-900 group/link"
                                >
                                    <span className="relative">
                                        Read Story
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover/link:w-full transition-all duration-300" />
                                    </span>
                                    <div className="ml-3 p-1.5 rounded-full bg-gray-50 group-hover/link:bg-red-600 group-hover/link:text-white transition-all">
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
