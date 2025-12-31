import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import ClientLayout from '@/components/layout/ClientLayout';
import BackToTop from "@/components/ui/BackToTop";
import { Toaster } from "@/components/ui/sonner";
import CollegeChatbot from "@/components/chatbot/CollegeChatbot";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});



const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'GDC Malir cantt karachi',
  description: 'Watch to Lead offers free English learning resources including vocabulary builders, YouTube lessons, e-books, and quizzes to help you achieve fluency.',
  icons: {
    icon: "/favicon.ico",
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <link rel="icon" href="/favicon-new.ico" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
        <BackToTop />
        <Toaster />
        <CollegeChatbot />
      </body>
    </html>

  );
}