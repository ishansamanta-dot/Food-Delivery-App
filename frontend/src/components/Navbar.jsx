import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets.js";
import { StoreContex } from "../contex/StoreContex.jsx";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  const { getTotalCartAmount, token, setToken, search, setSearch } =
    useContext(StoreContex);

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const scrollToSection = (sectionId, menuName) => {
    setMenu(menuName);

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    navigate("/");
    setTimeout(() => {
      document.getElementById("food-display")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const closeSearch = () => {
    setSearch("");
    setShowSearch(false);
  };

  useEffect(() => {
  if (!isHome) {
    setSearch("");
    setShowSearch(false);
  }
}, [isHome]);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#111111]/95 px-4 py-3 backdrop-blur-xl sm:px-[5%] sm:py-4">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
        <Link
          to="/"
          onClick={() => scrollToSection("home", "Home")}
          className="shrink-0 transition-opacity duration-200 hover:opacity-80"
        >
          <img
            className="w-[90px] object-contain sm:w-[125px] lg:w-[140px]"
            src={assets.logo}
            alt="FoodBite Logo"
          />
        </Link>

        {isHome && (
          <ul className="flex items-center gap-3 text-[11px] font-medium text-gray-300 sm:gap-6 sm:text-sm lg:gap-8 lg:text-base">
            <li
              onClick={() => scrollToSection("home", "Home")}
              className={`relative cursor-pointer whitespace-nowrap py-2 transition-colors duration-200 hover:text-orange-500 ${
                menu === "Home"
                  ? "text-orange-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-orange-500"
                  : ""
              }`}
            >
              Home
            </li>

            <li
              onClick={() => scrollToSection("menu", "Menu")}
              className={`relative cursor-pointer whitespace-nowrap py-2 transition-colors duration-200 hover:text-orange-500 ${
                menu === "Menu"
                  ? "text-orange-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-orange-500"
                  : ""
              }`}
            >
              Menu
            </li>

            <li
              onClick={() => scrollToSection("contact", "Contact us")}
              className={`relative cursor-pointer whitespace-nowrap py-2 transition-colors duration-200 hover:text-orange-500 ${
                menu === "Contact us"
                  ? "text-orange-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-orange-500"
                  : ""
              }`}
            >
              Contact us
            </li>
          </ul>
        )}

        <div className="flex shrink-0 items-center gap-3 sm:gap-5 lg:gap-6">
          {isHome && (
          showSearch ? (
            <div className="flex items-center rounded-full border border-white/10 bg-[#1c1c1c] px-2.5 py-2 transition-colors focus-within:border-orange-500/60 sm:px-3">
              <input
                autoFocus
                value={search}
                onChange={onSearchChange}
                placeholder="Search food..."
                className="w-20 bg-transparent text-xs text-white outline-none placeholder:text-gray-500 sm:w-32 sm:text-sm lg:w-48"
              />

              <button
                onClick={closeSearch}
                className="ml-1 text-sm text-gray-400 transition-colors hover:text-orange-500 sm:ml-2"
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="rounded-full p-1 transition-colors duration-200 hover:bg-white/5"
              aria-label="Open search"
            >
              <img
                className="w-4 cursor-pointer sm:w-5"
                src={assets.search_icon}
                alt="Search"
              />
            </button>
          )
        )}

          <Link
            to="/cart"
            className="group relative rounded-full p-1 transition-colors hover:bg-white/5"
          >
            <img
              className="w-5 transition-transform duration-200 group-hover:scale-110 sm:w-6"
              src={assets.basket_icon}
              alt="Basket"
            />

            {getTotalCartAmount() > 0 && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#111111] bg-orange-500" />
            )}
          </Link>

          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="whitespace-nowrap rounded-full border border-orange-500/80 bg-orange-500 px-3 py-2 text-[11px] font-semibold text-white transition-colors duration-200 hover:border-orange-400 hover:bg-orange-600 sm:px-5 sm:text-sm lg:px-6"
            >
              Sign in
            </button>
          ) : (
            <div className="group relative cursor-pointer py-1">
              <img
                className="w-6 rounded-full transition-transform duration-200 group-hover:scale-105 sm:w-7"
                src={assets.profile_icon || assets.parcel_icon}
                alt="Profile"
              />

              <ul className="absolute right-0 top-full z-50 hidden min-w-40 flex-col gap-3 rounded-xl border border-white/10 bg-[#1c1c1c] p-3 text-sm text-gray-300 shadow-xl shadow-black/30 group-hover:flex">
                <li
                  onClick={() => navigate("/myorders")}
                  className="flex items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-orange-500"
                >
                  <img className="w-5" src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>

                <hr className="border-white/10" />

                <li
                  onClick={logout}
                  className="flex items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-orange-500"
                >
                  <img className="w-5" src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
