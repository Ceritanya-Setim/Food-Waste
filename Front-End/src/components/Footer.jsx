import React from 'react';
import { LeafIcon } from "./Icons"; 

export default function Footer() {
  return (
    <footer className="mt-6 w-full bg-white border-t border-slate-100">
      
      <div className="w-full px-[4%] pt-8 pb-8 flex flex-col gap-10">

        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
        <div className="flex flex-col gap-3 max-w-sm">
          <div className="flex items-center gap-3">
            
            <div className="w-9 h-9 rounded-[0.8rem] grid place-items-center bg-green-600 text-white shrink-0">
              <LeafIcon />
            </div>
            
            <div>
              <div className="font-bold text-slate-900 text-lg leading-tight">FoodSave</div>
              <div className="text-xs text-slate-400 font-medium">Business Portal</div>
            </div>
          </div>
          <p className="text-slate-500 text-[0.9rem] leading-relaxed mt-1">
            Platform manajemen bisnis untuk restoran yang peduli lingkungan
          </p>
        </div>

          {/* WRAAPPER BARU: Membungkus 3 kolom agar otomatis terdorong ke kanan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16">
            
            {/* Kolom Resources */}
            <div className="flex flex-col gap-2.5">
              <h4 className="font-bold text-slate-900 text-[0.95rem] mb-1">Resources</h4>
              {['Panduan Memulai', 'Best Practices', 'API Documentation', 'Video Tutorial'].map((l) => (
                <a key={l} href="#" className="text-slate-500 text-[0.9rem] no-underline transition-colors duration-150 hover:text-green-600">
                  {l}
                </a>
              ))}
            </div>

            {/* Kolom Support */}
            <div className="flex flex-col gap-2.5">
              <h4 className="font-bold text-slate-900 text-[0.95rem] mb-1">Support</h4>
              {['Help Center', 'Contact Support', 'Partner Success', 'Community Forum'].map((l) => (
                <a key={l} href="#" className="text-slate-500 text-[0.9rem] no-underline transition-colors duration-150 hover:text-green-600">
                  {l}
                </a>
              ))}
            </div>

            {/* Kolom Legal */}
            <div className="flex flex-col gap-2.5">
              <h4 className="font-bold text-slate-900 text-[0.95rem] mb-1">Legal</h4>
              {['Terms of Service', 'Privacy Policy', 'Partner Agreement', 'Cookie Policy'].map((l) => (
                <a key={l} href="#" className="text-slate-500 text-[0.9rem] no-underline transition-colors duration-150 hover:text-green-600">
                  {l}
                </a>
              ))}
            </div>

          </div> {/* Batas akhir wrapper baru */}
        </div>

        {/* 3. Bottom Section Copyright */}
        <div className="pt-6 border-t border-slate-100 flex justify-center text-center">
          <div className="text-slate-400 text-sm">© 2024 FoodSave Business. All rights reserved.</div>
        </div>

      </div>
    </footer>
  );
}