import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── ICONS ──────────────────────────────────────────────
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.34L5.71 21l1-1C7.38 19.33 8 19 9 19c2 0 4-2 6-2s3.5 1 3.5 1L21 14c0-6-4-6-4-6z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
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
export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to API
    // Jika pengguna sudah memilih role saat register, gunakan role tersebut
    const role = localStorage.getItem('userRole');
    if (role === 'merchant') {
      navigate('/ExploreMerchant');
    } else if (role === 'consumer') {
      navigate('/ExploreConsumer');
    } else {
      navigate('/PickRole');
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-white">

      {/* ── LEFT PANEL ── */}
      {/* w-1/2       = lebar 50%                          */}
      {/* relative    = agar child yang absolute bisa ikut */}
      {/* overflow-hidden = gambar tidak keluar batas       */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden flex-shrink-0">

        {/* Background gradient coklat/terrakota */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9856a] via-[#4a2820] to-[#2d1a10]" />

        {/* Overlay gelap di bagian bawah */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

        {/* Konten teks */}
        {/* z-10        = tampil di atas overlay             */}
        {/* mt-auto     = dorong konten ke bawah             */}
        <div className="relative z-10 flex flex-col justify-end h-full p-12">

          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center">
              <LeafIcon />
            </div>
            <span className="text-white text-xl font-bold">FoodSave</span>
          </div>

          <h2 className="text-white text-4xl font-extrabold leading-tight tracking-tight mb-4">
            Mulai kurangi<br />sampah makanan<br />hari ini.
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-sm">
            Bergabunglah dengan ribuan orang lainnya yang telah menghemat biaya makan sekaligus membantu lingkungan.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      {/* flex-1      = ambil sisa lebar                   */}
      {/* justify-center = tengah secara vertikal          */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12">
        <div className="w-full max-w-md mx-auto">

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Masuk ke FoodSave
          </h1>
          <p className="text-slate-500 text-sm mb-9 leading-relaxed">
            Platform untuk mengurangi food waste dan hemat makanan berkualitas
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              {/* relative  = agar ikon bisa diposisikan absolute di dalam */}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <EmailIcon />
                </span>
                {/* pl-10   = padding kiri biar teks tidak ketimpa ikon     */}
                <input
                  type="email"
                  name="email"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              {/* flex justify-between = label kiri, "Lupa?" kanan */}
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <button type="button" className="text-sm font-semibold text-orange-500 hover:underline">
                  Lupa Password?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <LockIcon />
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Masukkan password anda"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 transition"
                />
                {/* Tombol show/hide password */}
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-xl transition hover:-translate-y-0.5 active:translate-y-0"
            >
              Masuk
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Belum punya akun?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-orange-500 font-bold hover:underline"
            >
              Daftar sekarang
            </button>
          </p>

          {/* Bottom links */}
          <div className="flex justify-center items-center gap-2 mt-5">
            <a className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer">Syarat &amp; Ketentuan</a>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <a className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer">Kebijakan Privasi</a>
          </div>

        </div>
      </div>

    </div>
  );
};