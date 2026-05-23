import React, { useState } from 'react';
import NavbarMerchant from "../../components/Merchant/MerchantNavbar/NavbarMerchant";
import { LeafIcon } from "../../components/Icons";
import Footer from "../../components/Footer";
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
                    <main className="max-w-[1120px] mx-auto px-6 py-8">
                        {/* Hero Banner */}
                        <header className="relative rounded-2xl overflow-hidden p-8 mb-8 text-white bg-gradient-to-r from-emerald-500 to-emerald-400">
                            <div className="relative z-10">
                                <h1 className="text-2xl font-bold mb-2">Selamat Datang Kembali! 👋</h1>
                                <p className="opacity-90">Kelola bisnis Anda dan bantu kurangi food waste</p>
                            </div>
                            <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/image/waste.jpeg')` }} />
                        </header>

                        {/* Stats Grid */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                            {stats.map((item, index) => (
                                <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm text-slate-500 font-medium">{item.label}</span>
                                        <span className={`p-2 rounded-md ${item.color === 'light-green' ? 'bg-emerald-100 text-emerald-600' : item.color === 'blue' ? 'bg-sky-100 text-sky-600' : item.color === 'purple' ? 'bg-violet-100 text-violet-600' : 'bg-amber-100 text-amber-600'}`}>{item.icon}</span>
                                    </div>
                                    <div className="text-xl font-bold">{item.value}</div>
                                    <div className="text-xs text-slate-400 mt-2">{item.trend || item.sub}</div>
                                </div>
                            ))}
                        </section>

                        {/* Secondary Stats */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                            <div className="bg-white p-5 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-slate-500">Conversion Rate</span>
                                    <span className="text-green-600 font-bold">0%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded mt-3"><div className="h-2 bg-green-500 rounded" style={{ width: '0%' }} /></div>
                            </div>
                            <div className="bg-white p-5 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-slate-500">Total Hemat Ditawarkan</span>
                                    <span className="text-sky-600 font-bold">{listings.length > 0 ? "125K" : "0K"}</span>
                                </div>
                                <p className="text-sm">Membantu pembeli hemat lebih banyak</p>
                            </div>
                            <div className="bg-white p-5 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-slate-500">Impact Score</span>
                                    <span className="text-violet-600 font-bold">{listings.length > 0 ? "5" : "0"}</span>
                                </div>
                                <p className="text-sm">Kontribusi pengurangan food waste</p>
                            </div>
                        </section>

                        {/* Status Row */}
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-lg p-3">✅ Tersedia: <strong>{listings.filter(i => i.status === "Tersedia").length}</strong></div>
                            <div className="flex-1 bg-red-50 border border-red-100 rounded-lg p-3">❌ Expired: <strong>0</strong></div>
                            <div className="flex-1 bg-sky-50 border border-sky-100 rounded-lg p-3">📦 Total Listings: <strong>{listings.length}</strong></div>
                        </div>

                        {/* Listings Section */}
                        <section>
                            <div className="relative mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold">Kelola Listings</h2>
                                    <p className="text-sm text-slate-500">Daftar semua makanan yang Anda tawarkan</p>
                                </div>
                                <button onClick={handleAddNewClick} className="absolute right-0 top-0 bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold">+ Tambah Listing</button>
                            </div>

                            {listings.length === 0 ? (
                                <div className="text-center border-2 border-dashed border-gray-200 rounded-xl p-12">
                                    <div className="text-4xl opacity-60 mb-4">🏪</div>
                                    <h3 className="text-lg font-bold mb-2">Belum Ada Listing</h3>
                                    <p className="text-slate-500 mb-4">Mulai tambahkan makanan surplus untuk dijual dengan harga diskon</p>
                                    <button onClick={handleAddNewClick} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">+ Tambah Listing</button>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 mt-4">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                                            <tr>
                                                <th className="px-6 py-3">MAKANAN</th>
                                                <th className="px-6 py-3">HARGA</th>
                                                <th className="px-6 py-3">STOK</th>
                                                <th className="px-6 py-3">STATUS</th>
                                                <th className="px-6 py-3">PICKUP</th>
                                                <th className="px-6 py-3 text-center">AKSI</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listings.map((item) => (
                                                <tr key={item.id} className="border-t border-gray-100">
                                                    <td className="px-6 py-4 flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-md bg-slate-100 overflow-hidden flex-shrink-0">
                                                            <img src={item.foto} alt={item.nama} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150"; }} />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-900">{item.nama}</div>
                                                            <div className="text-xs text-slate-500">{item.deskripsi}</div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold">Rp {item.hargaDiskon}</span>
                                                            <span className="text-xs text-slate-400 line-through">Rp {item.hargaNormal}</span>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4">{item.stok}</td>

                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium">🟢 {item.status}</span>
                                                    </td>

                                                    <td className="px-6 py-4">{item.pickup}</td>

                                                    <td className="px-6 py-4 text-center">
                                                        <div className="inline-flex items-center justify-center gap-2">
                                                            <button className="p-2 rounded-md hover:bg-slate-50" onClick={() => handleEditClick(item)}>📝</button>
                                                            <button className="p-2 rounded-md hover:bg-red-50 text-red-500" onClick={() => handleDeleteListing(item.id)}>❌</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>

                        {/* Platform Status Footer Section */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl mt-6">
                            <div className="text-center">
                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Platform Status</div>
                                <div className="font-bold">All Systems Operational</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Partners</div>
                                <div className="font-bold">2,450+ Restoran</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Food Saved</div>
                                <div className="font-bold">45,000+ Porsi</div>
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

            <Footer />

            <AddListingModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                editingListing={editingListing}
                onAddListing={handleSaveListing}
            />
        </div>
    );
};