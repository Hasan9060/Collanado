import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'academicCalendar',
    title: 'Academic Calendar',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Event Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date (or Single Date)',
            type: 'date',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End Date (Optional)',
            type: 'date',
        }),
        defineField({
            name: 'textColor',
            title: 'Text Color',
            type: 'string',
            options: {
                list: [
                    { title: 'Default (Black)', value: 'black' },
                    { title: 'Red (Striking)', value: 'red' },
                    { title: 'Green (Good)', value: 'green' },
                    { title: 'Blue (Info)', value: 'blue' },
                ],
                layout: 'radio',
            },
            initialValue: 'black',
        }),
        defineField({
            name: 'isHighlight',
            title: 'Highlight Background (Light Yellow)',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            startDate: 'startDate',
            endDate: 'endDate',
            highlight: 'isHighlight'
        },
        prepare(selection) {
            const { title, startDate, endDate, highlight } = selection
            const dateStr = endDate ? `${startDate} to ${endDate}` : startDate
            return {
                title: `${highlight ? '⭐ ' : ''}${title}`,
                subtitle: dateStr
            }
        }
    }
})
