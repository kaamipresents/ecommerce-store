import React from "react";
import { ShieldCheck, Wind, Recycle, Truck, Snowflake, Zap, Timer, Trash2 } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% BPA Free",
    desc: "Safe & certified materials",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Wind,
    title: "Oxygen Guard",
    desc: "Locks in ultimate freshness",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Recycle,
    title: "Eco-Conscious",
    desc: "Sustainable, reusable design",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Truck,
    title: "Standard Shipping",
    desc: "Reliable delivery to you",
    color: "bg-indigo-50 text-indigo-600",
  },
];

export const FeaturesBar = () => {
  return (
    <section id="features" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, i) => (
            <div 
              key={feature.title} 
              className="group flex flex-col items-center md:items-start text-center md:text-left gap-6 p-4 rounded-[2rem] hover:bg-slate-50 transition-colors duration-500"
            >
              <div className={`p-5 rounded-[1.8rem] ${feature.color} border border-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-black font-display text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="mt-16 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
      </div>
    </section>
  );
};
