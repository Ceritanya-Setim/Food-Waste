import { LeafIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="mt-20 bg-white border-t border-gray-100">
      <div className="max-w-[1120px] mx-auto pt-12 px-6 pb-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white grid place-items-center">
                <LeafIcon />
              </div>
              <div>
                <div className="font-extrabold text-slate-900 leading-tight">FoodSave</div>
                <div className="text-sm text-slate-400">Business Portal</div>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Platform manajemen bisnis untuk restoran yang peduli lingkungan
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-extrabold text-slate-900 mb-3">Resources</h4>
            {['Panduan Memulai', 'Best Practices', 'API Documentation', 'Video Tutorial'].map((l) => (
              <a key={l} href="#" className="text-slate-500 text-sm hover:text-green-600 transition">
                {l}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-extrabold text-slate-900 mb-3">Support</h4>
            {['Help Center', 'Contact Support', 'Partner Success', 'Community Forum'].map((l) => (
              <a key={l} href="#" className="text-slate-500 text-sm hover:text-green-600 transition">
                {l}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-extrabold text-slate-900 mb-3">Legal</h4>
            {['Terms of Service', 'Privacy Policy', 'Partner Agreement', 'Cookie Policy'].map((l) => (
              <a key={l} href="#" className="text-slate-500 text-sm hover:text-green-600 transition">
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-400">© 2024 FoodSave Business. All rights reserved.</div>
          <div className="flex gap-4 flex-wrap text-sm text-slate-400">
            {['Settings', 'Notifications', 'Reports'].map((l) => (
              <a key={l} href="#" className="text-slate-500 text-sm hover:text-green-600 transition">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border-t border-gray-100 py-4">
        <div className="max-w-[1120px] mx-auto px-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">PLATFORM STATUS</div>
            <div className="text-lg font-extrabold text-slate-900">All Systems Operational</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">TOTAL PARTNERS</div>
            <div className="text-lg font-extrabold text-slate-900">2,450+ Restoran</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">FOOD SAVED</div>
            <div className="text-lg font-extrabold text-slate-900">45,000+ Porsi</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
