'use server'

import { client } from "@/sanity/lib/client"
import { revalidatePath } from "next/cache"

export async function createResult(formData: FormData) {
    try {
        const title = formData.get('title') as string
        const studentName = formData.get('studentName') as string
        const rollNumber = formData.get('rollNumber') as string
        const studentClass = formData.get('class') as string
        const subjectsJson = formData.get('subjects') as string

        // Validate that subjectsJson is valid JSON
        let subjects = []
        try {
            subjects = JSON.parse(subjectsJson).map((sub: any) => ({
                ...sub,
                _key: Math.random().toString(36).substring(7) // Simple key generation
            }))
        } catch (e) {
            console.error("Invalid subjects JSON", e)
            return { success: false, error: "Invalid subjects data" }
        }

        const doc = {
            _type: 'examResult',
            title,
            studentName,
            rollNumber,
            class: studentClass,
            subjects,
            publishedAt: new Date().toISOString(),
        }

        await client.create(doc)
        revalidatePath('/admin/results')
        revalidatePath('/portal/student') // Or wherever the student views it
        return { success: true }
    } catch (error: any) {
        console.error('Error creating result:', error)
        return { success: false, error: error.message || 'Failed to create result' }
    }
}

export async function getResults() {
    try {
        const query = `*[_type == "examResult"] | order(publishedAt desc)`
        const results = await client.fetch(query)
        return { success: true, data: results }
    } catch (error) {
        console.error('Error fetching results:', error)
        return { success: false, error: 'Failed to fetch results' }
    }
}

export async function deleteResult(id: string) {
    try {
        await client.delete(id)
        revalidatePath('/admin/results')
        return { success: true }
    } catch (error) {
        console.error('Error deleting result:', error)
        return { success: false, error: 'Failed to delete result' }
    }
}

export async function searchResult(rollNumber: string) {
    try {
        // Simple search by roll number
        // Case insensitive search would be better but sanity simple match is easier for now
        const query = `*[_type == "examResult" && rollNumber == $rollNumber] | order(publishedAt desc)`
        const results = await client.fetch(query, { rollNumber })
        return { success: true, data: results }
    } catch (error) {
        console.error('Error searching result:', error)
        return { success: false, error: 'Failed to find result' }
    }
}
