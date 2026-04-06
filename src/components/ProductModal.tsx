"use client";

import React from "react";
import Image from "next/image";
import { X, MessageCircle, Star, ShieldCheck, Zap, Thermometer, CheckCircle } from "lucide-react";
import { Product } from "@/data/products";
import { generateWhatsAppLink } from "@/utils/whatsapp";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  if (!product || !isOpen) return null;

  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";
  const productUrl = `${currentOrigin}/products/${product.slug}`;
  const whatsappLink = generateWhatsAppLink(product.name, product.price, productUrl);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in group pointer-events-auto max-h-[90vh] overflow-y-auto md:overflow-visible">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed md:absolute top-6 right-6 z-[110] p-3 bg-white/80 md:bg-white/10 backdrop-blur-md md:backdrop-blur-none hover:bg-white text-slate-400 hover:text-slate-900 rounded-full transition-all border border-slate-100 shadow-xl active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-1/2 relative bg-slate-50 min-h-[400px] md:min-h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent md:hidden" />
          <div className="absolute top-6 left-6 px-4 py-2 bg-emerald-600 rounded-full text-white text-xs font-bold uppercase tracking-widest">
            {product.category}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto max-h-[80vh]">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 leading-tight mb-4">
              {product.name}
            </h2>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-500">(120+ Verifed Reviews)</span>
            </div>

            <div className="text-4xl font-black text-emerald-600 font-display mb-8">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-700">BPA Free</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Zap className="w-6 h-6 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-700">Airtight Seal</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Thermometer className="w-6 h-6 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-700">Heat Resistant</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-700">Best Quality</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-3xl transition-all shadow-xl shadow-emerald-100 hover:shadow-emerald-200 hover:-translate-y-1 active:scale-95"
            >
              <MessageCircle className="w-6 h-6" />
              Order on WhatsApp
            </a>
            <p className="text-center text-slate-400 text-xs mt-4 font-medium italic">
              Order now and get 10% discount on first purchase!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
