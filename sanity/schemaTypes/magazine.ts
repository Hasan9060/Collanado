import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'collegeMagazine',
    title: 'College Magazine',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Magazine Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'flipbookUrl',
            title: 'Flipbook URL (Heyzine etc.)',
            type: 'url',
            description: 'The URL of your hosted flipbook (e.g., from Heyzine)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishDate',
            title: 'Publish Date',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'coverImage',
            date: 'publishDate',
        },
        prepare(selection) {
            const { title, date } = selection
            return {
                title: title,
                subtitle: date ? `Published: ${date}` : 'Not published yet',
            }
        },
    },
})
