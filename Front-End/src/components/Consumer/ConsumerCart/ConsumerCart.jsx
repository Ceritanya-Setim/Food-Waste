import { useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

const StatusBadge = ({ status }) => {
  const map = {
    Selesai: "bg-emerald-100 text-emerald-700",
    Dibatalkan: "bg-red-100 text-red-500",
    Diproses: "bg-blue-100 text-blue-600",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[status] ?? "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const INITIAL_CART = [
  {
    id: 1,
    name: "Roti Gandum Utuh",
    resto: "Toko Roti Sari",
    tag: "DONASI",
    price: 15000,
    originalPrice: null,
    qty: 1,
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80",
    time: "08:00–10:00",
    location: "Kebayoran",
  },
  {
    id: 2,
    name: "Paket Sayur Organik",
    resto: "Farm Fresh Market",
    tag: null,
    price: 45000,
    originalPrice: 60000,
    qty: 2,
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&q=80",
    time: "14:00–16:00",
    location: "Sudirman",
  },
];

const HISTORY = [
  {
    id: "FS-20241024-001",
    date: "24 Okt 2023",
    status: "Selesai",
    total: 87000,
    items: [
      { name: "Mie Ayam Bakso", qty: 2, emoji: "🍜" },
      { name: "Es Jeruk", qty: 2, emoji: "🍊" },
    ],
    resto: "Warung Makan Sederhana",
  },
  {
    id: "FS-20241020-034",
    date: "20 Okt 2023",
    status: "Selesai",
    total: 120000,
    items: [
      { name: "Sate Ayam (10 tusuk)", qty: 1, emoji: "🍢" },
      { name: "Lontong", qty: 2, emoji: "🟡" },
      { name: "Es Campur", qty: 1, emoji: "🍹" },
    ],
    resto: "Sate Pak Kumis",
  },
  {
    id: "FS-20241015-089",
    date: "15 Okt 2023",
    status: "Dibatalkan",
    total: 45000,
    items: [{ name: "Gado-Gado Spesial", qty: 1, emoji: "🥗" }],
    resto: "Depot Sehat",
  },
  {
    id: "FS-20241010-012",
    date: "10 Okt 2023",
    status: "Selesai",
    total: 210000,
    items: [
      { name: "Paket Keluarga Ayam Goreng", qty: 1, emoji: "🍗" },
      { name: "Nasi Putih", qty: 4, emoji: "🍚" },
      { name: "Sayur Asem", qty: 1, emoji: "🥣" },
    ],
    resto: "Restoran Ayam Goreng Ny. Suharti",
  },
];

const PAYMENT_METHODS = ["GoPay", "OVO", "DANA", "QRIS", "Transfer Bank", "Cash Pickup"];
const DONATION_OPTIONS = [10000, 20000, 50000];

// ─── Sub-components ───────────────────────────────────────────────────────────

const CartItem = ({ item, onQty, onRemove }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 items-start">
    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {item.tag && (
              <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md tracking-wide">
                {item.tag}
              </span>
            )}
            <span className="text-xs text-gray-400">• {item.resto}</span>
          </div>
          <p className="text-base font-bold text-gray-900">{item.name}</p>
        </div>
        <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-400 transition flex-shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-1 py-1">
          <button onClick={() => onQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition font-bold text-base">−</button>
          <span className="w-6 text-center text-sm font-semibold text-gray-800">{item.qty}</span>
          <button onClick={() => onQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition font-bold text-base">+</button>
        </div>
        <div className="text-right">
          {item.originalPrice && (
            <p className="text-xs text-gray-400 line-through">{fmt(item.originalPrice * item.qty)}</p>
          )}
          <p className="text-base font-bold text-gray-900">{fmt(item.price * item.qty)}</p>
        </div>
      </div>
    </div>
  </div>
);

const HistoryItem = ({ order, expanded, onToggle }) => (
  <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-gray-200 transition-all">
    <button onClick={onToggle} className="w-full flex items-start justify-between p-4 text-left">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-gray-400">{order.id}</span>
          <StatusBadge status={order.status} />
        </div>
        <p className="text-sm font-semibold text-gray-800 mt-1 truncate">{order.resto}</p>
        <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
      </div>
      <div className="flex flex-col items-end gap-1 ml-3 flex-shrink-0">
        <p className="text-sm font-bold text-gray-900">{fmt(order.total)}</p>
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
    {expanded && (
      <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-2 bg-gray-50">
        {order.items.map((it, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
            <span>{it.emoji}</span>
            <span className="flex-1">{it.name}</span>
            <span className="text-gray-400 text-xs">x{it.qty}</span>
          </div>
        ))}
        <div className="pt-2 flex gap-2">
          <button className="flex-1 text-xs font-semibold border border-gray-200 rounded-xl py-2 text-gray-700 hover:bg-white transition">Lihat Detail</button>
          {order.status === "Selesai" && (
            <button className="flex-1 text-xs font-semibold bg-gray-900 text-white rounded-xl py-2 hover:bg-gray-700 transition">Pesan Lagi</button>
          )}
        </div>
      </div>
    )}
  </div>
);

// ─── Page: Cart (with tabs) ───────────────────────────────────────────────────
function CartPage({ cart, setCart, onCheckout }) {
  const [tab, setTab] = useState("cart");
  const [expandedId, setExpandedId] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleQty = (id, delta) =>
    setCart((prev) => prev.map((it) => it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it));
  const handleRemove = (id) => setCart((prev) => prev.filter((it) => it.id !== id));

  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const ongkir = cart.length > 0 ? 10000 : 0;
  const diskon = promoApplied ? 15000 : 5000;
  const total = subtotal + ongkir - diskon;

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === "FOODSAVE15") setPromoApplied(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Keranjang & Pesanan</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola belanjaan dan histori pembelian Anda</p>
        </div>

        {/* Tab Switch */}
        <div className="flex bg-white border border-gray-100 rounded-2xl p-1 shadow-sm w-fit gap-1">
          {[
            { key: "cart", label: "🛒 Keranjang", count: cart.length },
            { key: "history", label: "📋 Histori", count: HISTORY.length },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                tab === t.key ? "bg-gray-900 text-white shadow" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {t.label}
              <span className={`text-xs rounded-full px-2 py-0.5 font-bold ${
                tab === t.key ? "bg-white text-gray-900" : "bg-gray-100 text-gray-500"
              }`}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* ── CART TAB ── */}
        {tab === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 space-y-3">
              {cart.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 flex flex-col items-center gap-3">
                  <span className="text-5xl">🛒</span>
                  <p className="text-gray-500 font-medium">Keranjang kamu kosong</p>
                  <p className="text-xs text-gray-400">Yuk, tambahkan makanan favoritmu!</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between px-1">
                    <p className="text-sm font-semibold text-gray-600">
                      {cart.length} item · {[...new Set(cart.map((c) => c.resto))].length} restoran
                    </p>
                    <button onClick={() => setCart([])} className="text-xs text-red-400 hover:text-red-600 font-medium transition">
                      Hapus semua
                    </button>
                  </div>
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} onQty={handleQty} onRemove={handleRemove} />
                  ))}
                </>
              )}

              {cart.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">🏷️ Kode Promo</p>
                  <div className="flex gap-2">
                    <input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Masukkan kode promo"
                      disabled={promoApplied}
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:bg-gray-50 disabled:text-gray-400"
                    />
                    <button
                      onClick={handlePromo}
                      disabled={promoApplied || !promoCode}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-40 transition"
                    >
                      {promoApplied ? "✓" : "Pakai"}
                    </button>
                  </div>
                  {promoApplied && <p className="text-xs text-emerald-600 font-medium mt-2">✅ Promo berhasil! Hemat Rp 15.000</p>}
                  {!promoApplied && promoCode && promoCode !== "FOODSAVE15" && (
                    <p className="text-xs text-gray-400 mt-1.5">Coba: <span className="font-mono font-bold text-orange-500">FOODSAVE15</span></p>
                  )}
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 sticky top-4 space-y-4">
                <p className="text-base font-bold text-gray-900">Ringkasan Pembayaran</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span><span className="font-medium">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Ongkos Kirim</span><span className="font-medium">{fmt(ongkir)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Diskon FoodSave</span><span className="font-semibold">−{fmt(diskon)}</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between font-bold text-base text-gray-900">
                    <span>Total</span><span>{fmt(total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => cart.length > 0 && onCheckout()}
                  disabled={cart.length === 0}
                  className="w-full py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95 flex items-center justify-center gap-2"
                >
                  Checkout Sekarang
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <div className="bg-gray-50 rounded-xl px-3 py-2.5 flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-xs text-gray-500">Dengan melanjutkan, anda membantu mengurangi 1.2kg limbah makanan.</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">Metode Pembayaran</p>
                  <div className="flex flex-wrap gap-2">
                    {["VISA", "MAST", "GOPAY", "OVO"].map((m) => (
                      <span key={m} className="text-xs font-bold border border-gray-200 rounded-lg px-2.5 py-1 text-gray-500 tracking-wider">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── HISTORY TAB ── */}
        {tab === "history" && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Pesanan", value: HISTORY.length, emoji: "📦" },
                { label: "Selesai", value: HISTORY.filter((h) => h.status === "Selesai").length, emoji: "✅" },
                {
                  label: "Total Belanja",
                  value: fmt(HISTORY.filter((h) => h.status === "Selesai").reduce((s, h) => s + h.total, 0)),
                  emoji: "💰",
                  small: true,
                },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 text-center">
                  <p className="text-xl">{stat.emoji}</p>
                  <p className={`font-bold text-gray-900 mt-1 ${stat.small ? "text-xs" : "text-lg"}`}>{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {["Semua", "Selesai", "Dibatalkan"].map((f, i) => (
                <button key={f} className={`flex-shrink-0 text-xs font-semibold px-4 py-1.5 rounded-full border transition ${i === 0 ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 bg-white text-gray-600 hover:border-gray-900 hover:text-gray-900"}`}>
                  {f}
                </button>
              ))}
            </div>

            {HISTORY.map((order) => (
              <HistoryItem
                key={order.id}
                order={order}
                expanded={expandedId === order.id}
                onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
              />
            ))}
            <p className="text-center text-xs text-gray-400 pt-2">Menampilkan {HISTORY.length} pesanan terakhir</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 pt-4 pb-6">
          © 2024 FoodSave. Menyelamatkan makanan, membantu sesama.
        </p>
      </div>
    </div>
  );
}

// ─── Page: Checkout ───────────────────────────────────────────────────────────
function CheckoutPage({ cart, onBack }) {
  const [selectedPayment, setSelectedPayment] = useState("GoPay");
  const [selectedDonation, setSelectedDonation] = useState(10000);
  const [customDonation, setCustomDonation] = useState("");
  const [paid, setPaid] = useState(false);

  const donationAmt = customDonation ? parseInt(customDonation.replace(/\D/g, "")) || 0 : selectedDonation;
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const totalBayar = subtotal + donationAmt;
  const savings = cart.reduce((s, it) => {
    const orig = it.originalPrice ?? it.price * 2;
    return s + (orig - it.price) * it.qty;
  }, 0);

  if (paid) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 px-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-10 py-12 max-w-sm w-full text-center space-y-4">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-4xl">✅</div>
          <h2 className="text-2xl font-extrabold text-gray-900">Pembayaran Berhasil!</h2>
          <p className="text-sm text-gray-500">Pesanan kamu sedang diproses. Terima kasih sudah menyelamatkan makanan! 🌱</p>
          {savings > 0 && (
            <div className="bg-emerald-50 rounded-xl px-4 py-3">
              <p className="text-sm font-semibold text-emerald-700">Kamu hemat {fmt(savings)}!</p>
              <p className="text-xs text-emerald-600 mt-0.5">Dan membantu mengurangi food waste</p>
            </div>
          )}
          <button onClick={onBack} className="w-full py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-700 transition">
            Kembali ke Keranjang
          </button>
        </div>
        <p className="text-xs text-gray-400">© 2024 FoodSave. Menyelamatkan makanan, membantu sesama.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition">
            <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
            <p className="text-gray-500 text-sm">Review & bayar pesanan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 space-y-5">

            {/* Order summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-base font-bold text-gray-900 mb-4">Ringkasan Pesanan</p>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time} • {item.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {item.originalPrice && (
                        <p className="text-xs text-gray-400 line-through">{fmt(item.originalPrice * item.qty)}</p>
                      )}
                      <p className="text-sm font-bold text-orange-500">{fmt(item.price * item.qty)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donasi */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-base font-bold text-gray-900 mb-1">Donasi Sukarela</p>
              <p className="text-sm text-gray-500 mb-4">Bantu FoodSave menjangkau lebih banyak orang yang membutuhkan.</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {DONATION_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSelectedDonation(opt); setCustomDonation(""); }}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                      selectedDonation === opt && !customDonation
                        ? "border-orange-500 text-orange-500 bg-orange-50"
                        : "border-gray-200 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {fmt(opt)}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                <input
                  type="text"
                  value={customDonation}
                  onChange={(e) => { setCustomDonation(e.target.value); setSelectedDonation(null); }}
                  placeholder="Nominal lainnya"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-base font-bold text-gray-900 mb-4">Metode Pembayaran</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedPayment(m)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition ${
                      selectedPayment === m
                        ? "border-orange-500 text-orange-500 bg-orange-50"
                        : "border-gray-200 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {m}
                    {selectedPayment === m && (
                      <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 sticky top-4 space-y-4">
              <p className="text-base font-bold text-gray-900">Rincian Harga</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span className="font-medium">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Donasi</span><span className="font-medium">{fmt(donationAmt)}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between font-bold text-base text-gray-900">
                  <span>Total Bayar</span>
                  <span className="text-orange-500">{fmt(totalBayar)}</span>
                </div>
              </div>

              {savings > 0 && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                    Kamu hemat {fmt(savings)}! Dan membantu mengurangi food waste
                  </p>
                </div>
              )}

              <button
                onClick={() => setPaid(true)}
                className="w-full py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-700 transition active:scale-95"
              >
                Bayar {fmt(totalBayar)}
              </button>

              <p className="text-xs text-center text-gray-400 leading-relaxed">
                Dengan menekan tombol, Anda menyetujui Ketentuan Layanan FoodSave.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 pt-4 pb-6">
          © 2024 FoodSave. Menyelamatkan makanan, membantu sesama.
        </p>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function CartFlow() {
  const [page, setPage] = useState("cart");
  const [cart, setCart] = useState(INITIAL_CART);

  if (page === "checkout") {
    return <CheckoutPage cart={cart} onBack={() => setPage("cart")} />;
  }

  return <CartPage cart={cart} setCart={setCart} onCheckout={() => setPage("checkout")} />;
}
