import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Home } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-40">
      <Link to="/" className="text-lg font-bold text-gray-800">
        ShopHub
      </Link>

      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-1 ${
              isActive ? "text-blue-600 font-bold" : "text-gray-700"
            }`
          }
        >
          <Home size={20} />
          <span className="hidden sm:inline">Home</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex items-center gap-1 ${
              isActive ? "text-blue-600 font-bold" : "text-gray-700 "
            }`
          }
        >
          <ShoppingCart size={20} />
          <span className="hidden sm:inline">My Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
