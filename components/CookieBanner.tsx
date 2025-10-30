// components/CookieBanner.tsx
"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const COOKIE_NAME = "cookie_consent";
  const BANNER_SHOW_DAYS = 30;

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set(COOKIE_NAME, "accepted", { expires: BANNER_SHOW_DAYS });
    setIsVisible(false);
  };

  const rejectCookies = () => {
    // Optional: Set to "rejected" or handle minimal cookies
    Cookies.set(COOKIE_NAME, "rejected", { expires: BANNER_SHOW_DAYS });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 md:p-6 z-50 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm md:text-base flex-1">
          We use cookies for language translation and site functionality. Learn more in our{" "}
          <a href="/privacy-policy" className="underline hover:no-underline">Privacy Policy</a>.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={rejectCookies}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}