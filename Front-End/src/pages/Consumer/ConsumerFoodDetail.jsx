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

// ── 2. KOMPONEN FOOTER BAWAAN ────────────────────────────────────────────────────────
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

// ── 3. INTERNAL ICONS (SVG PACK) ────────────────────────────────────────────────────
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

const dummyFoods = [
  {
    id: "pizza-slice-mix",
    title: "Pizza Slice Mix (6 pcs)",
    description: "Sisa potongan pizza lezat dengan topping ayam, paprika, dan keju mozarella.",
    ingredients: "Tepung, saus tomat, keju mozarella, ayam, paprika, bawang.",
    original_price: 85000,
    discount_price: 20000,
    quantity_remaining: 4,
    pickup_start: "19:00",
    pickup_end: "21:00",
    co2_saved: 1.8,
    diet_labels: ["Halal"],
    business_name: "Pizza Hut",
    address: "Jl. Thamrin No. 12, Jakarta Pusat",
    distance: "1.2 km dari Anda",
    latitude: -6.2000,
    longitude: 106.8167,
    image_url: "https://images.unsplash.com/photo-1548365328-6d04ec1c6924?q=80&w=1200",
    avg_rating: 4.6,
    total_reviews: 98,
    reviews_list: [
      { id: "r1", user_name: "Dewi", rating: 5, date: "1 hari lalu", comment: "Pizza tetap enak dan segar meski harga miring.", initial: "D" },
      { id: "r2", user_name: "Rafi", rating: 4, date: "Kemarin", comment: "Pilihan pas untuk ngemil sebelum pulang.", initial: "R" }
    ]
  },
  {
    id: "burger-fries-pack",
    title: "Burger & Fries Pack",
    description: "Burger sapi empuk dengan kentang goreng renyah, paket praktis untuk makan malam.",
    ingredients: "Daging sapi, roti burger, selada, tomat, saus, kentang.",
    original_price: 45000,
    discount_price: 0,
    quantity_remaining: 5,
    pickup_start: "20:00",
    pickup_end: "22:00",
    co2_saved: 2.4,
    diet_labels: ["Halal"],
    business_name: "Burger King",
    address: "Jl. Kuningan No. 8, Jakarta Selatan",
    distance: "0.8 km dari Anda",
    latitude: -6.2240,
    longitude: 106.8186,
    image_url: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200",
    avg_rating: 4.9,
    total_reviews: 142,
    reviews_list: [
      { id: "r3", user_name: "Sinta", rating: 5, date: "3 hari lalu", comment: "Burgernya enak, porsi kentang banyak.", initial: "S" },
      { id: "r4", user_name: "Bayu", rating: 4, date: "Minggu lalu", comment: "Harga sangat murah untuk kualitas segini.", initial: "B" }
    ]
  },
  {
    id: "nasi-goreng-kambing",
    title: "Nasi Goreng Kambing Spesial",
    description: "Nasi goreng rasa kambing gurih dengan emping, telur, dan rempah nendang.",
    ingredients: "Nasi, daging kambing, telur, kecap, bawang putih, cabe, emping.",
    original_price: 40000,
    discount_price: 15000,
    quantity_remaining: 3,
    pickup_start: "21:00",
    pickup_end: "23:00",
    co2_saved: 1.7,
    diet_labels: ["Halal"],
    business_name: "Kebon Sirih",
    address: "Jl. Kebon Sirih No. 7, Jakarta Pusat",
    distance: "2.5 km dari Anda",
    latitude: -6.1878,
    longitude: 106.8283,
    image_url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200",
    avg_rating: 4.7,
    total_reviews: 117,
    reviews_list: [
      { id: "r5", user_name: "Gita", rating: 5, date: "2 hari lalu", comment: "Pedasnya pas dan kambingnya empuk.", initial: "G" },
      { id: "r6", user_name: "Hendry", rating: 4, date: "Minggu lalu", comment: "Enak sekali, sangat worth it.", initial: "H" }
    ]
  },
  {
    id: "paket-roti-manis",
    title: "Paket Roti Manis (10 pcs)",
    description: "Paket roti manis campur, cocok untuk keluarga atau teman.",
    ingredients: "Tepung, gula, mentega, cokelat, keju, selai.",
    original_price: 120000,
    discount_price: 30000,
    quantity_remaining: 8,
    pickup_start: "18:00",
    pickup_end: "20:00",
    co2_saved: 1.0,
    diet_labels: ["Vegetarian"],
    business_name: "BreadTalk",
    address: "Jl. Sudirman No. 45, Jakarta Pusat",
    distance: "1.5 km dari Anda",
    latitude: -6.2047,
    longitude: 106.8224,
    image_url: "https://images.unsplash.com/photo-1511688878353-2a62f1fd72a8?q=80&w=1200",
    avg_rating: 4.5,
    total_reviews: 86,
    reviews_list: [
      { id: "r7", user_name: "Fitri", rating: 4, date: "Kemarin", comment: "Roti manisnya empuk dan tidak terlalu manis.", initial: "F" },
      { id: "r8", user_name: "Raka", rating: 5, date: "3 hari lalu", comment: "Pas untuk stock sarapan besok.", initial: "R" }
    ]
  }
];

const REVIEW_STORAGE_KEY = "foodsave_food_reviews";
const getStoredReviewsForFood = (foodId) => {
  const stored = JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY) || "{}");
  return stored[foodId] || [];
};

