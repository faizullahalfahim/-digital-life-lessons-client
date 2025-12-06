import React from "react";
import { Menu, LogOut } from "lucide-react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const links = (
    <div className="flex flex-col lg:flex-row gap-4 text-base font-medium">
      <NavLink to="/services" className="hover:text-primary transition">
        Services
      </NavLink>

      <NavLink to="/about" className="hover:text-primary transition">
        About Us
      </NavLink>

      <NavLink to="/dashboard" className="hover:text-primary transition">
        Dashboard
      </NavLink>
    </div>
  );

  const drawerId = "main-drawer";

  return (
    <div className="drawer">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />

      {/* NAVBAR */}
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-white text-gray-800 shadow-md sticky top-0 z-20 px-4 xl:px-8 h-16">

          {/* LEFT SIDE (Hamburger + Logo) */}
          <div className="flex items-center gap-3">
            <label
              htmlFor={drawerId}
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </label>

            <a href="/" className="flex items-center gap-3">
              <Logo />
            </a>
          </div>

          {/* RIGHT SIDE (Links + Avatar) */}
          <div className="flex items-center gap-6 ml-auto">

            {/* Desktop Links */}
            <div className="hidden lg:flex">
              {links}
            </div>
                <Link to="/login" className="btn btn-primary hidden lg:inline-block">
                  Login
                </Link>
            {/* Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="User Profile Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-gray-100"
              >
                <li><a href="/profile">Profile</a></li>
                <li>
                  <a href="/logout" className="text-error">Logout</a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* DRAWER (Mobile Menu) */}
      <div className="drawer-side z-40">
        <label htmlFor={drawerId} className="drawer-overlay"></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li className="mb-6 p-2 bg-base-100 rounded-lg shadow-inner">
            <div className="flex flex-col items-center p-4">
              <h3 className="text-lg font-semibold mt-1">John Doe</h3>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </li>

          {links}

          <li className="mt-4 border-t pt-2">
            <a href="/logout" className="text-error">
              <LogOut className="h-5 w-5" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;