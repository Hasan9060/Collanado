
import { getResults } from "@/app/actions/results";
import ResultManager from "@/components/admin/ResultManager";

export const dynamic = 'force-dynamic';

export default async function AdminResultsPage() {
    const { data: results } = await getResults();

    return (
        <div className="max-w-6xl mx-auto">
            <ResultManager initialResults={results || []} />
        </div>
    );
}
