import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarConsumer from "../../components/Consumer/ConsumerNavbar/NavbarConsumer";
import Footer from "../../components/Footer";
import { SearchIcon, StarIcon, MapPinIcon, BoxIcon, ClockIcon } from "../../components/Icons";
import AsianFoodImg from "../../assets/Consumer/Dashboard/AsianFoodThumbnail.png";
import BakeryImg from "../../assets/Consumer/Dashboard/BakeryThumbnail.png";
import BuffetsImg from "../../assets/Consumer/Dashboard/BuffetsThumbnail.png";
import FastFoodImg from "../../assets/Consumer/Dashboard/FastFoodThumbnail.png";
import ProfileConsumer from "../../components/Consumer/ProfileConsumer/ProfileConsumer";
import CartFlow from "../../components/Consumer/ConsumerCart/ConsumerCart";


const fmtRp = (angka) => `Rp ${angka.toLocaleString('id-ID')}`;
const calcDiscount = (ori, disc) => Math.round(((ori - disc) / ori) * 100);
const getTimeLeft = (endTimeStr) => {
  if (!endTimeStr) return "-";
  const end = new Date(endTimeStr);
  const now = new Date();
  const diffMs = end - now;
  if (diffMs <= 0) return "Waktu Habis";
  
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins} menit lagi`;
  const diffHours = Math.floor(diffMins / 60);
  return `${diffHours} jam lagi`;
};

const CategoryImage = ({ img, label, color, onClick, isActive }) => (
  <div
    onClick={onClick}
    className={`relative rounded-2xl overflow-hidden min-h-[160px] shadow-lg cursor-pointer transition-all ${isActive ? 'ring-4 ring-emerald-500 scale-[1.02]' : 'hover:scale-[1.02]'}`}
    style={{
      backgroundImage: `url(${img})`,
      backgroundColor: color,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-black/20" />
    <p className="absolute left-4 bottom-4 text-white text-lg font-bold">
      {label}
    </p>
  </div>
);

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [cartCount, setCartCount] = useState(0);
  
  const [surplusFoods, setSurplusFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  
  const filters = ["Semua", "Terdekat", "Populer"];
  const categories = [
    { label: "Semua", img: "https://img.magnific.com/premium-photo/table-with-bowls-food-including-meat-vegetables-rice_1295754-1569.jpg?semt=ais_hybrid&w=740&q=80", color: "#334155" },
    { label: "Makanan Berat", img: AsianFoodImg, color: "#0f3f27" },
    { label: "Roti & Kue", img: BakeryImg, color: "#7f1d1d" },
    { label: "Camilan", img: FastFoodImg, color: "#4a1d96" },
    { label: "Minuman", img: BuffetsImg, color: "#15803d" },
  ];

  const fetchSurplusFoods = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchKeyword.trim() !== "") params.append("keyword", searchKeyword);
      if (selectedCategory !== "Semua") params.append("category", selectedCategory);
      
      if (activeFilter === "Terdekat") params.append("filter", "closest");
      if (activeFilter === "Populer") params.append("filter", "popularity");

      const url = `http://localhost:5000/surplus-food?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.data) {
        const mappedData = data.data.map((item) => ({
          id: item.id,
          name: item.title,
          price: fmtRp(item.discount_price),
          original: fmtRp(item.original_price),
          discount: `${calcDiscount(item.original_price, item.discount_price)}%`,
          desc: item.description,
          img: item["image-url"], 
          time: getTimeLeft(item.pickup_end_time),
          color: "linear-gradient(135deg,#0f3f27,#196f4c)",
          
          rating: "4.8",
          reviews: "120+",
          dist: "1.2 km",
          stock: "5 porsi"
        }));
        
        setSurplusFoods(mappedData);
      } else {
        setSurplusFoods([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data surplus foods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSurplusFoods();
  }, [selectedCategory, activeFilter]);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchSurplusFoods();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarConsumer
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cartCount}
      />
      {activePage === "dashboard" ? (
        <main className="max-w-[1120px] mx-auto px-6 py-8">
          <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900">
                Halo, Elara
              </h1>
              <p className="text-slate-500">
                Temukan makanan berkualitas dengan harga hemat hari ini.
              </p>
            </div>
          </section>

          <div className="relative mb-4 max-w-[720px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Cari makanan lezat... (Tekan Enter)"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full border border-gray-200 rounded-full px-12 py-3 shadow-sm bg-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-semibold ${activeFilter === filter ? "bg-emerald-600 text-white shadow-lg" : "bg-white border border-gray-200 text-slate-700"}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Jelajahi Kategori</h2>
                <p className="text-sm text-slate-500">
                  Cari makanan favorit dengan cepat.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {categories.map((category) => (
                <CategoryImage
                  key={category.label}
                  {...category}
                  onClick={() => setSelectedCategory(category.label)}
                  isActive={selectedCategory === category.label}
                />
              ))}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Promo Spesial Hari Ini</h2>
                <p className="text-sm text-slate-500">
                  Jangan lewatkan penawaran terbaik hari ini.
                </p>
              </div>
              <button 
                onClick={() => {
                   setSelectedCategory("Semua");
                   setActiveFilter("Semua");
                   setSearchKeyword("");
                }}
                className="px-3 py-2 rounded-full border border-gray-200 text-emerald-600 font-bold hover:bg-emerald-50"
              >
                Reset Filter & Lihat Semua
              </button>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-slate-500 font-medium">Sedang memuat makanan terbaik untukmu...</p>
              </div>
            ) : surplusFoods.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-slate-500 font-medium">Makanan tidak ditemukan untuk pencarian atau kategori ini.</p>
              </div>
            ) : (
              <div className="grid gap-5 xl:grid-cols-3">
                {surplusFoods.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => navigate(`/food-detail/${item.id}`)}
                    className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm cursor-pointer transition hover:shadow-md"
                  >
                    <div
                      className="relative min-h-[220px]"
                      style={{ background: item.color }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                      />
                      {item.discount !== "0%" && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold">
                          {item.discount} OFF
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                        <StarIcon filled /> {item.rating}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between mb-4 gap-2">
                        <div>
                          <h3 className="font-bold text-lg line-clamp-2">{item.name}</h3>
                          <p className="text-sm text-slate-500 line-clamp-2 mt-1">{item.desc}</p>
                        </div>
                        <div className="text-sm text-slate-500 shrink-0 flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4" /> {item.dist}
                        </div>
                      </div>
                      
                      <div className="mt-auto grid gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="text-2xl font-extrabold text-emerald-600">
                              {item.price}
                            </div>
                            {item.original !== item.price && (
                              <div className="text-sm text-slate-400 line-through">
                                {item.original}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCartCount((c) => c + 1);
                              }}
                              className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
                            >
                              Pesan Sekarang
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 text-sm text-slate-500 gap-2 border-t border-slate-100 pt-3 mt-1">
                          <span className="flex items-center gap-2">
                            <BoxIcon /> {item.stock}
                          </span>
                          <span className={`flex items-center gap-2 justify-end ${item.time === 'Waktu Habis' ? 'text-red-500 font-medium' : ''}`}>
                            <ClockIcon /> {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
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
