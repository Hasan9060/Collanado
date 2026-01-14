import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'blog',
    title: 'Blog Posts',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [defineArrayMember({ type: 'string' })],
            options: {
                list: [
                    { title: 'Education', value: 'education' },
                    { title: 'Events', value: 'events' },
                    { title: 'News', value: 'news' },
                    { title: 'Sports', value: 'sports' },
                    { title: 'Technology', value: 'technology' },
                ],
            },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'A short summary of the blog post',
            validation: (rule) => rule.max(200),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block',
                }),
                defineArrayMember({
                    type: 'image',
                    options: { hotspot: true },
                }),
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'relatedPosts',
            title: 'Related Posts',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'blog' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
