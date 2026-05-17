import React, { useState, useRef } from "react";
import "./ProfileMerchant.css";

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
    <div className="profile-container">
      <div className="profile-header-section">
        <h2>Profile Saya</h2>
        <p>Kelola informasi profile Anda</p>
      </div>

      <div className="profile-card">
        {/* EDIT FOTO PROFIL (KEMBALI ASLI) */}
        <div className="profile-img-edit-section">
          <div className="img-wrapper">
            <img src={profileImg} alt="Profile" />
            <button className="btn-edit-photo" onClick={() => fileInputRef.current.click()}>
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

        <form className="profile-form" onSubmit={handleSubmit}>
          {/* INFORMASI PRIBADI */}
          <div className="form-section">
            <h3 className="section-title">👤 Informasi Pribadi</h3>
            
            <div className="input-group">
              <label>Nama Lengkap</label>
              <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" value={formData.email} disabled className="input-disabled" />
              <span className="input-hint">Email tidak dapat diubah</span>
            </div>

            <div className="input-group">
              <label>Nomor Telepon</label>
              <div className="input-with-icon">
                <span className="icon">📞</span>
                <input type="text" name="noTelp" value={formData.noTelp} onChange={handleInputChange} />
              </div>
            </div>

            <div className="input-group">
              <label>Alamat</label>
              <div className="input-with-icon">
                <span className="icon">📍</span>
                <input type="text" name="alamat" value={formData.alamat} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* INFORMASI BISNIS */}
          <div className="form-section">
            <h3 className="section-title">🏪 Informasi Bisnis</h3>
            
            <div className="input-group">
              <label>Nama Bisnis/Restoran</label>
              <input type="text" name="namaBisnis" value={formData.namaBisnis} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Alamat Bisnis</label>
              <div className="input-with-icon">
                <span className="icon">📍</span>
                <input type="text" name="alamatBisnis" value={formData.alamatBisnis} onChange={handleInputChange} />
              </div>
            </div>

            <div className="input-group">
              <label>Telepon Bisnis</label>
              <div className="input-with-icon">
                <span className="icon">📞</span>
                <input type="text" name="telpBisnis" value={formData.telpBisnis} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* BUTTONS (HANYA MENGUBAH ACTION DI SINI) */}
          <div className="profile-form-footer">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => setActivePage("dashboard")} // 🟢 Kembali ke dashboard
            >
              Batal
            </button>
            <button type="submit" className="btn-save">💾 Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  );
}