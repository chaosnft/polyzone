// app/article/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/api';
import Image from 'next/image';
import { Calendar, User, Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Article } from '@/lib/api';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const article = await getArticleBySlug(resolvedParams.slug);
    return {
      title: `${article.title} | NewsHub`,
      description: article.excerpt,
      keywords: `${article.topic}, ${article.category}, news, ${article.tags?.join(', ') || ''}`,
      authors: [{ name: article.author }],
      creator: 'NewsHub',
      publisher: 'NewsHub',
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: [article.image],
        type: 'article',
        publishedTime: article.date,
        authors: [article.author],
        tags: article.tags || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: [article.image],
      },
      alternates: {
        canonical: `/article/${resolvedParams.slug}`,
      },
      robots: 'index, follow',
    };
  } catch {
    return { 
      title: 'Article Not Found | NewsHub',
      robots: 'noindex',
    };
  }
}

async function Sidebar({ articles }: { articles: Article[] }) {
  return (
    <aside className="w-full lg:w-1/3 lg:ml-8 space-y-6 overflow-y-auto max-h-screen">
      <h3 className="text-xl font-bold text-gray-900 mb-4 sticky top-0 bg-white pt-4">Featured News</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.slice(0, 10).map((article: Article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="block p-4 rounded-xl hover:bg-gray-50 transition-colors group">
            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2">
              <Image src={article.image || '/images/default-article.png'} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h4 className="text-sm font-semibold line-clamp-2 text-gray-900">{article.title}</h4>
            <p className="text-xs text-gray-500 mt-1 notranslate">{article.date}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  let article;
  try {
    article = await getArticleBySlug(resolvedParams.slug);
  } catch {
    notFound();
  }

  const sidebarArticles = await getArticles({ limit: 10 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": article.image,
    "datePublished": article.date,
    "author": { "@type": "Person", "name": article.author },
    "publisher": { "@type": "Organization", "name": "NewsHub", "logo": { "@type": "ImageObject", "url": "/logo.webp" } },
    "description": article.excerpt,
  };

  return (
    <>
      <Script id="json-ld" type="application/ld+json">{JSON.stringify(jsonLd)}</Script>
      <Header />
      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-12 flex flex-col lg:flex-row gap-8"> {/* Adjusted pt-32 for back button space */}
        {/* Back to Home Button - Top Left Fixed */}
        <Link 
          href="/" 
          className="fixed top-28 left-6 z-40 group inline-flex items-center gap-1.5 bg-white border border-red-500 text-red-500 px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
          <span className="whitespace-nowrap">Back to Home</span>
        </Link>

        <article className="lg:w-2/3">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
            <Image
              src={article.image || '/images/default-article.png'}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <header className="mb-8">
            <span className="inline-block px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full mb-4">
              {article.category.toUpperCase()} - <span className="notranslate">{article.topic}</span>
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="notranslate">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="notranslate">{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="notranslate">{article.readTime}</span>
              </div>
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag: string) => (
                  <span key={tag} className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full flex items-center notranslate">
                    <Tag className="w-3 h-3 inline mr-1" /> {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-red-500 prose-img:rounded-lg prose-img:max-h-96 prose-img:object-cover"
            dangerouslySetInnerHTML={{ __html: article.content || '<p>Content not available.</p>' }}
          />
        </article>

        <Sidebar articles={sidebarArticles} />
      </div>
      <Footer />
    </>
  );
}