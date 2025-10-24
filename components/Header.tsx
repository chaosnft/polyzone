// components/Header.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200"
    >
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
  );
}