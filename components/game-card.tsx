"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookmarkCheck, BookmarkPlus, ExternalLink } from "lucide-react";
import { Deal, useWishlist } from "./wishlist-context";
import { formatCurrency } from "@/lib/format";

export type GameCardProps = {
  deal: Deal;
  onSelect?: (deal: Deal) => void;
  selected?: boolean;
};

export function GameCard({ deal, onSelect, selected }: GameCardProps) {
  const { addItem, removeItem, isSaved } = useWishlist();
  const saved = isSaved(deal.id);

  return (
    <motion.article
      layout
      whileHover={{ y: -4, rotateX: 2 }}
      className={`card-hover glass-panel flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 ${
        selected ? "ring-2 ring-secondary" : ""
      }`}
    >
      <div className="relative h-44 w-full">
        <Image
          src={deal.image}
          alt={deal.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-secondary">
          -{deal.discount}%
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-4 p-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{deal.name}</h3>
          <p className="mt-1 text-sm text-slate-400">Original {formatCurrency(deal.originalPrice)}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-secondary">
            {formatCurrency(deal.price)}
          </span>
          <button
            onClick={() => (saved ? removeItem(deal.id) : addItem(deal))}
            className="glass-panel flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-slate-200 hover:text-secondary"
          >
            {saved ? (
              <>
                <BookmarkCheck size={14} /> Saved
              </>
            ) : (
              <>
                <BookmarkPlus size={14} /> Wishlist
              </>
            )}
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-400">
          <button
            className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 transition hover:border-secondary hover:text-secondary"
            onClick={() => onSelect?.(deal)}
          >
            Compare
          </button>
          <a
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-secondary"
          >
            View <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
