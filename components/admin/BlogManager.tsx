"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Plus, Upload, Loader2, Calendar, User, BookOpen, Send, UserPlus, Edit } from "lucide-react";
import { toast } from "sonner";
import { urlFor } from "@/sanity/lib/image";
import { createBlog, deleteBlog, createAuthor, updateBlog, getBlogById, deleteAuthor } from "@/app/actions/blog";
import { Button } from "@/components/ui/button";
import { BlogPost, Author } from "@/types/blog";
import RichTextEditor from "./RichTextEditor";
import { getSlugString } from "@/lib/blog-utils";

interface BlogManagerProps {
    initialBlogs: BlogPost[];
    authors: { _id: string, name: string }[];
}

export default function BlogManager({ initialBlogs, authors }: BlogManagerProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAuthorSubmitting, setIsAuthorSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isAuthorDeleting, setIsAuthorDeleting] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"list" | "add" | "author">("list");
    const [blogContent, setBlogContent] = useState("");
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);


    const blogFormRef = useRef<HTMLFormElement>(null);
    const authorFormRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    async function handleBlogSubmit(formData: FormData) {
        setIsSubmitting(true);
        formData.append("body", blogContent);
        // Ensure the current slug state is sent
        formData.set("slug", slug);

        try {
            let result;
            if (editingBlog) {
                result = await updateBlog(editingBlog._id, formData);
                if (result.success) {
                    toast.success("Blog updated successfully!");
                }
            } else {
                result = await createBlog(formData);
                if (result.success) {
                    toast.success("Blog published successfully!");
                }
            }

            if (result.success) {
                blogFormRef.current?.reset();
                setBlogContent("");
                setTitle("");
                setSlug("");
                setEditingBlog(null);
                setActiveTab("list");
                router.refresh();
            } else {
                toast.error(editingBlog ? "Failed to update blog" : "Failed to publish blog");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleAuthorSubmit(formData: FormData) {
        setIsAuthorSubmitting(true);
        try {
            const result = await createAuthor(formData);
            if (result.success) {
                toast.success("Author added successfully!");
                authorFormRef.current?.reset();
                setActiveTab("add");
                router.refresh();
            } else {
                toast.error("Failed to add author");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsAuthorSubmitting(false);
        }
    }

    async function handleAuthorDelete(id: string) {
        if (!confirm("Are you sure you want to delete this author?")) return;
        setIsAuthorDeleting(id);
        try {
            const result = await deleteAuthor(id);
            if (result.success) {
                toast.success("Author deleted successfully!");
                router.refresh();
            } else {
                toast.error("Failed to delete author");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsAuthorDeleting(null);
        }
    }

    async function handleEdit(blog: BlogPost) {
        setEditingBlog(blog);
        setTitle(blog.title);
        setSlug(getSlugString(blog.slug));

        const blocksToHtml = (blocks: any[]) => {
            let html = '';
            let inList = false;
            let listType = '';

            blocks.forEach((block: any) => {
                if (block._type !== 'block') return;

                const isList = !!block.listItem;

                if (isList) {
                    const currentListType = block.listItem === 'number' ? 'ol' : 'ul';
                    if (!inList) {
                        inList = true;
                        listType = currentListType;
                        html += `<${listType}>`;
                    } else if (listType !== currentListType) {
                        // Switch list type
                        html += `</${listType}><${currentListType}>`;
                        listType = currentListType;
                    }
                } else {
                    if (inList) {
                        inList = false;
                        html += `</${listType}>`;
                    }
                }

                const children = block.children || [];
                const innerText = children.map((child: any) => {
                    let content = child.text || '';
                    if (child.marks?.includes('strong')) content = `<strong>${content}</strong>`;
                    if (child.marks?.includes('em')) content = `<em>${content}</em>`;
                    if (child.marks?.includes('underline')) content = `<u>${content}</u>`;
                    if (child.marks?.includes('strike')) content = `<s>${content}</s>`;
                    return content;
                }).join('');

                if (isList) {
                    html += `<li>${innerText}</li>`;
                } else {
                    const style = block.style || 'normal';
                    if (style === 'h1') html += `<h1>${innerText}</h1>`;
                    else if (style === 'h2') html += `<h2>${innerText}</h2>`;
                    else if (style === 'h3') html += `<h3>${innerText}</h3>`;
                    else if (style === 'blockquote') html += `<blockquote>${innerText}</blockquote>`;
                    else html += `<p>${innerText}</p>`;
                }
            });

            if (inList) html += `</${listType}>`;

            return html;
        };

        setBlogContent(blocksToHtml(blog.body || []));
        setActiveTab("add");
    }

    const generateSlug = () => {
        const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setSlug(newSlug);
    };

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        setIsDeleting(id);
        try {
            const result = await deleteBlog(id);
            if (result.success) {
                toast.success("Blog deleted");
                router.refresh();
            } else {
                toast.error("Delete failed");
            }
        } finally {
            setIsDeleting(null);
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Blog Management</h2>
                    <p className="text-gray-500 mt-1">Manage articles and publishers directly from here.</p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setActiveTab("list")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "list" ? "bg-white text-red-600 shadow-sm" : "text-gray-500"}`}
                    >
                        View All
                    </button>
                    <button
                        onClick={() => setActiveTab("add")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "add" ? "bg-white text-red-600 shadow-sm" : "text-gray-500"}`}
                    >
                        Add Blog
                    </button>
                    <button
                        onClick={() => setActiveTab("author")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "author" ? "bg-white text-red-600 shadow-sm" : "text-gray-500"}`}
                    >
                        Add Author
                    </button>
                </div>
            </div>

            {activeTab === "list" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialBlogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                            <div className="relative h-48 bg-gray-100">
                                {blog.mainImage && (
                                    <Image
                                        src={urlFor(blog.mainImage).url()}
                                        alt={blog.title}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(blog.publishedAt).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <User size={12} />
                                        {blog.author.name}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                    <a href={`/blogs/${getSlugString(blog.slug)}`} target="_blank" className="text-xs font-semibold text-gray-500 hover:text-red-600">
                                        View Post
                                    </a>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            disabled={isDeleting === blog._id}
                                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                        >
                                            {isDeleting === blog._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {initialBlogs.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
                            <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-gray-500">No blogs posted yet.</p>
                            <Button onClick={() => setActiveTab("add")} variant="link" className="text-red-600">Post your first blog</Button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "add" && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</h3>
                        <p className="text-gray-500 text-sm mt-1">{editingBlog ? "Update your blog post details below" : "Fill in the details to publish a new blog"}</p>
                    </div>
                    <form ref={blogFormRef} action={handleBlogSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title</label>
                                    <input
                                        name="title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none"
                                        placeholder="Enter post title..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt (Short Summary)</label>
                                    <textarea name="excerpt" required rows={3} defaultValue={editingBlog?.excerpt || ""} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none resize-none" placeholder="Briefly describe the post..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Publisher / Author</label>
                                    <select name="authorId" required defaultValue={editingBlog?.author?._id || ""} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none">
                                        <option value="">Select Author</option>
                                        {authors.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                                    </select>
                                    <p className="text-[10px] text-gray-400 mt-1">Don't see author? Use "Add Author" tab first.</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                                    <div className="relative h-44 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden">
                                        <input type="file" name="image" required={!editingBlog} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                                        <Upload className="text-gray-400 mb-2" size={24} />
                                        <span className="text-xs text-gray-500">{editingBlog ? "Upload New Banner (Optional)" : "Upload Banner Image"}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Categories</label>
                                    <input name="categories" defaultValue={editingBlog?.categories?.join(", ") || ""} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Education, Sports, News (comma separated)" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Slug (Optional)</label>
                                    <div className="flex gap-2">
                                        <input
                                            name="slug"
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none"
                                            placeholder="awesome-new-post"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={generateSlug}
                                            title="Generate from Title"
                                            className="h-full"
                                        >
                                            <Loader2 size={16} className={slug ? "" : "animate-spin"} />
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">Click the button to regenerate from title.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-4">Blog Content (MS Word Style)</label>
                            <RichTextEditor value={blogContent} onChange={setBlogContent} />
                            <p className="text-[10px] text-gray-400 mt-2 italic px-1">Tip: Use the toolbar above to style your headings, lists and bold text.</p>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="ghost" onClick={() => { setActiveTab("list"); setEditingBlog(null); setBlogContent(""); setTitle(""); setSlug(""); }}>Cancel</Button>
                            <Button disabled={isSubmitting} className="bg-red-700 hover:bg-red-800 text-white px-8 h-12 rounded-xl flex items-center gap-2">
                                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                {isSubmitting ? (editingBlog ? "Updating..." : "Publishing...") : (editingBlog ? "Update Blog Post" : "Publish Blog Post")}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === "author" && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
                    <form ref={authorFormRef} action={handleAuthorSubmit} className="space-y-6">
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-4">
                                <UserPlus size={32} />
                            </div>
                            <h3 className="text-xl font-bold">Manage Authors</h3>
                            <p className="text-gray-500 text-sm">Create profiles for blog writers.</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Author Name</label>
                                <input name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none" placeholder="e.g. Prof. Ahmed Raza" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture</label>
                                <div className="relative h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                    <input type="file" name="image" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <Upload className="text-gray-400 mb-2" size={24} />
                                    <span className="text-xs text-gray-500">Upload Headshot</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Bio</label>
                                <textarea name="bio" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none resize-none" placeholder="A brief about the author..." />
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <Button disabled={isAuthorSubmitting} className="bg-red-700 hover:bg-red-800 text-white w-full h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-100">
                                {isAuthorSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                                {isAuthorSubmitting ? "Adding..." : "Add Author Profile"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-4">Existing Authors</h4>
                        <div className="space-y-3">
                            {authors.map((author) => (
                                <div key={author._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-bold">
                                            {author.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-gray-700">{author.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleAuthorDelete(author._id)}
                                        disabled={isAuthorDeleting === author._id}
                                        className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                        title="Delete Author"
                                    >
                                        {isAuthorDeleting === author._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                    </button>
                                </div>
                            ))}
                            {authors.length === 0 && (
                                <p className="text-center text-gray-500 text-sm py-4">No authors found.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
