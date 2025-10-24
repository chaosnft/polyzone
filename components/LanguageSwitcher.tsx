// components/LanguageSwitcher.tsx (New: Custom switcher using js-cookie, sets cookie and reloads for full translation)
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();

  useEffect(() => {
    // Read cookie for current lang
    const cookies = Cookies.get();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];
    let languageValue = "en"; // Default
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = globalThis.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    setCurrentLanguage(languageValue);

    // Set config
    if (globalThis.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(globalThis.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  if (!currentLanguage || !languageConfig) {
    return null;
  }

  const switchLanguage = (lang: string) => () => {
    // Set cookie with /auto/ prefix (Google standard)
    Cookies.set(COOKIE_NAME, `/auto/${lang}`);
    // Reload to apply full page translation, including dynamic content
    window.location.reload();
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2 border notranslate">
      {languageConfig.languages.map((ld: LanguageDescriptor) => (
        <button
          key={ld.name}
          onClick={switchLanguage(ld.name)}
          className={`mx-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
            currentLanguage === ld.name
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {ld.title}
        </button>
      ))}
    </div>
  );
}