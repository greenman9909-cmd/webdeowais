"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, TrendingDown } from "lucide-react";
import { GameCard } from "./game-card";
import { SearchBar } from "./search-bar";
import { useDeals } from "@/lib/use-deals";
import { Deal } from "./wishlist-context";
import { PriceChart } from "./price-chart";

type Props = {
  selected: Deal | null;
  onSelect: (deal: Deal) => void;
};

export function DealList({ selected, onSelect }: Props) {
  const { deals, error, isLoading, refresh } = useDeals();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return deals
      .filter((deal) => {
        const match = deal.name.toLowerCase().includes(search.toLowerCase());
        if (match) return true;
        const discountSearch = search.match(/(\d+)%/);
        if (discountSearch) {
          const percent = Number(discountSearch[1]);
          return deal.discount >= percent;
        }
        return false;
      })
      .sort((a, b) => b.discount - a.discount);
  }, [deals, search]);

  const topDeals = filtered.slice(0, 5);

  useEffect(() => {
    if (!selected && topDeals[0]) {
      onSelect(topDeals[0]);
    }
  }, [onSelect, selected, topDeals]);

  const chartDeal = selected ?? topDeals[0] ?? null;

  return (
    <section id="deals" className="mx-auto mt-16 max-w-6xl px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-glow">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-100">Live Deals Feed</h2>
                <p className="text-sm text-slate-400">
                  Updated every few minutes directly from Steam.
                </p>
              </div>
              <button
                onClick={() => refresh()}
                className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-200 transition hover:text-secondary"
              >
                <RefreshCcw size={16} /> Refresh
              </button>
            </div>
            <SearchBar value={search} onChange={setSearch} />
            {isLoading && (
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/60 px-4 py-5 text-sm text-slate-300">
                <span className="h-3 w-3 animate-ping rounded-full bg-secondary" />
                Fetching latest discounts...
              </div>
            )}
            {error && (
              <div className="glass-panel flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-4 text-sm text-red-200">
                <AlertTriangle size={18} /> Could not fetch deals. Please try again shortly.
              </div>
            )}
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((deal) => (
                <GameCard
                  key={deal.id}
                  deal={deal}
                  onSelect={onSelect}
                  selected={selected?.id === deal.id}
                />
              ))}
            </motion.div>
            {filtered.length === 0 && !isLoading && (
              <p className="text-center text-sm text-slate-400">No deals match your query yet. Try lowering the discount filter.</p>
            )}
          </div>
        </div>
        <aside className="flex w-full max-w-sm flex-col gap-6">
          <div className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-100">Top Deals Ranking</h3>
              <span className="text-xs text-secondary">Auto-updates weekly</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Highest discounts curated for the past 7 days.
            </p>
            <div className="mt-5 space-y-4">
              {topDeals.map((deal, index) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-900/70 px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-100">
                      #{index + 1} {deal.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {deal.discount}% off • ${deal.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-secondary">
                    <TrendingDown size={14} />
                    {deal.discount}%
                  </div>
                </div>
              ))}
              {topDeals.length === 0 && (
                <p className="text-sm text-slate-500">Add filters or refresh to see this week's champions.</p>
              )}
            </div>
          </div>
          <PriceChart selected={chartDeal} />
        </aside>
      </div>
    </section>
  );
}
