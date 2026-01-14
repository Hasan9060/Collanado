import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import ClientLayout from '@/components/layout/ClientLayout';
import { Toaster } from "@/components/ui/sonner";

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
      <body className="font-sans antialiased selection:bg-red-100 selection:text-red-900">
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
        <Toaster />
      </body>
    </html>

  );
}