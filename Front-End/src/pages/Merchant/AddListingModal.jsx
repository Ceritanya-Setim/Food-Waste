import React, { useState, useEffect, useRef } from 'react';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150';

export default function AddListingModal({ isOpen, onClose, onAddListing, editingListing }) {
    const initialState = {
        nama: '', deskripsi: '',
        hargaNormal: '', hargaDiskon: '', stok: '',
        pickup_start_time: '', pickup_end_time: '', expiry_time: '',
    };
    const [formData, setFormData]   = useState(initialState);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview]     = useState(null);
    const [saving, setSaving]       = useState(false);
    const fileRef = useRef();

    useEffect(() => {
        if (!isOpen) return;
        if (editingListing) {
            const toLocal = (iso) => iso ? new Date(iso).toISOString().slice(0, 16) : '';
            setFormData({
                nama:              editingListing.nama         || editingListing.title       || '',
                deskripsi:         editingListing.deskripsi    || editingListing.description || '',
                hargaNormal:       editingListing.hargaNormal  ?? editingListing.original_price ?? '',
                hargaDiskon:       editingListing.hargaDiskon  ?? editingListing.discount_price ?? '',
                // Fix bug: Memastikan pembacaan stok aman dari key quantity_available maupun quantity_remaining
                stok:              editingListing.stok         ?? editingListing.quantity_available ?? editingListing.quantity_remaining ?? '',
                pickup_start_time: toLocal(editingListing.pickup_start_time),
                pickup_end_time:   toLocal(editingListing.pickup_end_time),
                expiry_time:       toLocal(editingListing.expiry_time),
            });
            // Tampilkan foto existing saat edit
            setPreview(editingListing.foto || null);
        } else {
            setFormData(initialState);
            setImageFile(null);
            setPreview(null);
        }
        setSaving(false);
    }, [editingListing, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const fields = {
            title:              formData.nama,
            description:        formData.deskripsi,
            original_price:     parseInt(formData.hargaNormal) || 0,
            discount_price:     parseInt(formData.hargaDiskon) || 0,
            quantity_available: parseInt(formData.stok) || 0,
            pickup_start_time:  formData.pickup_start_time ? new Date(formData.pickup_start_time).toISOString() : null,
            pickup_end_time:    formData.pickup_end_time   ? new Date(formData.pickup_end_time).toISOString()   : null,
            expiry_time:        formData.expiry_time       ? new Date(formData.expiry_time).toISOString()       : null,
        };

        try {
            await onAddListing(fields, imageFile);
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-1">{editingListing ? "📝 Edit Listing" : "🏪 Tambah Listing Baru"}</h2>
                <p className="text-sm text-slate-500 mb-6">Lengkapi detail makanan surplus Anda</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Nama Makanan</label>
                        <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="text" name="nama" value={formData.nama} onChange={handleChange} required placeholder="Contoh: Nasi Goreng Spesial" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Deskripsi</label>
                        <textarea className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Deskripsikan kondisi makanan..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Harga Normal (Rp)</label>
                            <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="number" name="hargaNormal" value={formData.hargaNormal} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Harga Diskon (Rp)</label>
                            <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="number" name="hargaDiskon" value={formData.hargaDiskon} onChange={handleChange} required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Jumlah Porsi (Stok)</label>
                        <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="number" name="stok" value={formData.stok} onChange={handleChange} required />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <label className="block text-sm font-bold text-slate-700 mb-3">Waktu Pickup</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] uppercase font-bold text-slate-500 mb-1">Mulai</label>
                                <input className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white" type="datetime-local" name="pickup_start_time" value={formData.pickup_start_time} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="block text-[11px] uppercase font-bold text-slate-500 mb-1">Selesai</label>
                                <input className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white" type="datetime-local" name="pickup_end_time" value={formData.pickup_end_time} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Batas Kadaluarsa</label>
                        <input className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-slate-50" type="datetime-local" name="expiry_time" value={formData.expiry_time} onChange={handleChange} required />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Foto Makanan {editingListing ? "(Tidak dapat diubah setelah dibuat)" : ""}
                        </label>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-slate-50">
                            {preview && (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-slate-200"
                                    onError={e => { e.target.src = FALLBACK_IMG; }}
                                />
                            )}
                            {!editingListing && (
                                <div className="flex-1">
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-slate-500
                                        file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0
                                        file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700
                                        hover:file:bg-emerald-100 cursor-pointer"
                                    />
                                    <p className="text-[11px] text-slate-400 mt-1">JPG/PNG, maks 5MB</p>
                                </div>
                            )}
                            {editingListing && !preview && (
                                <span className="text-xs text-slate-400 italic">Tidak ada foto</span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
                        <button type="button" onClick={onClose} disabled={saving} className="px-5 py-2 rounded-lg border border-gray-200 hover:bg-slate-50 font-semibold text-sm disabled:opacity-50">Batal</button>
                        <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60 font-semibold text-sm">
                            {saving ? "Menyimpan..." : "Simpan Listing"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}