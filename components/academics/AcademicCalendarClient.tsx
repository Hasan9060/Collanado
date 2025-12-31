"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import Link from 'next/link';
import { ChevronRight, Calendar as CalendarIcon, ChevronLeft } from 'lucide-react';

interface CalendarEvent {
    _id: string;
    title: string;
    startDate: string;
    endDate?: string;
    textColor: string;
    isHighlight: boolean;
}

export default function AcademicCalendarClient({ events }: { events: CalendarEvent[] }) {
    // 1. Determine available years from data
    const availableYears = useMemo(() => {
        const years = new Set(events.map(e => new Date(e.startDate).getFullYear()));
        // Ensure current year and next year are always options if data is sparse
        const currentYear = new Date().getFullYear();
        years.add(currentYear);
        years.add(currentYear + 1);
        return Array.from(years).sort((a, b) => b - a); // Descending order
    }, [events]);

    // 2. State for selected year (default to current year)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // 3. Filter events based on selected year
    const filteredEvents = useMemo(() => {
        return events.filter(event => new Date(event.startDate).getFullYear() === selectedYear);
    }, [events, selectedYear]);

    // Helper formatting functions
    const getStartDate = (dateStr: string) => format(new Date(dateStr), "d-MMM-yy");
    const getEndDate = (dateStr?: string) => dateStr ? format(new Date(dateStr), "d-MMM-yy") : "";

    const getColorClass = (color: string) => {
        switch (color) {
            case "red": return "text-red-600 font-bold";
            case "green": return "text-green-600 font-bold";
            case "blue": return "text-blue-600 font-bold";
            default: return "text-gray-900 font-semibold";
        }
    };

    return (
        <main className="pt-16 md:pt-32 bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-[#990000] text-white py-20">
                <div className="container mx-auto px-4 md:px-12 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Academic Calendar</h1>

                    <div className="flex items-center justify-center gap-2 text-sm md:text-base opacity-90">
                        <Link href="/" className="hover:underline hover:text-gray-200 transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-300">Academics</span>
                        <ChevronRight className="w-4 h-4" />
                        <span>Academic Calendar</span>
                    </div>
                </div>
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>
            <div className="text-center container mx-auto px-4 md:px-6 py-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 font-serif">Academic Calendar</h1>
                    <p className="mt-2 text-lg md:text-xl leading-relaxed">View our academic calendar for the current academic year.</p>
                </div>

            <div className="container mx-auto px-4 md:px-12 py-6 mb-12">

                {/* Year Selection Controls */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center bg-white rounded-full shadow-md border border-gray-200 p-1">
                        {availableYears.map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`
                                    px-6 py-2 rounded-full text-sm font-bold transition-all duration-200
                                    ${selectedYear === year
                                        ? 'bg-red-700 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-red-700 hover:bg-gray-50'
                                    }
                                `}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <th className="px-6 py-4 font-bold text-gray-800 uppercase tracking-wider text-sm border-r border-gray-200 w-1/2">
                                        Event / Activity
                                    </th>
                                    <th className="px-6 py-4 font-bold text-gray-800 uppercase tracking-wider text-sm border-r border-gray-200">
                                        Start Date
                                    </th>
                                    <th className="px-6 py-4 font-bold text-gray-800 uppercase tracking-wider text-sm">
                                        End Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredEvents.map((event) => (
                                    <tr
                                        key={event._id}
                                        className={`
                                            transition-colors
                                            ${event.isHighlight ? 'bg-[#FCFCE0]' : 'bg-white hover:bg-gray-50'}
                                        `}
                                    >
                                        <td className={`px-6 py-4 border-r border-gray-200 ${getColorClass(event.textColor)}`}>
                                            {event.title}
                                        </td>
                                        <td className="px-6 py-4 border-r border-gray-200 text-gray-700 font-medium whitespace-nowrap">
                                            {getStartDate(event.startDate)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                                            {getEndDate(event.endDate)}
                                        </td>
                                    </tr>
                                ))}

                                {filteredEvents.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-16 text-center text-gray-400">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <CalendarIcon className="w-10 h-10 opacity-20" />
                                                <p>No academic events found for <span className="font-bold text-gray-600">{selectedYear}</span>.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-lg flex items-start gap-3 max-w-2xl">
                        <CalendarIcon className="w-6 h-6 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold mb-1">Note:</h4>
                            <p className="text-sm opacity-90">
                                Dates are subject to change according to the sighting of the moon or official government notifications. Please stay updated with the college administration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
