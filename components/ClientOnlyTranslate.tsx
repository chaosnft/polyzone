// components/ClientOnlyTranslate.tsx (Updated: Now renders LanguageSwitcher instead of old GoogleTranslateScript)
"use client";
import dynamic from "next/dynamic";

const LanguageSwitcher = dynamic(() => import("./LanguageSwitcher"), { ssr: false });

export default function ClientOnlyTranslate() {
  return <LanguageSwitcher />;
}