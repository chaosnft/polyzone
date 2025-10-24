// components/FeaturedHotSection.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
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
    return null; // Không render nếu không có hot articles
  }

  return (
    <section id="hot" className="pt-24 pb-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Stay Informed & Inspired</h2>
          <p className="text-gray-600 text-lg">Hot Latest breaking news and trending stories</p>
        </motion.div>

        <motion.div
          key={currentArticle.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
        >
          <Link href={`/article/${currentArticle.slug}`}>
            <motion.img
              src={currentArticle.image}
              alt={currentArticle.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full mb-4">
                  HOT NEWS
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-3 line-clamp-2">{currentArticle.title}</h3>
                <p className="text-gray-200 text-lg mb-4 line-clamp-2">{currentArticle.excerpt}</p>
                <div className="flex items-center gap-6 text-sm">
                  <span>{currentArticle.author}</span>
                  <span>{currentArticle.date}</span>
                  <span>{currentArticle.readTime}</span>
                </div>
              </motion.div>
            </div>
          </Link>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            onClick={prevHot}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={nextHot}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}