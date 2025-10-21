"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Deal } from "./wishlist-context";
import { formatCurrency } from "@/lib/format";

function generateHistory(deal: Deal) {
  const base = deal.originalPrice;
  return Array.from({ length: 8 }).map((_, index) => {
    const decay = Math.max(0.2, 1 - index * 0.1);
    const price = base * (decay - deal.discount / 100 * (index / 7));
    return {
      name: `Week ${8 - index}`,
      price: Number(price.toFixed(2)),
    };
  });
}

type Props = {
  selected: Deal | null;
};

export function PriceChart({ selected }: Props) {
  const data = selected ? generateHistory(selected) : [];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glow">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-100">Price History</h3>
        <span className="text-xs text-slate-500">Simulated last 8 weeks</span>
      </div>
      <p className="mt-2 text-sm text-slate-400">
        Track how discounts evolved to time your purchase.
      </p>
      {selected ? (
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00c6ff" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.95)",
                  borderRadius: 12,
                  border: "1px solid rgba(148, 163, 184, 0.15)",
                  color: "white",
                }}
                labelStyle={{ color: "#94a3b8" }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Area type="monotone" dataKey="price" stroke="#6c63ff" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="mt-8 text-sm text-slate-500">
          Select a deal to visualize its price timeline.
        </p>
      )}
    </div>
  );
}
