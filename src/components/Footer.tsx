import React from "react";
import Link from "next/link";
import { Package, Camera, Globe, X, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-24 pb-12 text-slate-600 overflow-hidden relative border-t border-slate-200">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
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
            <p className="text-slate-500 leading-relaxed max-w-xs font-medium">
              Premium airtight food storage solutions for a more organized, sustainable, and modern kitchen.
            </p>
            <div className="flex gap-4">
              {[Camera, Globe, X].map((Icon, i) => (
                <a key={i} href="#" className="p-3 bg-white hover:bg-slate-900 hover:text-white rounded-2xl border border-slate-200 transition-all active:scale-90 shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
             <h4 className="text-slate-900 font-black font-display uppercase tracking-widest text-xs">Shop</h4>
             <ul className="space-y-4">
               {["Glass Containers", "Plastic Storage", "Lunch Boxes", "Kitchen Sets"].map((item) => (
                 <li key={item} className="font-medium text-sm">
                   <Link href="/products" className="hover:text-emerald-600 transition-colors">{item}</Link>
                 </li>
               ))}
             </ul>
          </div>


          <div className="space-y-6">
             <h4 className="text-slate-900 font-black font-display uppercase tracking-widest text-xs">Company</h4>
             <ul className="space-y-4">
               {["Our Story", "Sustainability", "Terms of Service", "Privacy Policy"].map((item) => (
                 <li key={item} className="font-medium text-sm">
                   <a href="#" className="hover:text-emerald-600 transition-colors">{item}</a>
                 </li>
               ))}
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="text-slate-900 font-black font-display uppercase tracking-widest text-xs">Contact</h4>
             <ul className="space-y-4 font-medium text-sm">
                <li className="flex items-start gap-4">
                   <Mail className="w-5 h-5 text-emerald-600" />
                   <span className="text-slate-600">hello@freshkeep.com</span>
                </li>
                <li className="flex items-start gap-4">
                   <Phone className="w-5 h-5 text-emerald-500" />
                   <span>+92 300 6676035</span>
                </li>
                <li className="flex items-start gap-4">
                   <MapPin className="w-5 h-5 text-emerald-500" />
                   <span>Faisalabad, Pakistan</span>
                </li>
             </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
           <p>&copy; 2024 FreshKeep. All rights reserved.</p>
           <div className="flex gap-8">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Legal</a>
           </div>
        </div>
      </div>
    </footer>
  );
};
