"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Send, Bot, User, X, MessageCircle, Globe, Loader2, Sparkles } from "lucide-react"
import Image from "next/image"

interface Message {
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

const LANGUAGES = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
]

const QUICK_QUESTIONS = {
    en: [
        "What departments are available?",
        "Tell me about student societies",
        "What are the college timings?",
        "How can I contact the college?",
    ],
    ur: [
        "کالج میں کون سے شعبے ہیں؟",
        "طلباء کی سوسائٹیز کے بارے میں بتائیں",
        "کالج کا وقت کیا ہے؟",
        "کالج سے کیسے رابطہ کریں؟",
    ],
    ar: [
        "ما هي الأقسام المتاحة؟",
        "أخبرني عن جمعيات الطلاب",
        "ما هي أوقات الكلية؟",
        "كيف يمكنني الاتصال بالكلية؟",
    ],
}

export default function CollegeChatbot() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    // Hide chatbot on admin and studio routes
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/studio')) {
        return null;
    }
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [language, setLanguage] = useState("en")
    const [showLanguageMenu, setShowLanguageMenu] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Welcome message
            const welcomeMessages = {
                en: "Hello! 👋 I'm your GOVERNMENT DEGREE SCIENCE & COMMERCE COLLEGE MALIR CANTT KARACHI College Assistant. I can help you with information about departments, societies, admissions, and more. How can I assist you today?",
                ur: "السلام علیکم! 👋 میں آپ کا GOVERNMENT DEGREE SCIENCE & COMMERCE COLLEGE MALIR CANTT KARACHI کالج اسسٹنٹ ہوں۔ میں آپ کو شعبوں، سوسائٹیز، داخلوں اور مزید کے بارے میں معلومات فراہم کر سکتا ہوں۔ آج میں آپ کی کیسے مدد کر سکتا ہوں؟",
                ar: "مرحبا! 👋 أنا مساعد كلية GOVERNMENT DEGREE SCIENCE & COMMERCE COLLEGE MALIR CANTT KARACHI الخاص بك. يمكنني مساعدتك في الحصول على معلومات حول الأقسام والجمعيات والقبول والمزيد. كيف يمكنني مساعدتك اليوم؟",
            }

            setMessages([
                {
                    role: "assistant",
                    content: welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.en,
                    timestamp: new Date(),
                },
            ])
        }
    }, [isOpen, language])

    const sendMessage = async (messageText?: string) => {
        const text = messageText || input.trim()
        if (!text || isLoading) return

        const userMessage: Message = {
            role: "user",
            content: text,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                    language,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to get response")
            }

            const data = await response.json()
            const assistantMessage: Message = {
                role: "assistant",
                content: data.choices[0].message.content,
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, assistantMessage])
        } catch (error) {
            console.error("Chat error:", error)
            const errorMessages = {
                en: "Write now im busy because of Lots of Students use it the same Time. Please try again.",
                ur: "معذرت، مجھے رابطہ قائم کرنے میں دشواری ہو رہی ہے۔ براہ کرم دوبارہ کوشش کریں۔",
                ar: "عذرا، أواجه مشكلة في الاتصال. يرجى المحاولة مرة أخرى.",
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: errorMessages[language as keyof typeof errorMessages] || errorMessages.en,
                    timestamp: new Date(),
                },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const handleQuickQuestion = (question: string) => {
        sendMessage(question)
    }

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 group"
                    aria-label="Open chat"
                >
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse"></div>

                        {/* Button */}
                        <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-110">
                            <MessageCircle size={28} />

                            {/* Notification badge */}
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-red-900">
                                <Sparkles size={14} />
                            </div>
                        </div>
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <>
                    {/* Mobile Backdrop for focus */}
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden" onClick={() => setIsOpen(false)} />

                    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[450px] h-[100dvh] sm:h-[650px] bg-white/95 backdrop-blur-md sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/20 sm:border-gray-200 animate-in slide-in-from-bottom duration-300">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white p-4 pt-safe sm:pt-4 flex items-center justify-between relative overflow-hidden shrink-0 shadow-lg">
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="relative">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-inner">
                                        <Image
                                            src="/Images/logo.png"
                                            alt="GDCMC"
                                            width={32}
                                            height={32}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base sm:text-lg tracking-wide">GDCMC Assistant</h3>
                                    <p className="text-[10px] sm:text-xs text-white/90 flex items-center gap-1 font-medium">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                        Active Now • AI Powered
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 sm:gap-2 relative z-10">
                                {/* Language Selector */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                                        className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-95"
                                        aria-label="Select language"
                                    >
                                        <Globe size={18} className="sm:w-5 sm:h-5" />
                                    </button>

                                    {showLanguageMenu && (
                                        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-[160px] animate-in fade-in-0 zoom-in-95 z-50 overflow-hidden">
                                            {LANGUAGES.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => {
                                                        setLanguage(lang.code)
                                                        setShowLanguageMenu(false)
                                                    }}
                                                    className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 ${language === lang.code ? "bg-red-50 text-red-700 font-semibold" : "text-gray-700 font-medium"
                                                        }`}
                                                >
                                                    <span className="text-xl">{lang.flag}</span>
                                                    <span className="text-sm">{lang.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-95 bg-white/10 sm:bg-transparent"
                                    aria-label="Close chat"
                                >
                                    <X size={18} className="sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white scroll-smooth relative">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cc0000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-3 max-w-[95%] sm:max-w-[85%] ${message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
                                        } animate-in slide-in-from-bottom-2 duration-300 relative z-10`}
                                >
                                    {/* Avatar */}
                                    <div
                                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white ${message.role === "user"
                                            ? "bg-gradient-to-br from-red-600 to-red-700 text-white"
                                            : "bg-white text-red-600"
                                            }`}
                                    >
                                        {message.role === "user" ? <User size={16} /> : <Bot size={18} />}
                                    </div>

                                    {/* Message Bubble */}
                                    <div
                                        className={`px-4 py-3 shadow-md ${message.role === "user"
                                            ? "bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl rounded-tr-sm"
                                            : "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm"
                                            }`}
                                    >
                                        <p className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                        <p
                                            className={`text-[10px] mt-1.5 font-medium opacity-70 text-right`}
                                        >
                                            {message.timestamp.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-3 animate-in slide-in-from-bottom-2 duration-300">
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-red-600 flex items-center justify-center shadow-sm">
                                        <Bot size={18} />
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md flex items-center gap-2.5">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        </div>
                                        <span className="text-xs font-medium text-gray-500">Typing...</span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions */}
                        {messages.length <= 1 && !isLoading && (
                            <div className="px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wider pl-1">Suggested Questions</p>
                                <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide snap-x">
                                    {QUICK_QUESTIONS[language as keyof typeof QUICK_QUESTIONS]?.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickQuestion(question)}
                                            className="text-xs sm:text-sm bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-700 hover:text-red-700 px-4 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow active:scale-95 snap-start"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-3 sm:p-4 bg-white border-t border-gray-100 sticky bottom-0 z-20 pb-safe">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    sendMessage()
                                }}
                                className="flex gap-2 items-end bg-gray-50 p-1.5 rounded-[24px] border border-gray-200 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-300 transition-all shadow-inner"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={
                                        language === "ur"
                                            ? "یہاں لکھیں..."
                                            : language === "ar"
                                                ? "اكتب هنا..."
                                                : "Type a message..."
                                    }
                                    className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base min-h-[44px] max-h-[120px]"
                                    disabled={isLoading}
                                    dir={language === "ur" || language === "ar" ? "rtl" : "ltr"}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="bg-red-600 hover:bg-red-700 text-white w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:scale-95 disabled:hover:bg-red-600 shadow-md hover:shadow-lg hover:scale-105 shrink-0 mb-[1px]"
                                    aria-label="Send message"
                                >
                                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className={language === 'ur' || language === 'ar' ? "rotate-180 ml-1" : "ml-0.5"} />}
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
            <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
        </>
    )
}
