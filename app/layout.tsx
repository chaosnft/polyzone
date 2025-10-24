import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Geist, Geist_Mono, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] });
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] });
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: 'NewsHub - Breaking News & Insights',
  description: 'Stay informed with the latest breaking news, in-depth analysis, and trending stories across technology, business, and more.',
  generator: 'Next.js + Strapi',
  keywords: 'news, technology, business, environment, sports',
  openGraph: {
    title: 'NewsHub',
    description: 'Your source for breaking news and in-depth analysis.',
    images: '/og-image.png', // Thêm image OG nếu có
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.className} font-sans antialiased bg-white text-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}