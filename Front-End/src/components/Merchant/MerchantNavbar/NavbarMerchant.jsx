import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { LeafIcon, NotificationIcon } from "../../Icons";
import { imageURL } from "../../../services/api";

const PROFILE_FALLBACK = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=80";

const formatTimeAgo = (dateString) => {
  if (!dateString) return "-";
  const now = new Date();
  const past = new Date(dateString);
  
  const diffInMs = now.getTime() - past.getTime();
  
  if (diffInMs < 0) return "Baru saja"; // Jaga-jaga jika clock skew/beda detik server

  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMins < 1) return "Baru saja";
  if (diffInMins < 60) return `${diffInMins} menit yang lalu`;
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
  return `${diffInDays} hari yang lalu`;
};

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
};

export default function NavbarMerchant({
  activePage,
  setActivePage,
  profileData,
  notificationsFromBE = [] 
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [imgError, setImgError]   = useState(false);
  const notifRef = useRef(null);
  console.log("=== DEBUG NAVBAR ===");
  console.log("Data yang diterima Navbar:", notificationsFromBE);

  const getCleanNotif = () => {
    if (!notificationsFromBE) return [];
    if (Array.isArray(notificationsFromBE)) return notificationsFromBE;
    
    if (notificationsFromBE.data && Array.isArray(notificationsFromBE.data)) {
      return notificationsFromBE.data;
    }
    
    if (notificationsFromBE.data?.data && Array.isArray(notificationsFromBE.data.data)) {
      return notificationsFromBE.data.data;
    }
    
    return [];
  };

  const cleanNotifArray = getCleanNotif();

  // Filter jumlah counter status pending/waiting secara case-insensitive
  const autoNotifCount = cleanNotifArray.filter((notif) => {
    const statusUpper = notif?.status ? notif.status.toUpperCase() : "";
    return statusUpper === "PENDING" || statusUpper === "WAITING";
  }).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { setImgError(false); }, [profileData]);

  const profileImgSrc = profileData?.profile_image_url
    ? imageURL(profileData.profile_image_url)
    : null;

  const initials = profileData?.full_name
    ? profileData.full_name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "M";

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    console.log("User logged out");
  };

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
              {autoNotifCount > 0 && (
                <span className="absolute -top-[0.35rem] -right-[0.35rem] w-5 h-5 rounded-full bg-red-600 text-white text-[0.65rem] font-extrabold grid place-items-center">
                  {autoNotifCount}
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
                  {cleanNotifArray.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-8">Tidak ada notifikasi baru</p>
                  ) : (
                    cleanNotifArray.map((notif) => {
                      const statusUpper = notif?.status ? notif.status.toUpperCase() : "";
                      const isUnread = statusUpper === "PENDING" || statusUpper === "WAITING";

                      return (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-slate-50 flex gap-3 hover:bg-slate-50 transition-colors duration-150 last:border-b-0 ${
                            isUnread ? 'bg-green-50/40 hover:bg-green-50/80' : ''
                          }`}
                        >
                          <div className="flex items-start pt-1">
                            {isUnread && <span className="w-2 h-2 rounded-full bg-green-600 inline-block"></span>}
                          </div>
                          <div className="flex-1 flex flex-col gap-0.5">
                            <p className="text-xs text-slate-700 leading-relaxed">
                              Pesanan baru dari <span className="font-semibold text-slate-900">{notif.name || "Pelanggan"}</span>! Total <span className="font-medium text-green-600">{formatRupiah(notif.total_price)}</span>. 
                              {notif.pickup_code && <span> (Kode: <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[11px] font-bold">{notif.pickup_code}</span>)</span>}
                            </p>
                            <span className="text-[10px] text-slate-400">{formatTimeAgo(notif.order_time)}</span>
                          </div>
                        </div>
                      );
                    })
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

          {/* PROFILE BUTTON */}
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

          {/* TOMBOL LOGOUT */}
          <Link
            to="/login"
            onClick={handleLogout}
            className="w-9 h-9 rounded-[0.9rem] bg-red-50 text-red-600 grid place-items-center cursor-pointer transition-all duration-200 hover:bg-red-600 hover:text-white border-none"
            title="Keluar"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" 
              />
            </svg>
          </Link>

        </div>
      </div>
    </nav>
  );
}