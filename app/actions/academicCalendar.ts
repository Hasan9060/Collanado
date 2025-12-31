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

export async function createCalendarEvent(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const startDate = formData.get("startDate") as string;
        const endDate = formData.get("endDate") as string || undefined;
        const textColor = formData.get("textColor") as string;
        const isHighlight = formData.get("isHighlight") === "on";

        if (!title || !startDate) {
            throw new Error("Title and Start Date are required");
        }

        const doc = {
            _type: "academicCalendar",
            title,
            startDate,
            endDate,
            textColor,
            isHighlight,
        };

        await client.create(doc);

        revalidatePath("/academics/academic-calendar");
        revalidatePath("/admin/academic-calendar");

        return { success: true };
    } catch (error) {
        console.error("Error creating calendar event:", error);
        return { success: false, error: "Failed to create event" };
    }
}

export async function deleteCalendarEvent(id: string) {
    try {
        await client.delete(id);
        revalidatePath("/academics/academic-calendar");
        revalidatePath("/admin/academic-calendar");
        return { success: true };
    } catch (error) {
        console.error("Error deleting calendar event:", error);
        return { success: false, error: "Failed to delete event" };
    }
}
