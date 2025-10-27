// app/dmca-policy/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "DMCA Policy | Polyzone",
  description: "Our DMCA takedown policy for aggregated content by Polyzone.",
};

export default function DMCA() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">DMCA Policy</h1>
          <p className="text-gray-600 mb-6">
            Effective Date: October 27, 2025. Last Updated: October 27, 2025.
          </p>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-700">
              Polyzone respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA).
              As an aggregator, we link to or excerpt content from verified sources but do not host original content.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Reporting Copyright Infringement</h2>
            <p className="text-gray-700">
              If you believe content on our site infringes your copyright, submit a DMCA takedown notice to
              [your-email@example.com] including:
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Your contact information.</li>
                <li>Description of the copyrighted work.</li>
                <li>URL of the infringing material.</li>
                <li>Statement of good faith belief of infringement.</li>
                <li>Signature (physical or electronic).</li>
                <li>Statement under penalty of perjury.</li>
              </ul>
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Takedown Process</h2>
            <p className="text-gray-700">
              We will respond promptly (within 48 hours) by removing/disabling access to the content and notifying the
              alleged infringer. Repeat infringers may be banned.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Counter-Notices</h2>
            <p className="text-gray-700">
              If content is removed in error, submit a counter-notice to us with similar details. We will restore if no
              lawsuit is filed within 10-14 days.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Designated DMCA Agent</h2>
            <p className="text-gray-700">
              DMCA Agent: Polyzone, Email: [your-email@example.com], Address: [Your Address].
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
            <p className="text-gray-700">
              All content is aggregated from third-party sources. We encourage reporting to original publishers.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700">For DMCA issues: [your-email@example.com].</p>
          </section>
        </article>
      </div>
    </div>
  );
}