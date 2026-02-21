import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignInPage = () => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        // Kita mengambil 'name' (id input) dan 'value' (teks yang diketik)
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value // variabel value ini yang menyimpan ketikan user
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data sent : ", formData);
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
                                    name="email" // Harus sesuai dengan key di useState
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
                                    name="password" // Harus sesuai dengan key di useState
                                    type="password"
                                    placeholder="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary">Sign In</button>

                            <div className="other-option">
                                <span>Or Continue With</span>
                            </div>

                            <div className="social-buttons">
                                <button type="button" className="btn-social">
                                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                                    Google
                                </button>
                                <button type="button" className="btn-social">
                                    <i className="apple-icon"></i>
                                    Apple
                                </button>
                            </div>

                            <p className="signin-text">
                                Don't have an Account? <Link to="/RegisterPage">Register Now</Link>
                            </p>
                        </form>
                    </div>
                </div>
        </div>
            <footer className="footer">
                <p>By Continuing, you agree to receive calls or messages from FoodSave and its affiliates.</p>
            </footer>
        </div>
    );
};