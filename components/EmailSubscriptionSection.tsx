// components/EmailSubscriptionSection.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function EmailSubscriptionSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
      // TODO: Integrate với service như Mailchimp hoặc API
    }
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-8 md:p-12 border-2 border-red-200 shadow-lg"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Stay Updated</h2>
            <p className="text-gray-600 text-lg">Get the latest news delivered to your inbox</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:outline-none transition-colors duration-300 font-medium"
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Subscribe
            </motion.button>
          </form>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center font-medium"
            >
              Thank you for subscribing!
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}