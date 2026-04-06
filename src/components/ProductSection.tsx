"use client";

import React, { useState, useMemo } from "react";
import { products, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { Search, X, PackageOpen, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const categories = ["all", "glass", "plastic", "sets", "specialty"];

interface ProductSectionProps {
  limit?: number;
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  initialCategory?: string;
  initialSearchQuery?: string;
  customProducts?: Product[];
}

export const ProductSection = ({ 
  limit, 
  title = "Our Collection.", 
  subtitle = "Discover the perfect blend of form and functionality with our premium food storage systems.",
  showFilters = true,
  initialCategory = "all",
  initialSearchQuery = "",
  customProducts
}: ProductSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = (customProducts || products).filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });


    if (limit && result.length > limit) {
      return result.slice(0, limit);
    }
    return result;
  }, [selectedCategory, searchQuery, limit]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section id="products" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-white pointer-events-none" />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-emerald-100 blur-[200px] rounded-full" />
        <div className="absolute top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-teal-100 blur-[200px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 leading-tight">
              {title.split(".")[0]} <span className="text-gradient">{title.split(".")[1] || "."}</span>
            </h2>
            <p className="text-slate-500 text-lg">
              {subtitle}
            </p>
          </div>

          {showFilters && (
            <div className="flex flex-col gap-4 w-full md:w-auto">
              {/* Search Input */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 w-full md:w-[350px] bg-white border border-slate-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-slate-100"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category selection */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
                      selectedCategory === category
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 -translate-y-0.5"
                        : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
            
            {limit && products.length > limit && (
              <div className="mt-20 text-center">
                <Link 
                  href="/products" 
                  className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-[2rem] transition-all shadow-2xl shadow-slate-200 hover:-translate-y-1 active:scale-95 group"
                >
                  View All Products
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-100 animate-fade-in">
            <PackageOpen className="w-16 h-16 text-slate-200 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No products found.</h3>
            <p className="text-slate-500 max-w-sm">
              We couldn't find any products matching your search criteria. Try a different category or search term.
            </p>
            <button
               onClick={() => {setSearchQuery(""); setSelectedCategory("all")}}
               className="mt-8 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

