import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── ICONS ──────────────────────────────────────────────
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.34L5.71 21l1-1C7.38 19.33 8 19 9 19c2 0 4-2 6-2s3.5 1 3.5 1L21 14c0-6-4-6-4-6z" />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

// ── COMPONENT ──────────────────────────────────────────
export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to API
    navigate("/PickRole");
  };

  // Class input yang dipakai berulang — simpan di variabel biar tidak redundant
  const inputClass =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 transition";

  const inputWithIconClass =
    "w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 transition";

  return (
    <div className="flex min-h-screen font-sans bg-white">

      {/* ── LEFT PANEL ── */}
      {/* hidden md:flex = disembunyikan di mobile, tampil di tablet ke atas */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden flex-shrink-0">

        {/* Foto background sayuran */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&q=80')",
          }}
        />

        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

        {/* Konten */}
        <div className="relative z-10 flex flex-col justify-end h-full p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center">
              <LeafIcon />
            </div>
            <span className="text-white text-xl font-bold">FoodSave</span>
          </div>

          <h2 className="text-white text-4xl font-extrabold leading-tight tracking-tight mb-4">
            Makan Enak,<br />Kurangi Sampah.
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-sm">
            Setiap porsi yang Anda selamatkan membantu bumi kita menjadi lebih hijau dan berkelanjutan.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col justify-between px-8 md:px-16 py-12">
        <div className="w-full max-w-md mx-auto">

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Daftar Akun Baru
          </h1>
          <p className="text-slate-500 text-sm mb-9">
            Bergabung dengan FoodSave untuk mengurangi food waste
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                placeholder="Masukkan nama lengkap Anda"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Alamat email aktif"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password <span className="text-slate-400 font-normal">(min 6 karakter)</span>
              </label>
              {/* relative = agar tombol mata bisa absolute di dalam */}
              <div className="relative flex items-center">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Buat password kuat"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                  className={inputWithIconClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition"
                >
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Ulangi password Anda"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={inputWithIconClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition"
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            {/* Checkbox */}
            {/* items-start = checkbox sejajar baris pertama teks */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                required
                className="mt-0.5 w-4 h-4 accent-green-500 cursor-pointer flex-shrink-0"
              />
              <label htmlFor="agree" className="text-sm text-slate-500 leading-relaxed cursor-pointer">
                Saya menyetujui syarat dan ketentuan yang berlaku.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-xl transition hover:-translate-y-0.5 active:translate-y-0"
            >
              Daftar
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Sudah punya akun?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-orange-500 font-bold hover:underline"
            >
              Masuk di sini
            </button>
          </p>
        </div>

        {/* ── SITE FOOTER ── */}
        {/* border-t    = garis atas tipis                             */}
        {/* mt-10       = jarak dari form                              */}
        <div className="flex justify-between items-center max-w-md mx-auto w-full mt-10 pt-6 border-t border-slate-100">
          <div className="flex gap-5">
            <a className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer">Bantuan</a>
            <a className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer">Privasi</a>
          </div>
          <span className="text-xs text-slate-400">© 2024 FoodSave Indonesia</span>
        </div>
      </div>

    </div>
  );
};