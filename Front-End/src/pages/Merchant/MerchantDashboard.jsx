import React, { useState } from 'react';
import NavbarMerchant from "../../components/MerchantNavbar/NavbarMerchant";
import { LeafIcon } from "../../components/Icons";
import "./MerchantDashboard.css";
import AddListingModal from "./AddListingModal";
import ExploreMerchant from "./ExploreMerchant"; 
import ProfileMerchant from "../../components/ProfileMerchant/ProfileMerchant"; 

export const MerchantDashboard = () => {
    const [activePage, setActivePage] = useState("dashboard");
    const [notifCount] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // State untuk menampung data listing yang sedang diedit
    const [editingListing, setEditingListing] = useState(null);

    const [listings, setListings] = useState([
        {
            id: 1,
            nama: "Nasi Bakar",
            deskripsi: "ada pete",
            hargaNormal: "50K",
            hargaDiskon: "25K",
            stok: "5 porsi",
            status: "Tersedia",
            pickup: "17 Mei, 19.50",
            foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150" 
        }
    ]);

    // 🟢 Handler BARU saat tombol "+ Tambah Listing" diklik
    const handleAddNewClick = () => {
        setEditingListing(null); // Pastikan state edit dibersihkan agar form kosong!
        setIsModalOpen(true);    // Buka modal
    };

    // Handler saat tombol pensil (📝) diklik
    const handleEditClick = (listing) => {
        setEditingListing(listing); // Isi data yang mau diedit
        setIsModalOpen(true);       // Buka modal
    };

    // Handler untuk menutup modal dan membersihkan state edit
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingListing(null); // Reset agar kalau tombol tambah diklik form-nya kembali kosong
    };

    // Fungsi submit tunggal (bisa tambah atau edit tergantung kondisi)
    const handleSaveListing = (listingData) => {
        if (editingListing) {
            // Jika sedang edit, update item yang id-nya cocok
            setListings(listings.map(item => item.id === editingListing.id ? { ...item, ...listingData } : item));
        } else {
            // Jika tidak sedang edit, tambah data baru seperti biasa
            setListings([...listings, { id: Date.now(), ...listingData }]);
        }
        handleCloseModal();
    };

    const handleDeleteListing = (id) => {
        setListings(listings.filter(item => item.id !== id));
    };

    const stats = [
        { label: 'Total Pendapatan', value: 'Rp 0K', trend: '+12% dari bulan lalu', icon: '$', color: 'light-green' },
        { label: 'Listing Aktif', value: '0', sub: '0 total porsi', icon: '📦', color: 'blue' },
        { label: 'Terjual', value: '0', sub: 'Performa bagus!', icon: '✔️', color: 'purple' },
        { label: 'Potensi Pendapatan', value: 'Rp 0K', sub: 'Dari listing aktif', icon: '📈', color: 'orange' }
    ];

    const renderContent = () => {
        switch (activePage) {
            case "explore":
                return <ExploreMerchant />;
            case "profile":
                return <ProfileMerchant setActivePage={setActivePage} />; 
            case "dashboard":
            default:
                return (
                    <main className="biz-content">
                        {/* Hero Banner */}
                        <header className="biz-hero">
                            <div className="hero-text">
                                <h1>Selamat Datang Kembali! 👋</h1>
                                <p>Kelola bisnis Anda dan bantu kurangi food waste</p>
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
                                    <div className={`stat-sub ${item.color === 'green' || item.color === 'light-green' ? 'trend-up' : ''}`}>
                                        {item.trend || item.sub}
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Secondary Stats */}
                        <section className="secondary-stats">
                            <div className="mini-card">
                                <div className="mini-header">
                                    <span className="mini-label">Conversion Rate</span>
                                    <span className="mini-value text-green">0%</span>
                                </div>
                                <div className="progress-bar"><div className="progress" style={{width: '0%'}}></div></div>
                            </div>
                            
                            <div className="mini-card">
                                <div className="mini-header">
                                    <span className="mini-label">Total Hemat Ditawarkan</span>
                                    <span className="mini-value text-blue">{listings.length > 0 ? "125K" : "0K"}</span>
                                </div>
                                <p>Membantu pembeli hemat lebih banyak</p>
                            </div>
                            
                            <div className="mini-card">
                                <div className="mini-header">
                                    <span className="mini-label">Impact Score</span>
                                    <span className="mini-value text-purple">{listings.length > 0 ? "5" : "0"}</span>
                                </div>
                                <p>Kontribusi pengurangan food waste</p>
                            </div>
                        </section>

                        {/* Status Row */}
                        <div className="status-row">
                            <div className="status-item green-bg">✅ Tersedia: <strong>{listings.filter(i => i.status === "Tersedia").length}</strong></div>
                            <div className="status-item red-bg">❌ Expired: <strong>0</strong></div>
                            <div className="status-item blue-bg">📦 Total Listings: <strong>{listings.length}</strong></div>
                        </div>

                        {/* Listings Section */}
                        <section className="listings-section">
                            <div className="section-header">
                                <div className="header-text-group">
                                    <h2>Kelola Listings</h2>
                                    <p>Daftar semua makanan yang Anda tawarkan</p>
                                </div>
                                
                                {/* 🟢 Ganti onClick menjadi handleAddNewClick */}
                                <button className="btn-add-first" onClick={handleAddNewClick}>
                                    + Tambah Listing
                                </button>
                            </div>

                            {listings.length === 0 ? (
                                <div className="empty-listing-box">
                                    <div className="empty-biz-icon">🏪</div>
                                    <h3>Belum Ada Listing</h3>
                                    <p>Mulai tambahkan makanan surplus untuk dijual dengan harga diskon</p>
                                    
                                    {/* 🟢 Ganti onClick menjadi handleAddNewClick */}
                                    <button className="btn-add-first" onClick={handleAddNewClick}>
                                        + Tambah Listing
                                    </button>
                                </div>
                            ) : (
                                <div className="listings-table-container">
                                    <table className="listings-table">
                                        <thead>
                                            <tr>
                                                <th>MAKANAN</th>
                                                <th>HARGA</th>
                                                <th>STOK</th>
                                                <th>STATUS</th>
                                                <th>PICKUP</th>
                                                <th>AKSI</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listings.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="td-makanan">
                                                        <div className="product-img-wrapper">
                                                            <img 
                                                                src={item.foto} 
                                                                alt={item.nama} 
                                                                className="product-img"
                                                                onError={(e) => {
                                                                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150";
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="makanan-info">
                                                            <span className="makanan-title">{item.nama}</span>
                                                            <span className="makanan-desc">{item.deskripsi}</span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="harga-wrapper">
                                                            <span className="harga-diskon">Rp {item.hargaDiskon}</span>
                                                            <span className="harga-normal">Rp {item.hargaNormal}</span>
                                                        </div>
                                                    </td>

                                                    <td>{item.stok}</td>

                                                    <td>
                                                        <span className="status-badge">🟢 {item.status}</span>
                                                    </td>

                                                    <td>{item.pickup}</td>

                                                    <td className="td-aksi">                                                      
                                                        <button className="action-btn" onClick={() => handleEditClick(item)}>📝</button>
                                                        
                                                        <button 
                                                            className="action-btn delete-btn" 
                                                            onClick={() => handleDeleteListing(item.id)}
                                                            style={{ color: 'red' }}
                                                        >
                                                            ❌
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>

                        {/* Platform Status Footer Section */}
                        <section className="platform-status-box">
                            <div className="status-col">
                                <div className="status-header-inline">
                                    <span className="dot green"></span>
                                    <p className="label">PLATFORM STATUS</p>
                                </div>
                                <p className="val">All Systems Operational</p>
                            </div>
                            <div className="status-col">
                                <div className="status-header-inline"><p className="label">TOTAL PARTNERS</p></div>
                                <p className="val">2,450+ Restoran</p>
                            </div>
                            <div className="status-col">
                                <div className="status-header-inline"><p className="label">FOOD SAVED</p></div>
                                <p className="val">45,000+ Porsi</p>
                            </div>
                        </section>
                    </main>
                );
        }
    };

    return (
        <div className="business-container">
            <NavbarMerchant activePage={activePage} setActivePage={setActivePage} notifCount={notifCount} />

            {renderContent()}

            {/* FOOTER */}
            <footer className="biz-footer">
                <div className="footer-grid">
                    <div className="footer-info">
                        <div className="footer-brand"><div className="brand-logo"><LeafIcon /></div><span className="brand-text">FoodSave Business</span></div>
                        <p className="footer-desc">Platform manajemen bisnis untuk restoran yang peduli lingkungan</p>
                    </div>
                    <div className="footer-col"><h4>Resources</h4><ul><li>Panduan Memulai</li><li>Best Practices</li><li>API Documentation</li></ul></div>
                    <div className="footer-col"><h4>Support</h4><ul><li>Help Center</li><li>Contact Support</li><li>Partner Success</li></ul></div>
                    <div className="footer-col"><h4>Legal</h4><ul><li>Terms of Service</li><li>Privacy Policy</li><li>Cookie Policy</li></ul></div>
                </div>
            </footer>

            <AddListingModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                editingListing={editingListing}
                onAddListing={handleSaveListing}
            />
        </div>
    );
};