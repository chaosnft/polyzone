// components/Footer.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start lg:items-center">
          {/* Logo and Description - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
              <Image
                src="/logo-white.webp"
                alt="Polyzone Logo"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
              <span className="text-xl font-bold sr-only">Polyzone</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md mx-auto lg:mx-0">
              Polyzone aggregates breaking news and in-depth analysis from verified sources for informed communities.
              Compliant with DMCA and GDPR.
            </p>
          </motion.div>
          {/* Follow Us - Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-2 place-self-center"
          >
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-gray-200">Follow Us:</h4>
              <div className="flex gap-2">
                {[
                  {
                    name: "YouTube",
                    src: "/social/youtube.webp",
                    href: "https://youtube.com/@yourchannel",
                    alt: "YouTube",
                  },
                  {
                    name: "X",
                    src: "/social/x.webp",
                    href: "https://x.com/youraccount",
                    alt: "X",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                    title={social.name}
                  >
                    <Image src={social.src} alt={social.alt} width={32} height={32} className="text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Policies - Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2 text-right place-self-end"
          >
            <h4 className="text-sm font-semibold text-gray-200">Policies</h4>
            <Link
              href="/privacy-policy"
              className="text-gray-400 text-sm hover:text-red-500 transition-colors duration-300 block"
            >
              Privacy Policy
            </Link>
            <Link
              href="/dmca-policy"
              className="text-gray-400 text-sm hover:text-red-500 transition-colors duration-300 block"
            >
              DMCA Policy
            </Link>
          </motion.div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Polyzone. All rights reserved. Content aggregated from verified sources.
          </p>
        </div>
      </div>
    </footer>
  );
}