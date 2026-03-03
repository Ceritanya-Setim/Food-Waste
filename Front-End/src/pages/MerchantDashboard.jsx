import React from 'react';
export const MerchantDashboard = () => {
    // Data dummy untuk statistik
    const stats = [
        { label: 'Total Pendapatan', value: 'Rp 0K', trend: '+12% dari bulan lalu', icon: '💰', color: 'green' },
        { label: 'Listing Aktif', value: '0', sub: '0 total porsi', icon: '📦', color: 'blue' },
        { label: 'Terjual', value: '0', sub: 'Performa bagus!', icon: '✅', color: 'purple' },
        { label: 'Potensi Pendapatan', value: 'Rp 0K', sub: 'Dari listing aktif', icon: '📈', color: 'orange' }
    ];

    return (
        <div className="business-container">
            {/* Navigation */}
            <nav className="biz-nav">
                <div className="biz-nav-left">
                    <div className="biz-logo-icon">🏪</div>
                    <div className="biz-brand">
                        <span className="biz-name">FoodSave Business</span>
                        <span className="biz-user">elara</span>
                    </div>
                </div>
                <div className="biz-nav-center">
                    <button className="nav-item active">📊 Dashboard</button>
                    <button className="nav-item">📋 Listings</button>
                    <button className="nav-item">📈 Analytics</button>
                </div>
                <div className="biz-nav-right">
                    <span className="biz-icon">🔔</span>
                    <span className="biz-icon">👤 Profile</span>
                    <button className="biz-logout">🚪 Keluar</button>
                </div>
            </nav>

            <main className="biz-content">
                {/* Hero Banner */}
                <header className="biz-hero">
                    <div className="hero-text">
                        <h1>Selamat Datang Kembali! 👋</h1>
                        <p>Kelola bisnis Anda dan bantu kurangi food waste</p>
                        <button className="btn-add-hero">+ Tambah Listing Baru</button>
                    </div>
                    <div className="hero-image-overlay"></div>
                </header>

                {/* Stats Grid */}
                <section className="stats-grid">
                    {stats.map((item, index) => (
                        <div key={index} className="stat-card">
                            <div className="stat-header">
                                <span className="stat-label">{item.label}</span>
                                <span className={`stat-icon-bg ${item.color}`}>{item.icon}</span>
                            </div>
                            <div className="stat-value">{item.value}</div>
                            <div className={`stat-sub ${item.color === 'green' ? 'trend-up' : ''}`}>
                                {item.trend || item.sub}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Secondary Stats */}
                <section className="secondary-stats">
                    <div className="mini-card">
                        <span className="mini-label">Conversion Rate</span>
                        <span className="mini-value green-text">0%</span>
                        <div className="progress-bar"><div className="progress" style={{width: '0%'}}></div></div>
                    </div>
                    <div className="mini-card">
                        <span className="mini-label">Total Hemat Ditawarkan</span>
                        <span className="mini-value blue-text">0K</span>
                        <p>Membantu pembeli hemat lebih banyak</p>
                    </div>
                    <div className="mini-card">
                        <span className="mini-label">Impact Score</span>
                        <span className="mini-value purple-text">0</span>
                        <p>Kontribusi pengurangan food waste</p>
                    </div>
                </section>

                {/* Status Row */}
                <div className="status-row">
                    <div className="status-item green-bg">✅ Tersedia: <strong>0</strong></div>
                    <div className="status-item red-bg">❌ Expired: <strong>0</strong></div>
                    <div className="status-item blue-bg">📦 Total Listings: <strong>0</strong></div>
                </div>

                {/* Listings Section */}
                <section className="listings-section">
                    <div className="section-header">
                        <div>
                            <h2>Kelola Listings</h2>
                            <p>Daftar semua makanan yang Anda tawarkan</p>
                        </div>
                        <button className="btn-add-black">+ Tambah Listing</button>
                    </div>

                    <div className="empty-listing-box">
                        <div className="empty-biz-icon">🏪</div>
                        <h3>Belum Ada Listing</h3>
                        <p>Mulai tambahkan makanan surplus untuk dijual dengan harga diskon</p>
                        <button className="btn-add-first">+ Tambah Listing Pertama</button>
                    </div>
                </section>

                {/* Platform Status Footer Section */}
                <section className="platform-status-box">
                    <div className="status-col">
                        <span className="dot green"></span>
                        <div>
                            <p className="label">PLATFORM STATUS</p>
                            <p className="val">All Systems Operational</p>
                        </div>
                    </div>
                    <div className="status-col">
                        <div>
                            <p className="label">TOTAL PARTNERS</p>
                            <p className="val">2,450+ Restoran</p>
                        </div>
                    </div>
                    <div className="status-col">
                        <div>
                            <p className="label">FOOD SAVED</p>
                            <p className="val">45,000+ Porsi</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Business Footer */}
            <footer className="biz-footer">
                <div className="footer-grid">
                    <div className="footer-info">
                        <h3>FoodSave Business</h3>
                        <p>Platform manajemen bisnis untuk restoran yang peduli lingkungan</p>
                    </div>
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul><li>Panduan Memulai</li><li>Best Practices</li><li>API Documentation</li></ul>
                    </div>
                    <div className="footer-col">
                        <h4>Support</h4>
                        <ul><li>Help Center</li><li>Contact Support</li><li>Partner Success</li></ul>
                    </div>
                    <div className="footer-col">
                        <h4>Legal</h4>
                        <ul><li>Terms of Service</li><li>Privacy Policy</li><li>Cookie Policy</li></ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};