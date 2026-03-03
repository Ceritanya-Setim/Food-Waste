import React from "react";
import { Leaf, User, LogOut } from 'lucide-react';
export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-black p-2 rounded-xl">
            <Leaf className="text-white" size={20} fill="currentColor" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-xl tracking-tight">FoodSave</span>
            <span className="text-[10px] text-slate-500">Simpan makanan, hemat uang</span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex gap-4 items-center">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <User className="text-slate-600" size={22} />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <LogOut className="text-slate-600" size={22} />
          </button>
        </div>
      </div>
    </nav>
  )
}