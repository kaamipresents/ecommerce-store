"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto glass-emerald p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden group shadow-[0_32px_64px_-16px_rgba(16,185,129,0.08)] border-emerald-100/50">
        {/* Subtle decorative glows */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-emerald-200/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-teal-200/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-10">
           <div className="inline-flex p-4 md:p-5 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-emerald-100 mb-2 animate-bounce duration-[3000ms]">
              <Send className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
           </div>
           
           <div className="space-y-4">
             <h2 className="text-3xl md:text-7xl font-display font-black text-slate-900 leading-[1.1] tracking-tight">
               Join the <span className="text-gradient">FreshKeep</span> Society.
             </h2>
             
             <p className="text-slate-600 text-base md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
               Subscribe for exclusive offers, advanced storage techniques, and a 10% discount code delivered instantly.
             </p>
           </div>

           <form 
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto bg-white p-2 md:p-3 rounded-2xl md:rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100 transition-all focus-within:border-emerald-500/50 focus-within:shadow-emerald-100/50"
            >
              <input
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
              />
              <button
                type="submit"
                disabled={isSubscribed}
                className={cn(
                  "px-8 md:px-10 py-4 font-black rounded-xl md:rounded-[2rem] transition-all flex items-center justify-center gap-3 text-white overflow-hidden relative",
                  isSubscribed ? "bg-emerald-500" : "bg-slate-900 hover:bg-emerald-600 hover:scale-[1.02] active:scale-95"
                )}
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="w-5 h-5 animate-bounce" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe Now</span>
                )}
              </button>
           </form>

           <p className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">
             Privacy guaranteed. No spam, only freshness.
           </p>
        </div>
      </div>
    </section>
  );
};
