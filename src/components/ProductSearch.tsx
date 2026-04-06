"use client";

import React, { useState, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const ProductSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const term = searchParams.get("search") || "";
    setQuery(term);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/products");
    }
    setTimeout(() => setIsSearching(false), 500);
  };

  const clearSearch = () => {
    setQuery("");
    router.push("/products");
  };

  return (
    <div className="max-w-xl mx-auto mt-12 relative group">
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          )}
        </div>
        <input
          type="text"
          placeholder="Search for premium containers, sets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-16 pr-24 py-6 bg-white border border-slate-200 rounded-[2rem] text-lg font-medium text-slate-900 focus:outline-none focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all shadow-xl shadow-slate-100 group-hover:shadow-2xl group-hover:shadow-slate-200/50"
        />
        <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2">
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="submit"
            className="px-4 md:px-6 py-2.5 md:py-3 bg-slate-900 text-white text-xs md:text-sm font-bold rounded-xl md:rounded-2xl hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
          >
            <span className="hidden md:inline">Search</span>
            <Search className="w-4 h-4 md:hidden" />
          </button>
        </div>
      </form>
    </div>
  );
};
