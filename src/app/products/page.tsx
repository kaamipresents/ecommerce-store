import React, { Suspense } from "react";
import { ProductSection } from "@/components/ProductSection";
import { ProductSearch } from "@/components/ProductSearch";

export const metadata = {
  title: "All Products | FreshKeep Kitchen",
  description: "Browse our entire collection of premium food storage solutions. High-quality glass, plastic, and specialty containers.",
};

type SearchParams = { search?: string };

async function ProductsContent({ searchParamsPromise }: { searchParamsPromise: Promise<SearchParams> }) {
  const searchParams = await searchParamsPromise;
  const categories = ["glass", "plastic", "sets", "specialty"];
  const search = searchParams?.search || "";

  if (search) {
    return (
      <ProductSection 
        title="Search.Results"
        subtitle={`Showing results for "${search}"`}
        showFilters={false}
        initialCategory="all"
        initialSearchQuery={search}
      />
    );
  }

  return (
    <>
      {categories.map((category) => (
        <ProductSection 
          key={category}
          title={`${category.charAt(0).toUpperCase() + category.slice(1)}.Collection`}
          subtitle={`Explore our premium range of ${category} food storage solutions.`}
          showFilters={false}
          initialCategory={category}
        />
      ))}
    </>
  );
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const isSearchActive = !!search;

  return (
    <main className="min-h-screen pt-24 bg-slate-50">
      <div className="bg-white border-b border-slate-100 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {!isSearchActive && (
            <>
              <h1 className="text-4xl md:text-8xl font-display font-black text-slate-900 mb-6 tracking-tight">
                Our Entire <span className="text-gradient">Collection.</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium">
                Explore our curated range of premium kitchen storage solutions, designed for the modern home.
              </p>
            </>
          )}
          
          <Suspense fallback={<div className="h-20 w-full max-w-xl mx-auto mt-12 bg-slate-50 animate-pulse rounded-[2rem]" />}>
            <ProductSearch />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<div className="py-20 text-center">Loading collection...</div>}>
        <ProductsContent searchParamsPromise={searchParams} />
      </Suspense>

    </main>
  );
}
