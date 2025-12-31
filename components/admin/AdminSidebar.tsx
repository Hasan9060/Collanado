"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, LogOut, Calendar } from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Manage News", href: "/admin/news", icon: Newspaper },
        { name: "Academic Calendar", href: "/admin/academic-calendar", icon: Calendar },
    ];

    return (
        <aside className="w-64 bg-white shadow-xl min-h-screen flex flex-col fixed left-0 top-0 z-50">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-red-700 uppercase tracking-wider">
                    GDC Admin
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? "bg-red-50 text-red-700 font-semibold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon
                                className={`w-5 h-5 ${isActive ? "text-red-700" : "text-gray-400 group-hover:text-gray-600"
                                    }`}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Back to Website</span>
                </Link>
            </div>
        </aside>
    );
}
