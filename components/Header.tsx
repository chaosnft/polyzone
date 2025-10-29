// components/Header.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

const COOKIE_NAME = "googtrans";

interface Props {
  locale?: string;
}

export default function Header({ locale: initialLocale = "en" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(initialLocale);
  const [widgetReady, setWidgetReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "zh", name: "中文" },
    { code: "fr", name: "Français" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
  ];

  // Monitor widget readiness and current language from select
  useEffect(() => {
    const checkWidget = () => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select) {
        setWidgetReady(true);
        if (select.value !== currentLocale) {
          setCurrentLocale(select.value);
        }
      }
    };

    // Check immediately and poll every 500ms until ready
    checkWidget();
    const interval = setInterval(checkWidget, 500);
    return () => clearInterval(interval);
  }, [currentLocale]);

  // Read cookie on initial load
  useEffect(() => {
    const cookies = Cookies.get();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];
    let languageValue = "en";
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    setCurrentLocale(languageValue);
  }, []);

  // Switch language: prefer in-place if widget ready, else fallback to reload
  const switchLanguage = (newLocale: string) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select && widgetReady) {
      select.value = newLocale;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      setCurrentLocale(newLocale);
    } else {
      Cookies.set(COOKIE_NAME, `/auto/${newLocale}`);
      window.location.reload();
    }
    setIsLangOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Bitcoin", href: "#bitcoin" },
    { label: "Ethereum", href: "#ethereum" },
    { label: "Solana", href: "#solana" },
    { label: "ETF", href: "#etf" },
    { label: "Binance", href: "#binance" },
    { label: "Coinbase", href: "#coinbase" },
    { label: "SEC", href: "#sec" },
    { label: "China", href: "#china" },
    { label: "Korea", href: "#korea" },
    { label: "Japan", href: "#japan" },
    { label: "Fed", href: "#fed" },
  ];

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
          <Image
            src="/logo-black.webp"
            alt="Coinzone Logo"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
          <span className="text-xl font-bold text-gray-900 hidden sm:inline sr-only">Coinzone</span>
        </motion.div>

        {/* <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-gray-700 font-medium hover:text-red-500 transition-colors duration-300 relative group notranslate"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav> */}

        {/* Right-aligned group: Subscribe and Language */}
        <div className="hidden md:flex items-center gap-4">
          {/* <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Subscribe
          </motion.button> */}

          {/* Language Toggle */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors border border-gray-300"
            >
              <span className="text-sm font-medium">
                {languages.find((l) => l.code === currentLocale)?.name || "English"}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 border border-gray-200 overflow-hidden"
              >
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    whileHover={{ x: 2 }}
                    className={`block px-4 py-3 text-sm w-full text-left font-medium transition-all duration-200 ${
                      currentLocale === lang.code
                        ? "bg-red-50 text-red-700 border-l-4 border-red-500"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {lang.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

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

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isMenuOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block text-gray-700 font-medium hover:text-red-500 transition-colors duration-300 notranslate"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {/* Mobile Subscribe Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => setIsMenuOpen(false)}
          >
            Subscribe
          </motion.button>
          {/* Mobile Lang Switch */}
          <div className="pt-2 border-t">
            <span className="block text-gray-500 text-sm mb-2">Language</span>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  switchLanguage(lang.code);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded ${
                  currentLocale === lang.code ? "bg-red-100" : ""
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}