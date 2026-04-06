"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-slate-50 rounded-[2.5rem] overflow-hidden group border border-slate-100 shadow-sm">
        <Image
          src={images[currentIndex]}
          alt={`${name} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-slate-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-slate-800" />
            </button>
          </>
        )}

        {/* Progress Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-emerald-600 shadow-lg shadow-emerald-200" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? "border-emerald-500 ring-4 ring-emerald-50" 
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
