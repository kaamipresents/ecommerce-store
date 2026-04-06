"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { generateWhatsAppLink } from "@/utils/whatsapp";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";
  const productUrl = `${currentOrigin}/products/${product.slug}`;
  const whatsappLink = generateWhatsAppLink(product.name, product.price, productUrl);

  return (
    <div className="group bg-white rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.1)] border border-slate-100 flex flex-col h-full animate-fade-in relative overflow-hidden">
      {/* Badge */}
      <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-600 shadow-sm border border-emerald-50">
        {product.category}
      </div>

      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 mb-6 group-hover:scale-[1.02] transition-transform duration-700 block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="p-4 bg-white text-emerald-600 rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl hover:bg-emerald-600 hover:text-white"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 px-2 pb-2">
        <div className="flex justify-between items-start gap-4 mb-3">
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-display font-black text-slate-900 leading-tight text-lg hover:text-emerald-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="text-xl font-black text-emerald-600 font-display whitespace-nowrap">
            ${product.price}
          </span>
        </div>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">
          {product.description}
        </p>

        {/* Action Button */}
        <div className="mt-auto">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-emerald-200 hover:-translate-y-1 active:scale-95 duration-300"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

