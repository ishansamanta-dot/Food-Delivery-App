import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets.js";
import { StoreContex } from "../contex/StoreContex.jsx";

const navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

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

  const { getTotalCartAmount } = useContext(StoreContex);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#111111]/95 px-[5%] py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
        <Link to="/" onClick={() => scrollToSection("home", "Home")}>
          <img
            className="w-[100px] object-contain sm:w-[140px]"
            src={assets.logo}
            alt="Logo"
          />
        </Link>

        <ul className="flex items-center gap-3 text-xs text-gray-300 sm:gap-8 sm:text-base">
          <li
            onClick={() => scrollToSection("home", "Home")}
            className={`cursor-pointer transition-colors hover:text-orange-500 ${
              menu === "Home" ? "text-orange-500" : ""
            }`}
          >
            Home
          </li>

          <li
            onClick={() => scrollToSection("menu", "Menu")}
            className={`cursor-pointer transition-colors hover:text-orange-500 ${
              menu === "Menu" ? "text-orange-500" : ""
            }`}
          >
            Menu
          </li>

          <li
            onClick={() => scrollToSection("contact", "Contact us")}
            className={`cursor-pointer whitespace-nowrap transition-colors hover:text-orange-500 ${
              menu === "Contact us" ? "text-orange-500" : ""
            }`}
          >
            Contact us
          </li>
        </ul>

        <div className="flex shrink-0 items-center gap-3 sm:gap-6">
          <img
            className="hidden w-5 cursor-pointer sm:block"
            src={assets.search_icon}
            alt="Search"
          />

          <Link to="/cart" className="relative">
            <img className="w-6" src={assets.basket_icon} alt="Basket" />

            {getTotalCartAmount() > 0 && (
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#111111] bg-orange-500" />
            )}
          </Link>

          <button
            onClick={() => setShowLogin(true)}
            className="rounded-full border border-orange-500 px-3 py-2 text-xs text-white transition hover:bg-orange-500 sm:px-6 sm:text-sm"
          >
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
