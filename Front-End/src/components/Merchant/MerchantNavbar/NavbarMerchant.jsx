import React, { useState, useEffect, useRef } from 'react';
import { LeafIcon, NotificationIcon } from "../../Icons";

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
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="w-full px-12 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => goToPage("dashboard")}> 
          <div className="w-9 h-9 rounded-xl grid place-items-center bg-green-500 text-white">
            <LeafIcon />
          </div>

          <span className="text-[1.1rem] font-extrabold text-slate-900">FoodSave Business</span>
        </div>

        <div className="flex gap-2">
          {["dashboard", "explore"].map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                activePage === page ? "bg-green-500 text-white" : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
              }`}
            >
              {page === "dashboard" ? "Dashboard" : "Explore"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={notifRef}>
            <button 
              className={`w-10 h-10 rounded-lg bg-slate-50 text-slate-600 grid place-items-center hover:bg-emerald-50 transition ${isNotifOpen ? 'ring-2 ring-emerald-200' : ''}`} 
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
            >
              <NotificationIcon />

              {notifCount > 0 && (
                <span className="-top-1 -right-1 absolute w-5 h-5 rounded-full bg-red-600 text-white text-xs font-extrabold grid place-items-center">
                  {notifCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-[320px] rounded-3xl bg-white border border-slate-200 shadow-xl ring-1 ring-black/5 overflow-hidden text-sm text-slate-700">
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <h3 className="text-sm font-semibold text-slate-900">Notifikasi</h3>
                  <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition">
                    Tandai dibaca
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto bg-white">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-7 text-center text-slate-500">Tidak ada notifikasi baru</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`flex gap-3 px-4 py-4 transition ${notif.unread ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
                      >
                        <div className="flex items-start">
                          {notif.unread ? (
                            <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                          ) : (
                            <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-slate-300" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-slate-900 leading-relaxed truncate">{notif.text}</p>
                          <span className="text-xs text-slate-400 mt-2 block">{notif.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
                  <button type="button" className="w-full rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition">
                    Lihat Semua Notifikasi
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            className={`w-9 h-9 rounded-full bg-sky-100 text-sky-900 font-extrabold grid place-items-center ${activePage === 'profile' ? 'ring-2 ring-sky-200' : ''}`} 
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