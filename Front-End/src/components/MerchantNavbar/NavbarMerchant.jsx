import React, { useState, useEffect, useRef } from 'react';
import { LeafIcon, NotificationIcon } from "../Icons";
import "./NavbarMerchant.css";

export default function NavbarMerchant({
  activePage,
  setActivePage,
  notifCount,
}) {

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  // Data Dummy isi notifikasi merchant
  const notifications = [
    { id: 1, text: "Pesanan baru! 2 porsi Nasi Bakar menunggu konfirmasi.", time: "2 menit yang lalu", unread: true },
    { id: 2, text: "Listing 'Ayam Goreng' Anda telah habis terjual!", time: "1 jam yang lalu", unread: true },
    { id: 3, text: "Laporan performa mingguan toko Anda sudah siap diunduh.", time: "1 hari yang lalu", unread: false }
  ];

  // Efek untuk menutup popup otomatis ketika klik di luar area notifikasi
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cukup ubah state saja, tanpa fungsi navigate URL
  const goToPage = (page) => {
    setActivePage(page);
  };

  return (
    <nav className="merchant-navbar">
      <div className="merchant-navbar-inner">
        
        <div
          className="nav-brand"
          onClick={() => goToPage("dashboard")}
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-logo">
            <LeafIcon />
          </div>

          <span className="brand-text">FoodSave Business</span>
        </div>

        <div className="nav-links">
          {["dashboard", "explore"].map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`nav-link ${
                activePage === page ? "active" : ""
              }`}
            >
              {page === "dashboard" ? "Dashboard" : "Explore"}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          
          {/* NOTIFIKASI DROPDOWN */}
          <div className="notif-wrapper" ref={notifRef}>
            <button 
              className={`icon-button ${isNotifOpen ? 'active-bell' : ''}`} 
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
            >
              <NotificationIcon />

              {notifCount > 0 && (
                <span className="notif-badge">
                  {notifCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="notif-dropdown">
                <div className="notif-dropdown-header">
                  <h3>Notifikasi</h3>
                  <button className="mark-read-btn">Tandai dibaca</button>
                </div>
                <div className="notif-dropdown-body">
                  {notifications.length === 0 ? (
                    <p className="notif-empty-text">Tidak ada notifikasi baru</p>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className={`notif-item ${notif.unread ? 'unread' : ''}`}>
                        <div className="notif-item-dot-wrapper">
                          {notif.unread && <span className="green-dot-unread"></span>}
                        </div>
                        <div className="notif-item-content">
                          <p className="notif-text">{notif.text}</p>
                          <span className="notif-time">{notif.time}</span>
                        </div>
                      </div>
                    )) 
                  )}
                </div>
                <div className="notif-dropdown-footer">
                  <button type="button">Lihat Semua Notifikasi</button>
                </div>
              </div>
            )}
          </div>

          <button 
            className={`user-button ${activePage === 'profile' ? 'active-user' : ''}`} 
            type="button"
            onClick={() => setActivePage('profile')} // 🟢 Aksi pindah ke halaman profile
          >
            HA
          </button>
        </div>
      </div>
    </nav>
  );
}