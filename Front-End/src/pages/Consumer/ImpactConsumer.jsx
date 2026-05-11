import { useState } from "react";
import NavbarConsumer from "../../components/ConsumerNavbar/NavbarConsumer";
import Footer from "../../components/Footer";
import { TreeIcon, CarIcon, DropletIcon, BoltIcon, ArrowRightIcon } from "../../components/Icons";
import "./ImpactConsumer.css";

export default function ImpactPage() {
  const [activePage, setActivePage] = useState("impact");
  const [cartCount, setCartCount] = useState(0);
  const impactStats = [
    { icon: <TreeIcon />, val: 0, label: "POHON DITANAM" },
    { icon: <CarIcon />, val: "74 km", label: "JARAK MENGEMUDI" },
    { icon: <DropletIcon />, val: 184, label: "MANDI DIHEMAT" },
    { icon: <BoltIcon />, val: "3.750", label: "CHARGE HP" },
  ];

  const sideStats = [
    { icon: "🍱", label: "MAKANAN TERSELAMATKAN", val: "12 Porsi" },
    { icon: "💵", label: "UANG DIHEMAT", val: "Rp 385.000" },
    { icon: "🌿", label: "CO2 DIHEMAT", val: "30 kg" },
    { icon: "📦", label: "ORDERS SELESAI", val: "8 Orders" },
  ];

  return (
    <div className="impact-page">
      <NavbarConsumer activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />
      <main className="impact-main">
        <header className="impact-header">
          <h1 className="impact-title">Dampak Kamu untuk Lingkungan</h1>
          <p className="impact-subtitle">Lihat kontribusi kamu dalam mengurangi food waste dan membantu bumi.</p>
        </header>

        <div className="impact-grid">
          <div className="impact-left">
            <section className="rank-card">
              <div className="rank-header">
                <div className="rank-meta">
                  <div className="rank-badge">
                    <TreeIcon />
                  </div>
                  <div>
                    <div className="rank-note">3 Day Streak Badge</div>
                    <h2 className="rank-title">Eco Starter</h2>
                    <p className="rank-note">8 makanan lagi untuk naik rank</p>
                  </div>
                </div>
                <span className="rank-status">Active Status</span>
              </div>

              <div className="rank-progress">
                <div className="progress-labels">
                  <span />
                  <span>2/10 meals</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" />
                </div>
              </div>

              <button className="rank-button">
                Lihat Rank <ArrowRightIcon />
              </button>
            </section>

            <section className="stats-card">
              <div className="stats-title">
                <h3>Dampak Kamu Setara Dengan</h3>
                <span className="stats-update">Update terbaru</span>
              </div>
              <div className="stats-grid">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="stat-card">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-value">{stat.val}</div>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="banner-card">
              <h3 className="banner-title">Setiap Pesanan Berarti Untuk Bumi Kita</h3>
              <p className="banner-text">Kamu telah berkontribusi mencegah 5.4kg metana dilepaskan ke atmosfer.</p>
              <button className="banner-button">
                Pelajari Metodologi Kami <ArrowRightIcon />
              </button>
            </section>
          </div>

          <aside className="impact-sidebar">
            {sideStats.map((stat) => (
              <section key={stat.label} className="side-card">
                <div className="side-card-content">
                  <div className="side-stat-icon">{stat.icon}</div>
                  <div>
                    <p className="side-stat-label">{stat.label}</p>
                    <p className="side-stat-value">{stat.val}</p>
                  </div>
                </div>
              </section>
            ))}

            <section className="tip-card">
              <p className="tip-title">Tips Hebat!</p>
              <p className="tip-text">
                Pesan 2 porsi lagi hari ini untuk mempertahankan streak kamu dan raih badge eksklusif!
              </p>
            </section>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}