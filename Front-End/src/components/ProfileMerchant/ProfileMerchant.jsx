import React, { useState, useEffect, useRef } from 'react';
import { merchantAPI, imageURL } from '../../services/api';

const PROFILE_FALLBACK = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=200";

export default function ProfileMerchant({ setActivePage, onProfileUpdate }) {
    const [loading, setLoading]                   = useState(true);
    const [saving, setSaving]                     = useState(false);
    const [error, setError]                       = useState("");
    const [isEditing, setIsEditing]               = useState(false);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [imgPreview, setImgPreview]             = useState(null);
    const [imgError, setImgError]                 = useState(false);
    const fileInputRef                            = useRef(null);

    const [formData, setFormData] = useState({
        full_name: "", email: "", phone_number: "",
        business_name: "", description: "", category: "",
        address: "", city: "", province: "", postal_code: "",
        latitude: 0, longitude: 0,
        opening_time: "", closing_time: "",
        password: "",
        profile_image_url: ""
    });

    const fetchProfile = async () => {
        setLoading(true); setError("");
        try {
            const res = await merchantAPI.getProfile();
            const d = res.data;
            setFormData({
                full_name:         d.full_name         || "",
                email:             d.email             || "",
                phone_number:      d.phone_number      || "",
                business_name:     d.business_name     || "",
                description:       d.description       || "",
                category:          d.category          || "",
                address:           d.address           || "",
                city:              d.city              || "",
                province:          d.province          || "",
                postal_code:       d.postal_code       || "",
                latitude:          d.latitude          || 0,
                longitude:         d.longitude         || 0,
                opening_time:      d.opening_time      || "",
                closing_time:      d.closing_time      || "",
                password:          "",
                profile_image_url: d.profile_image_url || ""
            });
            setImgPreview(null);
            setImgError(false);
        } catch (err) {
            setError(err.message || "Gagal memuat profil merchant");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProfile(); }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'latitude' || name === 'longitude' ? (parseFloat(value) || 0) : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setProfileImageFile(file);
        setImgPreview(URL.createObjectURL(file));
        setImgError(false);
    };

    const handleRemoveImage = () => {
        setProfileImageFile(null);
        setImgPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Browser kamu tidak mendukung deteksi lokasi otomatis.");
            return;
        }
        alert("Sedang mengambil koordinat GPS dan melacak alamat, mohon tunggu...");
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setFormData(prev => ({ ...prev, latitude: lat, longitude: lon }));
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
                    if (!response.ok) throw new Error("Gagal menghubungi server alamat");
                    const data = await response.json();
                    if (data && data.address) {
                        const addr = data.address;
                        setFormData(prev => ({
                            ...prev,
                            address:     data.display_name || "",
                            city:        addr.city || addr.town || addr.municipality || addr.city_district || "",
                            province:    addr.state || "",
                            postal_code: addr.postcode || ""
                        }));
                        alert("📍 Koordinat DAN Alamat Toko berhasil diisi otomatis!");
                    } else {
                        alert("📍 Koordinat didapat, namun gagal menerjemahkan ke nama alamat jalan.");
                    }
                } catch (apiErr) {
                    alert("📍 Koordinat didapat, tapi gagal auto-fill alamat karena jaringan terganggu.");
                }
            },
            (err) => {
                const msg = { 1: "Tolong izinkan akses lokasi (GPS).", 2: "Informasi lokasi tidak tersedia.", 3: "Waktu pengambilan lokasi habis." };
                alert("Gagal: " + (msg[err.code] || err.message));
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const fields = {
                full_name:     formData.full_name,
                email:         formData.email,
                phone_number:  formData.phone_number,
                business_name: formData.business_name,
                description:   formData.description,
                category:      formData.category,
                address:       formData.address,
                city:          formData.city,
                province:      formData.province,
                postal_code:   formData.postal_code,
                latitude:      formData.latitude,
                longitude:     formData.longitude,
                opening_time:  formData.opening_time,
                closing_time:  formData.closing_time,
            };
            if (formData.password && formData.password.trim() !== "") {
                fields.password = formData.password;
            }
            await merchantAPI.updateProfile(fields, profileImageFile);
            setIsEditing(false);
            setProfileImageFile(null);
            setImgPreview(null);
            // Notify parent (dashboard) untuk refresh foto navbar
            if (onProfileUpdate) onProfileUpdate();
            alert("Profil Merchant berhasil diperbarui!");
            await fetchProfile();
        } catch (err) {
            alert("Gagal memperbarui profil: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading && !formData.full_name) {
        return <div className="text-center py-20 text-slate-400">Memuat profil merchant...</div>;
    }

    // Tentukan src foto profil: preview lokal > foto dari BE > fallback
    const currentProfileImg = imgPreview
        ? imgPreview
        : (formData.profile_image_url && !imgError)
            ? imageURL(formData.profile_image_url)
            : null;

    return (
        <main className="py-[30px] px-[4%] max-w-[900px] mx-auto">
            <div className="flex items-center gap-2 mb-6">
                <button onClick={() => setActivePage("dashboard")}
                    className="text-sm font-semibold text-[#64748b] hover:text-[#16a34a] flex items-center gap-1 transition-colors bg-transparent border-none cursor-pointer">
                    ⬅️ Kembali ke Dashboard
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#f1f5f9] overflow-hidden">
                <div className="h-[140px] bg-gradient-to-r from-[#65bd85] to-[#adc2b6]"></div>

                <div className="px-8 pb-6 relative flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#f1f5f9]">
                    <div className="flex items-end gap-4 -mt-[50px]">
                        {/* Foto Profil Merchant */}
                        <div className="relative">
                            <div className="w-[100px] h-[100px] rounded-2xl bg-white p-1 shadow-md border border-slate-100 overflow-hidden flex items-center justify-center">
                                {currentProfileImg ? (
                                    <img
                                        src={currentProfileImg}
                                        alt={formData.full_name || "Profil"}
                                        className="w-full h-full object-cover rounded-xl"
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <span className="text-4xl select-none">🏪</span>
                                )}
                            </div>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-600 hover:bg-green-700 text-white rounded-full text-xs grid place-items-center border-2 border-white cursor-pointer transition-colors shadow-md"
                                    title="Ganti foto profil"
                                >
                                    📷
                                </button>
                            )}
                        </div>

                        {/* Input file tersembunyi */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />

                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 m-0">{formData.business_name || "Untitled Business"}</h2>
                            <p className="text-sm text-slate-500 m-0 font-medium">Kategori: {formData.category || "other"}</p>
                            {isEditing && imgPreview && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="text-xs text-red-500 hover:text-red-700 mt-1 bg-transparent border-none cursor-pointer p-0"
                                >
                                    ✕ Hapus foto baru
                                </button>
                            )}
                        </div>
                    </div>
                    {!isEditing && (
                        <button type="button" onClick={() => setIsEditing(true)}
                            className="bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors border-none cursor-pointer">
                            📝 Edit Profil Toko
                        </button>
                    )}
                </div>

                {/* Upload foto info saat editing */}
                {isEditing && (
                    <div className="mx-8 mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-2">
                        <span className="text-blue-500 text-sm">📷</span>
                        <span className="text-xs text-blue-700 font-medium">
                            Klik ikon kamera di foto profil untuk menggantinya.
                            {imgPreview && " ✅ Foto baru siap disimpan."}
                        </span>
                    </div>
                )}

                <form onSubmit={handleSave} className="p-8 space-y-8">
                    {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">⚠️ {error}</div>}

                    {/* BLOK 1: Data Akun */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Data Akun & Pengelola</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { label: "Nama Lengkap Pemilik", name: "full_name", type: "text" },
                                { label: "Email Akun (Unique)", name: "email", type: "email" },
                                { label: "Nomor Telepon", name: "phone_number", type: "text" },
                            ].map(f => (
                                <div key={f.name}>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{f.label}</label>
                                    <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange} disabled={!isEditing}
                                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-[#16a34a] transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BLOK 2: Informasi Bisnis */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Informasi Bisnis / Toko</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nama Toko / Restoran</label>
                                <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} disabled={!isEditing}
                                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-[#16a34a] transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Kategori Kuliner</label>
                                <input type="text" name="category" value={formData.category} onChange={handleChange} disabled={!isEditing}
                                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-[#16a34a] transition-all" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Deskripsi Singkat Merchant</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} disabled={!isEditing} rows="2"
                                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-[#16a34a] transition-all resize-none" />
                            </div>
                        </div>
                    </div>

                    {/* BLOK 3: Lokasi & Jam */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Lokasi & Jam Operasional Pickup</h3>
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Alamat Jalan Lengkap</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} disabled={!isEditing}
                                placeholder="Masukkan nama jalan dan nomor ruko"
                                className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-[#16a34a] transition-all" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { label: "Kota / Kabupaten", name: "city" },
                                { label: "Provinsi", name: "province" },
                                { label: "Kode Pos", name: "postal_code" },
                            ].map(f => (
                                <div key={f.name}>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{f.label}</label>
                                    <input type="text" name={f.name} value={formData[f.name]} onChange={handleChange} disabled={!isEditing}
                                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-[#16a34a] transition-all" />
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            {[
                                { label: "Latitude", name: "latitude", type: "number" },
                                { label: "Longitude", name: "longitude", type: "number" },
                                { label: "Jam Buka Toko", name: "opening_time", type: "text", placeholder: "08:00" },
                                { label: "Jam Tutup Toko", name: "closing_time", type: "text", placeholder: "21:00" },
                            ].map(f => (
                                <div key={f.name}>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{f.label}</label>
                                    <input type={f.type} step={f.type === "number" ? "any" : undefined}
                                        name={f.name} value={formData[f.name]} onChange={handleChange}
                                        disabled={!isEditing} placeholder={f.placeholder || ""}
                                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-[#16a34a] transition-all" />
                                </div>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="pt-2">
                                <button type="button" onClick={getCurrentLocation}
                                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold py-2 px-4 rounded-lg border border-blue-200 transition-colors cursor-pointer flex items-center gap-1">
                                    📍 Ambil Koordinat Toko Otomatis (GPS)
                                </button>
                                <p className="text-[11px] text-slate-400 mt-1">*Direkomendasikan klik tombol ini jika perangkat berada langsung di titik fisik lokasi restoran Anda.</p>
                            </div>
                        )}
                    </div>

                    {/* BLOK 4: Ganti Password */}
                    {isEditing && (
                        <div className="space-y-4 pt-2">
                            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider border-b border-slate-100 pb-2">Keamanan</h3>
                            <div className="max-w-md">
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ganti Password Baru</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange}
                                    placeholder="Biarkan kosong jika tidak ingin mengubah password"
                                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:border-red-400 transition-all" />
                            </div>
                        </div>
                    )}

                    {/* Tombol Simpan / Batal */}
                    {isEditing && (
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                            <button type="button" onClick={() => { setIsEditing(false); setImgPreview(null); setProfileImageFile(null); fetchProfile(); }}
                                className="px-5 py-2.5 text-sm font-semibold border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors bg-white cursor-pointer">
                                Batal
                            </button>
                            <button type="submit" disabled={saving}
                                className="px-5 py-2.5 text-sm font-semibold bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-60 text-white rounded-lg transition-colors shadow-sm border-none cursor-pointer">
                                {saving ? "Menyimpan..." : "Simpan Perubahan"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </main>
    );
}