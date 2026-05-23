import React from "react";

export default function ExploreMerchant() {
  // Data Dummy untuk Market Insights 
  const insightsData = [
    { id: 1, icon: "🕒", title: "17:00 - 19:00", subtitle: "Peak Hours", desc: "Waktu terbaik untuk pickup", badge: "+15%" },
    { id: 2, icon: "💲", title: "58%", subtitle: "Avg Discount", desc: "Rata-rata diskon kompetitor", badge: "+3%" },
    { id: 3, icon: "🎗️", title: "Bakery", subtitle: "Category Leader", desc: "Kategori paling populer", badge: "Top" },
    { id: 4, icon: "📈", title: "High", subtitle: "Customer Demand", desc: "Permintaan saat ini", badge: "+12%" },
  ];

  // Data Dummy untuk Trending Items (Properti trend persentase dihapus total sesuai coretan merah)
  const trendingItems = [
    {
      id: 1,
      name: "Nasi Goreng Spesial",
      category: "Main Course",
      demand: "High Demand",
      demandClass: "high-demand",
      avgPrice: "Rp 25K",
      avgDiscount: "60%",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "Croissant & Pastry",
      category: "Bakery",
      demand: "High Demand",
      demandClass: "high-demand",
      avgPrice: "Rp 15K",
      avgDiscount: "70%",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "Sushi Set",
      category: "Asian Food",
      demand: "Medium",
      demandClass: "medium-demand",
      avgPrice: "Rp 45K",
      avgDiscount: "50%",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 4,
      name: "Pizza Slice",
      category: "Fast Food",
      demand: "High Demand",
      demandClass: "high-demand",
      avgPrice: "Rp 20K",
      avgDiscount: "55%",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
    },
  ];

    return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        
        {/* 📊 BAGIAN 1: MARKET INSIGHTS */}
        <section className="mb-10">
          {/* Diubah jadi struktur block vertikal agar deskripsi pas di bawah judul */}
          <div className="explore-section-header">
            <h2>Market Insights</h2>
            <p>Analisis pasar dan kompetitor untuk mengoptimalkan bisnis Anda</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {insightsData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg grid place-items-center ${item.id === 1 ? 'bg-sky-100 text-sky-600' : item.id === 2 ? 'bg-emerald-100 text-emerald-600' : item.id === 3 ? 'bg-violet-100 text-violet-600' : 'bg-amber-100 text-amber-600'}`}>
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className={`text-xs font-semibold ${item.id === 3 ? 'bg-violet-100 text-violet-600' : 'bg-emerald-100 text-emerald-600'} px-3 py-1 rounded-full`}>{item.badge}</span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <span className="text-sm font-semibold text-slate-600">{item.subtitle}</span>
                  <p className="text-sm text-slate-500 mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🔥 BAGIAN 2: TRENDING ITEMS */}
        <section className="explore-section">
          {/* Tombol filter ditiadakan total sesuai coretan merah */}
          <div className="explore-section-header">
            <h2>Trending Items</h2>
            <p>Makanan yang paling banyak dicari pembeli</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trendingItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="relative h-44 w-full">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded">🔥 {item.demand}</span>
                  <span className="absolute bottom-3 left-3 bg-white/90 text-sm font-semibold px-2 py-1 rounded">{item.category}</span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">{item.name}</h3>
                  <div className="flex items-center justify-between border-t pt-3 text-sm text-slate-600">
                    <div>
                      <div className="text-xs uppercase text-slate-400">Avg Price</div>
                      <div className="font-bold">{item.avgPrice}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase text-slate-400">Avg Discount</div>
                      <div className="font-bold text-emerald-600">{item.avgDiscount}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}