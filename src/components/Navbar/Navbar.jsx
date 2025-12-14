import React from "react";
import {
  Menu,
  LogOut,
  User as UserIcon,
  LogIn,
  PlusSquare,
  BookOpen,
  Layers,
  Info,
  Home,
  BarChart,
  Settings,
  Grid,
} from "lucide-react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/UseAuth";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();

  const drawerId = "main-drawer";

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully.");
      })
      .catch((error) => console.error(error));
  };

  // Drawer links with icons (used both in sidebar and in top menu if needed)
  const links = (
    <div className="flex flex-col gap-3 text-base font-medium">
      <NavLink
        to="/add-lesson"
        className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-100 transition"
      >
        <PlusSquare className="w-5 h-5 text-slate-600" />
        <span>Add Lesson</span>
      </NavLink>

      <NavLink
        to="/my-lessons"
        className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-100 transition"
      >
        <BookOpen className="w-5 h-5 text-slate-600" />
        <span>My Lessons</span>
      </NavLink>

      <NavLink
        to="/services"
        className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-100 transition"
      >
        <Layers className="w-5 h-5 text-slate-600" />
        <span>Services</span>
      </NavLink>

      <NavLink
        to="/about"
        className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-100 transition"
      >
        <Info className="w-5 h-5 text-slate-600" />
        <span>About Us</span>
      </NavLink>

      {/* Dashboard dropdown (only if admin) */}
      {user && (
        <div className="mt-2">
          <div className="dropdown w-full">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center justify-between gap-3 px-2 py-2 rounded-md hover:bg-slate-100 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Grid className="w-5 h-5 text-slate-600" />
                <span className="font-medium"> Admin Dashboard</span>
              </div>
              <svg
                className="w-4 h-4 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2 z-40"
            >
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-2 py-2 rounded hover:bg-slate-50"
                >
                  <Home className="w-4 h-4 text-slate-600" /> dghs
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-2 px-2 py-2 rounded hover:bg-slate-50"
                >
                  <UserIcon className="w-4 h-4 text-slate-600" /> Profile
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/analytics"
                  className="flex items-center gap-2 px-2 py-2 rounded hover:bg-slate-50"
                >
                  <BarChart className="w-4 h-4 text-slate-600" /> Analytics
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center gap-2 px-2 py-2 rounded hover:bg-slate-50"
                >
                  <Settings className="w-4 h-4 text-slate-600" /> Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="drawer">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="navbar bg-white text-gray-800 shadow-md sticky top-0 z-20 px-4 xl:px-8 h-16">
          <div className="flex items-center gap-3">
            <label htmlFor={drawerId} className="btn btn-ghost btn-circle">
              <Menu className="h-5 w-5" />
            </label>

            <Link to="/" className="flex items-center gap-3">
              <Logo />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 ml-auto">
            
          </div>

          <div className="flex items-center gap-4 ml-4">
            {loading && (
              <span className="loading loading-spinner loading-sm text-primary"></span>
            )}

            {!loading &&
              (user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                      <img
                        alt={`${user.displayName || "User"} Profile Avatar`}
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
                    className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-56 p-2 shadow-xl border border-gray-100"
                  >
                    {/* Enhanced dashboard block */}
                    <li className="px-2 py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={
                              user.photoURL ||
                              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            }
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {user.displayName || "User"}
                          </div>
                          <div className="text-xs text-slate-500 truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </li>


                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-error px-2 py-2 rounded hover:bg-slate-50 w-full"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <label htmlFor={drawerId} className="btn btn-ghost btn-circle">
                  <LogIn className="w-5 h-5" />
                </label>
              ))}
          </div>
        </div>
      </div>

      {/* DRAWER (Mobile/Desktop Menu) */}
      <div className="drawer-side z-40">
        <label htmlFor={drawerId} className="drawer-overlay"></label>

        <aside className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {loading ? (
            <div className="mb-6 p-2 bg-base-100 rounded-lg shadow-inner text-center">
              Loading...
            </div>
          ) : user ? (
            <div className="mb-6 p-2 bg-base-100 rounded-lg shadow-inner">
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
            </div>
          ) : (
            <div className="mb-6 p-2 rounded-lg shadow-md">
              <Link
                to="/login"
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <UserIcon className="h-5 w-5" /> Login / Register
              </Link>
            </div>
          )}

          {/* Links for the Drawer (with icons) */}
          <div className="px-1">{links}</div>

          {user && (
            <div className="mt-4 border-t pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-error px-2 py-2 rounded-md hover:bg-slate-100 w-full"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Navbar;
