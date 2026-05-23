import React, { useState } from 'react'

const Avatar = () => (
  <div className="relative w-20 h-20 flex-shrink-0">
    <div className="w-20 h-20 rounded-full overflow-hidden bg-teal-700 flex items-center justify-center">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <circle cx="40" cy="40" r="40" fill="#0f766e" />
        <ellipse cx="40" cy="32" rx="13" ry="14" fill="#99f6e4" />
        <ellipse cx="40" cy="70" rx="22" ry="18" fill="#99f6e4" />
        <path d="M28 38 Q40 48 52 38" stroke="#0f766e" strokeWidth="2" fill="none" />
      </svg>
    </div>
    <button className="absolute bottom-0 right-0 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center border-2 border-white hover:bg-gray-700 transition-colors">
      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 16.586V18h1.414a2 2 0 001.414-.586l6.768-6.768" />
      </svg>
    </button>
  </div>
);

const InputField = ({ label, id, type = "text", value, onChange, icon, placeholder, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-gray-200 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition py-2.5 pr-3 ${icon ? "pl-9" : "pl-3"}`}
      />
    </div>
  </div>
);

const BottomCard = ({ icon, title, subtitle, danger = false, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 w-full bg-white rounded-2xl p-4 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all text-left"
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${danger ? "bg-red-50" : "bg-gray-100"}`}>
      {icon}
    </div>
    <div>
      <p className={`text-sm font-semibold ${danger ? "text-red-500" : "text-gray-800"}`}>{title}</p>
      <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
    </div>
  </button>
);


export default function ProfileConsumer() {
    const [form, setForm] = useState({
    nama: "Demo User",
    email: "demo@example.com",
    telepon: "08123456789",
    alamat: "Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setForm({
      nama: "Demo User",
      email: "demo@example.com",
      telepon: "08123456789",
      alamat: "Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Saya</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola informasi profile Anda</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">

          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <Avatar />
            <div>
              <p className="text-lg font-bold text-gray-900">{form.nama || "Demo User"}</p>
              <p className="text-xs text-gray-400 mt-0.5">Update terakhir: 24 Okt 2023</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Informasi Pribadi */}
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-4">Informasi Pribadi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Nama Lengkap"
                id="nama"
                value={form.nama}
                onChange={handleChange("nama")}
                placeholder="Nama lengkap"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="email@example.com"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <InputField
                label="Nomor Telepon"
                id="telepon"
                type="tel"
                value={form.telepon}
                onChange={handleChange("telepon")}
                placeholder="08xxxxxxxxxx"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
            </div>

            {/* Alamat full width */}
            <div className="mt-4 flex flex-col gap-1.5">
              <label htmlFor="alamat" className="text-sm font-medium text-gray-700">Alamat</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <textarea
                  id="alamat"
                  rows={3}
                  value={form.alamat}
                  onChange={handleChange("alamat")}
                  placeholder="Masukkan alamat lengkap"
                  className="w-full border border-gray-200 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition py-2.5 pr-3 pl-9 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                saved
                  ? "bg-green-600 text-white scale-95"
                  : "bg-gray-900 text-white hover:bg-gray-700"
              }`}
            >
              {saved ? "✓ Tersimpan!" : "Simpan Perubahan"}
            </button>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <BottomCard
            title="Keamanan"
            subtitle="Ubah kata sandi"
            icon={
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
          <BottomCard
            title="Metode Pembayaran"
            subtitle="Kelola kartu & e-wallet"
            icon={
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
          />
          <BottomCard
            danger
            title="Keluar"
            subtitle="Keluar dari akun"
            icon={
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            }
          />
        </div>

        {/* Footer */}
        <div className="text-center pt-2 pb-6">
          <p className="text-xs text-gray-400">© 2023 FoodSave App. Semua hak dilindungi.</p>
          <div className="flex justify-center gap-4 mt-1">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition">Syarat &amp; Ketentuan</a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition">Kebijakan Privasi</a>
          </div>
        </div>

      </div>
    </div>
  );
}
