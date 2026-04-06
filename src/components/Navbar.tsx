"use client";

import React, { useState, useEffect } from "react";
import { Package, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Features", href: "/#features" },
    { name: "About", href: "/#about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8",
        isScrolled
          ? "bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] py-3 border-b border-slate-100"
          : "bg-white md:bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <img 
              src="/logo.png" 
              alt="FreshKeep Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            FreshKeep
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 transition-all duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center px-8 py-3 bg-slate-900 hover:bg-emerald-600 text-white text-sm font-bold rounded-2xl transition-all shadow-xl shadow-slate-100 hover:-translate-y-0.5 active:scale-95"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white/98 backdrop-blur-2xl z-[100] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col",
          isMobileMenuOpen 
            ? "translate-y-0 opacity-100 visible" 
            : "-translate-y-full opacity-0 invisible"
        )}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
             <div className="relative w-8 h-8 overflow-hidden rounded-lg">
               <img 
                 src="/logo.png" 
                 alt="FreshKeep Logo" 
                 className="w-full h-full object-cover"
               />
             </div>
             <span className="text-xl font-black text-slate-900 font-display">FreshKeep</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 gap-8 overflow-y-auto py-12">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ transitionDelay: `${idx * 100}ms` }}
              className={cn(
                "text-4xl font-black tracking-tight text-slate-900 hover:text-emerald-600 transition-all duration-300 transform",
                isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className={cn(
            "pt-10 border-t border-slate-100 transition-all duration-500 delay-500 transform",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-6">Ready to preserve?</p>
            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group inline-flex items-center justify-between w-full p-6 bg-slate-900 hover:bg-emerald-600 text-white rounded-[2.5rem] transition-all shadow-2xl shadow-slate-200 active:scale-95 overflow-hidden relative"
            >
              <div className="relative z-10">
                <p className="text-2xl font-black">Shop Now</p>
                <p className="text-white/60 text-sm font-medium">Explore the collection</p>
              </div>
              <div className="relative z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Package className="w-6 h-6" />
              </div>
              
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-emerald-500/20 to-transparent group-hover:from-white/10 transition-colors" />
            </Link>
          </div>
        </div>
        
        <div className="p-8 border-t border-slate-50">
           <p className="text-slate-400 font-medium text-sm text-center">
             Premium Preservation Systems. © 2024 FreshKeep.
           </p>
        </div>
      </div>
    </nav>
  );
};

