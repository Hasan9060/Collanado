import { client } from "@/sanity/lib/client";
import AcademicCalendarClient from "@/components/academics/AcademicCalendarClient";

export const revalidate = 60;

export default async function AcademicCalendarPage() {
    const query = `*[_type == "academicCalendar"] | order(startDate asc)`;
    const events = await client.fetch(query);

    return <AcademicCalendarClient events={events} />;
}
