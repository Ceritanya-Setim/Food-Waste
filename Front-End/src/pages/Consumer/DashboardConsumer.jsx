import { useState } from "react";
import NavbarConsumer from "../../components/Consumer/ConsumerNavbar/NavbarConsumer";
import Footer from "../../components/Footer";
import { SearchIcon, StarIcon, MapPinIcon, BoxIcon, ClockIcon } from "../../components/Icons";
import AsianFoodImg from "../../assets/Consumer/Dashboard/AsianFoodThumbnail.png";
import BakeryImg from "../../assets/Consumer/Dashboard/BakeryThumbnail.png";
import BuffetsImg from "../../assets/Consumer/Dashboard/BuffetsThumbnail.png";
import FastFoodImg from "../../assets/Consumer/Dashboard/FastFoodThumbnail.png";
import GourmetDinnerSet from "../../assets/Consumer/Dashboard/Promo/GourmetDinnerSet.png";
import MargheritaPizza from "../../assets/Consumer/Dashboard/Promo/MargheritaLargePizza.png";
import PastryMixBox from "../../assets/Consumer/Dashboard/Promo/PastryMixBox.png";
import ProfileConsumer from "../../components/Consumer/ProfileConsumer/ProfileConsumer";
import CartFlow from "../../components/Consumer/ConsumerCart/ConsumerCart";

const CategoryImage = ({ img, label, color }) => (
  <div className="relative rounded-2xl overflow-hidden min-h-[160px] shadow-lg" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-black/20" />
    <p className="absolute left-4 bottom-4 text-white text-lg font-bold">{label}</p>
  </div>
);

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("dashboard");
  const [cartCount, setCartCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filters = ["Semua", "Promo Spesial", "Terdekat", "Baru", "Favorit"];

  const categories = [
  { label: "Asian Food", img: AsianFoodImg, color: "#0f3f27" },
  { label: "Bakery", img: BakeryImg, color: "#7f1d1d" },
  { label: "Fast Food", img: FastFoodImg, color: "#4a1d96" },
  { label: "Buffets", img: BuffetsImg, color: "#15803d" }
];

  const promos = [
    {
      name: "Gourmet Dinner Set",
      price: "Rp 20.000",
      original: "Rp 45.000",
      discount: "56%",
      rating: "4.8",
      reviews: "120+",
      dist: "1.2 km",
      stock: "5 porsi",
      time: "15 menit lagi",
      desc: "Set menu makan malam lengkap dengan pilihan hidangan utama dan rasa otentik.",
      img: GourmetDinnerSet,
      color: "linear-gradient(135deg,#0f3f27,#196f4c)",
    },
    {
      name: "Margherita Large Pizza",
      price: "Rp 48.000",
      original: "Rp 80.000",
      discount: "40%",
      rating: "4.5",
      reviews: "85",
      dist: "0.8 km",
      stock: "2 loyang",
      time: "30 menit lagi",
      desc: "Pizza tipis renyah dengan saus tomat segar dan keju mozzarella berkualitas.",
      img: MargheritaPizza,
      color: "linear-gradient(135deg,#7f1d1d,#b91c1c)",

    },
    {
      name: "Pastry Mix Box",
      price: "Rp 35.000",
      original: "Rp 50.000",
      discount: "30%",
      rating: "4.9",
      reviews: "210",
      dist: "2.5 km",
      stock: "8 box",
      time: "Habis hari ini",
      desc: "Paket berisi 4 macam pastry manis yang baru dipanggang pagi tadi.",
      img: PastryMixBox,
      color: "linear-gradient(135deg,#4a1d96,#6d28d9)",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarConsumer activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />
      {activePage === "dashboard" ? (
        <main className="max-w-[1120px] mx-auto px-6 py-8">
          <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900">Halo, Elara</h1>
              <p className="text-slate-500">Temukan makanan berkualitas dengan harga hemat hari ini.</p>
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 font-bold uppercase text-xs">New</div>
          </section>

          <div className="relative mb-4 max-w-[720px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></div>
            <input type="text" placeholder="Cari makanan lezat..." className="w-full border border-gray-200 rounded-full px-12 py-3 shadow-sm bg-white focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {filters.map((filter) => (
              <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-full font-semibold ${activeFilter === filter ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white border border-gray-200 text-slate-700'}`}>
                {filter}
              </button>
            ))}
          </div>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Jelajahi Kategori</h2>
                <p className="text-sm text-slate-500">Cari makanan favorit dengan cepat.</p>
              </div>
              <button className="px-3 py-2 rounded-full border border-gray-200 text-emerald-600 font-bold">Lihat Semua</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {categories.map((category) => (
                <CategoryImage key={category.label} {...category} />
              ))}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Promo Spesial Hari Ini</h2>
                <p className="text-sm text-slate-500">Jangan lewatkan penawaran terbaik hari ini.</p>
              </div>
              <button className="px-3 py-2 rounded-full border border-gray-200 text-emerald-600 font-bold">Lihat Semua</button>
            </div>
            <div className="grid gap-5 xl:grid-cols-3">
              {promos.map((item) => (
                <article key={item.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="relative min-h-[220px]" style={{ background: item.color }}>
                    <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold">{item.discount} OFF</div>
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm"> <StarIcon filled /> {item.rating}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                      <div className="text-sm text-slate-500">{item.dist}</div>
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-2xl font-extrabold text-emerald-600">{item.price}</div>
                          <div className="text-sm text-slate-400 line-through">{item.original}</div>
                        </div>
                        <button type="button" onClick={() => setCartCount((c) => c + 1)} className="px-4 py-2 rounded-full bg-slate-900 text-white font-bold">Pesan Sekarang</button>
                      </div>
                      <div className="grid grid-cols-2 text-sm text-slate-500 gap-2">
                        <span className="flex items-center gap-2"><BoxIcon /> {item.stock}</span>
                        <span className="flex items-center gap-2 justify-end"><ClockIcon /> {item.time}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      ) : activePage === "cart" ? (
        <CartFlow />
      ) : activePage === "profile" ? (
        <ProfileConsumer />
      ) : null}
      <Footer />
    </div>
  );
}