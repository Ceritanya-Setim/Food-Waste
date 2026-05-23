import React, { useState, useEffect } from 'react';
// Converted to Tailwind — removed external CSS

export default function AddListingModal({ isOpen, onClose, onAddListing, editingListing }) {
    // State default form kosong
    const initialFormState = {
        nama: '',
        deskripsi: '',
        hargaNormal: '',
        hargaDiskon: '',
        stok: '',
        status: 'Tersedia',
        pickup: '',
        foto: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150'
    };

    const [formData, setFormData] = useState(initialFormState);

    // 🟢 Efek untuk mengisi data otomatis jika mendeteksi mode EDIT
    useEffect(() => {
        if (editingListing) {
            setFormData({ ...editingListing });
        } else {
            setFormData(initialFormState); // Reset kosong jika mode TAMBAH
        }
    }, [editingListing, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddListing(formData); // Kirim data kembali ke dashboard
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-lg">
                <h2 className="text-xl font-bold mb-1">{editingListing ? "📝 Edit Listing Makanan" : "🏪 Tambah Listing Baru"}</h2>
                <p className="text-sm text-slate-500 mb-4">Pastikan data makanan surplus yang dimasukkan sudah sesuai</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Nama Makanan</label>
                        <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="text" name="nama" value={formData.nama} onChange={handleChange} required placeholder="Contoh: Nasi Goreng Ayam" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Deskripsi / Catatan</label>
                        <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="text" name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Contoh: Porsi agak besar, tidak pedas" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Harga Normal</label>
                            <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="text" name="hargaNormal" value={formData.hargaNormal} onChange={handleChange} required placeholder="50K" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Harga Diskon</label>
                            <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="text" name="hargaDiskon" value={formData.hargaDiskon} onChange={handleChange} required placeholder="25K" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Jumlah Stok</label>
                            <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="text" name="stok" value={formData.stok} onChange={handleChange} required placeholder="5 porsi" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Waktu Batas Pickup</label>
                            <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="text" name="pickup" value={formData.pickup} onChange={handleChange} required placeholder="17 Mei, 19.50" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200">Batal</button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-600 text-white">Simpan Perubahan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}