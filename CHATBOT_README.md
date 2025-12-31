# GDCMC College Chatbot 🤖

## Overview
A beautiful, multilingual AI chatbot powered by GLM-4 that provides information about Government Degree Science & Commerce College Malir Cantt (GDCMC).

## Features ✨

### 🌍 Multilingual Support
- **English** 🇬🇧
- **Urdu** 🇵🇰 (اردو)
- **Arabic** 🇸🇦 (العربية)

### 🎨 Beautiful UI
- Modern gradient design with red theme
- Smooth animations and transitions
- Responsive for all devices
- Floating chat button with glow effect
- Real-time typing indicators
- Message timestamps

### 🧠 Smart Features
- **College-Focused**: Only answers questions about GDCMC
- **Context-Aware**: Knows about departments, societies, faculty, and facilities
- **Quick Questions**: Pre-defined common questions for easy access
- **Language Detection**: Automatically responds in the selected language
- **Real-time Chat**: Instant responses powered by GLM-4-Flash

### 📚 Knowledge Base
The chatbot has comprehensive information about:
- All 13 academic departments
- Student societies (Marshal, Buzz, Spark Wings)
- Faculty and staff
- Academic session 2025-2026
- College facilities
- Contact information

## Setup Instructions 🚀

### 1. Get GLM API Key
1. Visit [https://open.bigmodel.cn/](https://open.bigmodel.cn/)
2. Sign up for an account
3. Navigate to API Keys section
4. Create a new API key

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your GLM API key to `.env.local`:
   ```
   GLM_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

The chatbot will appear as a floating button in the bottom-right corner of all pages!

## Usage 💬

### For Users
1. Click the floating chat button (bottom-right corner)
2. Select your preferred language (English/Urdu/Arabic)
3. Type your question or click a quick question
4. Get instant AI-powered responses!

### Quick Questions Examples
- "What departments are available?"
- "Tell me about student societies"
- "What are the college timings?"
- "How can I contact the college?"

## Technical Details 🔧

### Components
- **`components/chatbot/CollegeChatbot.tsx`**: Main chatbot UI component
- **`app/api/chat/route.ts`**: API route for GLM integration

### API Integration
- **Model**: GLM-4-Flash
- **Provider**: Zhipu AI (智谱AI)
- **Endpoint**: `https://open.bigmodel.cn/api/paas/v4/chat/completions`

### Features Implementation
- **State Management**: React hooks (useState, useEffect, useRef)
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## Customization 🎨

### Update College Information
Edit the `COLLEGE_CONTEXT` in `app/api/chat/route.ts` to update:
- Department names
- Society information
- Faculty details
- Contact information

### Change Languages
Add new languages in `components/chatbot/CollegeChatbot.tsx`:
```typescript
const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  // Add more languages here
]
```

### Modify Quick Questions
Update `QUICK_QUESTIONS` object in the chatbot component.

### Styling
All styles use Tailwind CSS classes. Modify the className props to change:
- Colors (currently red theme)
- Sizes
- Animations
- Spacing

## Troubleshooting 🔍

### Chatbot not responding
- Check if GLM_API_KEY is set correctly in `.env.local`
- Verify API key is valid and active
- Check browser console for errors

### Language not switching
- Clear browser cache
- Check if language code is correctly added
- Verify QUICK_QUESTIONS has entries for the language

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Verify all dependencies are installed

## Security Notes 🔒

- API key is stored server-side only (never exposed to client)
- All API calls go through Next.js API routes
- Input sanitization is handled by GLM API
- College-focused responses prevent off-topic queries

## Performance ⚡

- Lazy loading of chat window
- Optimized animations
- Efficient state management
- Fast GLM-4-Flash model responses
- Minimal bundle size impact

## Future Enhancements 🚀

Potential improvements:
- Voice input/output
- File upload support
- Chat history persistence
- Admin dashboard for analytics
- More languages
- Custom training on college documents
- Integration with college database

## Support 💡

For issues or questions:
1. Check this README
2. Review the code comments
3. Test with different browsers
4. Check GLM API documentation

---

**Built with ❤️ for GDCMC Students**
