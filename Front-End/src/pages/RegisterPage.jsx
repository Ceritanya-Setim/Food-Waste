import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegis = (e) => {
        e.preventDefault();
        if (formData.password != formData.confirmPassword) {
            alert("Password dan konfirmasi password tidak cocok!");
            return;
        }
        console.log("Register Data", formData);
        navigate("/PickRole");
    }

    return (
        <div className="register-page-container">
            <nav className="navbar">
                <h1 className="logo">FoodSave</h1>
            </nav>

            <div className="main-content">
                {/* Bagian Gambar (Desktop) */}
                <div className="img-left-side"></div>

                {/* Bagian Form */}
                <div className="form-right-side">
                    <div className="form-wrapper">
                        <header className="form-header">
                            <h2>Daftar Akun Baru</h2>
                            <p>Bergabung dengan FoodSave untuk mengurangi food waste</p>
                        </header>

                        <form className="register-form" onSubmit={handleRegis}>
                            <div className="input-group">
                                <label>Nama Lengkap</label>
                                <input
                                    name="fullname"
                                    type="text"
                                    placeholder="Nama Anda"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <div className="password-field">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Minimal 8 karakter"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="eye-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Konfirmasi Password</label>
                                <input
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ulangi password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="btn-register">Daftar</button>
                            <p className="register-text">
                                Sudah punya akun? <Link to="/SignInPage">Masuk di sini</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>Dengan melanjutkan, Anda setuju untuk menerima panggilan atau pesanan dari FoodSave dan afiliasinya.</p>
            </footer>
        </div>
    );
};