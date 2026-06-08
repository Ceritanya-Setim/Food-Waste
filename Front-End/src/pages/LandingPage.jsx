import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLandingPage from '../components/NavbarLandingPage';
import { SearchIcon, WalletIcon, ShopBagIcon, MoneyIcon, UsersIcon, LeafIcon } from '../components/Icons';
import landingpage from '../assets/image/landingpage.jpeg';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar diletakkan di sini agar berada di atas halaman */}
      <NavbarLandingPage />

      {/* Pembungkus konten utama */}
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-20 space-y-28">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 pt-10">
          <div className="space-y-7">
            <h1 className="text-5xl font-extrabold text-slate-950 leading-[1.15]">
              Selamatkan Makanan,<br />
              <span className="text-[#0B7231]">Selamatkan Bumi.</span>
            </h1>
            <p className="text-slate-700 text-lg leading-relaxed max-w-lg">
              Makan Enak, Harga Hemat. Nikmati pilihan beragam dari resto favoritmu dengan harga hingga 70% lebih murah sambil menjaga keberlanjutan bumi.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => navigate('/register')}
                className="bg-[#0B7231] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-800 transition shadow-lg"
              >
                Mulai Selamatkan Makanan
              </button>
              <button
                onClick={() => navigate('/login')}
                className="text-[#0B7231] bg-white border border-[#0B7231]/40 px-8 py-3.5 rounded-xl font-bold hover:bg-green-50 transition shadow-sm"
              >
                Masuk ke Akun
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src={landingpage}
              alt="Tatanan makanan lezat"
              className="rounded-[32px] object-cover aspect-[4/3] w-full shadow-2xl"
            />
            <div className="absolute bottom-6 left-6 bg-white p-5 rounded-3xl shadow-2xl flex items-start gap-4 border border-gray-100 max-w-sm">
              <div className="w-12 h-12 rounded-2xl grid place-items-center bg-green-100 text-[#0B7231] flex-shrink-0 shadow-inner">
                <LeafIcon size={26} />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-950">Sustainability Leader</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">Telah menyelamatkan 150+ porsi makanan</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="text-center space-y-16">
          <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-950">Cara Kerja Kami</h2>
              <p className="text-slate-700 max-w-xl mx-auto leading-relaxed">Mulai langkah kecilmu untuk perubahan besar bagi planet ini.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { icon: SearchIcon, title: '1. Cari Makanan', desc: 'Temukan restoran, kafe, dan toko roti di sekitarmu yang memiliki surplus makanan lezat hari ini.' },
              { icon: WalletIcon, title: '2. Pesan & Bayar', desc: 'Pesan langsung melalui aplikasi dengan diskon besar hingga 70% dari harga reguler.' },
              { icon: ShopBagIcon, title: '3. Ambil di Lokasi', desc: 'Tunjukkan bukti pesananmu di aplikasi saat mengambil makanan di lokasi sesuai jadwal.' },
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-50 p-10 rounded-[32px] space-y-5 border border-gray-100 shadow-sm transition hover:shadow-md">
                <div className="w-16 h-16 rounded-2xl grid place-items-center bg-green-100 text-[#0B7231] shadow-inner">
                  <step.icon size={28}/>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-950">{step.title}</h3>
                <p className="text-slate-700 text-base leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section>
          <div className="bg-[#0B7231] text-white rounded-[40px] p-20 text-center space-y-12 shadow-inner">
            <div className="flex items-center justify-center gap-2 border border-white/20 text-green-100 text-xs font-bold uppercase tracking-wider py-2 px-5 rounded-full mx-auto w-fit bg-white/10 shadow-inner">
              DAMPAK NYATA BERSAMA
            </div>
            <h2 className="text-5xl font-extrabold leading-tight max-w-3xl mx-auto">Mari Bersama Menghijaukan Bumi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto pt-8">
              {[
                { value: '150+', label: 'PORSI MAKANAN DISELAMATKAN' },
                { value: '320k', label: 'KORBAN TRUK MAKANAN' },
                { value: '2,500+', label: 'MITRA RESTORAN' },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="text-7xl font-extrabold tracking-tighter">{stat.value}</div>
                  <div className="text-xs font-semibold text-green-100 uppercase tracking-widest">{stat.label}</div>
                  <div className="w-16 h-1.5 bg-white mx-auto mt-6 rounded-full"></div>
                </div>
              ))}
            </div>
            <button className="bg-white text-[#0B7231] px-10 py-4 rounded-xl font-bold hover:bg-green-50 transition shadow-lg mt-8">Lihat Laporan Dampak Lengkap</button>
          </div>
        </section>

        {/* Partner Section */}
        <section className="text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-950">Jadi Mitra FoodSave</h2>
            <p className="text-slate-700 max-w-xl mx-auto leading-relaxed">Bergabunglah dengan ratusan bisnis kuliner yang telah berkontribusi bagi bumi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { icon: MoneyIcon, title: 'Ubah Limbah Jadi Rupiah', desc: 'Dapatkan pendapatan tambahan dari makanan yang tidak terjual di akhir hari.' },
              { icon: UsersIcon, title: 'Jangkau Pelanggan Baru', desc: 'Perkenalkan brand Anda kepada komunitas pecinta lingkungan yang terus berkembang.' },
              { icon: LeafIcon, title: 'Kontribusi Nyata Lingkungan', desc: 'Kurangi jejak karbon bisnis Anda dengan memastikan tidak ada makanan yang terbuang.' },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[32px] space-y-5 shadow-2xl border border-gray-100 transition hover:shadow-xl hover:border-gray-100/50">
                <div className="w-20 h-20 rounded-full grid place-items-center bg-green-100 text-[#0B7231] shadow-inner">
                  <benefit.icon size={38} strokeWidth={2}/>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-950 leading-tight pt-1">{benefit.title}</h3>
                <p className="text-slate-700 text-base leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#0B7231] text-white px-12 py-3.5 rounded-xl font-bold hover:bg-green-800 transition shadow-lg mt-14"
          >
            Daftar sebagai Mitra
          </button>
        </section>
      </div>
    </div>
  );
}