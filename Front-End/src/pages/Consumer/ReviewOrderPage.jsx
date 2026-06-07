import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const REVIEW_STORAGE_KEY = "foodsave_food_reviews";
const PENDING_ORDER_REVIEW_KEY = "foodsave_pending_order_reviews";

const FOOD_OPTIONS = [
  { id: "pizza-slice-mix", title: "Pizza Slice Mix (6 pcs)" },
  { id: "burger-fries-pack", title: "Burger & Fries Pack" },
  { id: "nasi-goreng-kambing", title: "Nasi Goreng Kambing Spesial" },
  { id: "paket-roti-manis", title: "Paket Roti Manis (10 pcs)" },
];

const getPendingOrder = (orderId) => {
  const stored = JSON.parse(localStorage.getItem(PENDING_ORDER_REVIEW_KEY) || "{}");
  return stored[orderId] || null;
};

const saveReviewToStorage = ({ foodId, review }) => {
  const saved = JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY) || "{}");
  saved[foodId] = [...(saved[foodId] || []), review];
  localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(saved));
};

const todayLabel = () => {
  return new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const StarIcon = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function ReviewOrderPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [pendingOrder, setPendingOrder] = useState(null);
  const [selectedFoodId, setSelectedFoodId] = useState(FOOD_OPTIONS[0].id);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [displayName, setDisplayName] = useState("Kamu");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const pending = getPendingOrder(orderId);
    if (pending && pending.items?.length) {
      setPendingOrder(pending);
      const firstFood = pending.items.find((item) => item.foodId)?.foodId;
      if (firstFood) setSelectedFoodId(firstFood);
    }
  }, [orderId]);

  const currentFood = FOOD_OPTIONS.find((food) => food.id === selectedFoodId) || FOOD_OPTIONS[0];
  const orderTitle = pendingOrder?.items?.map((item) => item.name).join(", ") || "Pesananmu";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!comment.trim()) {
      alert("Tolong tuliskan ulasan sebelum mengirim.");
      return;
    }

    saveReviewToStorage({
      foodId: selectedFoodId,
      review: {
        id: `review-${Date.now()}`,
        user_name: displayName.trim() || "Kamu",
        rating,
        date: todayLabel(),
        comment: comment.trim(),
        initial: (displayName.trim() || "Kamu")[0]?.toUpperCase(),
      },
    });

    setSubmitted(true);
  };

  const handleGoToDetail = () => {
    navigate(`/food-detail/${selectedFoodId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => navigate("/CartConsumer")} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition">
          ← Kembali ke Keranjang
        </button>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Ulas Pesananmu</h1>
              <p className="text-sm text-slate-500 mt-1">
                Tambahkan review setelah checkout. Ulasanmu akan muncul di halaman detail makanan.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-800 text-sm">
              <p className="font-semibold">ID Pesanan</p>
              <p className="text-slate-800">{orderId || "Belum ada ID pesanan"}</p>
              <p className="mt-2 text-slate-600">{orderTitle}</p>
            </div>
          </div>

          {submitted ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-5 text-emerald-700">
                <p className="font-bold text-lg">Terima kasih!</p>
                <p className="text-sm mt-1">Ulasanmu sudah tersimpan dan akan tampil di halaman detail makanan.</p>
              </div>
              <button onClick={handleGoToDetail} className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition">
                Lihat Ulasan di Halaman Produk
              </button>
              <button onClick={() => navigate("/DashboardConsumer")} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                Kembali ke Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">Pilih Menu</label>
                <select
                  value={selectedFoodId}
                  onChange={(event) => setSelectedFoodId(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none"
                >
                  {FOOD_OPTIONS.map((food) => (
                    <option key={food.id} value={food.id}>
                      {food.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">Nama Pengguna</label>
                <input
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Contoh: Elara"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-bold text-slate-900">Nilai Ulasan</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className="rounded-full p-2 transition hover:bg-slate-100"
                    >
                      <StarIcon filled={rating >= value} />
                    </button>
                  ))}
                  <span className="text-sm font-semibold text-slate-600">{rating} dari 5</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">Komentar</label>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  rows={5}
                  placeholder="Tuliskan pengalamanmu..."
                  className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <button type="submit" className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition">
                Kirim Ulasan
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
