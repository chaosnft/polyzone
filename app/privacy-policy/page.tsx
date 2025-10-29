// app/privacy-policy/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Coinzone",
  description: "Our privacy policy for aggregated crypto and blockchain news content by Coinzone.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">
            Effective Date: October 29, 2025. Last Updated: October 29, 2025.
          </p>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-700">
              Coinzone ("we", "us", or "our") is a community-driven platform that aggregates and curates crypto and blockchain news from verified
              external sources. We respect your privacy and are committed to protecting your personal data in compliance
              with applicable laws, including GDPR (for EU users) and CCPA (for California residents).
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-gray-700">
              We do not collect personal data directly. However, through third-party services:
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>
                  Google Translate (language switching, including Vietnamese and Chinese): May collect usage data; see their{" "}
                  <Link href="https://policies.google.com/privacy" className="text-red-500 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </li>
                <li>
                  Cookies: Used for session management, preferences (e.g., language), and functionality. We do not block cookies; users can manage via browser settings.
                </li>
                <li>Analytics (if enabled): Anonymous usage data via tools like Google Analytics (opt-out available).</li>
              </ul>
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-gray-700">
              Data is used solely to improve user experience (e.g., language translation to Vietnamese, Chinese, and others). We do not sell, share, or use
              data for advertising. Aggregated crypto and blockchain content is for informational purposes only.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Rights (GDPR/CCPA)</h2>
            <p className="text-gray-700">
              You have rights to access, delete, or opt-out of data processing. Contact us at [your-email@example.com] for
              requests. For EU users, we appoint a Data Protection Officer if required.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
            <p className="text-gray-700">
              Our site is not intended for children under 13 (COPPA). We do not knowingly collect data from minors.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">International Transfers</h2>
            <p className="text-gray-700">
              Data may be processed in the US (via MicroCMS/Google). We ensure adequate safeguards for transfers.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">We may update this policy. Check back periodically.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700">Questions? Email: [your-email@example.com].</p>
          </section>
        </article>
      </div>
    </div>
  );
}