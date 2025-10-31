// components/FeaturedHotSection.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/api";

interface Props {
  articles: Article[];
}

export default function FeaturedHotSection({ articles }: Props) {
  const [hotIndex, setHotIndex] = useState(0);
  const hotArticles = articles.filter((a) => a.category === "hot");
  const nextHot = () => {
    setHotIndex((prev) => (prev + 1) % hotArticles.length);
  };
  const prevHot = () => {
    setHotIndex((prev) => (prev - 1 + hotArticles.length) % hotArticles.length);
  };
  const currentArticle = hotArticles[hotIndex];

  if (hotArticles.length === 0) {
    return null;
  }

  return (
    <section id="hot" className="pt-24 pb-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 uppercase">Stay Ahead</h2>
          <p className="text-gray-600 text-sm">Hot latest crypto breaking news, blockchain trends, and market updates from verified sources</p>
        </motion.div> */}
        <motion.div
          key={currentArticle.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
        >
          <Link href={`/article/${currentArticle.slug}`} target="_blank" rel="noopener noreferrer">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={currentArticle.image || "/images/default-article.png"}
                alt={`${currentArticle.title} - Coinzone`}
                fill
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2">{currentArticle.title}</h3>
                <p className="text-gray-200 text-sm mb-4 line-clamp-2">{currentArticle.excerpt}</p>
                <div className="flex items-center gap-6 text-xs">
                  <span className="notranslate">{currentArticle.author}</span>
                  <span className="notranslate">{currentArticle.date}</span>
                  <span className="notranslate">{currentArticle.readTime}</span>
                </div>
              </motion.div>
            </div>
          </Link>
          <span className="absolute top-8 left-8 inline-block px-4 py-2 bg-red-500 text-white text-[10px] font-bold rounded-full z-10">
            HOT AGGREGATED NEWS
          </span>
          {currentArticle.tags && currentArticle.tags.length > 0 && (
            <div className="absolute bottom-2 right-3 flex gap-2 z-10">
              {currentArticle.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 bg-gray-200 text-gray-700 text-[9px] sm:text-xs font-semibold rounded-full gap-1 notranslate"
                >
                  <Tag className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            onClick={prevHot}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={nextHot}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}