import React from "react";
import { Menu, LogOut, User as UserIcon, LogIn } from "lucide-react";
import Logo from "../Logo/Logo";
import { Link, NavLink,  } from "react-router"; 
import useAuth from "../../hooks/UseAuth";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
 

  const drawerId = "main-drawer";

  const links = (
    <div className="flex flex-col lg:flex-row gap-4 text-base font-medium">
      <NavLink to="/lessons" className="hover:text-primary transition">
        Lessons
      </NavLink>

      <NavLink to="/services" className="hover:text-primary transition">
        Services
      </NavLink>

      <NavLink to="/about" className="hover:text-primary transition">
        About Us
      </NavLink>

      {user && (
        <NavLink to="/dashboard" className="hover:text-primary transition">
          Dashboard
        </NavLink>
      )}
    </div>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully.");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="drawer">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="navbar bg-white text-gray-800 shadow-md sticky top-0 z-20 px-4 xl:px-8 h-16">
          <div className="flex items-center gap-3">
            <label
              htmlFor={drawerId}
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </label>

            <Link to="/" className="flex items-center gap-3">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center gap-6 ml-auto">
    
    {/* Desktop Links */}
    <div className="hidden lg:flex">{links}</div>

    {/* লোডিং স্পিনার: শুধুমাত্র যদি user ডেটা লোড হয়/না হয় তার জন্য, ছবির জন্য নয়। */}
    {loading && (
      <span className="loading loading-spinner loading-sm text-primary"></span>
    )}

    {/* কন্ডিশনাল অথ ব্লক */}
    {!loading &&
      (user ? (
        // --- লগইন করা থাকলে: প্রোফাইল অ্যাভাটার ড্রপডাউন ---
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              <img
                alt={`${user.displayName || "User"} Profile Avatar`}
                // ✅ সমাধান: যদি user.photoURL না থাকে, তবে ডিফল্ট ডামি URL ব্যবহার করা হবে।
                src={
                  user.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-gray-100"
          >
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-error">
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        // --- লগইন করা না থাকলে: লগইন বাটন ---
        <Link
          to="/login"
          className="btn btn-primary hidden lg:inline-flex items-center gap-2 
           font-semibold px-6 py-3 shadow-lg 
           transition duration-300 transform hover:scale-[1.03] 
           hover:bg-blue-700 text-white"
        >
          <LogIn className="w-5 h-5" />
          Login
        </Link>
      ))}
  </div>
        </div>
      </div>

      {/* DRAWER (Mobile Menu) */}
      <div className="drawer-side z-40">
        <label htmlFor={drawerId} className="drawer-overlay"></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* মোবাইল ড্রয়ার কন্ডিশনাল হেডার */}
          {loading ? (
            <li className="mb-6 p-2 bg-base-100 rounded-lg shadow-inner text-center">
              Loading...
            </li>
          ) : user ? (
            // লগইন করা থাকলে ইউজার ডিটেলস
            <li className="mb-6 p-2 bg-base-100 rounded-lg shadow-inner">
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2 ring ring-primary">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="User Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-1">
                  {user.displayName || "User"}
                </h3>
                <p className="text-sm text-gray-500">
                  {user.email || "Welcome"}
                </p>
              </div>
            </li>
          ) : (
            // লগইন করা না থাকলে লগইন বাটন
            <li className="mb-6 p-2 rounded-lg shadow-md">
              <Link to="/login" className="btn btn-primary w-full">
                <UserIcon className="h-5 w-5 mr-2" /> Login / Register
              </Link>
            </li>
          )}

          {links}

          {/* লগআউট বাটন (শুধুমাত্র লগইন থাকলে দেখাবে) */}
          {user && (
            <li className="mt-4 border-t pt-2">
              <button onClick={handleLogout} className="text-error">
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
