import React, { useState } from 'react';

export const ConsumerDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { name: 'Asian Food', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80' },
        { name: 'Bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
        { name: 'Cafe & Coffee', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80' },
        { name: 'Restaurant', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80' }
    ];

    return (
        <div className="explore-container">
            {/* Navbar */}
            <nav className="explore-nav">
                <div className="nav-left">
                    <div className="nav-logo">FS</div>
                    <div className="brand-info">
                        <span className="brand-name">FoodSave</span>
                        <p className="brand-tagline">Simpan makanan, hemat uang</p>
                    </div>
                </div>
                
                <div className="nav-location">
                    <span className="loc-icon">📍</span>
                    <span>Jakarta Pusat</span>
                    <span className="chevron">›</span>
                </div>

                <div className="nav-right">
                    <button className="nav-link">❤️ Favorit</button>
                    <button className="nav-link">👤 Profile</button>
                    <button className="nav-link logout">🚪 Keluar</button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="explore-main">
                <header className="hero-section">
                    <h1>Halo, goji! 👋</h1>
                    <p>Temukan makanan favorit dengan harga hemat</p>
                    
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input 
                            type="text" 
                            placeholder="Cari restoran atau makanan..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </header>

                {/* Filter Pills */}
                <div className="filter-pills">
                    <button className="pill active">🍽️ Semua</button>
                    <button className="pill">🔥 Promo Spesial</button>
                    <button className="pill">📍 Terdekat</button>
                    <button className="pill">✨ Baru</button>
                    <button className="pill">❤️ Favorit</button>
                </div>

                {/* Categories */}
                <section className="section-container">
                    <h2>Jelajahi Kategori</h2>
                    <div className="category-grid">
                        {categories.map((cat, index) => (
                            <div key={index} className="category-card" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${cat.img})`}}>
                                <h3>{cat.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Restaurants / Listings */}
                <section className="section-container">
                    <div className="section-header">
                        <h2>Semua Restoran</h2>
                        <span className="item-count">0 tempat tersedia</span>
                    </div>
                    
                    <div className="empty-state">
                        <div className="empty-icon">🛍️</div>
                        <h3>Belum Ada Makanan</h3>
                        <p>Belum ada restoran yang menambahkan listing</p>
                    </div>
                </section>
            </main>

            {/* Benefit Banner */}
            <section className="benefit-banner">
                <div className="benefit-item">
                    <div className="icon-circle green">🌱</div>
                    <div>
                        <h4>Ramah Lingkungan</h4>
                        <p>Kurangi food waste bersama-sama</p>
                    </div>
                </div>
                <div className="benefit-item">
                    <div className="icon-circle blue">📈</div>
                    <div>
                        <h4>Hemat Budget</h4>
                        <p>Diskon hingga 70% setiap hari</p>
                    </div>
                </div>
                <div className="benefit-item">
                    <div className="icon-circle orange">⭐</div>
                    <div>
                        <h4>Kualitas Terjamin</h4>
                        <p>Dari restoran terpercaya</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="main-footer">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="nav-logo">FS</div>
                        <span className="brand-name">FoodSave</span>
                        <p>Platform yang menghubungkan restoran dengan pembeli untuk mengurangi food waste</p>
                        <div className="social-icons">
                            <span>fb</span> <span>tw</span> <span>ig</span> <span>in</span>
                        </div>
                    </div>
                    <div className="footer-links">
                        <h4>Tentang Kami</h4>
                        <ul><li>Cara Kerja</li><li>Blog</li><li>Karir</li></ul>
                    </div>
                    <div className="footer-links">
                        <h4>Untuk Bisnis</h4>
                        <ul><li>Daftar Restoran</li><li>Partner Portal</li></ul>
                    </div>
                    <div className="footer-download">
                        <h4>Download App</h4>
                        <button className="app-btn">App Store</button>
                        <button className="app-btn">Google Play</button>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2024 FoodSave Indonesia. All rights reserved.</p>
                    <div className="footer-legal">
                        <span>Syarat & Ketentuan</span>
                        <span>Kebijakan Privasi</span>
                        <span>🇮🇩 Indonesia</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};