import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── ICONS ──────────────────────────────────────────────
const CheckIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
    <polyline points="2,6 5,9 10,3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.34L5.71 21l1-1C7.38 19.33 8 19 9 19c2 0 4-2 6-2s3.5 1 3.5 1L21 14c0-6-4-6-4-6z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const BagIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const StoreIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

// ── COMPONENT ──────────────────────────────────────────
export const PickRole = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleRoute = () => {
    if (!selected) return;
    if (selected === "merchant") {
      navigate("/MerchantDashboard");
    } else {
      navigate("/ConsumerDashboard");
    }
  };

  return (
    // min-h-screen = tinggi minimal 100vh
    // flex flex-col = susun navbar, konten, footer secara vertikal
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-white font-sans">

      {/* ── NAVBAR ── */}
      {/* sticky top-0 = navbar ikut scroll tapi tetap di atas */}
      {/* z-50         = navbar selalu di lapisan paling atas   */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 h-16 bg-white border-b border-gray-100 shadow-sm">

        {/* Brand kiri */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <LeafIcon />
          </div>
          <span className="text-[17px] font-bold text-gray-900 tracking-tight">FoodSave</span>
        </div>

        {/* Link tengah */}
        <div className="flex items-center gap-1">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
            Dashboard
          </button>
          {/* bg-green-500 text-white = tombol aktif */}
          <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 text-white">
            Explore
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
            Impact
          </button>
        </div>

        {/* Aksi kanan */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-green-400 hover:bg-green-50 transition">
            <CartIcon />
          </button>
          <button className="w-9 h-9 rounded-xl bg-gray-200 text-gray-600 text-xs font-bold border-none">
            DB
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      {/* flex-1 = ambil sisa tinggi halaman */}
      <div className="flex-1 flex flex-col items-center px-6 py-16">

        {/* Header teks */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Select your Role
          </h2>
          <p className="text-base text-slate-500">
            Pilih peran Anda untuk mulai perjalanan mengurangi food waste
          </p>
        </div>

        {/* Grid kartu — 2 kolom di desktop, 1 kolom di mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full max-w-3xl mb-12">

          {/* ── Card Pembeli ── */}
          <div
            onClick={() => setSelected("consumer")}
            className={`bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200
              border-2 shadow-sm hover:shadow-xl hover:-translate-y-0.5
              ${selected === "consumer"
                ? "border-green-500 shadow-green-100"
                : "border-transparent"
              }`}
          >
            {/* Gambar */}
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/2000117676/photo/here-try-some-tacos-are-super-tasty.jpg?s=612x612&w=0&k=20&c=cPSqg040qMkg5uYiKUhqg7QJkwwNR9_ZYbnzlZ2-rF8="
                alt="Pembeli"
                className="w-full h-full object-cover"
              />
              {/* Badge ikon pojok kanan atas */}
              <div className="absolute top-3.5 right-3.5 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md text-gray-600">
                <BagIcon />
              </div>
            </div>

            {/* Konten kartu */}
            <div className="p-7">
              <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">Pembeli</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                Dapatkan makanan berkualitas dengan harga hemat dan bantu kurangi pemborosan makanan
              </p>

              {/* Fitur list */}
              <ul className="space-y-2.5 mb-7">
                {["Hemat hingga 70%", "Pickup mudah & cepat", "Makanan berkualitas"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                    {/* Lingkaran centang hijau */}
                    <span className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { setSelected('consumer'); localStorage.setItem('userRole', 'consumer'); navigate('/ExploreConsumer'); }}
                className={`w-full py-3.5 rounded-xl text-sm font-bold border transition
                  ${selected === "consumer"
                    ? "bg-green-50 border-green-500 text-green-700"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-green-50 hover:border-green-200"
                  }`}
              >
                Pilih sebagai Pembeli
              </button>
            </div>
          </div>

          {/* ── Card Restaurant ── */}
          <div
            onClick={() => setSelected("merchant")}
            className={`bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200
              border-2 shadow-sm hover:shadow-xl hover:-translate-y-0.5
              ${selected === "merchant"
                ? "border-green-500 shadow-green-100"
                : "border-transparent"
              }`}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://idebiz.id/wp-content/uploads/2023/09/Pelatihan-Chef-Kunci-Sukses-Kuliner.jpg"
                alt="Restaurant"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3.5 right-3.5 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md text-gray-600">
                <StoreIcon />
              </div>
            </div>

            <div className="p-7">
              <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">Restaurant</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                Jual makanan surplus dan kurangi kerugian sambil berkontribusi untuk lingkungan
              </p>

              <ul className="space-y-2.5 mb-7">
                {["Kurangi food waste", "Dapatkan income tambahan", "Dashboard analytics lengkap"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                    <span className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { setSelected('merchant'); localStorage.setItem('userRole', 'merchant'); navigate('/ExploreMerchant'); }}
                className={`w-full py-3.5 rounded-xl text-sm font-bold border transition
                  ${selected === "merchant"
                    ? "bg-green-50 border-green-500 text-green-700"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-green-50 hover:border-green-200"
                  }`}
              >
                Pilih sebagai Restaurant
              </button>
            </div>
          </div>

        </div>

        {/* Tombol Lanjutkan */}
        <button
          onClick={handleRoute}
          disabled={!selected}
          className={`flex items-center gap-2 px-14 py-4 rounded-xl text-base font-bold transition-all duration-200
            ${selected
              ? "bg-green-500 text-white shadow-lg shadow-green-200 hover:bg-green-600 hover:-translate-y-0.5"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Lanjutkan <span>→</span>
        </button>
      </div>

      {/* ── SITE FOOTER ── */}
      <footer className="flex items-center justify-between px-12 py-5 bg-white border-t border-gray-100">
        <p className="text-xs text-gray-400">© 2024 FoodSave. Semua Hak Dilindungi.</p>
        <div className="flex gap-6">
          <a className="text-xs text-gray-500 hover:text-green-500 cursor-pointer transition">Kebijakan Privasi</a>
          <a className="text-xs text-gray-500 hover:text-green-500 cursor-pointer transition">Syarat &amp; Ketentuan</a>
          <a className="text-xs text-gray-500 hover:text-green-500 cursor-pointer transition">Kontak</a>
        </div>
      </footer>

    </div>
  );
};