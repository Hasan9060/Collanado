import { client } from "@/sanity/lib/client";
import NewsFeed from "@/components/news/NewsFeed";

export const revalidate = 60;

export const metadata = {
    title: 'News & Events - Govt Degree College',
    description: 'Stay updated with the latest news, events, and announcements from Govt Degree College.',
};

export default async function NewsPage() {
    const query = `*[_type == "news"] | order(publishedAt desc)`;
    const news = await client.fetch(query);

    return (
        <main className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12 lg:px-20 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-700 text-xs font-bold tracking-wider mb-4 border border-red-100 uppercase">
                        Archive & Updates
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                        Newsroom & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Events</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Explore all the latest happenings, academic schedules, and important announcements from our college.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 md:px-12 lg:px-20 -mt-8 relative z-10">
                <NewsFeed initialNews={news} />
            </div>
        </main>
    );
}
