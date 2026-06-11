import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { LeafIcon, NotificationIcon } from "../../Icons";
import { imageURL } from "../../../services/api";

const PROFILE_FALLBACK = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=80";

export default function NavbarMerchant({
  activePage,
  setActivePage,
  notifCount,
  profileData,
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [imgError, setImgError]       = useState(false);
  const notifRef = useRef(null);

  const notifications = [
    { id: 1, text: "Pesanan baru! 2 porsi Nasi Bakar menunggu konfirmasi.", time: "2 menit yang lalu", unread: true },
    { id: 2, text: "Listing 'Ayam Goreng' Anda telah habis terjual!", time: "1 jam yang lalu", unread: true },
    { id: 3, text: "Laporan performa mingguan toko Anda sudah siap diunduh.", time: "1 hari yang lalu", unread: false }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset imgError kalau profileData berubah
  useEffect(() => { setImgError(false); }, [profileData]);

  const profileImgSrc = profileData?.profile_image_url
    ? imageURL(profileData.profile_image_url)
    : null;

  const initials = profileData?.full_name
    ? profileData.full_name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "M";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div className="w-full px-12 h-16 flex items-center justify-between gap-4">

        {/* Brand Logo & Text */}
        <Link
          to="/merchant/dashboard"
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setActivePage && setActivePage("dashboard")}
        >
          <div className="w-9 h-9 rounded-[0.8rem] grid place-items-center bg-green-600 text-white">
            <LeafIcon />
          </div>
          <span className="text-[1.1rem] font-extrabold text-slate-900">FoodSave Business</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-2">
          <Link
            to="/MerchantDashboard"
            onClick={() => setActivePage && setActivePage("dashboard")}
            className={`py-2 px-3.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 ease-in-out flex items-center select-none ${
              activePage === "dashboard"
                ? "bg-green-700 text-white"
                : "bg-transparent text-slate-600 hover:bg-slate-50"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/ExploreMerchant"
            className={`py-2 px-3.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 ease-in-out flex items-center select-none ${
              window.location.pathname === "/ExploreMerchant"
                ? "bg-green-700 text-white"
                : "bg-transparent text-slate-600 hover:bg-slate-50"
            }`}
          >
            Explore
          </Link>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3">

          {/* NOTIFIKASI DROPDOWN */}
          <div className="relative" ref={notifRef}>
            <button
              className={`relative w-10 h-10 rounded-[0.9rem] text-slate-600 grid place-items-center cursor-pointer transition-colors duration-200 border-none ${
                isNotifOpen
                  ? 'bg-blue-50 text-slate-900'
                  : 'bg-slate-50 hover:bg-blue-50 hover:text-slate-900'
              }`}
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
            >
              <NotificationIcon />
              {notifCount > 0 && (
                <span className="absolute -top-[0.35rem] -right-[0.35rem] w-5 h-5 rounded-full bg-red-600 text-white text-[0.65rem] font-extrabold grid place-items-center">
                  {notifCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="text-sm font-bold text-slate-800">Notifikasi</h3>
                  <button className="text-xs text-green-600 hover:text-green-700 font-medium cursor-pointer bg-transparent border-none">Tandai dibaca</button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-8">Tidak ada notifikasi baru</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-slate-50 flex gap-3 hover:bg-slate-50 transition-colors duration-150 last:border-b-0 ${
                          notif.unread ? 'bg-green-50/40 hover:bg-green-50/80' : ''
                        }`}
                      >
                        <div className="flex items-start pt-1">
                          {notif.unread && <span className="w-2 h-2 rounded-full bg-green-600 inline-block"></span>}
                        </div>
                        <div className="flex-1 flex flex-col gap-0.5">
                          <p className="text-xs text-slate-700 leading-relaxed">{notif.text}</p>
                          <span className="text-[10px] text-slate-400">{notif.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
                  <button type="button" className="text-xs font-bold text-green-600 hover:text-green-700 w-full cursor-pointer bg-transparent border-none">
                    Lihat Semua Notifikasi
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PROFILE BUTTON — tampilkan foto jika ada, fallback ke inisial */}
          <button
            className={`w-9 h-9 rounded-full overflow-hidden grid place-items-center cursor-pointer transition-all border-2 select-none ${
              activePage === 'profile'
                ? 'border-green-600 ring-2 ring-green-600 ring-offset-1'
                : 'border-slate-200 hover:border-green-400'
            }`}
            type="button"
            onClick={() => setActivePage && setActivePage('profile')}
            title={profileData?.full_name || "Profil"}
          >
            {profileImgSrc && !imgError ? (
              <img
                src={profileImgSrc}
                alt={profileData?.full_name || "Profil"}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="w-full h-full rounded-full bg-blue-100 text-blue-900 font-extrabold text-xs grid place-items-center">
                {initials}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}