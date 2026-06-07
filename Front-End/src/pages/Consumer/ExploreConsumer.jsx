import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NavbarConsumer from "../../components/Consumer/ConsumerNavbar/NavbarConsumer";
import Footer from "../../components/Footer";
import {
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
} from "../../components/Icons";

export default function ExplorePage() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("explore");
  const [cartCount, setCartCount] = useState(0);
  const [activeSort, setActiveSort] = useState("Terdekat");

  const items = [
    {
      id: "pizza-slice-mix",
      name: "Pizza Slice Mix (6 pcs)",
      store: "Pizza Hut",
      dist: "1.2 km",
      pickup: "19:00–21:00",
      price: "Rp 20.000",
      original: "Rp 85.000",
      tag: "Gratis",
      color: "linear-gradient(135deg,#7f1d1d,#dc2626)",
      image: pizzaslice,
    },
    {
      id: "burger-fries-pack",
      name: "Burger & Fries Pack",
      store: "Burger King",
      dist: "0.8 km",
      pickup: "20:00–22:00",
      price: "FREE",
      original: "Rp 45.000",
      tag: "Donasi",
      color: "linear-gradient(135deg,#78350f,#d97706)",
      image: burgerFries, // FIX: Sudah disamakan dengan nama import di atas
    },
    {
      id: "nasi-goreng-kambing",
      name: "Nasi Goreng Kambing Spesial",
      store: "Kebon Sirih",
      dist: "2.5 km",
      pickup: "21:00–23:00",
      price: "Rp 15.000",
      original: "Rp 40.000",
      tag: "Terdekat",
      color: "linear-gradient(135deg,#1b4332,#16a34a)",
      image: nasgorKambing,
    },
    {
      id: "paket-roti-manis",
      name: "Paket Roti Manis (10 pcs)",
      store: "BreadTalk",
      dist: "1.5 km",
      pickup: "18:00–20:00",
      price: "Rp 30.000",
      original: "Rp 120.000",
      tag: "Terdekat",
      color: "linear-gradient(135deg,#5c3d2e,#92400e)",
      image: rotiManis,
    },
    {
      id: "chicken-salad-bowl",
      name: "Chicken Salad Bowl",
      store: "SaladStop",
      dist: "3.1 km",
      pickup: "19:30–21:30",
      price: "Rp 25.000",
      original: "Rp 75.000",
      tag: "Populer",
      color: "linear-gradient(135deg,#14532d,#15803d)",
      image: saladBowl,
    },
    {
      id: "bento-box-lunch",
      name: "Bento Box Lunch",
      store: "HokBen",
      dist: "4.5 km",
      pickup: "20:00–22:00",
      price: "FREE",
      original: "Rp 55.000",
      tag: "Gratis",
      color: "linear-gradient(135deg,#1e3a5f,#1d4ed8)",
      image: bentoBox,
    },
  ];

  const sorts = ["Terdekat", "Populer", "Donasi"];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (activeSort === "Donasi") {
        return item.tag === "Donasi" || item.tag === "Gratis";
      }
      return item.tag === activeSort;
    });
  }, [activeSort]);

  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarConsumer
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cartCount}
      />
      <main className="max-w-[1120px] mx-auto px-6 py-8">
        <section className="mb-4">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Simpan makanan, hemat uang
          </h1>
          <p className="text-slate-500 mt-2">
            Temukan makanan lezat di sekitarmu dengan harga terjangkau.
          </p>
        </section>

        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Cari makanan..."
              className="w-full rounded-full border border-gray-200 px-12 py-3 bg-white shadow-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            ["KATEGORI", "Semua"],
            ["TIPE HARGA", "Semua Harga"],
            ["LOKASI", "Semua Lokasi"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-100 p-4"
            >
              <div className="text-xs font-bold uppercase text-slate-400 mb-2">
                {label}
              </div>
              <div className="flex items-center justify-between text-slate-900">
                {value} <ChevronDownIcon />
              </div>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap gap-3 mb-6">
          {sorts.map((sort) => (
            <button
              key={sort}
              onClick={() => setActiveSort(sort)}
              className={`${activeSort === sort ? "bg-slate-900 text-white" : "bg-white border border-gray-200 text-slate-700"} px-4 py-2 rounded-full font-bold`}
            >
              {sort}
            </button>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <article
              key={item.name}
              onClick={() => navigate(`/food-detail/${item.id}`)}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm cursor-pointer transition hover:shadow-md"
            >
              <div
                className="min-h-[160px] relative"
                style={{ background: item.color }}
              >
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${item.tag === "Donasi" ? "bg-emerald-600 text-white" : "bg-slate-900 text-white"}`}
                >
                  {item.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-slate-500">
                  {item.store} · {item.dist}
                </p>
                <p className="text-sm text-slate-500">Ambil: {item.pickup}</p>
                <div className="flex items-center justify-between mt-4 gap-2">
                  <div>
                    <div
                      className={`${item.price === "FREE" ? "text-emerald-600 font-bold" : "font-extrabold"}`}
                    >
                      {item.price}
                    </div>
                    <div className="text-xs text-slate-400 line-through">
                      {item.original}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCartCount((c) => c + 1);
                    }}
                    className="px-4 py-2 rounded-full bg-slate-900 text-white font-bold"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold">
            Lihat Peta
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
