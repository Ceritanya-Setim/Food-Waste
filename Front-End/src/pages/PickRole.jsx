import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PickRole = () => {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const handleRoute = () => {
        if (!selected) return;

        if (selected === 'merchant') {
            navigate("/MerchantDashboard");
        } else {
            navigate("/ConsumerDashboard");
        }
    };

    return (
        <div className="pick-role-container">
            <nav className="navbar">
                <h1 className="logo">FoodSave</h1>
            </nav>

            <div className="role-main-content">
                <div className="role-header-text">
                    <h2 className="role-main-title">Select your Role</h2>
                    <p className="role-description">
                        Pilih peran Anda untuk memulai perjalanan mengurangi food waste dan membantu lingkungan.
                    </p>
                </div>

                <div className="role-grid">
                    {/* Card Consumer */}
                    <div
                        className={`option-card ${selected === 'consumer' ? 'is-selected' : ''}`}
                        onClick={() => setSelected('consumer')}
                    >
                        <div className="role-image-container">
                            <img
                                src="https://media.istockphoto.com/id/2000117676/photo/here-try-some-tacos-are-super-tasty.jpg?s=612x612&w=0&k=20&c=cPSqg040qMkg5uYiKUhqg7QJkwwNR9_ZYbnzlZ2-rF8="
                                alt="Consumer"
                            />
                        </div>
                        <div className="role-card-content">
                            <h3>Consumer</h3>
                            <p>Dapatkan makanan berkualitas dengan harga yang jauh lebih hemat.</p>
                        </div>
                    </div>

                    {/* Card Merchant */}
                    <div
                        className={`option-card ${selected === 'merchant' ? 'is-selected' : ''}`}
                        onClick={() => setSelected('merchant')}
                    >
                        <div className="role-image-container">
                            <img
                                src="https://idebiz.id/wp-content/uploads/2023/09/Pelatihan-Chef-Kunci-Sukses-Kuliner.jpg"
                                alt="Merchant"
                            />
                        </div>
                        <div className="role-card-content">
                            <h3>Merchant</h3>
                            <p>Jual makanan surplus Anda untuk mengurangi kerugian operasional.</p>
                        </div>
                    </div>
                </div>

                <div className="role-action-footer">
                    <button
                        className={`btn-submit-role ${selected ? 'btn-ready' : 'btn-disabled'}`}
                        onClick={handleRoute}
                        disabled={!selected}
                    >
                        Lanjutkan <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};