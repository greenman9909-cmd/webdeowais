"use client";

import useSWR from "swr";
import axios from "axios";
import { calculateOriginalPrice } from "./format";
import type { Deal } from "@/components/wishlist-context";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useDeals() {
  const { data, error, isLoading, mutate } = useSWR<Deal[]>("/api/deals", fetcher, {
    refreshInterval: 1000 * 60 * 5,
    revalidateOnFocus: true,
  });

  const deals = (data ?? []).map((item) => ({
    ...item,
    originalPrice: item.originalPrice ?? calculateOriginalPrice(item.price, item.discount),
  }));

  return {
    deals,
    error,
    isLoading,
    refresh: mutate,
  } as const;
}
