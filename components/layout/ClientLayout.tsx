"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';

const CollegeChatbot = dynamic(() => import("@/components/chatbot/CollegeChatbot"), {
    ssr: false,
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPortalOrAdmin =
        pathname?.startsWith('/admin') ||
        pathname?.startsWith('/studio') ||
        pathname?.startsWith('/portal') ||
        pathname?.startsWith('/admin-panel');

    return (
        <>
            {!isPortalOrAdmin && <Header />}
            <main className={isPortalOrAdmin ? "min-h-screen" : ""}>{children}</main>
            {!isPortalOrAdmin && (
                <>
                    <Footer />
                    <CollegeChatbot />
                </>
            )}
        </>
    );
}
