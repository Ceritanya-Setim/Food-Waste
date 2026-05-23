import React, { useState, useRef } from "react";

export default function ProfileMerchant({ setActivePage }) { // 🟢 Tangkap prop di sini
  // State untuk Data Form
  const [formData, setFormData] = useState({
    namaLengkap: "Hilya",
    email: "hilyatul@gmail.com",
    noTelp: "08123456789",
    alamat: "Jl. Contoh No. 123",
    namaBisnis: "Nama Restoran Anda",
    alamatBisnis: "Alamat Restoran",
    telpBisnis: "Nomor telepon restoran"
  });

  // State untuk Foto Profil (Kembali ke kode asli kamu)
  const [profileImg, setProfileImg] = useState("https://ui-avatars.com/api/?name=HA&background=dbeafe&color=1e40af&size=128");
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Perubahan profil berhasil disimpan!");
  };

  return (
    <div className="max-w-[800px] mx-auto py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Profile Saya</h2>
        <p className="text-sm text-slate-500">Kelola informasi profile Anda</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <img src={profileImg} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-slate-100" />
            <button className="absolute bottom-0 right-0 bg-white border border-gray-100 w-8 h-8 rounded-full grid place-items-center shadow" onClick={() => fileInputRef.current.click()}>
              📷
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            hidden 
            accept="image/*"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-5 text-slate-900">👤 Informasi Pribadi</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-slate-600">Nama Lengkap</label>
              <input className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-slate-50 text-sm focus:outline-none focus:border-green-500 focus:bg-white transition" type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleInputChange} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-slate-600">Email</label>
              <input className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-slate-100 text-sm text-slate-400 cursor-not-allowed" type="email" value={formData.email} disabled />
              <span className="text-xs text-slate-400 mt-1 block">Email tidak dapat diubah</span>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-slate-600">Nomor Telepon</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-sm">📞</span>
                <input className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 bg-slate-50 text-sm focus:outline-none focus:border-green-500 focus:bg-white transition" type="text" name="noTelp" value={formData.noTelp} onChange={handleInputChange} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-slate-600">Alamat</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-sm">📍</span>
                <input className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 bg-slate-50 text-sm focus:outline-none focus:border-green-500 focus:bg-white transition" type="text" name="alamat" value={formData.alamat} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-5 text-slate-900">🏪 Informasi Bisnis</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-slate-600">Nama Bisnis/Restoran</label>
              <input className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-slate-50 text-sm focus:outline-none focus:border-green-500 focus:bg-white transition" type="text" name="namaBisnis" value={formData.namaBisnis} onChange={handleInputChange} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-slate-600">Alamat Bisnis</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-sm">📍</span>
                <input className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 bg-slate-50 text-sm focus:outline-none focus:border-green-500 focus:bg-white transition" type="text" name="alamatBisnis" value={formData.alamatBisnis} onChange={handleInputChange} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-slate-600">Telepon Bisnis</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-sm">📞</span>
                <input className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 bg-slate-50 text-sm focus:outline-none focus:border-green-500 focus:bg-white transition" type="text" name="telpBisnis" value={formData.telpBisnis} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button 
              type="button" 
              className="px-6 py-2 rounded-lg border border-gray-200 bg-white font-semibold"
              onClick={() => setActivePage("dashboard")} // 🟢 Kembali ke dashboard
            >
              Batal
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:opacity-90 transition">💾 Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  );
}