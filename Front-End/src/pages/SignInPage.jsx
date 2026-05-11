import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignInPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login data:", formData);
        // Untuk demo, setelah login lanjut ke pemilihan peran.
        navigate("/PickRole");
    };

    return (
        <div className="SignIn-Container">
            <nav className="navbar">
                <h1 className="logo">FoodSave</h1>
            </nav>

            <div className="main-content">
                <div className="img-left-side">
                    <div className="overlay"></div>
                </div>

                <div className="form-right-side">
                    <div className="form-container">
                        <header className="form-header">
                            <h2>Sign in to FoodSave</h2>
                            <p>A Platform to reduce food waste and save quality food</p>
                        </header>

                        <form className="signin-form" onSubmit={handleSubmit}>
                            <div className="input-email">
                                <label>Email</label>
                                <input
                                    name="email" 
                                    type="email"
                                    placeholder="name@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-password">
                                <label>Password</label>
                                <input
                                    name="password" 
                                    type="password"
                                    placeholder="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary">Log In</button>

                            <p className="signin-text">
                                Tidak memiliki akun ? <Link to="/RegisterPage">Daftar Sekarang</Link>
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