"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Sun, Moon, Maximize2, Minimize2, Share2, Check, Volume2, Square } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { PortableText } from "@portabletext/react";
import { RichText } from "@/components/blog/RichText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { getSlugString } from "@/lib/blog-utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

export default function BlogReader({ blog }: { blog: BlogPost }) {
    const [focusMode, setFocusMode] = useState(false);
    const { theme, setTheme } = useTheme();
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const articleRef = useRef<HTMLDivElement>(null);

    // Safety Refs
    const blocksRef = useRef<HTMLElement[]>([]);
    const isSpeakingRef = useRef(false);

    useEffect(() => {
        const loadVoices = () => { window.speechSynthesis.getVoices(); };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        const style = document.createElement("style");
        style.innerHTML = `
            .reading-mode ::selection {
                background-color: #08e008ff !important; /* Green */
                color: black !important;
            }
        `;
        document.head.appendChild(style);
        return () => { style.remove(); }
    }, []);

    // --- AGGRESSIVE HEARTBEAT ---
    // Resets the speech engine every 5 seconds to prevent network voice hang
    useEffect(() => {
        if (!isSpeaking) return;
        const interval = setInterval(() => {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [isSpeaking]);

    useEffect(() => {
        isSpeakingRef.current = isSpeaking;
    }, [isSpeaking]);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const container = (focusMode && containerRef.current) ? containerRef.current : document.documentElement;
            const totalScroll = (focusMode && containerRef.current) ? container.scrollTop : window.scrollY;
            const windowHeight = (focusMode && containerRef.current)
                ? container.scrollHeight - container.clientHeight
                : document.documentElement.scrollHeight - window.innerHeight;

            if (windowHeight <= 0) return setScrollProgress(0);
            setScrollProgress(Math.min(totalScroll / windowHeight, 1));
        };

        window.addEventListener("scroll", handleScroll);
        const refCurrent = containerRef.current;
        if (refCurrent) refCurrent.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (refCurrent) refCurrent.removeEventListener("scroll", handleScroll);
            cancelSpeech();
        };
    }, [focusMode]);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const cancelSpeech = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        window.getSelection()?.removeAllRanges();
    };

    const highlightWord = (root: HTMLElement, index: number, length: number) => {
        const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let currentNode = treeWalker.nextNode();
        let currentLength = 0;

        while (currentNode) {
            const nodeLength = currentNode.textContent?.length || 0;
            if (currentLength + nodeLength > index) {
                const range = document.createRange();
                const startOffset = index - currentLength;
                const endOffset = Math.min(startOffset + length, nodeLength);

                try {
                    range.setStart(currentNode, startOffset);
                    range.setEnd(currentNode, endOffset);
                    const selection = window.getSelection();
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                } catch (e) { }
                return;
            }
            currentLength += nodeLength;
            currentNode = treeWalker.nextNode();
        }
    };

    const speakNextBlock = (index: number) => {
        if (!blocksRef.current[index] || !isSpeakingRef.current) {
            if (index >= blocksRef.current.length) setIsSpeaking(false);
            return;
        }

        const block = blocksRef.current[index];
        block.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const text = block.innerText;
        if (!text.trim()) {
            speakNextBlock(index + 1);
            return;
        }

        let chunks = [text];
        if (text.length > 200) {
            chunks = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
        }

        let chunkIndex = 0;
        let cumulativeOffset = 0;

        const speakChunk = () => {
            if (chunkIndex >= chunks.length || !isSpeakingRef.current) {
                speakNextBlock(index + 1);
                return;
            }

            const chunkText = chunks[chunkIndex];
            const utterance = new SpeechSynthesisUtterance(chunkText);

            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v =>
                (v.name.includes("Google") && v.lang.includes("en")) ||
                (v.name.includes("Natural") && v.lang.includes("en"))
            ) || voices.find(v => v.lang.includes("en"));

            if (preferredVoice) utterance.voice = preferredVoice;
            utterance.rate = 1.0;

            utterance.onboundary = (e) => {
                if (e.name === 'word') {
                    highlightWord(block, cumulativeOffset + e.charIndex, e.charLength);
                }
            };

            utterance.onend = () => {
                cumulativeOffset += chunkText.length;
                chunkIndex++;
                speakChunk();
            };

            // Retry logic on error
            utterance.onerror = () => {
                // Try to nudge to next chunk instead of dying
                cumulativeOffset += chunkText.length;
                chunkIndex++;
                speakChunk();
            };

            window.speechSynthesis.speak(utterance);
        };

        speakChunk();
    };

    const toggleSpeech = () => {
        if (isSpeaking) {
            cancelSpeech();
        } else {
            if (!articleRef.current) return;
            const elements = articleRef.current.querySelectorAll("h1, h2, h3, h4, p, li, blockquote");
            blocksRef.current = Array.from(elements) as HTMLElement[];
            if (blocksRef.current.length === 0) {
                toast.error("No text found to read");
                return;
            }
            setIsSpeaking(true);
            isSpeakingRef.current = true;
            setTimeout(() => speakNextBlock(0), 100);
        }
    };

    if (!mounted) return <div className="min-h-screen bg-white" />;

    return (
        <div
            ref={containerRef}
            className={cn(
                "min-h-screen bg-white dark:bg-gray-950 transition-all duration-500",
                focusMode ? "fixed inset-0 z-[100] overflow-y-auto" : "",
                isSpeaking ? "reading-mode" : ""
            )}
        >
            <div className="fixed top-0 left-0 h-1 bg-red-600 z-[101] transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }} />

            {/* Toolbar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[102] flex items-center gap-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-1.5 rounded-full shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
                                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</p></TooltipContent>
                    </Tooltip>

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1" />

                    {/* Speech Button */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleSpeech}
                                className={cn("rounded-full h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200", isSpeaking && "text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-900/20")}
                            >
                                {isSpeaking ? <Square className="h-4 w-4 fill-current" /> : <Volume2 className="h-5 w-5" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>{isSpeaking ? 'Stop Reading' : 'Read Aloud'}</p></TooltipContent>
                    </Tooltip>

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1" />

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setFocusMode(!focusMode)} className={cn("rounded-full h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200", focusMode && "text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-900/20")}>
                                {focusMode ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>{focusMode ? 'Exit Focus' : 'Focus Mode'}</p></TooltipContent>
                    </Tooltip>

                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1" />

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
                                {copied ? <Check className="h-5 w-5 text-green-600" /> : <Share2 className="h-5 w-5" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Share Link</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Hero Section */}
            <div className={cn("relative w-full overflow-hidden transition-all duration-700 ease-in-out bg-gray-900",
                focusMode ? "h-0 opacity-0" : "h-[60vh] min-h-[400px] opacity-100 mt-16 sm:mt-20"
            )}>
                <Image src={blog.mainImage ? urlFor(blog.mainImage).url() : "/Images/placeholder.jpg"} alt={blog.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-end">
                    <div className="container px-4 mx-auto pb-12 sm:pb-20">
                        <Link href="/blogs" className="inline-flex items-center text-white/90 hover:text-white mb-8 group bg-white/10 backdrop-blur-md px-4 py-2 rounded-full transition-all">
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
                        </Link>

                        <div className="max-w-4xl">
                            <div className="flex flex-wrap gap-2 mb-6"> {blog.categories?.map((cat) => (<Badge key={cat} className="bg-red-600 text-white border-none py-1.5 px-4 text-sm">{cat}</Badge>))} </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8 drop-shadow-lg">{blog.title}</h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/50">{blog.author.image && (<Image src={urlFor(blog.author.image).url()} alt={blog.author.name} fill className="object-cover" />)}</div>
                                    <div><p className="font-bold">{blog.author.name}</p><p className="text-xs text-white/70">Published Author</p></div>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"><Calendar className="h-4 w-4" /><span className="text-sm font-medium">{format(new Date(blog.publishedAt), "MMMM d, yyyy")}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={cn("container px-4 mx-auto transition-all duration-700 ease-in-out", focusMode ? "pt-32 pb-32 max-w-3xl" : "py-16")}>
                {/* Focus Header - ONLY Visible in Focus Mode */}
                <div className={cn("transition-all duration-700 delay-100 ease-in-out overflow-hidden mb-12", focusMode ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                    <Link href="/blogs" className="inline-flex items-center text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 mb-8 transition-colors"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">{blog.title}</h1>
                    <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-800 pb-8"><div className="flex items-center gap-2">{blog.author.image && (<div className="relative w-6 h-6 rounded-full overflow-hidden"><Image src={urlFor(blog.author.image).url()} alt={blog.author.name} fill className="object-cover" /></div>)}<span className="font-medium">{blog.author.name}</span></div><div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" /><span>{format(new Date(blog.publishedAt), "MMM d, yyyy")}</span></div>
                </div>

                <div className={cn("grid gap-16 transition-all duration-500", focusMode ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-12")}>

                    {/* Content Body */}
                    <main ref={articleRef} className={cn("transition-all duration-500", focusMode ? "w-full" : "lg:col-span-8")}>
                        <div className="animate-in fade-in duration-1000 slide-in-from-bottom-8">
                            {blog.body && blog.body.length > 0 ? (<PortableText value={blog.body} components={RichText} />) : (<div className="bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center"><p className="text-gray-500 dark:text-gray-400 text-lg">No content available.</p></div>)}
                        </div>
                    </main>

                    {/* Sidebar with Related Articles - Hidden in Focus Mode */}
                    <aside className={cn("lg:col-span-4 space-y-12 transition-all duration-500", focusMode ? "hidden opacity-0" : "block opacity-100")}>
                        <div className="space-y-6"> <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"> <div className="w-2 h-8 bg-red-600 rounded-full" /> Related Articles </h3> <div className="space-y-6"> {blog.relatedPosts && blog.relatedPosts.length > 0 ? (blog.relatedPosts.map((post) => (<Link key={post._id} href={`/blogs/${getSlugString(post.slug)}`} className="group flex gap-4 items-center"> <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-md bg-gray-100 dark:bg-gray-800"> {post.mainImage && (<Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />)} </div> <div> <h4 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-tight mb-2"> {post.title} </h4> <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold"> {format(new Date(post.publishedAt), "MMM d, yyyy")} </p> </div> </Link>))) : (<p className="text-gray-500 dark:text-gray-400 italic">No related articles found.</p>)} </div> </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
