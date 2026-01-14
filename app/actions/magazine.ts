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

export async function createMagazine(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const flipbookUrl = formData.get("flipbookUrl") as string;
        const publishDate = formData.get("publishDate") as string;
        const coverImageFile = formData.get("coverImage") as File;

        if (!title || !flipbookUrl || !publishDate) {
            throw new Error("Missing required fields");
        }

        let coverImageAssetId = null;

        if (coverImageFile && coverImageFile.size > 0) {
            const arrayBuffer = await coverImageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const asset = await client.assets.upload("image", buffer, {
                contentType: coverImageFile.type,
                filename: coverImageFile.name,
            });
            coverImageAssetId = asset._id;
        }

        let slug = title.toLowerCase().replace(/\s+/g, '-').slice(0, 96);

        const doc = {
            _type: "collegeMagazine",
            title,
            slug: {
                _type: "slug",
                current: slug,
            },
            description,
            flipbookUrl,
            publishDate,
            coverImage: coverImageAssetId
                ? {
                    _type: "image",
                    asset: {
                        _type: "reference",
                        _ref: coverImageAssetId,
                    },
                }
                : undefined,
        };

        await client.create(doc);

        revalidatePath("/magazine");
        revalidatePath("/admin/magazine");

        return { success: true };
    } catch (error) {
        console.error("Error creating magazine:", error);
        return { success: false, error: "Failed to create magazine" };
    }
}

export async function deleteMagazine(id: string) {
    try {
        await client.delete(id);
        revalidatePath("/magazine");
        revalidatePath("/admin/magazine");
        return { success: true };
    } catch (error) {
        console.error("Error deleting magazine:", error);
        return { success: false, error: "Failed to delete magazine" };
    }
}
