import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import GallerySlider from "@/components/news/GallerySlider";
import NewsContentWrapper from "@/components/news/NewsContentWrapper";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Clock, Calendar, Share2, Printer, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface NewsItem {
    _id: string;
    title: string;
    description: string;
    image: any;
    publishedAt: string;
    slug: { current: string };
    gallery?: any[];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const query = `*[_type == "news" && slug.current == $slug][0]`;
    const news: NewsItem = await client.fetch(query, { slug: params.slug });

    if (!news) {
        return {
            title: "News Not Found",
        };
    }

    return {
        title: `${news.title} | GDC Malir Cantt`,
        description: news.description.substring(0, 160),
        openGraph: {
            images: news.image ? [urlFor(news.image).url()] : [],
        },
    };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
    // 1. Fetch Main News with the specific slug
    const query = `*[_type == "news" && slug.current == $slug][0]`;
    const news: NewsItem = await client.fetch(query, { slug: params.slug });

    if (!news) {
        notFound();
    }

    // 2. Fetch Related News (Latest 4 items excluding the current one)
    const relatedQuery = `*[_type == "news" && _id != $id] | order(publishedAt desc) [0...4]{
        _id, 
        title, 
        slug, 
        publishedAt
    }`;
    const relatedNews: NewsItem[] = await client.fetch(relatedQuery, { id: news._id });

    const date = new Date(news.publishedAt);
    const imageUrl = news.image ? urlFor(news.image).url() : null;

    return (
        <article className="pt-32 min-h-screen bg-gray-50/30 pb-20">
            <Link
                href="/news"
                className="inline-flex pt-12 items-center gap-2 text-gray-600 hover:text-red-700 transition-colors font-medium text-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Newsfeed
            </Link>
            <div className="container mx-auto px-4 md:px-12 lg:px-20 py-8">
                <NewsContentWrapper
                    sidebar={
                        <>
                            {/* More News Widget */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl shadow-gray-100/50 ring-1 ring-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-50">
                                    <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                                    Recent Updates
                                </h3>
                                <ul className="space-y-4">
                                    {relatedNews.map((item) => (
                                        <li key={item._id}>
                                            <Link href={`/news/${item.slug?.current || '#'}`} className="group block p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                <span className="text-xs text-gray-400 font-semibold mb-1 block">
                                                    {new Date(item.publishedAt).toLocaleDateString()}
                                                </span>
                                                <h4 className="font-medium text-gray-700 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
                                                    {item.title}
                                                </h4>
                                            </Link>
                                        </li>
                                    ))}
                                    {relatedNews.length === 0 && (
                                        <li className="text-gray-400 text-sm italic">No other updates yet.</li>
                                    )}
                                </ul>
                                <div className="mt-6 pt-4 border-t border-gray-50">
                                    <Link href="/news" className="text-sm font-semibold text-red-600 hover:text-red-700 block text-center">
                                        Browse All News &rarr;
                                    </Link>
                                </div>
                            </div>

                            {/* Share Card (Simplified) */}
                            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wider">Share News & Update</h3>
                                <div className="flex gap-3">
                                    {/* Placeholders for interactions */}
                                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" title="Print">
                                        <Printer className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                >
                    {/* Main Content Column */}
                    <div>

                        {/* 1. Image / Gallery Box */}
                        <div className="mb-10">
                            {/* Combine Cover Image + Gallery into one array for the slider */}
                            {(() => {
                                const allImages = [];
                                if (news.image) allImages.push(news.image);
                                if (news.gallery) allImages.push(...news.gallery);

                                return allImages.length > 0 ? (
                                    <GallerySlider images={allImages} title={news.title} />
                                ) : null;
                            })()}
                        </div>

                        {/* 2. Title & Metadata (Below Image Box) */}
                        <div className="mb-8 p-2">
                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 mb-4">
                                <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-red-100">
                                    News
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    {formatDistanceToNow(date, { addSuffix: true })}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                                {news.title}
                            </h1>
                        </div>

                        {/* 3. Description (Below Title) */}
                        <div className="prose prose-lg md:prose-xl text-gray-700 max-w-none prose-headings:text-gray-900 prose-a:text-red-700 hover:prose-a:text-red-800 prose-img:rounded-2xl">
                            <div className="whitespace-pre-wrap leading-relaxed font-serif text-lg md:text-xl text-gray-800">
                                {news.description}
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Share this News & Update</h4>
                            <div className="flex gap-3">
                                <button className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2.5 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Printer className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </NewsContentWrapper>
            </div>
        </article>
    );
}
