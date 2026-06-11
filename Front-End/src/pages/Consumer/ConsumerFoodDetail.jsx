import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ── 1. KOMPONEN NAVIGASI UTAMA (NAVBAR BAWAAN) ──────────────────────────────────────
function Navbar({ activePage, setActivePage, cartCount }) {
  const navigate = useNavigate();

  const goToPage = (page) => {
    setActivePage(page);
    if (page === "dashboard") navigate("/DashboardConsumer");
    if (page === "explore") navigate("/ExploreConsumer");
    if (page === "impact") navigate("/ImpactConsumer");
    if (page === "cart") navigate("/CartConsumer");
    if (page === "profile") navigate("/ProfileConsumer");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Kiri */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => goToPage("dashboard")}>
          <div className="w-9 h-9 rounded-xl grid place-items-center bg-green-500 text-white">
            <LeafIcon />
          </div>
          <span className="text-[1.1rem] font-extrabold text-slate-900">FoodSave</span>
        </div>

        {/* Menu Tengah */}
        <div className="flex gap-2">
          {["dashboard", "explore", "impact"].map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                activePage === page
                  ? "bg-green-500 text-white"
                  : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
              }`}
            >
              {page === "dashboard" ? "Dashboard" : page === "explore" ? "Explore" : "Impact"}
            </button>
          ))}
        </div>

        {/* Menu Aksi Kanan */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => goToPage("cart")} 
            className={`relative w-10 h-10 rounded-lg grid place-items-center transition ${activePage === "cart" ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-600 hover:bg-emerald-50"}`} 
            type="button"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="-top-1 -right-1 absolute w-5 h-5 rounded-full bg-red-600 text-white text-xs font-extrabold grid place-items-center">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => goToPage("profile")} 
            className={`w-9 h-9 rounded-full grid place-items-center transition ${activePage === "profile" ? "bg-emerald-600 text-white" : "bg-amber-200 text-amber-800 hover:bg-amber-300"}`} 
            type="button"
          >
            Elara
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
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
              <a key={l} href="#" className="text-slate-500 text-sm hover:text-green-600 transition">{l}</a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-extrabold text-slate-900 mb-3">Support</h4>
            {['Help Center', 'Contact Support', 'Partner Success', 'Community Forum'].map((l) => (
              <a key={l} href="#" className="text-slate-500 text-sm hover:text-green-600 transition">{l}</a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-extrabold text-slate-900 mb-3">Legal</h4>
            {['Terms of Service', 'Privacy Policy', 'Partner Agreement', 'Cookie Policy'].map((l) => (
              <a key={l} href="#" className="text-slate-500 text-sm hover:text-green-600 transition">{l}</a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-400">© 2024 FoodSave Business. All rights reserved.</div>
          <div className="flex gap-4 flex-wrap text-sm text-slate-400">
            {['Settings', 'Notifications', 'Reports'].map((l) => (
              <a key={l} href="#" className="text-slate-500 text-sm hover:text-green-600 transition">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const LeafIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.34L5.71 21l1-1C7.38 19.33 8 19 9 19c2 0 4-2 6-2s3.5 1 3.5 1L21 14c0-6-4-6-4-6z" />
  </svg>
);
const CartIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const MapPinIcon = () => (
  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const StarIcon = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

const REVIEW_STORAGE_KEY = "foodsave_food_reviews";
const getStoredReviewsForFood = (foodId) => {
  const stored = JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY) || "{}");
  return stored[foodId] || [];
};

const buildReviewSummary = (foodId, apiReviews, apiAvgRating) => {
  const customReviews = getStoredReviewsForFood(foodId);
  const baseReviews = Array.isArray(apiReviews) ? apiReviews : [];
  const mergedReviews = [...baseReviews, ...customReviews];
  
  const totalReviews = mergedReviews.length;
  let avgRating = apiAvgRating || 0;
  
  if (totalReviews > 0) {
    avgRating = (mergedReviews.reduce((acc, rev) => acc + (Number(rev.rating) || 0), 0) / totalReviews).toFixed(1);
  } else {
    avgRating = avgRating.toFixed(1);
  }

  return { mergedReviews, avgRating, totalReviews };
};

const calculateDiscountPercentage = (ori, disc) => {
  if (!ori || !disc || ori <= disc) return 0;
  return Math.round(((ori - disc) / ori) * 100);
};

export const ConsumerFoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("explore");
  const [cartCount, setCartCount] = useState(2);
  const [quantity, setQuantity] = useState(1);
  
  const [foodData, setFoodData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoodDetail = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(`http://localhost:5000/surplus-food/${id}`);
        const result = await res.json();
        
        if (res.ok && result.data) {
          setFoodData(result.data);
          setQuantity(Math.min(1, result.data.quantity_remaining));
        } else {
          setError(result.message || "Data makanan tidak ditemukan.");
        }
      } catch (err) {
        setError("Gagal terhubung ke server saat mengambil detail makanan.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchFoodDetail();
  }, [id]);

  const handleOpenGoogleMaps = () => {
    if (foodData && foodData.latitude && foodData.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${foodData.latitude},${foodData.longitude}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("Koordinat lokasi tidak tersedia.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-700 antialiased">
        <Navbar activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-slate-500 font-bold animate-pulse">Memuat detail menu makanan...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !foodData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-700 antialiased">
        <Navbar activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
          <div className="text-red-500 font-bold text-lg">{error || "Data tidak tersedia."}</div>
          <button onClick={() => navigate(-1)} className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-sm hover:bg-emerald-700">
            Kembali
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const discountPercent = calculateDiscountPercentage(foodData.original_price, foodData.discount_price);
  const { mergedReviews, avgRating, totalReviews } = buildReviewSummary(id, foodData.reviews, foodData.average_rating);
  
  const fallbackImage = "http://localhost:5000/storage/food/food.jpeg";
  const fallbackAddress = "Alamat toko belum dicantumkan.";
  const fallbackPickupStart = "18:00";
  const fallbackPickupEnd = "21:00";
  const fallbackCO2 = 1.8;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-700 antialiased">
      <Navbar activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />

      {/* Breadcrumb Links */}
      <div className="max-w-[1120px] mx-auto w-full px-6 pt-6 text-xs font-semibold text-slate-400 flex gap-2">
        <span onClick={() => navigate("/")} className="hover:text-emerald-600 cursor-pointer">Beranda</span><span>›</span>
        <span onClick={() => navigate("/ExploreConsumer")} className="hover:text-emerald-600 cursor-pointer">Eksplorasi</span><span>›</span>
        <span className="text-slate-800">Detail Makanan</span>
      </div>

      {/* Grid Konten Utama */}
      <main className="max-w-[1120px] mx-auto w-full px-6 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── SEKTOR KIRI: DETAIL PRODUK (70% WIDTH) ── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Banner Foto Makanan Utama */}
          <div className="relative h-[380px] w-full rounded-3xl overflow-hidden shadow-xs border border-gray-100 bg-gray-200">
            <img src={foodData.image_url || fallbackImage} alt={foodData.surplus_food_name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-emerald-600/95 backdrop-blur-xs text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1.5 shadow-xs">
                <LeafIcon /> Eco Choice
              </span>
              <span className="bg-amber-400/95 backdrop-blur-xs text-amber-950 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide shadow-xs">
                Sisa Berharga
              </span>
            </div>
          </div>

          {/* Judul, Brand & Harga */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{foodData.surplus_food_name}</h1>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                <MapPinIcon />
                <span className="text-slate-600 font-extrabold">{foodData.business_name}</span>
                <span>•</span>
                <span>{foodData.distance_km ? `${foodData.distance_km} km dari Anda` : "Jarak belum diketahui"}</span>
              </div>
            </div>

            {/* Tag Harga */}
            <div className="text-left sm:text-right flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-1 shrink-0">
              {discountPercent > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 line-through">Rp {foodData.original_price?.toLocaleString("id-ID") || 0}</span>
                  <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-red-100 uppercase tracking-wide">
                    Hemat {discountPercent}%
                  </span>
                </div>
              )}
              <div className="text-3xl font-black text-emerald-600">Rp {foodData.discount_price?.toLocaleString("id-ID") || 0}</div>
            </div>
          </div>

          {/* Kotak Hijau Dampak Karbon */}
          <div className="bg-[#EAF5F0] border border-green-100 p-5 rounded-2xl flex items-center gap-4">
            <div className="bg-emerald-500 p-2.5 rounded-full text-white shadow-xs">
              <LeafIcon />
            </div>
            <div className="text-sm text-green-800 font-semibold">
              <span className="text-green-600 block text-xs font-black uppercase tracking-wider mb-0.5">Dampak Anda</span>
              Dengan membeli ini, Anda menyelamatkan <strong className="font-extrabold text-green-950">{(fallbackCO2 * quantity).toFixed(1)}kg CO2</strong> dari atmosfer.
            </div>
          </div>

          {/* Komponen Ulasan */}
          <div className="pt-6 border-t border-gray-200/60">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Ulasan Pelanggan</h3>
              <div className="flex items-center gap-1 bg-amber-50/60 border border-amber-100 px-3 py-1 rounded-xl">
                <StarIcon filled />
                <span className="font-extrabold text-slate-900 text-sm ml-1">{avgRating}</span>
                <span className="text-slate-400 text-xs font-semibold">({totalReviews} ulasan)</span>
              </div>
            </div>

            {/* List Review */}
            <div className="space-y-4">
              {mergedReviews.length > 0 ? (
                mergedReviews.map((rev, index) => (
                  <div key={rev.id || index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-100 text-emerald-800 font-black flex items-center justify-center rounded-full text-xs">
                          {rev.initial || rev.user_name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900">{rev.user_name || "Pengguna Anonim"}</p>
                          <p className="text-[10px] text-slate-400 font-bold">{rev.date || "Baru saja"}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(Number(rev.rating) || 5)].map((_, i) => <StarIcon key={i} filled />)}
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">"{rev.comment}"</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-sm font-semibold border border-dashed border-slate-200 rounded-2xl">
                  Belum ada ulasan untuk makanan ini.
                </div>
              )}
            </div>

            {mergedReviews.length > 0 && (
              <button className="w-full mt-4 py-3 bg-white border border-gray-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition shadow-xs">
                Lihat Semua Ulasan
              </button>
            )}
          </div>
        </div>

        {/* ── SEKTOR KANAN: SIDEBAR PEMBELIAN (30% WIDTH) ── */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 space-y-6">
            
            {/* Box Konfirmasi Order */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
              <h2 className="text-lg font-extrabold text-slate-950 mb-5">Pesan Sekarang</h2>
              
              {/* Waktu Ambil */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-600"><MapPinIcon /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Waktu Penjemputan</p>
                    <p className="text-sm font-bold text-slate-900">{fallbackPickupStart} - {fallbackPickupEnd} Hari Ini</p>
                  </div>
                </div>
              </div>

              {/* Selector Kuantitas */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-600"><CartIcon /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Jumlah</p>
                    <p className="text-sm font-bold text-slate-900">{quantity} Porsi</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1 || foodData.quantity_remaining === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 font-bold transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-4 text-center text-slate-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.min(foodData.quantity_remaining, prev + 1))}
                    disabled={quantity >= foodData.quantity_remaining || foodData.quantity_remaining === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 font-bold transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Tombol Keranjang */}
              <button 
                disabled={foodData.quantity_remaining === 0}
                onClick={() => setCartCount(prev => prev + quantity)}
                className="w-full py-4 bg-[#0F766E] text-white rounded-2xl text-sm font-bold shadow-md shadow-teal-900/10 hover:bg-teal-800 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {foodData.quantity_remaining === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
              </button>
              
              <button className="w-full py-3.5 bg-[#E2F1EB] text-[#0F766E] rounded-2xl text-xs font-bold hover:bg-[#D1E8DF] transition flex items-center justify-center gap-2">
                <LeafIcon /> Lihat Dampak Lingkungan
              </button>

              <p className="text-center text-[11px] text-slate-400 font-bold mt-4">
                Tersisa <span className="text-red-500 font-black">{foodData.quantity_remaining} stok</span> lagi! Segera amankan pesananmu.
              </p>
            </div>

            {/* Peta Penjemputan */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Lokasi Penjemputan</h3>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">{fallbackAddress}</p>
              </div>
              
              <div 
                onClick={handleOpenGoogleMaps}
                className="relative w-full h-44 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group shadow-xs"
              >
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_19px,#cbd5e1_20px),linear-gradient(0deg,transparent_19px,#cbd5e1_20px)] bg-[size:20px_20px]" />
                <div className="absolute top-[35%] left-0 right-0 h-4 bg-slate-200 rotate-6" />
                <div className="absolute top-0 bottom-0 left-[50%] w-4 bg-slate-200 -rotate-45" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 group-hover:scale-110 transition duration-300 text-emerald-600 animate-bounce">
                    <LeafIcon />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] text-white font-black tracking-wide">
                  Buka Maps ↗
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <span>🚶</span> Ketahui lokasi persisnya
                </div>
                <button onClick={handleOpenGoogleMaps} className="flex items-center gap-1 text-slate-600 hover:text-emerald-700 transition">
                  Petunjuk Arah ↗
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};