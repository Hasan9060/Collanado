"use client";

import { useState, useRef } from "react";
import { createMagazine, deleteMagazine } from "@/app/actions/magazine";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Plus, Upload, Loader2, Calendar, BookOpen, Link, X } from "lucide-react";
import { toast } from "sonner";
import { urlFor } from "@/sanity/lib/image";

interface MagazineItem {
    _id: string;
    title: string;
    description: string;
    coverImage: any;
    publishDate: string;
    flipbookUrl: string;
}

export default function MagazineManager({ initialMagazines }: { initialMagazines: MagazineItem[] }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        try {
            const result = await createMagazine(formData);
            if (result.success) {
                toast.success("Magazine added successfully!");
                formRef.current?.reset();
                setShowForm(false);
                router.refresh();
            } else {
                toast.error("Failed to add magazine");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this magazine?")) return;

        setIsDeleting(id);
        try {
            const result = await deleteMagazine(id);
            if (result.success) {
                toast.success("Magazine deleted successfully!");
                router.refresh();
            } else {
                toast.error("Failed to delete magazine");
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
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">College Magazines</h2>
                    <p className="text-gray-500 mt-1">Manage digital flipbooks and publications.</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-100"
                    >
                        <Plus size={20} />
                        Add New Issue
                    </button>
                )}
            </div>

            {/* Add Magazine Form */}
            {showForm && (
                <motion_div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600" />

                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-red-600" />
                            Enter Magazine Details
                        </h3>
                        <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form ref={formRef} action={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Magazine Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        placeholder="e.g. Annual Magazine 2024-25"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 transition-all outline-none bg-gray-50/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Flipbook URL (Heyzine)</label>
                                    <div className="relative">
                                        <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="url"
                                            name="flipbookUrl"
                                            required
                                            placeholder="https://heyzine.com/flip-book/..."
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 transition-all outline-none bg-gray-50/50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Publish Date</label>
                                    <input
                                        type="date"
                                        name="publishDate"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 transition-all outline-none bg-gray-50/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image</label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:bg-gray-50 transition-colors text-center cursor-pointer relative">
                                        <input
                                            type="file"
                                            name="coverImage"
                                            accept="image/*"
                                            required
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                                                <Upload className="w-6 h-6" />
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <span className="font-bold text-red-600">Upload Cover Image</span>
                                                <p className="text-xs text-gray-400 mt-1">Recommended: 3:4 Aspect Ratio</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Short Description (Optional)</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        placeholder="Brief summary about this issue..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 transition-all outline-none bg-gray-50/50 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 gap-4">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-red-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    "Publish Magazine"
                                )}
                            </button>
                        </div>
                    </form>
                </motion_div>
            )}

            {/* Magazines List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {initialMagazines.map((mag) => (
                    <div key={mag._id} className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                            {mag.coverImage && (
                                <Image
                                    src={urlFor(mag.coverImage).url()}
                                    alt={mag.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <div className="mb-4">
                                <h4 className="font-black text-xl text-gray-900 leading-tight mb-2 group-hover:text-red-600 transition-colors uppercase tracking-tight">{mag.title}</h4>
                                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                    <Calendar className="w-4 h-4 text-red-500" />
                                    {new Date(mag.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1 italic">
                                {mag.description || "No description provided."}
                            </p>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <a
                                    href={mag.flipbookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-600 hover:text-red-700 text-xs font-black flex items-center gap-1.5 transition-colors uppercase tracking-widest"
                                >
                                    <Link className="w-3 h-3" />
                                    Live Preview
                                </a>
                                <button
                                    onClick={() => handleDelete(mag._id)}
                                    disabled={isDeleting === mag._id}
                                    className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2.5 rounded-xl transition-all"
                                    title="Delete Magazine"
                                >
                                    {isDeleting === mag._id ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {initialMagazines.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-[2rem] border-4 border-dashed border-gray-50">
                        <BookOpen className="mx-auto w-16 h-16 text-gray-100 mb-4" />
                        <p className="text-lg font-medium">No magazines published yet.</p>
                        <p className="text-sm">Click "Add New Issue" to upload your first magazine.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Simple motion wrapper for clean transition
function motion_div({ children, initial, animate, className }: any) {
    return (
        <div
            style={{
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: animate.opacity,
                transform: `scale(${animate.scale})`
            }}
            className={className}
        >
            {children}
        </div>
    )
}
