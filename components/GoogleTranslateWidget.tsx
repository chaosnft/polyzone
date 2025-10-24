// components/GoogleTranslateWidget.tsx (Tạo file mới này để khắc phục lỗi import)
"use client";
import { useEffect } from "react";

export default function GoogleTranslateWidget() {
  useEffect(() => {
    // Load config script
    const configScript = document.createElement("script");
    configScript.src = "/assets/scripts/lang-config.js";
    configScript.async = true;
    configScript.onload = () => {
      // Load init script after config
      const initScript = document.createElement("script");
      initScript.src = "/assets/scripts/translation.js";
      initScript.async = true;
      initScript.onload = () => {
        // Load main Google Translate script after init
        const mainScript = document.createElement("script");
        mainScript.src = "//translate.google.com/translate_a/element.js?cb=TranslateInit";
        mainScript.async = true;
        document.head.appendChild(mainScript);
      };
      document.head.appendChild(initScript);
    };
    document.head.appendChild(configScript);

    // Cleanup function (optional, removes scripts on unmount)
    return () => {
      const scripts = document.querySelectorAll('script[src*="/assets/scripts/"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="skiptranslate"
      style={{ display: "none" }}
    />
  );
}