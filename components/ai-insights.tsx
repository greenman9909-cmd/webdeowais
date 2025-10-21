"use client";

import useSWR from "swr";
import axios from "axios";
import { Sparkles, Loader2 } from "lucide-react";
import { Deal } from "./wishlist-context";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type Props = {
  deal: Deal | null;
};

export function AiInsights({ deal }: Props) {
  const { data, error, isLoading, mutate } = useSWR(
    () => (deal ? `/api/insights?appId=${deal.id}&title=${encodeURIComponent(deal.name)}` : null),
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <section className="mx-auto mt-16 max-w-6xl px-6">
      <div className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-slate-100">
              <Sparkles size={20} className="text-accent" /> AI Insights
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Summaries powered by GPT, condensing recent Steam reviews.
            </p>
          </div>
          {deal && (
            <button
              onClick={() => mutate()}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 transition hover:border-secondary hover:text-secondary"
            >
              Refresh insight
            </button>
          )}
        </div>
        {!deal && (
          <p className="mt-6 text-sm text-slate-500">
            Pick a game from the deals list to generate a tailored review summary.
          </p>
        )}
        {deal && (
          <div className="mt-6">
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Loader2 className="h-4 w-4 animate-spin" />
                Asking GPT for fresh insights...
              </div>
            )}
            {error && (
              <p className="text-sm text-red-400">
                Unable to fetch insights right now. Add an OPENAI_API_KEY to enable this feature.
              </p>
            )}
            {data && (
              <p className="whitespace-pre-line rounded-2xl border border-white/5 bg-slate-900/70 p-4 text-sm leading-relaxed text-slate-200">
                {data.summary}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
