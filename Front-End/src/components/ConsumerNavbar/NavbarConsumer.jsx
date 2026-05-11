import { useNavigate } from "react-router-dom";
import { LeafIcon, CartIcon } from "../Icons";
import "./NavbarConsumer.css";

export default function Navbar({ activePage, setActivePage, cartCount }) {
  const navigate = useNavigate();

  const goToPage = (page) => {
    setActivePage(page);
    if (page === "dashboard") navigate("/ConsumerDashboard");
    if (page === "explore") navigate("/ExploreConsumer");
    if (page === "impact") navigate("/ImpactConsumer");
  };

  return (
    <nav className="consumer-navbar">
      <div className="consumer-navbar-inner">
        <div className="nav-brand" onClick={() => goToPage("dashboard")}> 
          <div className="brand-logo">
            <LeafIcon />
          </div>
          <span className="brand-text">FoodSave</span>
        </div>

        <div className="nav-links">
          {["dashboard", "explore", "impact"].map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`nav-link ${activePage === page ? "active" : ""}`}
            >
              {page === "dashboard" ? "Dashboard" : page === "explore" ? "Explore" : "Impact"}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button className="icon-button" type="button">
            <CartIcon />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="user-button" type="button">
            DB
          </button>
        </div>
      </div>
    </nav>
  );
}