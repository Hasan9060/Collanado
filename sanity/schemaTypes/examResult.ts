export default {
    name: 'examResult',
    title: 'Exam Result',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Exam Title',
            type: 'string',
            description: 'e.g., Annual Exam 2024, Midterm Fall 2023',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'studentName',
            title: 'Student Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'rollNumber',
            title: 'Roll Number / Student ID',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'class',
            title: 'Class / Department',
            type: 'string',
            description: 'e.g., BS Computer Science',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        },
        {
            name: 'subjects',
            title: 'Subjects',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'subjectName', type: 'string', title: 'Subject Name' },
                        { name: 'totalMarks', type: 'number', title: 'Total Marks' },
                        { name: 'obtainedMarks', type: 'number', title: 'Obtained Marks' },
                        { name: 'grade', type: 'string', title: 'Grade' },
                    ],
                },
            ],
        },
        {
            name: 'overallPercentage',
            title: 'Overall Percentage',
            type: 'number',
            readOnly: true, // You might calculate this, but let's leave it writable or calculate on frontend
        },
        {
            name: 'remarks',
            title: 'Remarks',
            type: 'text',
        }
    ],
    preview: {
        select: {
            title: 'studentName',
            subtitle: 'title',
        },
    },
}
