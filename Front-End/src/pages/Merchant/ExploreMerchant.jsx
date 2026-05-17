import React from "react";
import "./ExploreMerchant.css";

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
    <div className="explore-page-wrapper">
      <div className="explore-container">
        
        {/* 📊 BAGIAN 1: MARKET INSIGHTS */}
        <section className="explore-section">
          {/* Diubah jadi struktur block vertikal agar deskripsi pas di bawah judul */}
          <div className="explore-section-header">
            <h2>Market Insights</h2>
            <p>Analisis pasar dan kompetitor untuk mengoptimalkan bisnis Anda</p>
          </div>
          
          <div className="insights-grid">
            {insightsData.map((item) => (
              <div key={item.id} className="insight-card">
                <div className="insight-card-header">
                  <div className={`insight-icon-wrapper icon-style-${item.id}`}>
                    <span className="insight-icon">{item.icon}</span>
                  </div>
                  {item.badge && (
                    <span className={`insight-badge-mini ${item.id === 3 ? 'badge-top' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                
                <div className="insight-content">
                  <h3 className="insight-title">{item.title}</h3>
                  <span className="insight-subtitle">{item.subtitle}</span>
                  <p className="insight-desc">{item.desc}</p>
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

          <div className="trending-grid">
            {trendingItems.map((item) => (
              <div key={item.id} className="trending-card">
                <div className="card-image-area">
                  <img src={item.image} alt={item.name} className="trending-img" />
                  
                  <span className={`demand-badge ${item.demandClass}`}>
                    🔥 {item.demand}
                  </span>

                  {/* Badges tren persentase ditiadakan dari sini */}
                  <span className="category-tag">{item.category}</span>
                </div>

                <div className="card-info-area">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-meta-row">
                    <div className="meta-col">
                      <span className="meta-label">Avg Price</span>
                      <span className="meta-value text-dark">{item.avgPrice}</span>
                    </div>
                    <div className="meta-col text-right">
                      <span className="meta-label">Avg Discount</span>
                      <span className="meta-value text-green">{item.avgDiscount}</span>
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