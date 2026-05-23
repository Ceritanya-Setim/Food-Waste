import { useNavigate } from "react-router-dom";
import { LeafIcon, CartIcon } from "../../Icons";

export default function Navbar({ activePage, setActivePage, cartCount }) {
  const navigate = useNavigate();

  const goToPage = (page) => {
    setActivePage(page);
    if (page === "dashboard") navigate("/DashboardConsumer");
    if (page === "explore") navigate("/ExploreConsumer");
    if (page === "impact") navigate("/ImpactConsumer");
    if (page === "cart") navigate("/CartConsumer");
    if (page === "profile") navigate("/ProfileConsumer");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => goToPage("dashboard")}>
          <div className="w-9 h-9 rounded-xl grid place-items-center bg-green-500 text-white">
            <LeafIcon />
          </div>
          <span className="text-[1.1rem] font-extrabold text-slate-900">FoodSave</span>
        </div>

        <div className="flex gap-2">
          {["dashboard", "explore", "impact"].map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                activePage === page
                  ? "bg-green-500 text-white"
                  : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
              }`}
            >
              {page === "dashboard" ? "Dashboard" : page === "explore" ? "Explore" : "Impact"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => goToPage("cart")} className={`relative w-10 h-10 rounded-lg grid place-items-center transition ${activePage === "cart" ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-600 hover:bg-emerald-50"}`} type="button">
            <CartIcon />
            {cartCount > 0 && (
              <span className="-top-1 -right-1 absolute w-5 h-5 rounded-full bg-red-600 text-white text-xs font-extrabold grid place-items-center">{cartCount}</span>
            )}
          </button>
          <button onClick={() => goToPage("profile")} className={`w-9 h-9 rounded-full grid place-items-center transition ${activePage === "profile" ? "bg-emerald-600 text-white" : "bg-amber-200 text-amber-800 hover:bg-amber-300"}`} type="button">
            DB
          </button>
        </div>
      </div>
    </nav>
  );
}