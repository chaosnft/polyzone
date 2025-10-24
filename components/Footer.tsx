// components/Footer.tsx
"use client";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Description */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-3">
              <Image 
                src="/logo-white.webp" 
                alt="Polyzoe Logo" 
                width={120} 
                height={40} 
                className="object-contain"
                priority 
              />
              <span className="text-xl font-bold sr-only">Polyzone</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your source for breaking news and in-depth analysis.
            </p>
          </motion.div>
          {/* Social Icons - Image Placeholders (replace src with your images later) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-6"
          >
            {[
              { name: "YouTube", src: "/social/youtube.webp", href: "https://youtube.com", alt: "YouTube" },
              { name: "Facebook", src: "/social/facebook.webp", href: "https://facebook.com", alt: "Facebook" },
              { name: "X", src: "/social/x.webp", href: "https://twitter.com", alt: "X" },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1, rotate: 2 }}
                whileTap={{ scale: 0.98 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-red-600/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                title={social.name}
              >
                <Image 
                  src={social.src} 
                  alt={social.alt} 
                  width={24} 
                  height={24} 
                  className="text-white" 
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 Polyzone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}