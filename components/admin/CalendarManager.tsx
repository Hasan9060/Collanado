"use client";

import { useState, useRef } from "react";
import { createCalendarEvent, deleteCalendarEvent } from "@/app/actions/academicCalendar";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Calendar, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface CalendarEvent {
    _id: string;
    title: string;
    startDate: string;
    endDate?: string;
    textColor: string;
    isHighlight: boolean;
}

export default function CalendarManager({ initialEvents }: { initialEvents: CalendarEvent[] }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        try {
            const result = await createCalendarEvent(formData);
            if (result.success) {
                toast.success("Event added successfully!");
                formRef.current?.reset();
                router.refresh();
            } else {
                toast.error("Failed to add event");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this event?")) return;

        setIsDeleting(id);
        try {
            const result = await deleteCalendarEvent(id);
            if (result.success) {
                toast.success("Event deleted successfully!");
                router.refresh();
            } else {
                toast.error("Failed to delete event");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsDeleting(null);
        }
    }

    // Helper to format date range
    const formatDateRange = (start: string, end?: string) => {
        const s = new Date(start);
        if (!end) return format(s, "dd-MMM-yy");
        const e = new Date(end);
        return `${format(s, "dd-MMM-yy")} - ${format(e, "dd-MMM-yy")}`;
    };

    // Helper for color class
    const getColorClass = (color: string) => {
        switch (color) {
            case "red": return "text-red-600 font-semibold";
            case "green": return "text-green-600 font-semibold";
            case "blue": return "text-blue-600 font-semibold";
            default: return "text-gray-900";
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Academic Calendar</h2>
                    <p className="text-gray-500 mt-1">Manage events, exams, and holidays.</p>
                </div>
            </div>

            {/* Add Event Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-red-600" />
                    Add New Event
                </h3>

                <form ref={formRef} action={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="e.g. Winter Vacations"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                                <div className="flex gap-4">
                                    {['black', 'red', 'green', 'blue'].map((color) => (
                                        <label key={color} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="textColor"
                                                value={color}
                                                defaultChecked={color === 'black'}
                                                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                                            />
                                            <span className={`capitalize ${getColorClass(color)}`}>{color}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <input
                                    type="checkbox"
                                    name="isHighlight"
                                    id="isHighlight"
                                    className="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500 border-gray-300"
                                />
                                <label htmlFor="isHighlight" className="text-sm font-medium text-yellow-800 cursor-pointer select-none">
                                    Highlight Row (Yellow Background)
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all disabled:opacity-70 flex items-center gap-2"
                        >
                            {isSubmitting ? "Adding..." : "Add to Calendar"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Events List / Table Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-6 py-4">Event Name</th>
                                <th className="px-6 py-4">Dates</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {initialEvents.map((event) => (
                                <tr
                                    key={event._id}
                                    className={`
                                        group hover:bg-gray-50 transition-colors
                                        ${event.isHighlight ? 'bg-[#FCFCE0]' : 'bg-white'} 
                                    `}
                                >
                                    <td className={`px-6 py-4 ${getColorClass(event.textColor)}`}>
                                        {event.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {formatDateRange(event.startDate, event.endDate)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            disabled={isDeleting === event._id}
                                            className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                                            title="Delete Event"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {initialEvents.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500 italic">
                                        No events found in the calendar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
