"use client";

import { useState, useRef } from "react";
import { createNews, deleteNews } from "@/app/actions/news";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Plus, Upload, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner or similar toast is available, checking package.json... sonner is in dependencies!
import { urlFor } from "@/sanity/lib/image";

interface NewsItem {
    _id: string;
    title: string;
    description: string;
    image: any;
    publishedAt: string;
    isFeatured?: boolean;
    slug?: { current: string };
    gallery?: any[];
}

export default function NewsManager({ initialNews }: { initialNews: NewsItem[] }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        try {
            const result = await createNews(formData);
            if (result.success) {
                toast.success("News added successfully!");
                formRef.current?.reset();
                router.refresh();
            } else {
                toast.error("Failed to add news");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this news item?")) return;

        setIsDeleting(id);
        try {
            const result = await deleteNews(id);
            if (result.success) {
                toast.success("News deleted successfully!");
                router.refresh();
            } else {
                toast.error("Failed to delete news");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsDeleting(null);
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">News & Updates</h2>
                    <p className="text-gray-500 mt-1">Manage the latest news for the college website.</p>
                </div>
            </div>

            {/* Add News Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-red-600" />
                    Add New Update
                </h3>

                <form ref={formRef} action={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="e.g. Annual Sports Week 2024"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={4}
                                    placeholder="Write a brief description..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Slug (Optional)</label>
                                <input
                                    type="text"
                                    name="slug"
                                    placeholder="your-custom-slug"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none text-sm text-gray-600"
                                />
                                <p className="text-xs text-gray-400 mt-1">Leave blank to auto-generate from title.</p>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    id="isFeatured"
                                    className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-gray-300"
                                />
                                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                                    Mark as Important (Featured)
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer relative mb-4">
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        required
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                                            <Upload className="w-5 h-5" />
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            <span className="font-semibold text-red-600">Main Cover</span> (Required)
                                        </div>
                                    </div>
                                </div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Gallery Images</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer relative">
                                    <input
                                        type="file"
                                        name="gallery"
                                        accept="image/*"
                                        multiple
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Upload className="w-5 h-5" />
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            <span className="font-semibold text-blue-600">Add Multiple Images</span> (Optional)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                "Publish Update"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* News List */}
            <div className="grid lg:grid-cols-2 gap-6">
                {initialNews.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex hover:shadow-md transition-shadow">
                        <div className="w-1/3 relative bg-gray-100">
                            {item.image && (
                                <Image
                                    src={urlFor(item.image).url()}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <div className="w-2/3 p-5 flex flex-col">
                            <div className="mb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <h4 className="font-bold text-gray-900 leading-tight line-clamp-1">{item.title}</h4>
                                    {item.isFeatured && (
                                        <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(item.publishedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{item.description}</p>
                            <p className="text-xs text-gray-400 mb-2 font-mono">/{item.slug?.current || 'no-slug'}</p>

                            <div className="flex justify-between items-center pt-2 border-t border-gray-50 mt-auto">
                                <a
                                    href={`/news/${item.slug?.current}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                                >
                                    View Live
                                </a>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    disabled={isDeleting === item._id}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                                >
                                    {isDeleting === item._id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {initialNews.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                        No news updates found. Add your first update above!
                    </div>
                )}
            </div>
        </div>
    );
}
