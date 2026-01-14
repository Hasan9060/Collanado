"use server";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { revalidatePath } from "next/cache";

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

// Helper: Premium HTML to Portable Text Blocks Parser with List Support
const htmlToBlocks = (html: string) => {
    const blocks: any[] = [];
    const sanitizedHtml = html.replace(/<p><br><\/p>/g, "").trim();

    // Helper to parse inline marks
    const parseChildren = (content: string) => {
        const children: any[] = [];
        // Split by ALL tags so we don't ignore unsupported tag's inner content
        const parts = content.split(/(<[^>]+>)/g).filter(p => p !== "");
        let marks: string[] = [];

        parts.forEach(part => {
            if (part.startsWith("<")) {
                if (part === "<strong>") marks.push("strong");
                else if (part === "</strong>") marks = marks.filter(m => m !== "strong");
                else if (part === "<em>") marks.push("em");
                else if (part === "</em>") marks = marks.filter(m => m !== "em");
                else if (part === "<u>") marks.push("underline");
                else if (part === "</u>") marks = marks.filter(m => m !== "underline");
                else if (part === "<s>") marks.push("strike");
                else if (part === "</s>") marks = marks.filter(m => m !== "strike");
                // Unsupported tags (like <a>) are stripped, marks unchanged
            } else {
                children.push({
                    _type: "span",
                    text: part.replace(/&nbsp;/g, " "),
                    marks: [...marks]
                });
            }
        });
        return children.length > 0 ? children : [{ _type: "span", text: content.replace(/<[^>]*>/g, ""), marks: [] }];
    };

    const tagRegex = /<(p|h1|h2|h3|h4|blockquote|ul|ol)>(.*?)<\/\1>/g;
    let match;

    while ((match = tagRegex.exec(sanitizedHtml)) !== null) {
        const tag = match[1];
        const innerHtml = match[2];

        if (tag === 'ul' || tag === 'ol') {
            // Handle Lists
            const liRegex = /<li>(.*?)<\/li>/g;
            let liMatch;
            while ((liMatch = liRegex.exec(innerHtml)) !== null) {
                blocks.push({
                    _type: "block",
                    listItem: tag === 'ul' ? 'bullet' : 'number',
                    style: "normal",
                    markDefs: [],
                    children: parseChildren(liMatch[1])
                });
            }
        } else {
            const block: any = {
                _type: "block",
                markDefs: [],
                children: parseChildren(innerHtml)
            };

            if (tag === "h1") block.style = "h1";
            else if (tag === "h2") block.style = "h2";
            else if (tag === "h3") block.style = "h3";
            else if (tag === "blockquote") block.style = "blockquote";
            else block.style = "normal";

            blocks.push(block);
        }
    }

    if (blocks.length === 0) {
        // Fallback
        blocks.push({
            _type: "block",
            style: "normal",
            children: [{ _type: "span", text: sanitizedHtml.replace(/<[^>]*>/g, ""), marks: [] }],
            markDefs: []
        });
    }
    return blocks;
};

export async function createAuthor(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const bio = formData.get("bio") as string;
        const imageFile = formData.get("image") as File;

        if (!name) throw new Error("Name is required");

        let imageAssetId = null;
        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const asset = await client.assets.upload("image", buffer, {
                contentType: imageFile.type,
                filename: imageFile.name,
            });
            imageAssetId = asset._id;
        }

        const doc = {
            _type: "author",
            name,
            bio,
            image: imageAssetId ? {
                _type: "image",
                asset: { _type: "reference", _ref: imageAssetId }
            } : undefined
        };

        const result = await client.create(doc);
        revalidatePath("/admin/blogs");
        return { success: true, author: result };
    } catch (error) {
        console.error("Error creating author:", error);
        return { success: false };
    }
}

export async function createBlog(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const excerpt = formData.get("excerpt") as string;
        const bodyContent = formData.get("body") as string;
        const categoryString = formData.get("categories") as string;
        const authorId = formData.get("authorId") as string;
        const imageFile = formData.get("image") as File;

        if (!title || !excerpt || !authorId) {
            throw new Error("Title, excerpt and author are required");
        }

        let imageAssetId = null;
        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const asset = await client.assets.upload("image", buffer, {
                contentType: imageFile.type,
                filename: imageFile.name,
            });
            imageAssetId = asset._id;
        }

        let slug = formData.get("slug") as string;
        if (!slug) {
            slug = title.toLowerCase().replace(/\s+/g, '-').slice(0, 96);
        }

        const categories = categoryString.split(",").map(c => c.trim()).filter(c => c !== "");
        const bodyBlocks = htmlToBlocks(bodyContent);

        const doc = {
            _type: "blog",
            title,
            slug: { _type: "slug", current: slug },
            excerpt,
            publishedAt: new Date().toISOString(),
            categories,
            author: {
                _type: "reference",
                _ref: authorId
            },
            mainImage: imageAssetId ? {
                _type: "image",
                asset: { _type: "reference", _ref: imageAssetId }
            } : undefined,
            body: bodyBlocks
        };

        await client.create(doc);
        revalidatePath("/blogs");
        revalidatePath("/admin/blogs");

        return { success: true };
    } catch (error) {
        console.error("Error creating blog:", error);
        return { success: false };
    }
}

export async function updateBlog(id: string, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const excerpt = formData.get("excerpt") as string;
        const bodyContent = formData.get("body") as string;
        const categoryString = formData.get("categories") as string;
        const authorId = formData.get("authorId") as string;
        const imageFile = formData.get("image") as File;

        if (!title || !excerpt || !authorId) {
            throw new Error("Title, excerpt and author are required");
        }

        let imageAssetId = null;
        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const asset = await client.assets.upload("image", buffer, {
                contentType: imageFile.type,
                filename: imageFile.name,
            });
            imageAssetId = asset._id;
        }

        let slug = formData.get("slug") as string;
        if (!slug) {
            slug = title.toLowerCase().replace(/\s+/g, '-').slice(0, 96);
        }

        const categories = categoryString.split(",").map(c => c.trim()).filter(c => c !== "");
        const bodyBlocks = htmlToBlocks(bodyContent);

        const updateData: any = {
            title,
            slug: { _type: "slug", current: slug },
            excerpt,
            categories,
            author: {
                _type: "reference",
                _ref: authorId
            },
            body: bodyBlocks
        };

        if (imageAssetId) {
            updateData.mainImage = {
                _type: "image",
                asset: { _type: "reference", _ref: imageAssetId }
            };
        }

        await client.patch(id).set(updateData).commit();
        revalidatePath("/blogs");
        revalidatePath("/admin/blogs");

        return { success: true };
    } catch (error) {
        console.error("Error updating blog:", error);
        return { success: false };
    }
}

export async function deleteBlog(id: string) {
    try {
        await client.delete(id);
        revalidatePath("/blogs");
        revalidatePath("/admin/blogs");
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function getAuthors() {
    return await client.fetch(`*[_type == "author"]{_id, name}`);
}


export async function getBlogById(id: string) {
    return await client.fetch(`*[_type == "blog" && _id == $id][0]{
        _id,
        title,
        slug,
        excerpt,
        body,
        categories,
        author->{_id, name},
        mainImage
    }`, { id });
}

export async function deleteAuthor(id: string) {
    try {
        await client.delete(id);
        revalidatePath("/admin/blogs");
        return { success: true };
    } catch (error) {
        console.error("Error deleting author:", error);
        return { success: false };
    }
}

