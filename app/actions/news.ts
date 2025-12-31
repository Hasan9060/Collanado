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

export async function createNews(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const imageFile = formData.get("image") as File;

        if (!title || !description) {
            throw new Error("Title and Description are required");
        }

        let imageAssetId = null;

        if (imageFile && imageFile.size > 0) {
            // Upload image to Sanity
            // We need to convert File to Buffer or ArrayBuffer for Sanity upload
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const asset = await client.assets.upload("image", buffer, {
                contentType: imageFile.type,
                filename: imageFile.name,
            });
            imageAssetId = asset._id;
        }

        const isFeatured = formData.get("isFeatured") === "on";

        // Use provided slug or generate from title
        let slug = formData.get("slug") as string;
        if (!slug) {
            slug = title.toLowerCase().replace(/\s+/g, '-').slice(0, 96);
        } else {
            slug = slug.toLowerCase().replace(/\s+/g, '-').slice(0, 96);
        }

        const galleryFiles = formData.getAll("gallery") as File[];
        const galleryAssetIds: string[] = [];

        if (galleryFiles && galleryFiles.length > 0) {
            for (const file of galleryFiles) {
                if (file.size > 0) {
                    const arrayBuffer = await file.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const asset = await client.assets.upload("image", buffer, {
                        contentType: file.type,
                        filename: file.name,
                    });
                    galleryAssetIds.push(asset._id);
                }
            }
        }

        const doc = {
            _type: "news",
            title,
            slug: {
                _type: "slug",
                current: slug,
            },
            description,
            isFeatured,
            publishedAt: new Date().toISOString(),
            image: imageAssetId
                ? {
                    _type: "image",
                    asset: {
                        _type: "reference",
                        _ref: imageAssetId,
                    },
                }
                : undefined,
            gallery: galleryAssetIds.length > 0
                ? galleryAssetIds.map(id => ({
                    _type: "image",
                    _key: id, // key is required for arrays
                    asset: {
                        _type: "reference",
                        _ref: id
                    }
                }))
                : [],
        };

        await client.create(doc);

        revalidatePath("/");
        revalidatePath("/admin/news");

        return { success: true };
    } catch (error) {
        console.error("Error creating news:", error);
        return { success: false, error: "Failed to create news" };
    }
}

export async function deleteNews(id: string) {
    try {
        await client.delete(id);
        revalidatePath("/");
        revalidatePath("/admin/news");
        return { success: true };
    } catch (error) {
        console.error("Error deleting news:", error);
        return { success: false, error: "Failed to delete news" };
    }
}
