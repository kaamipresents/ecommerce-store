import React from "react";
import Image from "next/image";
import { Clock, Thermometer, Box, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Happy Customers", value: "50k+" },
  { label: "Countries Served", value: "25+" },
  { label: "Product Varieties", value: "120+" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative group animate-fade-in delay-200">
             {/* Decorative elements */}
             <div className="absolute top-10 left-10 w-full h-full bg-emerald-100 rounded-[4rem] group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700 pointer-events-none" />
             <div className="relative rounded-[4rem] overflow-hidden shadow-2xl z-10">
                <Image
                  src="https://images.unsplash.com/photo-1556911220-e15595ff9f86?q=80&w=1200&auto=format&fit=crop"
                  alt="Healthy Lifestyle"
                  width={600}
                  height={800}
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
             </div>

              {/* Stat overlap */}
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl z-20 animate-bounce duration-[5000ms]">
                 <div className="flex gap-4 md:gap-8">
                   {stats.map((stat) => (
                     <div key={stat.label}>
                        <p className="text-xl md:text-3xl font-black text-emerald-600 font-display">{stat.value}</p>
                        <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                     </div>
                   ))}
                 </div>
              </div>
          </div>

          <div className="order-1 lg:order-2 space-y-12 animate-fade-in">
             <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 leading-tight">
                  The Science of <span className="text-gradient">Freshness.</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  We don't just make containers; we engineer time. Our mission is to reduce food waste and enhance your culinary experience through advanced preservation technology.
                </p>
             </div>

             <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                   <div className="p-4 bg-emerald-50 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Clock className="w-8 h-8" strokeWidth={1.5} />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold font-display text-slate-900 mb-2">3X Preservation</h3>
                      <p className="text-slate-500">Our patented airtight technology keeps organic materials fresh up to 3 times longer than industry standards.</p>
                   </div>
                </div>

                <div className="flex items-start gap-6 group">
                   <div className="p-4 bg-emerald-50 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Thermometer className="w-8 h-8" strokeWidth={1.5} />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Extreme Durability</h3>
                      <p className="text-slate-500">From the freezer to the oven, our borosilicate glass can handle the heat. Tested for thermal shock resistance.</p>
                   </div>
                </div>

                <div className="flex items-start gap-6 group">
                   <div className="p-4 bg-emerald-50 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Box className="w-8 h-8" strokeWidth={1.5} />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Nesting Design</h3>
                      <p className="text-slate-500">Save up to 40% more space in your kitchen. Our sets are designed to stack and nest perfectly within each other.</p>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-4 text-emerald-600 font-bold">
                <CheckCircle2 className="w-6 h-6" />
                <span>Certified for Safety (BPA, FDA, LFGB Approved)</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
