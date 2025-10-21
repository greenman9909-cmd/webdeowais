"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { DealList } from "@/components/deal-list";
import { Wishlist } from "@/components/wishlist";
import { AiInsights } from "@/components/ai-insights";
import type { Deal } from "@/components/wishlist-context";

export default function HomePage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  return (
    <div className="space-y-10">
      <Hero />
      <DealList selected={selectedDeal} onSelect={setSelectedDeal} />
      <Wishlist />
      <AiInsights deal={selectedDeal} />
    </div>
  );
}
