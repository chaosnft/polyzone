// app/layout.tsx (Updated: Direct import of client component instead of dynamic with ssr:false)
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Geist, Geist_Mono, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import GoogleTranslateWidget from '@/components/GoogleTranslateWidget'; // Direct import (client component handled by Next.js)

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] });
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] });
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: 'NewsHub - Breaking News & Insights',
  description: 'Stay informed with the latest breaking news, in-depth analysis, and trending stories across technology, business, and more.',
  generator: 'Next.js + Strapi',
  keywords: 'news, technology, business, environment, sports, breaking news, insights',
  authors: [{ name: 'NewsHub Team' }],
  creator: 'NewsHub',
  publisher: 'NewsHub',
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL('https://yourdomain.com'), // Thay bằng domain thật
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NewsHub',
    description: 'Your source for breaking news and in-depth analysis.',
    images: '/og-image.png',
    locale: 'en_US',
    type: 'website',
    siteName: 'NewsHub',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@newshub',
    creator: '@newshub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification', // Thêm nếu có
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://yourdomain.com/" />
        <link rel="sitemap" href="/sitemap.xml" />
        <meta name="theme-color" content="#ef4444" />
      </head>
      <body className={`${_geist.className} font-sans antialiased bg-white text-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          {children}
          <GoogleTranslateWidget />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}