import { LeafIcon } from "./Icons";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="consumer-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-top">
              <div className="footer-logo">
                <LeafIcon />
              </div>
              <div>
                <div className="footer-brand-title">FoodSave</div>
                <div className="footer-brand-subtitle">Business Portal</div>
              </div>
            </div>
            <p className="footer-text">
              Platform manajemen bisnis untuk restoran yang peduli lingkungan
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Resources</h4>
            {['Panduan Memulai', 'Best Practices', 'API Documentation', 'Video Tutorial'].map((l) => (
              <a key={l} href="#" className="footer-link">
                {l}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Support</h4>
            {['Help Center', 'Contact Support', 'Partner Success', 'Community Forum'].map((l) => (
              <a key={l} href="#" className="footer-link">
                {l}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Legal</h4>
            {['Terms of Service', 'Privacy Policy', 'Partner Agreement', 'Cookie Policy'].map((l) => (
              <a key={l} href="#" className="footer-link">
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">© 2024 FoodSave Business. All rights reserved.</div>
          <div className="footer-bottom-right">
            {['Settings', 'Notifications', 'Reports'].map((l) => (
              <a key={l} href="#" className="footer-link">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-status-bar">
        <div className="footer-status-grid">
          <div className="footer-status-card">
            <div className="footer-status-label">
              <span className="status-dot" /> PLATFORM STATUS
            </div>
            <div className="footer-status-value">All Systems Operational</div>
          </div>
          <div className="footer-status-card">
            <div className="footer-status-label">TOTAL PARTNERS</div>
            <div className="footer-status-value">2,450+ Restoran</div>
          </div>
          <div className="footer-status-card">
            <div className="footer-status-label">FOOD SAVED</div>
            <div className="footer-status-value">45,000+ Porsi</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
