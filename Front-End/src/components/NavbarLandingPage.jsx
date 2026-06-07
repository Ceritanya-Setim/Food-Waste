import React from 'react';
import { LeafIcon } from './Icons';

import { useNavigate } from 'react-router-dom';

export default function NavbarLandingPage() {
  const navigate = useNavigate();
  const navLinks = ['How it Works', 'Impact', 'Partner with Us', 'Mission'];
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl grid place-items-center bg-[#10B981] text-white shadow-inner">
            <LeafIcon size={22} />
          </div>
          <span className="font-extrabold text-2xl text-slate-950 tracking-tight">FoodSave</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm font-medium text-slate-700">
          {navLinks.map((item) => (
            <a key={item} href="#" className="hover:text-[#0B7231] transition">{item}</a>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-semibold text-slate-700 hover:text-[#0B7231] transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#0B7231] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-green-800 transition shadow-sm"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}