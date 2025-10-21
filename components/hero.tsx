"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="home"
      className="hero-background relative overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-70" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="text-4xl font-bold md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="text-gradient">Track Steam Deals in Real Time</span>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-slate-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Discover the hottest discounts, monitor price history, and let AI digest thousands of Steam reviews so you can buy smarter.
        </motion.p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {[
            "Live Deals Feed",
            "Wishlist Sync",
            "Interactive Charts",
            "Weekly Top Picks",
          ].map((feature) => (
            <motion.span
              key={feature}
              className="glass-panel neon-border rounded-full px-6 py-2 text-sm text-slate-200 shadow-neon"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {feature}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
