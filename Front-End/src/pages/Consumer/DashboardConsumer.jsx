import { useState } from "react";
import NavbarConsumer from "../../components/ConsumerNavbar/NavbarConsumer";
import Footer from "../../components/Footer";
import { SearchIcon, StarIcon, MapPinIcon, BoxIcon, ClockIcon } from "../../components/Icons";
import "./DashboardConsumer.css";
import AsianFoodImg from "../../assets/Consumer/Dashboard/AsianFoodThumbnail.png";
import BakeryImg from "../../assets/Consumer/Dashboard/BakeryThumbnail.png";
import BuffetsImg from "../../assets/Consumer/Dashboard/BuffetsThumbnail.png";
import FastFoodImg from "../../assets/Consumer/Dashboard/FastFoodThumbnail.png";
import GourmetDinnerSet from "../../assets/Consumer/Dashboard/Promo/GourmetDinnerSet.png";
import MargheritaPizza from "../../assets/Consumer/Dashboard/Promo/MargheritaLargePizza.png";
import PastryMixBox from "../../assets/Consumer/Dashboard/Promo/PastryMixBox.png";


const CategoryImage = ({ img, label, color }) => (
  <div 
    className="category-card" 
    style={{ 
      backgroundColor: color, 
      backgroundImage: `url(${img})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <p className="category-card-label">{label}</p>
  </div>
);

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("dashboard");
  const [cartCount, setCartCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filters = ["Semua", "Promo Spesial", "Terdekat", "Baru", "Favorit"];

  const categories = [
  { label: "Asian Food", img: AsianFoodImg, color: "#0f3f27" },
  { label: "Bakery", img: BakeryImg, color: "#7f1d1d" },
  { label: "Fast Food", img: FastFoodImg, color: "#4a1d96" },
  { label: "Buffets", img: BuffetsImg, color: "#15803d" }
];

  const promos = [
    {
      name: "Gourmet Dinner Set",
      price: "Rp 20.000",
      original: "Rp 45.000",
      discount: "56%",
      rating: "4.8",
      reviews: "120+",
      dist: "1.2 km",
      stock: "5 porsi",
      time: "15 menit lagi",
      desc: "Set menu makan malam lengkap dengan pilihan hidangan utama dan rasa otentik.",
      img: GourmetDinnerSet,
      color: "linear-gradient(135deg,#0f3f27,#196f4c)",
    },
    {
      name: "Margherita Large Pizza",
      price: "Rp 48.000",
      original: "Rp 80.000",
      discount: "40%",
      rating: "4.5",
      reviews: "85",
      dist: "0.8 km",
      stock: "2 loyang",
      time: "30 menit lagi",
      desc: "Pizza tipis renyah dengan saus tomat segar dan keju mozzarella berkualitas.",
      img: MargheritaPizza,
      color: "linear-gradient(135deg,#7f1d1d,#b91c1c)",

    },
    {
      name: "Pastry Mix Box",
      price: "Rp 35.000",
      original: "Rp 50.000",
      discount: "30%",
      rating: "4.9",
      reviews: "210",
      dist: "2.5 km",
      stock: "8 box",
      time: "Habis hari ini",
      desc: "Paket berisi 4 macam pastry manis yang baru dipanggang pagi tadi.",
      img: PastryMixBox,
      color: "linear-gradient(135deg,#4a1d96,#6d28d9)",
    },
  ];

  return (
    <div className="dashboard-page">
      <NavbarConsumer activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />
      <main className="dashboard-main">
        <section className="dashboard-hero">
          <div>
            <h1 className="dashboard-hero-title">Halo, Elara</h1>
            <p className="dashboard-hero-subtitle">Temukan makanan berkualitas dengan harga hemat hari ini.</p>
          </div>
          <div className="dashboard-hero-badge">New</div>
        </section>

        <div className="dashboard-search">
          <div className="dashboard-search-icon">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Cari makanan lezat..."
            className="dashboard-search-input"
          />
        </div>

        <div className="dashboard-filter-row">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`filter-pill ${activeFilter === filter ? "active" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2 className="section-heading-title">Jelajahi Kategori</h2>
              <p className="section-heading-text">Cari makanan favorit dengan cepat.</p>
            </div>
            <button className="section-action">Lihat Semua</button>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryImage key={category.label} {...category} />
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2 className="section-heading-title">Promo Spesial Hari Ini</h2>
              <p className="section-heading-text">Jangan lewatkan penawaran terbaik hari ini.</p>
            </div>
            <button className="section-action">Lihat Semua</button>
          </div>
          <div className="dashboard-promo-grid">
            {promos.map((item) => (
              <article key={item.name} className="promo-card">
                <div className="promo-media" style={{ background: item.color }}>
                  <img src={item.img} alt={item.name} className="promo-image-file" />
                  <div className="promo-badge">{item.discount} OFF</div>
                  <div className="promo-rating">
                    <StarIcon filled /> {item.rating}
                  </div>
                </div>
                <div className="promo-content">
                  <div className="promo-header">
                    <div>
                      <h3 className="promo-name">{item.name}</h3>
                      <p className="promo-description">{item.desc}</p>
                    </div>
                    <span className="promo-dist">{item.dist}</span>
                  </div>
                  <div className="promo-footer">
                    <div className="promo-price-row">
                      <div>
                        <div className="promo-price">{item.price}</div>
                        <div className="promo-original">{item.original}</div>
                      </div>
                      <button type="button" className="promo-button" onClick={() => setCartCount((c) => c + 1)}>
                        Pesan Sekarang
                      </button>
                    </div>
                    <div className="promo-meta">
                      <span>
                        <BoxIcon /> {item.stock}
                      </span>
                      <span>
                        <ClockIcon /> {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}