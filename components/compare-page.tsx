"use client";

import { useMemo, useState } from "react";
import { useDeals } from "@/lib/use-deals";
import { Deal } from "./wishlist-context";
import { formatCurrency } from "@/lib/format";
import { AlertTriangle } from "lucide-react";

export function ComparePage() {
  const { deals, isLoading, error } = useDeals();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleDeal = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const selectedDeals = useMemo(() => {
    return deals.filter((deal) => selectedIds.includes(deal.id));
  }, [deals, selectedIds]);

  return (
    <div className="mx-auto mt-10 max-w-6xl px-6">
      <div className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glow">
        <h1 className="text-3xl font-semibold text-slate-100">Compare Deals</h1>
        <p className="mt-2 text-sm text-slate-400">
          Select up to three games to compare pricing, discount depth, and wishlist popularity.
        </p>
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            <AlertTriangle size={16} /> Unable to load deals for comparison at this time.
          </div>
        )}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => {
            const active = selectedIds.includes(deal.id);
            return (
              <button
                key={deal.id}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  active
                    ? "border-secondary/80 bg-secondary/10 text-secondary"
                    : "border-white/10 bg-slate-900/60 text-slate-200 hover:border-secondary/40"
                }`}
                onClick={() => toggleDeal(deal.id)}
              >
                <div className="text-sm font-semibold">{deal.name}</div>
                <div className="mt-1 text-xs">
                  {deal.discount}% off • {formatCurrency(deal.price)}
                </div>
              </button>
            );
          })}
        </div>
        {isLoading && <p className="mt-6 text-sm text-slate-400">Loading comparison data...</p>}
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full divide-y divide-white/5 text-sm text-slate-200">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Game</th>
                <th className="px-4 py-3 text-left">Discount</th>
                <th className="px-4 py-3 text-left">Current Price</th>
                <th className="px-4 py-3 text-left">Original Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/60">
              {selectedDeals.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    Choose games above to compare them side-by-side.
                  </td>
                </tr>
              )}
              {selectedDeals.map((deal: Deal) => (
                <tr key={deal.id}>
                  <td className="px-4 py-3 font-medium text-slate-100">{deal.name}</td>
                  <td className="px-4 py-3 text-secondary">-{deal.discount}%</td>
                  <td className="px-4 py-3">{formatCurrency(deal.price)}</td>
                  <td className="px-4 py-3 text-slate-400">{formatCurrency(deal.originalPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
