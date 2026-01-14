import { client } from "@/sanity/lib/client";
import MagazineManager from "@/components/admin/MagazineManager";
import { magazinesQuery } from "@/sanity/lib/queries";

export const dynamic = 'force-dynamic';

export default async function AdminMagazinePage() {
    const magazines = await client.fetch(magazinesQuery);

    return (
        <div className="max-w-6xl mx-auto">
            <MagazineManager initialMagazines={magazines} />
        </div>
    );
}
