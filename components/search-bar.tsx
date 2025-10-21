"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="glass-panel flex items-center gap-3 rounded-xl px-5 py-3">
      <Search className="text-secondary" size={18} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search games or filter by discount..."
        className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
        aria-label="Search games"
      />
    </div>
  );
}
