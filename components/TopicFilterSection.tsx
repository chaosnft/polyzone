// components/TopicFilterSection.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Article } from "@/lib/api";

interface Props {
  articles: Article[];
}

const TOPICS = ["Technology", "Business", "Environment", "Sports", "Entertainment", "Health", "Travel"];

export default function TopicFilterSection({ articles }: Props) {
  const [selectedTopic, setSelectedTopic] = useState("Technology");
  const [topicIndex, setTopicIndex] = useState(0);
  const filteredArticles = articles.filter((a) => a.topic === selectedTopic);
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

  return (
    <section id="topics" className="min-h-screen py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Explore by Topic</h2>
          <p className="text-gray-600">Discover stories in your favorite categories</p>
        </motion.div>

        {/* Topic Buttons */}
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
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                selectedTopic === topic
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {topic}
            </motion.button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        {displayArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              {/* Large Featured Card on Left */}
              {mainArticle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2 lg:row-span-2"
                >
                  <Link href={`/article/${mainArticle.slug}`}>
                    <div className="relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                      <motion.img
                        src={mainArticle.image}
                        alt={mainArticle.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full mb-3">
                          {selectedTopic.toUpperCase()}
                        </span>
                        <h3 className="text-2xl font-bold mb-2 line-clamp-2">{mainArticle.title}</h3>
                        <p className="text-gray-200 text-sm line-clamp-2 mb-3">{mainArticle.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span>{mainArticle.author}</span>
                          <span>{mainArticle.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Smaller Cards Grid */}
              {otherArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/article/${article.slug}`}>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h4 className="text-sm font-bold line-clamp-2 mb-1">{article.title}</h4>
                        <p className="text-xs text-gray-300">{article.date}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Navigation Buttons */}
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
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found in this topic.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}