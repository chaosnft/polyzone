// components/TopicFilterSection.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/api";
import { getArticles } from "@/lib/api";

interface Props {
  articles: Article[];
}

const TOPICS = ["ALL", "Bitcoin", "Ethereum", "Solana", "ETF", "Binance", "Coinbase", "SEC","US" , "China", "Korea", "Japan", "Fed"];

export default function TopicFilterSection({ articles: initialArticles }: Props) {
  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const [topicIndex, setTopicIndex] = useState(0);
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const filteredArticles = selectedTopic === "ALL" ? articles : articles.filter((a) => a.topic === selectedTopic);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const nextTopic = () => {
    setTopicIndex((prev) => (prev + 1) % totalPages);
  };
  const prevTopic = () => {
    setTopicIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };
  const startIdx = topicIndex * itemsPerPage;
  const displayArticles = filteredArticles.slice(startIdx, startIdx + itemsPerPage);
  const mainArticle = displayArticles[0];
  const otherArticles = displayArticles.slice(1);

  const loadMore = async () => {
    const params = selectedTopic === "ALL" ? {} : { topic: selectedTopic };
    const newArticles = await getArticles({ ...params, limit: 8, offset: page * 8 });
    if (newArticles.length === 0) setHasMore(false);
    setArticles([...articles, ...newArticles]);
    setPage(page + 1);
  };

  return (
    <section id="topics" className="min-h-screen py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Explore Crypto Topics</h2>
          <p className="text-gray-600">Discover blockchain stories, market trends, and regulatory news in your favorite crypto categories from verified sources</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {TOPICS.map((topic) => (
            <motion.button
              key={topic}
              onClick={() => {
                setSelectedTopic(topic);
                setTopicIndex(0);
                setPage(1);
                setHasMore(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 notranslate ${
                selectedTopic === topic
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {topic}
            </motion.button>
          ))}
        </motion.div>
        {displayArticles.length > 0 ? (
          <>
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
                        <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full mb-3 notranslate">
                          {selectedTopic.toUpperCase()}
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
                                className="inline-flex items-center px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full gap-1 notranslate"
                              >
                                <Tag className="w-3 h-3 flex-shrink-0" />
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
                          <div className="absolute bottom-2 right-2 flex gap-1">
                            {article.tags.slice(0, 3).map((tag: string) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-1 py-0.25 bg-gray-200 text-gray-700 text-[9px] font-semibold rounded-full gap-0.5 notranslate"
                              >
                                <Tag className="w-2 h-2 flex-shrink-0" />
                                <span className="truncate max-w-[50px]">{tag}</span>
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
                onClick={prevTopic}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={nextTopic}
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
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found in this crypto topic.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}