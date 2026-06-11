import React, { useState, useEffect, useCallback, useRef } from 'react';
import NavbarMerchant from "../../components/Merchant/MerchantNavbar/NavbarMerchant";
import Footer from "../../components/Footer";
import { LeafIcon } from "../../components/Icons";
import AddListingModal from "./AddListingModal";
import ProfileMerchant from "../../components/ProfileMerchant/ProfileMerchant";
import { merchantAPI, imageURL } from "../../services/api";
import wasteImg from "../../assets/image/waste.jpeg";

const fmt = (rp) => rp ? `${(rp/1000).toFixed(0)}K` : '0';
const fmtPickup = (s, e) => {
  if (!s) return '-';
  const d = new Date(s);
  const de = e ? new Date(e) : null;
  return `${d.toLocaleDateString('id-ID',{day:'numeric',month:'short'})}, ${d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})}${de?` - ${de.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})}` : ''}`;
};

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150';

export const MerchantDashboard = () => {
    const [activePage, setActivePage]         = useState("dashboard");
    const [notifCount, setNotifCount]         = useState(0); // Diubah default ke 0 agar dinamis
    const [isModalOpen, setIsModalOpen]       = useState(false);
    const [editingListing, setEditingListing] = useState(null);
    const [listings, setListings]             = useState([]);
    const [dashboard, setDashboard]           = useState(null);
    const [loading, setLoading]               = useState(true);
    const [error, setError]                   = useState("");
    
    const businessLocationIdRef               = useRef(null);
    const [profileData, setProfileData]       = useState(null);
    
    const [notifications, setNotifications]   = useState([]);

    const fetchProfile = useCallback(async () => {
        try {
            const res = await merchantAPI.getProfile();
            setProfileData(res.data);
        } catch (e) {
        }
    }, []);

    const fetchNotifications = useCallback(async () => {
        try {
            const res = await merchantAPI.getNotifications();
            
            if (res && res.data) {
                const cleanData = Array.isArray(res.data) ? res.data : (res.data.data || []);
                setNotifications(cleanData);
                setNotifCount(cleanData.length); // Sinkronisasi badge angka merah di bel navbar
            } else {
                const cleanData = Array.isArray(res) ? res : [];
                setNotifications(cleanData);
                setNotifCount(cleanData.length);
            }
        } catch (e) {
            console.error("Gagal memuat notifikasi:", e);
        }
    }, []);

    const fetchDashboard = useCallback(async () => {
        setLoading(true); setError("");
        try {
            const res = await merchantAPI.getDashboard();
            const d = res.data;
            setDashboard(d);

            // Ambil business_location_id langsung dari response dashboard utama (Solusi Pragmatis)
            if (d?.business_location_id) {
                businessLocationIdRef.current = d.business_location_id;
            }

            const foods = d.surplus_foods || [];
            const mapped = foods.map(f => ({
                id:                  f.id,
                nama:                f.name,
                deskripsi:           f.description,
                hargaNormal:         f.original_price,
                hargaDiskon:         f.discount_price,
                stok:                f.quantity_remaining,
                status:              f.status,
                pickup_start_time:   f.pickup_start_time,
                pickup_end_time:     f.pickup_end_time,
                expiry_time:         f.expiry_time,
                business_location_id: f.business_location_id || d.business_location_id,
                foto: imageURL(f.image_url) || FALLBACK_IMG,
            }));
            setListings(mapped);

        } catch(err) { 
            setError(err.message); 
        } finally { 
            setLoading(false); 
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
        fetchProfile();
        fetchNotifications(); // Panggil fungsi notifikasi saat komponen pertama kali di-load
    }, [fetchDashboard, fetchProfile, fetchNotifications]);

    const resolveBusinessLocationId = useCallback(async () => {
        if (businessLocationIdRef.current) return businessLocationIdRef.current;

        const fromDashboard =
            dashboard?.business_location_id ||
            dashboard?.businessLocationId ||
            null;

        if (fromDashboard) {
            businessLocationIdRef.current = fromDashboard;
            return fromDashboard;
        }

        if (listings.length > 0) {
            try {
                const res = await merchantAPI.getSurplusFoodDetail(listings[0].id);
                const detail = res?.data;
                if (detail?.business_location_id) {
                    businessLocationIdRef.current = detail.business_location_id;
                    return detail.business_location_id;
                }
            } catch {
            }
        }

        return null;
    }, [dashboard, listings]);

    const handleAddNewClick = async () => {
        const locationId = await resolveBusinessLocationId();

        if (!locationId) {
            alert("Lokasi bisnis tidak ditemukan.\nMohon pastikan data lokasi bisnis sudah diisi di Profil atau tanyakan tim Support.");
            return;
        }

        setEditingListing(null);
        setIsModalOpen(true);
    };

    const handleEditClick = async (item) => {
        try {
            const res = await merchantAPI.getSurplusFoodDetail(item.id);
            const detail = res.data;
            
            if (detail?.business_location_id && !businessLocationIdRef.current) {
                businessLocationIdRef.current = detail.business_location_id;
            }
            
            setEditingListing({
                ...item,
                ...detail,
                _beId: item.id,
                foto: imageURL(detail?.image_url) || FALLBACK_IMG
            });
        } catch { 
            setEditingListing({ ...item, _beId: item.id }); 
        }
        setIsModalOpen(true);
    };

    const handleCloseModal  = () => { setIsModalOpen(false); setEditingListing(null); };

    const handleSaveListing = async (fields, imageFile) => {
        try {
            if (editingListing?._beId) {
                await merchantAPI.updateSurplusFood(editingListing._beId, fields);
            } else {
                const locationId = businessLocationIdRef.current || await resolveBusinessLocationId();

                if (!locationId) {
                    alert("Lokasi bisnis belum tersedia untuk membuat listing. Silakan coba lagi atau cek data lokasi bisnis Anda.");
                    return;
                }

                const fieldsWithLocation = { ...fields, business_location_id: locationId };
                await merchantAPI.createSurplusFood(fieldsWithLocation, imageFile);
            }
            handleCloseModal();
            await fetchDashboard();
        } catch(err) {
            alert("Gagal menyimpan: " + err.message);
        }
    };

    const handleDeleteListing = async (id) => {
        if (!window.confirm("Hapus listing ini?")) return;
        try { 
            await merchantAPI.deleteSurplusFood(id); 
            await fetchDashboard(); 
        } catch(err) { 
            alert("Gagal menghapus: " + err.message); 
        }
    };

    const conversionRate = dashboard && dashboard.active_menu > 0
        ? Math.round((dashboard.sold_menu / dashboard.active_menu)*100)
        : 0;

    const impactScore = dashboard && dashboard.sold_menu > 0
        ? (dashboard.sold_menu * 2.5).toFixed(1)
        : '0';

    const potensiPendapatan = listings
        .filter(item => item.status === 'active' || item.status === 'available')
        .reduce((sum, item) => sum + (item.stok * item.hargaDiskon), 0);

    const stats = [
        {
            label: 'Total Pendapatan',
            value: dashboard ? `Rp ${fmt(dashboard.total_revenue)}` : 'Rp 0K',
            trend: dashboard && dashboard.total_revenue > 0 ? 'Bagus! Seluruh pesanan selesai' : 'Belum ada pendapatan masuk',
            icon: '💰', iconBg: 'bg-[#e6f7ed] text-[#16a34a]',
            subClass: dashboard && dashboard.total_revenue > 0 ? 'text-[#16a34a] font-medium' : 'text-[#94a3b8]'
        },
        {
            label: 'Listing Aktif',
            value: dashboard ? String(dashboard.active_menu ?? 0) : '0',
            sub: `${dashboard?.active_menu ?? 0} jenis menu sedang tayang`,
            icon: '📦', iconBg: 'bg-[#dbeafe]', subClass: 'text-[#94a3b8]'
        },
        {
            label: 'Terjual',
            value: dashboard ? String(dashboard.sold_menu ?? 0) : '0',
            sub: dashboard && dashboard.sold_menu > 0 ? 'Performa penjualan mantap!' : 'Ayo raih penjualan pertamamu!',
            icon: '✔️', iconBg: 'bg-[#f3e8ff]',
            subClass: dashboard && dashboard.sold_menu > 0 ? 'text-[#a855f7] font-medium' : 'text-[#94a3b8]'
        },
        {
            label: 'Potensi Pendapatan',
            value: `Rp ${fmt(potensiPendapatan)}`,
            sub: 'Estimasi dari sisa stok aktif',
            icon: '📈', iconBg: 'bg-[#ffedd5]', subClass: 'text-[#94a3b8]'
        },
    ];

    const renderContent = () => {
        switch(activePage) {
            case "profile": return <ProfileMerchant setActivePage={setActivePage} onProfileUpdate={fetchProfile} />;
            default: return (
                <main className="py-[30px] px-[4%]">
                    <header className="bg-gradient-to-r from-[#65bd85] to-[#adc2b6] rounded-[16px] p-[40px] text-white relative overflow-hidden mb-[30px]">
                        <div className="relative z-10 font-medium">
                            <h1 className="text-[1.8rem] mb-[10px]">Selamat Datang Kembali! 👋</h1>
                            <p>Kelola bisnis Anda dan bantu kurangi food waste</p>
                        </div>
                        <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay z-0"
                            style={{ backgroundImage: `url(${wasteImg})` }}></div>
                    </header>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex justify-between items-center">
                            <span>⚠️ {error}</span>
                            <button onClick={fetchDashboard} className="text-red-500 font-bold text-xs hover:underline">Coba Lagi</button>
                        </div>
                    )}

                    <section className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[20px] mb-[25px]">
                        {stats.map((item, index) => (
                            <div key={index} className="bg-white p-[20px] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                                <div className="flex justify-between mb-[15px]">
                                    <span className="text-[#64748b] text-[0.9rem] font-medium">{item.label}</span>
                                    <span className={`p-[8px] rounded-[8px] text-[1.2rem] w-[40px] h-[40px] flex items-center justify-center font-bold ${item.iconBg}`}>{item.icon}</span>
                                </div>
                                <div className="text-[1.5rem] font-bold mb-[5px]">{item.value}</div>
                                <div className={`text-[0.8rem] ${item.subClass}`}>{item.trend || item.sub}</div>
                            </div>
                        ))}
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] mb-[20px]">
                        <div className="bg-white p-[20px] rounded-[12px]">
                            <div className="flex justify-between items-center mb-[15px]">
                                <span className="inline-block text-[#64748b] text-[0.85rem] m-0">Conversion Rate</span>
                                <span className="text-[1.2rem] font-bold text-[#16a34a]">{conversionRate}%</span>
                            </div>
                            <div className="h-[8px] bg-[#f1f5f9] rounded-[4px] mt-[10px]">
                                <div className="h-full rounded-[4px] bg-[#16a34a]"
                                    style={{ width: `${Math.min(100, conversionRate)}%` }}></div>
                            </div>
                        </div>
                        <div className="bg-white p-[20px] rounded-[12px]">
                            <div className="flex justify-between items-center mb-[15px]">
                                <span className="inline-block text-[#64748b] text-[0.85rem] m-0">Total Hemat Ditawarkan</span>
                                <span className="text-[1.2rem] font-bold text-[#2563eb]">Rp {fmt(dashboard?.total_discount)}</span>
                            </div>
                            <p className="text-[0.8rem] m-0 font-medium">Membantu pembeli hemat lebih banyak</p>
                        </div>
                        <div className="bg-white p-[20px] rounded-[12px]">
                            <div className="flex justify-between items-center mb-[15px]">
                                <span className="inline-block text-[#64748b] text-[0.85rem] m-0">Impact Score</span>
                                <span className="text-[1.2rem] font-bold text-[#9333ea]">{impactScore} </span>
                            </div>
                            <p className="text-[0.8rem] m-0 font-medium">Kontribusi pengurangan food waste</p>
                        </div>
                    </section>

                    <div className="flex flex-col lg:flex-row gap-[15px] mb-[30px]">
                        <div className="flex-1 p-[12px] rounded-[8px] text-[0.9rem] bg-[#f0fdf4] border border-[#dcfce7]">
                            ✅ Tersedia (Belum Expired): <strong>{dashboard?.available_menu ?? 0}</strong>
                        </div>
                        <div className="flex-1 p-[12px] rounded-[8px] text-[0.9rem] bg-[#fef2f2] border border-[#fee2e2]">
                            ❌ Expired: <strong>{dashboard?.expired_menu ?? 0}</strong>
                        </div>
                        <div className="flex-1 p-[12px] rounded-[8px] text-[0.9rem] bg-[#eff6ff] border border-[#dbeafe]">
                            📦 Total Jenis Makanan: <strong>{listings.length}</strong>
                        </div>
                    </div>

                    <section className="relative w-full">
                        <div className="pr-[180px] mb-[30px] relative">
                            <div>
                                <h2 className="text-[28px] font-bold text-[#1e293b] m-0 mb-[6px]">Kelola Listings</h2>
                                <p className="text-[15px] text-[#64748b] m-0">Daftar semua makanan yang Anda tawarkan</p>
                            </div>
                            <button className="absolute top-[8px] right-0 bg-[#16a34a] hover:bg-[#15803d] text-white border-none py-[12px] px-[24px] rounded-[8px] font-semibold text-[14px] cursor-pointer transition-colors duration-200"
                                onClick={handleAddNewClick}>
                                + Tambah Listing
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-10 text-slate-400">Memuat data...</div>
                        ) : listings.length === 0 ? (
                            <div className="text-center p-[60px] border-2 border-dashed border-[#e2e8f0] rounded-[12px]">
                                <div className="text-[3rem] mb-[20px] opacity-50">🏪</div>
                                <h3 className="font-bold text-lg mb-1">Belum Ada Listing</h3>
                                <p className="text-sm text-slate-500">Mulai tambahkan makanan surplus untuk dijual dengan harga diskon</p>
                                <button className="mt-[20px] bg-[#16a34a] hover:bg-[#15803d] text-white border-none py-[12px] px-[24px] rounded-[8px] font-semibold text-[14px] cursor-pointer transition-colors duration-200"
                                    onClick={handleAddNewClick}>
                                    + Tambah Listing
                                </button>
                            </div>
                        ) : (
                            <div className="w-full bg-white rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden border border-[#f1f5f9] mt-[24px]">
                                <table className="w-full border-collapse text-left text-[14px]">
                                    <thead>
                                        <tr>
                                            {['MAKANAN', 'HARGA', 'STOK', 'STATUS', 'PICKUP', 'AKSI'].map(h => (
                                                <th key={h} className="bg-[#f8fafc] text-[#64748b] font-semibold text-[12px] py-[16px] px-[24px] uppercase tracking-[0.5px] border-b border-[#f1f5f9]">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listings.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/80">
                                                <td className="py-[16px] px-[24px] border-b border-[#f1f5f9] align-middle">
                                                    <div className="flex items-center gap-[16px]">
                                                        <img
                                                            src={item.foto}
                                                            alt={item.nama}
                                                            className="w-[48px] h-[48px] rounded-[8px] object-cover bg-[#f1f5f9] shrink-0"
                                                            onError={e => { e.target.src = FALLBACK_IMG; }}
                                                        />
                                                        <div>
                                                            <div className="font-semibold text-[#0f172a] text-[15px]">{item.nama}</div>
                                                            <div className="text-[12px] text-[#64748b]">{item.deskripsi}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-[16px] px-[24px] border-b border-[#f1f5f9] align-middle">
                                                    <div className="font-semibold text-[14px]">Rp {fmt(item.hargaDiskon)}</div>
                                                    <div className="text-[12px] text-[#94a3b8] line-through">Rp {fmt(item.hargaNormal)}</div>
                                                </td>
                                                <td className="py-[16px] px-[24px] border-b border-[#f1f5f9] align-middle">{item.stok}</td>
                                                <td className="py-[16px] px-[24px] border-b border-[#f1f5f9] align-middle">
                                                    <span className={`py-[6px] px-[12px] rounded-[20px] text-[12px] font-medium ${item.status === 'available' || item.status === 'active' ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>
                                                        {item.status === 'available' || item.status === 'active' ? '🟢 Tersedia' : `🔴 ${item.status}`}
                                                    </span>
                                                </td>
                                                <td className="py-[16px] px-[24px] border-b border-[#f1f5f9] align-middle text-[13px]">{fmtPickup(item.pickup_start_time, item.pickup_end_time)}</td>
                                                <td className="text-center align-middle py-[10px] px-[24px] border-b border-[#f1f5f9]">
                                                    <div className="inline-flex gap-[12px]">
                                                        <button className="bg-transparent border-none cursor-pointer text-[16px] p-[6px] rounded-[6px] hover:bg-[#f1f5f9]" onClick={() => handleEditClick(item)}>📝</button>
                                                        <button className="bg-transparent border-none cursor-pointer text-[16px] p-[6px] rounded-[6px] hover:bg-[#fee2e2]" onClick={() => handleDeleteListing(item.id)}>❌</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </main>
            );
        }
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <NavbarMerchant
                activePage={activePage}
                setActivePage={setActivePage}
                notifCount={notifCount}
                profileData={profileData}
                notificationsFromBE={notifications} // Oper state notifikasi ke Navbar di sini
            />
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