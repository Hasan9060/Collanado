import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const SITE_NAME = 'GDCMC Website'

// College knowledge base
const COLLEGE_CONTEXT = `
You are a helpful assistant for Government Degree Science & Commerce College Malir Cantt (GDCMC), Karachi.

COLLEGE INFORMATION:
- Name: Government Degree Science & Commerce College Malir Cantt
- Location: Malir Cantt, Karachi, Pakistan
- Type: Government College
- Principal: [Principal Name]
- Student Society Organizer: Prof. Shabana Malik
- Academic Session: 2025-2026

DEPARTMENTS:
1. Islamiat
2. Urdu
3. Pakistan Studies
4. English
5. Mathematics
6. Physics
7. Chemistry
8. Computer Science
9. Botany
10. Zoology
11. Commerce
12. Economics
13. Statistics

STUDENT SOCIETIES (2025-2026):
1. Marshal Wing (31 members) - Head: Prof. Bushra Sheikh
   - Ensures discipline, safety, and order during college activities
   
2. Buzz Wing (16 members) - Heads: Sir Syed Younus, Miss Aqsa Rao, Miss Alishba, Syed Hasan Rafay
   - Sub-teams: Graphics Team, Web Development Team, Photography Team, Magazine Team
   - Provides digital support for events and projects
   
3. Spark Wing (12 members) - Head: Prof. Durdana
   - Focuses on creativity, leadership, and innovation

FACILITIES:
- Library
- Computer Labs
- Science Laboratories
- Sports Facilities

CONTACT:
- Social Media: Facebook, Instagram, YouTube, LinkedIn

IMPORTANT RULES:
- Only answer questions related to this college
- If asked about other topics, politely redirect to college-related queries
- Support multiple languages (English, Urdu, Arabic, etc.)
- Be helpful, friendly, and professional
`

export async function POST(req: NextRequest) {
    try {
        const { messages, language = 'en' } = await req.json()

        if (!OPENROUTER_API_KEY) {
            return NextResponse.json(
                { error: 'OpenRouter API key not configured' },
                { status: 500 }
            )
        }

        // Add system context
        const systemMessage = {
            role: 'system',
            content: COLLEGE_CONTEXT + `\n\nIMPORTANT: Respond in ${language === 'ur' ? 'Urdu' : language === 'ar' ? 'Arabic' : 'English'} language. If the user asks about topics unrelated to the college, politely say you can only help with college-related questions.`
        }

        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': SITE_URL, // Optional, for including your app on openrouter.ai rankings.
                'X-Title': SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
            },
            body: JSON.stringify({
                model: 'qwen/qwen-2.5-vl-7b-instruct:free',
                messages: [systemMessage, ...messages],
                temperature: 0.7,
                top_p: 0.9,
                max_tokens: 1000,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('OpenRouter API Error:', errorData)
            return NextResponse.json(
                { error: errorData.error?.message || 'Failed to get response from OpenRouter' },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)

    } catch (error) {
        console.error('Chat API Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
