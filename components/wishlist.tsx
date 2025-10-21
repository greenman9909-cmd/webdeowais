"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useWishlist } from "./wishlist-context";
import { formatCurrency } from "@/lib/format";

export function Wishlist() {
  const { items, removeItem } = useWishlist();

  return (
    <section id="wishlist" className="mx-auto mt-16 max-w-6xl px-6">
      <div className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glow">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-100">Wishlist</h2>
            <p className="text-sm text-slate-400">
              Save your favourite deals — we store them locally so they are ready next time.
            </p>
          </div>
          <span className="text-xs text-secondary">Synced to localStorage</span>
        </div>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-slate-900/70 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-28 overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="112px" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">{item.name}</h3>
                  <p className="text-xs text-slate-400">{item.discount}% off • {formatCurrency(item.price)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary"
                >
                  View Deal
                </a>
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition hover:border-red-500 hover:text-red-400"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="rounded-2xl border border-dashed border-white/10 bg-slate-900/60 px-5 py-10 text-center text-sm text-slate-500">
              Your wishlist is empty. Tap the bookmark icon on any deal to pin it here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
