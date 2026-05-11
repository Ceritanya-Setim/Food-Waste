import { useState } from "react";
import NavbarConsumer from "../../components/ConsumerNavbar/NavbarConsumer";
import Footer from "../../components/Footer";
import { SearchIcon, FilterIcon, ChevronDownIcon } from "../../components/Icons";
import "./ExploreConsumer.css";

export default function ExplorePage() {
  const [activePage, setActivePage] = useState("explore");
  const [cartCount, setCartCount] = useState(0);
  const [activeSort, setActiveSort] = useState("Terdekat");

  const sorts = ["Terdekat", "Populer", "Donasi", "Gratis"];

  const items = [
    {
      name: "Pizza Slice Mix (6 pcs)",
      store: "Pizza Hut",
      dist: "1.2 km",
      pickup: "19:00–21:00",
      price: "Rp 20.000",
      original: "Rp 85.000",
      tag: "DONASI",
      color: "linear-gradient(135deg,#7f1d1d,#dc2626)",
    },
    {
      name: "Burger & Fries Pack",
      store: "Burger King",
      dist: "0.8 km",
      pickup: "20:00–22:00",
      price: "FREE",
      original: "Rp 45.000",
      tag: "GRATIS",
      color: "linear-gradient(135deg,#78350f,#d97706)",
    },
    {
      name: "Nasi Goreng Kambing...",
      store: "Kebon Sirih",
      dist: "2.5 km",
      pickup: "21:00–23:00",
      price: "Rp 15.000",
      original: "Rp 40.000",
      tag: "DONASI",
      color: "linear-gradient(135deg,#1b4332,#16a34a)",
    },
    {
      name: "Paket Roti Manis (10 pcs)",
      store: "BreadTalk",
      dist: "1.5 km",
      pickup: "18:00–20:00",
      price: "Rp 30.000",
      original: "Rp 120.000",
      tag: "DONASI",
      color: "linear-gradient(135deg,#5c3d2e,#92400e)",
    },
    {
      name: "Chicken Salad Bowl",
      store: "SaladStop",
      dist: "3.1 km",
      pickup: "19:30–21:30",
      price: "Rp 25.000",
      original: "Rp 75.000",
      tag: "DONASI",
      color: "linear-gradient(135deg,#14532d,#15803d)",
    },
    {
      name: "Bento Box Lunch",
      store: "HokBen",
      dist: "4.5 km",
      pickup: "20:00–22:00",
      price: "FREE",
      original: "Rp 55.000",
      tag: "GRATIS",
      color: "linear-gradient(135deg,#1e3a5f,#1d4ed8)",
    },
  ];

  return (
    <div className="explore-page">
      <NavbarConsumer activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />
      <main className="explore-main">
        <section className="explore-header">
          <h1 className="explore-title">Simpan makanan, hemat uang</h1>
          <p className="explore-subtitle">Temukan makanan lezat di sekitarmu dengan harga terjangkau.</p>
        </section>

        <section className="explore-search-panel">
          <div className="explore-search">
            <span className="explore-search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Cari makanan atau restoran..."
              className="explore-search-input"
            />
          </div>
          <button className="explore-filter-button">
            <FilterIcon /> Filter
          </button>
        </section>

        <section className="explore-filters">
          {[
            ["KATEGORI", "Semua"],
            ["TIPE HARGA", "Semua Harga"],
            ["LOKASI", "Semua Lokasi"],
          ].map(([label, value]) => (
            <div key={label} className="dropdown-card">
              <div className="dropdown-label">{label}</div>
              <div className="dropdown-value">
                <span>{value}</span>
                <ChevronDownIcon />
              </div>
            </div>
          ))}
        </section>

        <section className="explore-sort-row">
          {sorts.map((sort) => (
            <button
              key={sort}
              type="button"
              onClick={() => setActiveSort(sort)}
              className={activeSort === sort ? "sort-pill active" : "sort-pill"}
            >
              {sort}
            </button>
          ))}
        </section>

        <section className="item-grid">
          {items.map((item) => (
            <article key={item.name} className="item-card">
              <div className="item-banner" style={{ background: item.color }}>
                <span className={`item-tag ${item.tag === "GRATIS" ? "gratis" : "donasi"}`}>{item.tag}</span>
              </div>
              <div className="item-body">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-subtitle">{item.store} · {item.dist}</p>
                <p className="item-subtitle">Ambil: {item.pickup}</p>
                <div className="item-meta">
                  <div>
                    <div className={`item-price ${item.price === "FREE" ? "free" : ""}`}>{item.price}</div>
                    <div className="item-original">{item.original}</div>
                  </div>
                  <button type="button" className="item-add-button" onClick={() => setCartCount((c) => c + 1)}>
                    + Tambah
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="map-button-wrapper">
          <button className="map-button">🗺️ Lihat Peta</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}