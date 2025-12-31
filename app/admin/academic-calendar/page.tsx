import { client } from "@/sanity/lib/client";
import CalendarManager from "@/components/admin/CalendarManager";

export const revalidate = 0; // Ensure fresh data for admin

export default async function AdminCalendarPage() {
    const query = `*[_type == "academicCalendar"] | order(startDate asc)`;
    const events = await client.fetch(query);

    return <CalendarManager initialEvents={events} />;
}
