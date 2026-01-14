import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["600", "700"],
});

const newsItems = [
    "Admissions Open for Science & Commerce (Session 2024-25) | Apply Now!",
    "GDC Malir Cantt announces Spring 2026 Merit List - Check Downloads section.",
    "New digital library and state-of-the-art computer lab inaugurated.",
    "Upcoming Sports Week starts from February 15th - Registration open at Sports Office.",
    "Scholarship applications are now being accepted for deserving students.",
];

export default function NewsTicker() {
    return (
        <div className="w-full bg-white border-y border-gray-200 flex items-stretch h-10 sm:h-16 overflow-hidden shadow-sm relative z-20">
            {/* Label Box */}
            <div className="bg-[#d91e18] px-4 sm:px-8 flex items-center justify-center relative z-30 shadow-[5px_0_15px_rgba(0,0,0,0.1)]">
                <span className={cn(
                    jakarta.className,
                    "text-white font-semibold text-[10px] sm:text-xs md:text-lg tracking-wider whitespace-nowrap"
                )}>
                    Announcements
                </span>
            </div>

            {/* Ticker Content */}
            <div className="flex-1 overflow-hidden flex items-center bg-gray-50/50">
                <div className="flex whitespace-nowrap items-center space-x-12 sm:space-x-20 pl-4 sm:pl-8 animate-marquee hover:[animation-play-state:paused]">
                    {newsItems.concat(newsItems).map((news, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full flex-shrink-0" />
                            <span className={cn(
                                jakarta.className,
                                "text-gray-700 text-[11px] sm:text-sm font-medium"
                            )}>
                                {news}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