const buildReviewSummary = (food) => {
  const customReviews = getStoredReviewsForFood(food.id);
  const mergedReviews = [...food.reviews_list, ...customReviews];
  const totalReviews = mergedReviews.length;
  const avgRating = totalReviews
    ? (mergedReviews.reduce((acc, review) => acc + (Number(review.rating) || 0), 0) / totalReviews).toFixed(1)
    : Number(food.avg_rating).toFixed(1);

  return {
    mergedReviews,
    avgRating,
    totalReviews,
  };
};

// ── 4. MAIN COMPONENT: FOOD DETAIL PAGE ──────────────────────────────────────────────
// Penulisan komponen Named Export disesuaikan agar klop dengan pemanggilan di App.jsx
export const ConsumerFoodDetail = () => {
  const { id } = useParams();
  const [activePage, setActivePage] = useState("explore");
  const [cartCount, setCartCount] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [foodData, setFoodData] = useState(null);

  useEffect(() => {
    const selectedFood = dummyFoods.find((food) => food.id === id);
    const timer = setTimeout(() => {
      setFoodData(selectedFood ?? dummyFoods[0]);
    }, 0);

    return () => clearTimeout(timer);
  }, [id]);

  // Perbaikan format String Literal template URL Google Maps
  const handleOpenGoogleMaps = () => {
    if (foodData) {
      const url = `https://www.google.com/maps?q=${foodData.latitude},${foodData.longitude}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  if (!foodData) return <div className="p-8 text-center text-slate-500">Memuat detail menu makanan...</div>;

  const { mergedReviews, avgRating, totalReviews } = buildReviewSummary(foodData);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-700 antialiased">
      <Navbar activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />

      {/* Breadcrumb Links */}
      <div className="max-w-[1120px] mx-auto w-full px-6 pt-6 text-xs font-semibold text-slate-400 flex gap-2">
        <span className="hover:text-emerald-600 cursor-pointer">Beranda</span><span>›</span>
        <span className="hover:text-emerald-600 cursor-pointer">Eksplorasi</span><span>›</span>
        <span className="text-slate-800">Detail Makanan</span>
      </div>

      {/* Grid Konten Utama */}
      <main className="max-w-[1120px] mx-auto w-full px-6 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── SEKTOR KIRI: DETAIL PRODUK (70% WIDTH) ── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Banner Foto Makanan Utama */}
          <div className="relative h-[380px] w-full rounded-3xl overflow-hidden shadow-xs border border-gray-100 bg-gray-200">
            <img src={foodData.image_url} alt={foodData.title} className="w-full h-full object-cover" />
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
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{foodData.title}</h1>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                <MapPinIcon />
                <span className="text-slate-600 font-extrabold">{foodData.business_name}</span>
                <span>•</span>
                <span>{foodData.distance}</span>
              </div>
            </div>

            {/* Tag Harga */}
            <div className="text-left sm:text-right flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 line-through">Rp {foodData.original_price.toLocaleString("id-ID")}</span>
                <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-red-100 uppercase tracking-wide">Hemat 50%</span>
              </div>
              <div className="text-3xl font-black text-emerald-600">Rp {foodData.discount_price.toLocaleString("id-ID")}</div>
            </div>
          </div>

          {/* Kotak Hijau Dampak Karbon */}
          <div className="bg-[#EAF5F0] border border-green-100 p-5 rounded-2xl flex items-center gap-4">
            <div className="bg-emerald-500 p-2.5 rounded-full text-white shadow-xs">
              <LeafIcon />
            </div>
            <div className="text-sm text-green-800 font-semibold">
              <span className="text-green-600 block text-xs font-black uppercase tracking-wider mb-0.5">Dampak Anda</span>
              Dengan membeli ini, Anda menyelamatkan <strong className="font-extrabold text-green-950">{(foodData.co2_saved * quantity).toFixed(1)}kg CO2</strong> dari atmosfer.
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
              {mergedReviews.map((rev) => (
                <div key={rev.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-emerald-100 text-emerald-800 font-black flex items-center justify-center rounded-full text-xs">{rev.initial || rev.user_name?.[0]?.toUpperCase() || "U"}</div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{rev.user_name}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{rev.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => <StarIcon key={i} filled />)}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">"{rev.comment}"</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 bg-white border border-gray-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition shadow-xs">
              Lihat Semua Ulasan
            </button>
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
                    <p className="text-sm font-bold text-slate-900">{foodData.pickup_start} - {foodData.pickup_end} Hari Ini</p>
                  </div>
                </div>
                <button className="text-emerald-600 text-xs font-black hover:text-emerald-700">Ubah</button>
              </div>

              {/* Selector Kuantitas */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-600"><CartIcon /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Jumlah</p>
                    <p className="text-sm font-bold text-slate-900">{quantity} Kotak Pastri</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 font-bold transition"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-4 text-center text-slate-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.min(foodData.quantity_remaining, prev + 1))}
                    disabled={quantity >= foodData.quantity_remaining}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 font-bold transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Tombol Keranjang */}
              <button 
                onClick={() => setCartCount(prev => prev + quantity)}
                className="w-full py-4 bg-[#0F766E] text-white rounded-2xl text-sm font-bold shadow-md shadow-teal-900/10 hover:bg-teal-800 active:scale-[0.99] transition-all mb-3"
              >
                Tambah ke Keranjang
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
                <p className="text-xs text-slate-500 font-bold leading-relaxed">{foodData.address}</p>
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
                  <span>🚶</span> 15 Menit Jalan Kaki
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