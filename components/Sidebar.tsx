// components/Sidebar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/api";
import { getArticles } from "@/lib/api";

interface Props {
  initialArticles: Article[];
}

export default function Sidebar({ initialArticles }: Props) {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    const newArticles = await getArticles({ limit: 10, offset: page * 10 });
    if (newArticles.length === 0) setHasMore(false);
    setArticles([...articles, ...newArticles]);
    setPage(page + 1);
  };

  return (
    <aside className="w-full lg:w-1/3 lg:ml-8 space-y-6 overflow-y-auto max-h-screen">
      <h3 className="text-xl font-bold text-gray-900 mb-4 sticky top-0 bg-white pt-4">Latest News</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article: Article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            target="_blank" // Open in new tab
            rel="noopener noreferrer" // Security best practice
            className="block p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2">
              <Image
                src={article.image || "/images/default-article.png"}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <h4 className="text-sm font-semibold line-clamp-2 text-gray-900">{article.title}</h4>
            <p className="text-xs text-gray-500 mt-1 notranslate">{article.date}</p>
          </Link>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={loadMore}
          className="w-full py-2 bg-red-500 text-white rounded-lg mt-4 hover:bg-red-600 transition-all duration-300"
        >
          Load More
        </button>
      )}
    </aside>
  );
}