import React, { use } from "react";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Metadata } from "next";
import { products } from "@/data/products";
import { ProductGallery } from "@/components/ProductGallery";
import { Star, ShieldCheck, Zap, Thermometer, CheckCircle, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { generateWhatsAppLink } from "@/utils/whatsapp";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} - FreshKeep Kitchen`,
    description: product.description,
    openGraph: {
      images: [{ url: product.image }],
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Get dynamic URL on server
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const fullUrl = `${protocol}://${host}/products/${product.slug}`;

  const whatsappLink = generateWhatsAppLink(product.name, product.price, fullUrl);

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/#products" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium mb-12 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Shop
        </Link>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Gallery */}
          <div className="md:sticky md:top-32">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Right: Info */}
          <div className="flex flex-col animate-fade-in">
            <div className="mb-4">
              <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-200">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl lg:text-7xl font-display font-bold text-slate-900 leading-tight mb-6">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-lg font-medium text-slate-500">(120+ Verified Reviews)</span>
            </div>

            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-5xl font-black text-emerald-600 font-display">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xl text-slate-400 line-through font-medium">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            </div>

            <div className="prose prose-slate prose-lg max-w-none mb-12">
              <p className="text-slate-600 leading-relaxed text-xl">
                {product.description}
              </p>
            </div>

            {/* Premium Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <div className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-emerald-100 hover:bg-emerald-50/10 active:scale-[0.98]">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-2xl">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">BPA Free</h3>
                  <p className="text-xs text-slate-500 font-medium">Safe for your family</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-emerald-100 hover:bg-emerald-50/10 active:scale-[0.98]">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-2xl">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Airtight Seal</h3>
                  <p className="text-xs text-slate-500 font-medium">Keeps food fresher</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-emerald-100 hover:bg-emerald-50/10 active:scale-[0.98]">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-2xl">
                  <Thermometer className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Heat Resistant</h3>
                  <p className="text-xs text-slate-500 font-medium">Oven & freezer safe</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-emerald-100 hover:bg-emerald-50/10 active:scale-[0.98]">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-2xl">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Best Quality</h3>
                  <p className="text-xs text-slate-500 font-medium">Top-tier materials</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="sticky bottom-6 md:static z-[40]">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white text-2xl font-bold rounded-[2rem] transition-all shadow-2xl shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-1 active:scale-95 duration-300 group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                Order via WhatsApp
              </a>
              <div className="text-center mt-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm font-semibold border border-amber-100 animate-pulse">
                  🔥 Order now and get 10% discount!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


