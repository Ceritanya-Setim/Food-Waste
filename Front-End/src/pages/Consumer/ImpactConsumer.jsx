import { useState } from "react";
import NavbarConsumer from "../../components/Consumer/ConsumerNavbar/NavbarConsumer";
import Footer from "../../components/Footer";
import { TreeIcon, CarIcon, DropletIcon, BoltIcon, ArrowRightIcon } from "../../components/Icons";

export default function ImpactPage() {
  const [activePage, setActivePage] = useState("impact");
  const [cartCount, setCartCount] = useState(0);
  const impactStats = [
    { icon: <TreeIcon />, val: 0, label: "POHON DITANAM" },
    { icon: <CarIcon />, val: "74 km", label: "JARAK MENGEMUDI" },
    { icon: <DropletIcon />, val: 184, label: "MANDI DIHEMAT" },
    { icon: <BoltIcon />, val: "3.750", label: "CHARGE HP" },
  ];

  const sideStats = [
    { icon: "🍱", label: "MAKANAN TERSELAMATKAN", val: "12 Porsi" },
    { icon: "💵", label: "UANG DIHEMAT", val: "Rp 385.000" },
    { icon: "🌿", label: "CO2 DIHEMAT", val: "30 kg" },
    { icon: "📦", label: "ORDERS SELESAI", val: "8 Orders" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarConsumer activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />
      <main className="max-w-[1120px] mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Dampak Kamu untuk Lingkungan</h1>
          <p className="text-slate-500 mt-2">Lihat kontribusi kamu dalam mengurangi food waste dan membantu bumi.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-6">
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full grid place-items-center border-4 border-emerald-500 bg-emerald-50 text-emerald-600 text-2xl"><TreeIcon /></div>
                  <div>
                    <div className="text-sm text-slate-500">3 Day Streak Badge</div>
                    <h2 className="text-2xl font-extrabold">Eco Starter</h2>
                    <p className="text-slate-500">8 makanan lagi untuk naik rank</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-2 rounded-full bg-emerald-50 text-emerald-600 font-bold">Active Status</span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm text-slate-400">
                  <span />
                  <span>2/10 meals</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-emerald-600" style={{ width: '20%' }} />
                </div>
              </div>

              <button className="mt-4 px-4 py-2 rounded-full bg-emerald-600 text-white font-bold">Lihat Rank <ArrowRightIcon /></button>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Dampak Kamu Setara Dengan</h3>
                <span className="text-sm text-slate-400">Update terbaru</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 mx-auto grid place-items-center bg-white rounded-lg shadow-sm text-slate-900 mb-3">{stat.icon}</div>
                    <div className="text-2xl font-extrabold">{stat.val}</div>
                    <div className="text-xs uppercase text-slate-400 mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-6 text-white">
              <h3 className="text-2xl font-extrabold">Setiap Pesanan Berarti Untuk Bumi Kita</h3>
              <p className="mt-3 text-slate-200">Kamu telah berkontribusi mencegah 5.4kg metana dilepaskan ke atmosfer.</p>
              <button className="mt-4 px-4 py-2 rounded-full bg-emerald-600 text-white font-bold">Pelajari Metodologi Kami <ArrowRightIcon /></button>
            </section>
          </div>

          <aside className="space-y-4">
            {sideStats.map((stat) => (
              <section key={stat.label} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-xl">{stat.icon}</div>
                  <div className="text-right">
                    <div className="text-xs uppercase text-slate-400">{stat.label}</div>
                    <div className="text-xl font-extrabold">{stat.val}</div>
                  </div>
                </div>
              </section>
            ))}

            <section className="bg-emerald-50 rounded-xl p-4">
              <p className="font-extrabold text-emerald-700">Tips Hebat!</p>
              <p className="text-emerald-900 mt-2">Pesan 2 porsi lagi hari ini untuk mempertahankan streak kamu dan raih badge eksklusif!</p>
            </section>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}