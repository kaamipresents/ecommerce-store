import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Hero = () => {
  return (
    <section 
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 overflow-hidden bg-slate-50"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fade-in">
            <h1 className="text-5xl md:text-8xl font-black font-display leading-[0.95] text-slate-900 tracking-tight mt-8 md:mt-12">
              Keep Food <br />
              <span className="text-gradient">Fresher, Longer.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-600 max-w-xl leading-relaxed font-medium">
              Experience the perfect blend of innovation and elegance. Our vacuum-sealed containers preserve taste and nutrients, transforming your kitchen.
            </p>

            <div className="flex flex-row gap-3 pt-4">
              <Link
                href="#products"
                className="group flex items-center justify-center gap-2 px-4 md:px-10 py-4 md:py-5 bg-slate-900 hover:bg-emerald-600 text-white text-xs md:text-base font-bold rounded-2xl transition-all shadow-2xl shadow-slate-200 hover:-translate-y-1 active:scale-95 whitespace-nowrap"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="flex items-center justify-center gap-2 px-4 md:px-10 py-4 md:py-5 bg-white hover:bg-slate-50 text-slate-900 text-xs md:text-base font-bold rounded-2xl transition-all border border-slate-200 shadow-sm active:scale-95 whitespace-nowrap"
              >
                Explore Features
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-10 border-t border-slate-200/60 max-w-md">
              <div className="flex -space-x-3 md:-space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white overflow-hidden bg-slate-200 shadow-sm">
                    <img 
                      src={`https://i.pravatar.cc/100?u=${i+10}`} 
                      alt="User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="text-slate-900 font-black text-base">4.9/5 Rating</p>
                <p className="text-slate-500 font-medium tracking-tight">from 15k+ happy customers</p>
              </div>
            </div>
          </div>

          {/* Premium Product Showcase */}
          <div className="relative group animate-fade-in delay-200 mt-12 lg:mt-0">
            <div className="relative z-10 p-3 md:p-4 bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 transform transition-all duration-700 hover:scale-[1.02]">
              <div className="overflow-hidden rounded-[1.8rem] md:rounded-[3.2rem]">
                <Image
                  src="/images/hero.png"
                  alt="Premium Vacuum Food Storage"
                  width={800}
                  height={1000}
                  priority
                  className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 p-4 md:p-8 glass-emerald rounded-[2rem] md:rounded-[2.5rem] shadow-xl animate-bounce duration-[4000ms] border-white/50 backdrop-blur-xl">
                 <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-white rounded-xl md:rounded-2xl shadow-sm text-emerald-600">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="text-emerald-900 font-black leading-tight text-sm md:text-lg">100% Airtight</p>
                      <p className="text-emerald-700/70 text-[10px] md:text-sm font-bold uppercase tracking-wider">Nutrient Lock</p>
                    </div>
                 </div>
              </div>

              {/* Secondary Badge */}
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 p-4 md:p-6 glass rounded-[1.5rem] md:rounded-[2rem] shadow-lg animate-pulse">
                <p className="text-slate-900 font-black text-lg md:text-2xl font-display uppercase">BPA FREE</p>
              </div>
            </div>

            {/* Background Accent Lines */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] md:w-[140%] h-[130%] md:h-[140%] border border-emerald-500/10 rounded-full pointer-events-none" />
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] md:w-[120%] h-[110%] md:h-[120%] border border-teal-500/5 rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
