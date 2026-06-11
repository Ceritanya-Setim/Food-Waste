import React, { useState, useEffect } from "react";
import NavbarMerchant from "../../components/Merchant/MerchantNavbar/NavbarMerchant";
import Footer from "../../components/Footer";
import { merchantAPI, imageURL } from "../../services/api";

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const fallbackImages = {
  "bakery":      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
  "main course": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=400",
  "asian food":  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400",
  "fast food":   "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
  "default":     "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=400"
};

export default function ExploreMerchant() {
  const [activePage, setActivePage] = useState("explore");
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [profileData, setProfileData] = useState(null);
  const [exploreData, setExploreData] = useState({
    summary: { average_pickup_hour: "00:00", average_discount: 0, top_category: "-" },
    top_foods: []
  });

  useEffect(() => {
    merchantAPI.getProfile()
      .then(res => setProfileData(res.data))
      .catch(() => {});

    const fetchExploreData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await merchantAPI.getExploreData();

        if (res) {
          const nestedData = res.data || {};
          
          const rawSummary  = nestedData.summary  || nestedData.Summary  || {};
          const rawTopFoods = nestedData.top_foods || nestedData.TopFoods || [];

          setExploreData({
            summary: {
              average_pickup_hour: rawSummary.average_pickup_hour || "00:00",
              average_discount:    rawSummary.average_discount    || 0,
              top_category:        rawSummary.top_category        || "-"
            },
            top_foods: rawTopFoods
          });
        }
      } catch (err) {
        console.error("Gagal memuat data explore:", err);
        setError("Gagal mengambil insight data dari server.");
      } finally {
        setLoading(false);
      }
    };

    fetchExploreData();
  }, []);

  const formatK = (num) => {
    if (num >= 1000) return `Rp ${Math.round(num / 1000)}K`;
    return `Rp ${num}`;
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency", currency: "IDR", minimumFractionDigits: 0
    }).format(num);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
        <NavbarMerchant
          activePage={activePage}
          setActivePage={setActivePage}
          notifCount={0}
          profileData={profileData}
        />
        <div className="text-center py-20 text-sm font-semibold text-slate-400">
          Sinkronisasi indikator tren pasar...
        </div>
        <Footer />
      </div>
    );
  }

  const { summary, top_foods } = exploreData;

  const insightsData = [
    {
      id: 1, icon: <ClockIcon />,
      title:    summary.average_pickup_hour !== "00:00" ? `Jam ${summary.average_pickup_hour}` : "Belum Ada Data",
      subtitle: "Peak Hours",
      desc:     "Rata-rata waktu pengambilan makanan surplus oleh pembeli",
      badge:    "WIB"
    },
    {
      id: 2, icon: <DollarIcon />,
      title:    summary.average_discount > 0 ? formatRupiah(summary.average_discount) : "Rp 0",
      subtitle: "Avg Discount",
      desc:     "Nominal rata-rata potongan harga yang diberikan di pasar",
      badge:    "Hemat"
    },
    {
      id: 3, icon: <AwardIcon />,
      title:    summary.top_category && summary.top_category !== "" ? summary.top_category : "Tidak Ada",
      subtitle: "Category Leader",
      desc:     "Kategori bisnis kuliner dengan volume penjualan tertinggi",
      badge:    "Top"
    },
    {
      id: 4, icon: <TrendingUpIcon />,
      title:    top_foods.length > 0 ? "Tinggi" : "Stabil",
      subtitle: "Customer Demand",
      desc:     "Tingkat ketertarikan food saving saat ini",
      badge:    "Live"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <NavbarMerchant
          activePage={activePage}
          setActivePage={setActivePage}
          notifCount={0}
          profileData={profileData}
        />

        <div className="max-w-[1200px] mx-auto px-[4%] py-8">
          {error && (
            <div className="mb-6 p-4 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl">
              ⚠️ {error}
            </div>
          )}

          <section className="mb-12">
            <div className="explore-section-header mb-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">Market Insights</h2>
              <p className="text-sm text-slate-500">Analisis statistik real-time dari database pusat</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {insightsData.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl grid place-items-center ${
                      item.id === 1 ? 'bg-sky-50 text-sky-600' :
                      item.id === 2 ? 'bg-emerald-50 text-emerald-600' :
                      item.id === 3 ? 'bg-violet-50 text-violet-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-lg">
                      {item.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-0.5 capitalize">{item.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.subtitle}</span>
                    <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="explore-section">
            <div className="explore-section-header mb-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">Trending Items</h2>
              <p className="text-sm text-slate-500">10 produk dengan kuantitas penjualan teratas (Status Paid/Completed)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {top_foods.length === 0 ? (
                <div className="col-span-full bg-white text-center py-12 border border-slate-100 rounded-xl text-slate-400 font-medium text-sm">
                  Tidak ada item yang memenuhi kriteria penjualan di database saat ini.
                </div>
              ) : (
                top_foods.map((item, index) => {
                  const name           = item.name           || "Unnamed Item";
                  const category       = item.category       || "Default";
                  const originalPrice  = item.original_price || 0;
                  const discountPrice  = item.discount_price || 0;
                  const totalPurchased = item.total_purchased || 0;

                  const diskonPersen = originalPrice > 0
                    ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
                    : 0;

                  const beImageUrl = item["image-url"] || item.image_url || null;
                  
                  const itemImage = beImageUrl
                    ? (beImageUrl.startsWith("http") ? beImageUrl : imageURL(beImageUrl))
                    : (fallbackImages[category.toLowerCase()] || fallbackImages["default"]);

                  return (
                    <div key={index} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                      <div className="relative h-44 w-full">
                        <img
                          src={itemImage}
                          alt={name}
                          className="w-full h-full object-cover"
                          onError={e => { e.target.src = fallbackImages["default"]; }}
                        />
                        <span className="absolute top-3 left-3 bg-amber-600 text-white text-[11px] font-bold px-2 py-1 rounded-md">
                          🔥 Terjual {totalPurchased}x
                        </span>
                        <span className="absolute bottom-3 left-3 bg-white/95 text-xs font-bold text-slate-800 px-2.5 py-1 rounded-md border border-slate-100 capitalize">
                          {category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-slate-900 mb-4 text-[0.95rem] truncate">{name}</h3>
                        <div className="flex items-center justify-between border-t border-slate-50 pt-3 text-sm text-slate-600">
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 mb-0.5">HARGA</div>
                            <div className="font-extrabold text-slate-800">{formatK(discountPrice)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-bold text-slate-400 mb-0.5">DISKON</div>
                            <div className="font-extrabold text-emerald-600">{diskonPersen}% OFF</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}