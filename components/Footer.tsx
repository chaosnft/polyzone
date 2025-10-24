// components/Footer.tsx
"use client";

import { motion } from "framer-motion";

export default function Footer() {
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
  );
}