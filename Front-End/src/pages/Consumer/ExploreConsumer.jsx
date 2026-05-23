import { useState } from "react";
import NavbarConsumer from "../../components/Consumer/ConsumerNavbar/NavbarConsumer";
import Footer from "../../components/Footer";
import { SearchIcon, FilterIcon, ChevronDownIcon } from "../../components/Icons";


export default function ExplorePage() {
  const [activePage, setActivePage] = useState("explore");
  const [cartCount, setCartCount] = useState(0);
  const [activeSort, setActiveSort] = useState("Terdekat");

  const sorts = ["Terdekat", "Populer", "Donasi", "Gratis"];

  const items = [
    {
      name: "Pizza Slice Mix (6 pcs)",
      store: "Pizza Hut",
      dist: "1.2 km",
      pickup: "19:00–21:00",
      price: "Rp 20.000",
      original: "Rp 85.000",
      tag: "DONASI",
      color: "linear-gradient(135deg,#7f1d1d,#dc2626)",
    },
    {
      name: "Burger & Fries Pack",
      store: "Burger King",
      dist: "0.8 km",
      pickup: "20:00–22:00",
      price: "FREE",
      original: "Rp 45.000",
      tag: "GRATIS",
      color: "linear-gradient(135deg,#78350f,#d97706)",
    },
    {
      name: "Nasi Goreng Kambing...",
      store: "Kebon Sirih",
      dist: "2.5 km",
      pickup: "21:00–23:00",
      price: "Rp 15.000",
      original: "Rp 40.000",
      tag: "DONASI",
      color: "linear-gradient(135deg,#1b4332,#16a34a)",
    },
    {
      name: "Paket Roti Manis (10 pcs)",
      store: "BreadTalk",
      dist: "1.5 km",
      pickup: "18:00–20:00",
      price: "Rp 30.000",
      original: "Rp 120.000",
      tag: "DONASI",
      color: "linear-gradient(135deg,#5c3d2e,#92400e)",
    },
    {
      name: "Chicken Salad Bowl",
      store: "SaladStop",
      dist: "3.1 km",
      pickup: "19:30–21:30",
      price: "Rp 25.000",
      original: "Rp 75.000",
      tag: "DONASI",
      color: "linear-gradient(135deg,#14532d,#15803d)",
    },
    {
      name: "Bento Box Lunch",
      store: "HokBen",
      dist: "4.5 km",
      pickup: "20:00–22:00",
      price: "FREE",
      original: "Rp 55.000",
      tag: "GRATIS",
      color: "linear-gradient(135deg,#1e3a5f,#1d4ed8)",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarConsumer activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />
      <main className="max-w-[1120px] mx-auto px-6 py-8">
        <section className="mb-4">
          <h1 className="text-4xl font-extrabold text-slate-900">Simpan makanan, hemat uang</h1>
          <p className="text-slate-500 mt-2">Temukan makanan lezat di sekitarmu dengan harga terjangkau.</p>
        </section>

        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></div>
            <input type="text" placeholder="Cari makanan atau restoran..." className="w-full rounded-full border border-gray-200 px-12 py-3 bg-white shadow-sm focus:outline-none focus:border-emerald-500" />
          </div>
          <button className="px-4 py-3 rounded-full border border-gray-200 bg-white flex items-center gap-2"><FilterIcon /> Filter</button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[ ["KATEGORI", "Semua"], ["TIPE HARGA", "Semua Harga"], ["LOKASI", "Semua Lokasi"] ].map(([label, value]) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="text-xs font-bold uppercase text-slate-400 mb-2">{label}</div>
              <div className="flex items-center justify-between text-slate-900">{value} <ChevronDownIcon /></div>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap gap-3 mb-6">
          {sorts.map((sort) => (
            <button key={sort} onClick={() => setActiveSort(sort)} className={`${activeSort === sort ? 'bg-slate-900 text-white' : 'bg-white border border-gray-200 text-slate-700'} px-4 py-2 rounded-full font-bold`}>
              {sort}
            </button>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="min-h-[160px] relative" style={{ background: item.color }}>
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${item.tag === 'GRATIS' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'}`}>{item.tag}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-slate-500">{item.store} · {item.dist}</p>
                <p className="text-sm text-slate-500">Ambil: {item.pickup}</p>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className={`${item.price === 'FREE' ? 'text-emerald-600 font-bold' : 'font-extrabold'}`}>{item.price}</div>
                    <div className="text-xs text-slate-400 line-through">{item.original}</div>
                  </div>
                  <button onClick={() => setCartCount((c) => c + 1)} className="px-4 py-2 rounded-full bg-slate-900 text-white font-bold">+ Tambah</button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold">🗺️ Lihat Peta</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}