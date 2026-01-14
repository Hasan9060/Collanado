import { client } from "@/sanity/lib/client";
import { blogsQuery } from "@/sanity/lib/queries";
import { BlogPost } from "@/types/blog";
import { getAuthors } from "@/app/actions/blog";
import BlogManager from "@/components/admin/BlogManager";

export const dynamic = 'force-dynamic';

export default async function AdminBlogsPage() {
    const blogs: BlogPost[] = await client.fetch(blogsQuery);
    const authors = await getAuthors();

    return (
        <div className="container mx-auto">
            <BlogManager initialBlogs={blogs} authors={authors} />
        </div>
    );
}
