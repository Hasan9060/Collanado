"use client";

import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

interface NewsContentWrapperProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}

export default function NewsContentWrapper({ children, sidebar }: NewsContentWrapperProps) {
    const [isFocusMode, setIsFocusMode] = useState(false);

    const toggleFocusMode = () => {
        setIsFocusMode(!isFocusMode);
    };

    return (
        <div className={`transition-all duration-500 ease-in-out`}>
            {/* Toolbar */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={toggleFocusMode}
                    className={`
                        flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border shadow-sm transition-all
                        ${isFocusMode
                            ? 'bg-red-600 text-white border-red-600 hover:bg-red-700'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-red-200 hover:text-red-700'
                        }
                    `}
                    title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
                >
                    {isFocusMode ? (
                        <>
                            <Minimize2 className="w-4 h-4" />
                            <span>Exit Focus</span>
                        </>
                    ) : (
                        <>
                            <Maximize2 className="w-4 h-4" />
                            <span>Focus Mode</span>
                        </>
                    )}
                </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 relative">
                {/* Main Content */}
                <div
                    className={`
                        transition-all duration-500 ease-in-out
                        ${isFocusMode ? 'lg:col-span-12 max-w-4xl mx-auto' : 'lg:col-span-8'}
                    `}
                >
                    {children}
                </div>

                {/* Sidebar */}
                <aside
                    className={`
                        lg:col-span-4 space-y-8 sticky top-8 self-start
                        transition-all duration-500 ease-in-out origin-right
                        ${isFocusMode
                            ? 'opacity-0 translate-x-20 absolute right-0 pointer-events-none hidden lg:block'
                            : 'opacity-100 translate-x-0'
                        }
                    `}
                >
                    {sidebar}
                </aside>
            </div>
        </div>
    );
}
