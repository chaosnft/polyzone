"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Mail } from "lucide-react"
import Link from "next/link"

// Sample article data
const articles = [
  {
    id: 1,
    title: "Breaking: Major Tech Innovation Announced",
    excerpt: "A groundbreaking technology has been unveiled that could revolutionize the industry.",
    category: "hot",
    topic: "Technology",
    image: "/placeholder.svg?height=600&width=800",
    date: "2 hours ago",
    author: "Sarah Chen",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Market Trends Show Unexpected Growth",
    excerpt: "Latest data reveals surprising market movements across multiple sectors.",
    category: "featured",
    topic: "Business",
    image: "/placeholder.svg?height=400&width=500",
    date: "4 hours ago",
    author: "James Wilson",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Industry Leaders Meet for Summit",
    excerpt: "Top executives gather to discuss future strategies and partnerships.",
    category: "featured",
    topic: "Business",
    image: "/placeholder.svg?height=300&width=400",
    date: "6 hours ago",
    author: "Emma Rodriguez",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Climate Action Initiative Launched",
    excerpt: "Global leaders announce new environmental protection measures.",
    category: "featured",
    topic: "Environment",
    image: "/placeholder.svg?height=300&width=400",
    date: "8 hours ago",
    author: "Michael Brown",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Sports Championship Finals Begin",
    excerpt: "Teams compete for the title in an exciting tournament.",
    category: "featured",
    topic: "Sports",
    image: "/placeholder.svg?height=300&width=400",
    date: "10 hours ago",
    author: "Lisa Anderson",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Entertainment: New Film Releases",
    excerpt: "Blockbuster movies hit theaters this weekend.",
    category: "featured",
    topic: "Entertainment",
    image: "/placeholder.svg?height=300&width=400",
    date: "12 hours ago",
    author: "David Martinez",
    readTime: "4 min read",
  },
  {
    id: 7,
    title: "Technology: AI Advances Continue",
    excerpt: "Artificial intelligence reaches new milestones in development.",
    category: "featured",
    topic: "Technology",
    image: "/placeholder.svg?height=300&width=400",
    date: "14 hours ago",
    author: "Alex Turner",
    readTime: "9 min read",
  },
  {
    id: 8,
    title: "Health: Wellness Trends 2025",
    excerpt: "New health and wellness practices gain popularity.",
    category: "featured",
    topic: "Health",
    image: "/placeholder.svg?height=300&width=400",
    date: "16 hours ago",
    author: "Nina Patel",
    readTime: "6 min read",
  },
  {
    id: 9,
    title: "Travel: Destinations to Visit",
    excerpt: "Explore the most exciting travel destinations this year.",
    category: "featured",
    topic: "Travel",
    image: "/placeholder.svg?height=300&width=400",
    date: "18 hours ago",
    author: "Chris Johnson",
    readTime: "7 min read",
  },
]

// Unique topics list
const TOPICS = ["Technology", "Business", "Environment", "Sports", "Entertainment", "Health", "Travel"]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold text-gray-900 hidden sm:inline">NewsHub</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Hot", href: "#hot" },
            { label: "Featured", href: "#featured" },
            { label: "About", href: "#about" },
          ].map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-gray-700 font-medium hover:text-red-500 transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:block px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Subscribe
        </motion.button>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden flex flex-col gap-1.5">
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gray-900 rounded-full"
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-gray-900 rounded-full"
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gray-900 rounded-full"
          />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isMenuOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 space-y-3">
          {[
            { label: "Hot", href: "#hot" },
            { label: "Featured", href: "#featured" },
            { label: "About", href: "#about" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block text-gray-700 font-medium hover:text-red-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  )
}

function FeaturedHotSection() {
  const [hotIndex, setHotIndex] = useState(0)
  const hotArticles = articles.filter((a) => a.category === "hot")

  const nextHot = () => {
    setHotIndex((prev) => (prev + 1) % hotArticles.length)
  }

  const prevHot = () => {
    setHotIndex((prev) => (prev - 1 + hotArticles.length) % hotArticles.length)
  }

  const currentArticle = hotArticles[hotIndex]

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
          <Link href={`/article/${currentArticle.id}`}>
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
  )
}

function FeaturedNewsSection() {
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const featuredArticles = articles.filter((a) => a.category === "featured")

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % Math.ceil(featuredArticles.length / 8))
  }

  const prevFeatured = () => {
    setFeaturedIndex(
      (prev) => (prev - 1 + Math.ceil(featuredArticles.length / 8)) % Math.ceil(featuredArticles.length / 8),
    )
  }

  const startIdx = featuredIndex * 8
  const displayArticles = featuredArticles.slice(startIdx, startIdx + 8)
  const mainArticle = displayArticles[0]
  const otherArticles = displayArticles.slice(1)

  return (
    <section id="featured" className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured News</h2>
          <p className="text-gray-600">Curated stories and in-depth coverage</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Large Featured Card on Left */}
          {mainArticle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 lg:row-span-2"
            >
              <Link href={`/article/${mainArticle.id}`}>
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
                      FEATURED
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
              <Link href={`/article/${article.id}`}>
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
        </div>
      </div>
    </section>
  )
}

function TopicFilterSection() {
  const [selectedTopic, setSelectedTopic] = useState("Technology")
  const [topicIndex, setTopicIndex] = useState(0)

  const filteredArticles = articles.filter((a) => a.topic === selectedTopic)

  const nextTopic = () => {
    setTopicIndex((prev) => (prev + 1) % Math.ceil(filteredArticles.length / 8))
  }

  const prevTopic = () => {
    setTopicIndex(
      (prev) => (prev - 1 + Math.ceil(filteredArticles.length / 8)) % Math.ceil(filteredArticles.length / 8),
    )
  }

  const startIdx = topicIndex * 8
  const displayArticles = filteredArticles.slice(startIdx, startIdx + 8)
  const mainArticle = displayArticles[0]
  const otherArticles = displayArticles.slice(1)

  return (
    <section className="min-h-screen py-16 px-6 bg-white">
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
          className="flex flex-wrap gap-3 mb-12"
        >
          {TOPICS.map((topic) => (
            <motion.button
              key={topic}
              onClick={() => {
                setSelectedTopic(topic)
                setTopicIndex(0)
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
                  <Link href={`/article/${mainArticle.id}`}>
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
                  <Link href={`/article/${article.id}`}>
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
  )
}

function EmailSubscriptionSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-8 md:p-12 border-2 border-red-200 shadow-lg"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Stay Updated</h2>
            <p className="text-gray-600 text-lg">Get the latest news delivered to your inbox</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:outline-none transition-colors duration-300 font-medium"
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Subscribe
            </motion.button>
          </form>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center font-medium"
            >
              Thank you for subscribing!
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Description */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold">NewsHub</span>
            </div>
            <p className="text-gray-400 text-sm">Your source for breaking news and in-depth analysis.</p>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-6"
          >
            {[
              { name: "X", icon: "𝕏", href: "https://twitter.com" },
              { name: "Facebook", icon: "f", href: "https://facebook.com" },
              { name: "YouTube", icon: "▶", href: "https://youtube.com" },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 NewsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Header />
      <FeaturedHotSection />
      <FeaturedNewsSection />
      <TopicFilterSection />
      <EmailSubscriptionSection />
      <Footer />
    </div>
  )
}
