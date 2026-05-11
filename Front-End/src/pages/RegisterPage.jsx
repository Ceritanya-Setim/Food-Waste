import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi password harus sama.");
      return;
    }

    console.log("Registrasi berhasil:", formData);
    navigate("/PickRole");
  };

  return (
    <div className="Register-Container">
      <nav className="navbar">
        <h1 className="logo">FoodSave</h1>
      </nav>

      <div className="main-content register-page">
        <div className="form-right-side">
          <div className="form-container">
            <header className="form-header">
              <h2>Buat Akun Baru</h2>
              <p>Daftar untuk memulai dan pilih peran Anda berikutnya.</p>
            </header>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Nama Lengkap</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Nama lengkap"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
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

              <div className="input-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Konfirmasi Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Konfirmasi password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primary">Daftar</button>

              <p className="signin-text">
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