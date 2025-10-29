// components/FeaturedNewsSection.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/api";
import { getArticles } from "@/lib/api";

interface Props {
  articles: Article[];
}

export default function FeaturedNewsSection({ articles: initialArticles }: Props) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const featuredArticles = articles.filter((a) => a.category === "featured");
  const itemsPerPage = 8;
  const totalPages = Math.ceil(featuredArticles.length / itemsPerPage);
  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % totalPages);
  };
  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };
  const startIdx = featuredIndex * itemsPerPage;
  const displayArticles = featuredArticles.slice(startIdx, startIdx + itemsPerPage);
  const mainArticle = displayArticles[0];
  const otherArticles = displayArticles.slice(1);

  const loadMore = async () => {
    const newArticles = await getArticles({ category: "featured", limit: 8, offset: page * 8 });
    if (newArticles.length === 0) setHasMore(false);
    setArticles([...articles, ...newArticles]);
    setPage(page + 1);
  };

  if (featuredArticles.length === 0) {
    return null;
  }

  return (
    <section id="featured" className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Crypto News</h2>
          <p className="text-gray-600">Curated blockchain stories, market analysis, and regulatory updates from verified sources</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {mainArticle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 lg:row-span-2"
            >
              <Link href={`/article/${mainArticle.slug}`} target="_blank" rel="noopener noreferrer">
                <div className="relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={mainArticle.image || "/images/default-article.png"}
                      alt={`${mainArticle.title} - Coinzone`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full mb-3">
                      FEATURED CRYPTO
                    </span>
                    <h3 className="text-2xl font-bold mb-2 line-clamp-2">{mainArticle.title}</h3>
                    <p className="text-gray-200 text-sm line-clamp-2 mb-3">{mainArticle.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="notranslate">{mainArticle.author}</span>
                      <span className="notranslate">{mainArticle.date}</span>
                    </div>
                    {mainArticle.tags && mainArticle.tags.length > 0 && (
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        {mainArticle.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
          {otherArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/article/${article.slug}`} target="_blank" rel="noopener noreferrer">
                <div className="relative h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={article.image || "/images/default-article.png"}
                      alt={`${article.title} - Coinzone`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="text-sm font-bold line-clamp-2 mb-1">{article.title}</h4>
                    <p className="text-xs text-gray-300 notranslate">{article.date}</p>
                    {article.tags && article.tags.length > 0 && (
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        {article.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={prevFeatured}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={nextFeatured}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
          {hasMore && (
            <motion.button
              onClick={loadMore}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
            >
              Load More
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}