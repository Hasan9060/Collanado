import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { blogsQuery } from "@/sanity/lib/queries";
import { BlogPost } from "@/types/blog";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
    title: "GDC Blog | Insights & updates",
    description: "Stay updated with the latest news, academic tips, and college updates from Government Degree Science & Commerce College Malir Cantt Karachi.",
};

const blogs_page_revalidate = 60; // Revalidate every minute

export default async function BlogsPage() {
    const blogs: BlogPost[] = await client.fetch(blogsQuery, {}, { next: { revalidate: blogs_page_revalidate } });

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Hero Section */}
            <div className="bg-red-600 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                </div>
                <div className="container px-4 mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                        Latest Insights & <span className="text-red-200">Stories</span>
                    </h1>
                    <p className="text-red-50 max-w-2xl mx-auto text-lg md:text-xl">
                        Explore the latest happenings, academic excellence, and student success stories at GDC Malir Cantt.
                    </p>
                </div>
            </div>

            <div className="container px-4 mx-auto -mt-10 pb-20">
                <BlogList blogs={blogs} />
            </div>
        </div>
    );
}
