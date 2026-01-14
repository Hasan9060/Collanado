import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { blogBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { BlogPost } from "@/types/blog";
import BlogReader from "@/components/blog/BlogReader";
import { getSlugString } from "@/lib/blog-utils";

interface PageProps {
    params: {
        slug: string;
    };
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const slugStr = getSlugString(params.slug);
    const blog: BlogPost = await client.fetch(blogBySlugQuery, { slug: slugStr });

    if (!blog) {
        return {
            title: "Blog Not Found",
        };
    }

    return {
        title: blog.title,
        description: blog.excerpt,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            type: "article",
            publishedTime: blog.publishedAt,
            authors: [blog.author.name],
            images: blog.mainImage ? [urlFor(blog.mainImage).url()] : [],
        },
    };
}

export default async function BlogPage({ params }: PageProps) {
    const slugStr = getSlugString(params.slug);
    const blog: BlogPost = await client.fetch(blogBySlugQuery, { slug: slugStr });

    if (!blog) {
        notFound();
    }

    // Pass the data to the Client Component which handles all the UI/Logic
    return <BlogReader blog={blog} />;
}
