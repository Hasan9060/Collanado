import { client } from "@/sanity/lib/client";
import NewsManager from "@/components/admin/NewsManager";

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    const query = `*[_type == "news"] | order(publishedAt desc)`;
    const news = await client.fetch(query);

    return (
        <div className="max-w-5xl mx-auto">
            <NewsManager initialNews={news} />
        </div>
    );
}
