// components/AboutSection.tsx
"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Coinzone</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Coinzone is your go-to source for cryptocurrency news, blockchain developments, and crypto market insights.
            We aggregate real-time updates on Bitcoin, Ethereum, altcoins, regulations, exchanges, and global trends to empower your crypto journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
}