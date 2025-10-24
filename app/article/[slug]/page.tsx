// app/article/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/api';
import Image from 'next/image';
import { Calendar, User, Clock } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  try {
    const article = await getArticleBySlug(params.slug);
    return {
      title: `${article.title} | NewsHub`,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: [article.image],
      },
    };
  } catch {
    return { title: 'Article Not Found | NewsHub' };
  }
}

export default async function ArticlePage({ params }: Props) {
  let article;
  try {
    article = await getArticleBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <span className="inline-block px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full mb-4">
          {article.category.toUpperCase()} - {article.topic}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {article.author}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {article.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </div>
        </div>
      </header>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-red-500"
        dangerouslySetInnerHTML={{ __html: article.content || '<p>Content not available.</p>' }}
      />

      {/* Back to Home */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/" className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors">
          ← Back to Home
        </Link>
      </div>
    </article>
  );
}