import React, { useState, useEffect } from 'react';
import "./AddListingModal.css"; // Sesuaikan nama CSS modal kamu

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
        <div className="modal-overlay">
            <div className="modal-container">
                {/* 🟢 Judul dinamis tergantung sedang tambah atau edit */}
                <h2>{editingListing ? "📝 Edit Listing Makanan" : "🏪 Tambah Listing Baru"}</h2>
                <p className="modal-subtitle">Pastikan data makanan surplus yang dimasukkan sudah sesuai</p>
                
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nama Makanan</label>
                        <input type="text" name="nama" value={formData.nama} onChange={handleChange} required placeholder="Contoh: Nasi Goreng Ayam" />
                    </div>

                    <div className="form-group">
                        <label>Deskripsi / Catatan</label>
                        <input type="text" name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Contoh: Porsi agak besar, tidak pedas" />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Harga Normal</label>
                            <input type="text" name="hargaNormal" value={formData.hargaNormal} onChange={handleChange} required placeholder="50K" />
                        </div>
                        <div className="form-group">
                            <label>Harga Diskon</label>
                            <input type="text" name="hargaDiskon" value={formData.hargaDiskon} onChange={handleChange} required placeholder="25K" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Jumlah Stok</label>
                            <input type="text" name="stok" value={formData.stok} onChange={handleChange} required placeholder="5 porsi" />
                        </div>
                        <div className="form-group">
                            <label>Waktu Batas Pickup</label>
                            <input type="text" name="pickup" value={formData.pickup} onChange={handleChange} required placeholder="17 Mei, 19.50" />
                        </div>
                    </div>
                    <div className="modal-actions-footer">
                        <button type="button" className="btn-modal-cancel" onClick={onClose}>
                            Batal
                        </button>
                        <button type="submit" className="btn-modal-submit">
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}