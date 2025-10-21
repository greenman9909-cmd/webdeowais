"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Deal = {
  id: number;
  name: string;
  price: number;
  discount: number;
  originalPrice: number;
  image: string;
  url: string;
};

type WishlistContextValue = {
  items: Deal[];
  addItem: (deal: Deal) => void;
  removeItem: (id: number) => void;
  isSaved: (id: number) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "webdeowais-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Deal[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Deal[];
        setItems(parsed);
      } catch (error) {
        console.error("Failed to parse wishlist", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => ({
    items,
    addItem: (deal: Deal) =>
      setItems((prev) => {
        if (prev.some((item) => item.id === deal.id)) return prev;
        return [...prev, deal];
      }),
    removeItem: (id: number) =>
      setItems((prev) => prev.filter((item) => item.id !== id)),
    isSaved: (id: number) => items.some((item) => item.id === id),
  }), [items]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
