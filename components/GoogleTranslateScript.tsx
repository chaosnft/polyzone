// components/GoogleTranslateScript.tsx (Updated: Use npm package 'next-google-translate-widget' for seamless integration in Next.js, handles dynamic content and Framer Motion without hydration issues or partial translation)
"use client";
import GoogleTranslate from "next-google-translate-widget";

export default function GoogleTranslateScript() {
  return (
    <GoogleTranslate
      pageLanguage="en"
      includedLanguages="en,vi,zh,fr,ja,ko,ru"
      translateLayout="simple" // Or 'dropdown' for more options
      googleTranslateUrl="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2"
    />
  );
}