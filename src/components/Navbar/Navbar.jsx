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
  Grid,
  LayoutDashboard,
  Users,
  Flag,
  Settings,
  Heart,
} from "lucide-react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const { role, isRoleLoading } = useRole();

  const drawerId = "main-drawer";

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error(error));
  };

  const links = (
    <div className="flex flex-col gap-1 md:gap-3 text-sm md:text-base font-medium">
      <NavLink
        to="/add-lesson"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
            isActive ? "bg-primary/10 text-primary" : "hover:bg-slate-100"
          }`
        }
      >
        <PlusSquare className="w-5 h-5" />
        <span>Add Lesson</span>
      </NavLink>

      <NavLink
        to="/my-lessons"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
            isActive ? "bg-primary/10 text-primary" : "hover:bg-slate-100"
          }`
        }
      >
        <BookOpen className="w-5 h-5" />
        <span>My Lessons</span>
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
            isActive ? "bg-primary/10 text-primary" : "hover:bg-slate-100"
          }`
        }
      >
        <Heart className="w-5 h-5" />
        <span>Favorites</span>
      </NavLink>

      <NavLink
        to="/services"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
            isActive ? "bg-primary/10 text-primary" : "hover:bg-slate-100"
          }`
        }
      >
        <Layers className="w-5 h-5" />
        <span>Services</span>
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
            isActive ? "bg-primary/10 text-primary" : "hover:bg-slate-100"
          }`
        }
      >
        <Info className="w-5 h-5" />
        <span>About Us</span>
      </NavLink>

      {/* Admin Dashboard dropdown */}
      {user && role === "admin" && (
        <div className="mt-2">
          <div className="collapse collapse-arrow bg-transparent rounded-lg">
            <input type="checkbox" className="peer" />
            <div className="collapse-title flex items-center gap-3 px-3 py-2.5 min-h-0 peer-checked:text-primary">
              <Grid className="w-5 h-5" />
              <span className="font-medium">Admin Dashboard</span>
            </div>
            <div className="collapse-content bg-slate-50/50 rounded-b-lg">
              <ul className="menu menu-sm p-0 pt-2 gap-1">
                <li>
                  <Link to="/dashboard" className="py-2">
                    <LayoutDashboard className="w-4 h-4" /> Overview
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-users" className="py-2">
                    <Users className="w-4 h-4" /> Manage Users
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-lessons" className="py-2">
                    <BookOpen className="w-4 h-4" /> Manage Lessons
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/reported-lessons" className="py-2">
                    <Flag className="w-4 h-4" /> Manage Reported
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="drawer">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-white/80 backdrop-blur-md text-gray-800 shadow-sm sticky top-0 z-20 px-2 md:px-4 xl:px-8 h-16 border-b border-gray-100">
          <div className="navbar-start w-auto gap-1">
            <label
              htmlFor={drawerId}
              className="btn btn-ghost btn-circle md:flex"
            >
              <Menu className="h-5 w-5" />
            </label>
            <Link to="/" className="flex items-center scale-90 md:scale-100">
              <Logo />
            </Link>
          </div>

          <div className="navbar-end flex-1 gap-2 md:gap-4">
            {loading && (
              <span className="loading loading-spinner loading-sm text-primary"></span>
            )}

            {!loading &&
              (user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar online"
                  >
                    <div className="w-9 md:w-10 rounded-full ring ring-primary ring-offset-2 overflow-hidden">
                      <img
                        alt="Profile"
                        src={
                          user.photoURL ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white rounded-xl z-[30] mt-3 w-64 p-3 shadow-2xl border border-gray-100"
                  >
                    <li className="mb-2 pb-2 border-b">
                      <div className="flex items-center gap-3 hover:bg-transparent">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                          <img
                            src={
                              user.photoURL ||
                              "https://i.ibb.co/mR79Y6B/user.png"
                            }
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold truncate text-gray-800">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-error py-2.5 rounded-lg hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary btn-sm md:btn-md rounded-full px-5"
                >
                  <LogIn className="w-4 h-4 mr-1 md:mr-2" />
                  <span className="hidden xs:inline">Login</span>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* SIDE DRAWER */}
      <div className="drawer-side z-[50]">
        <label htmlFor={drawerId} className="drawer-overlay"></label>
        <aside className="menu bg-white text-base-content min-h-full w-[280px] md:w-80 p-0 shadow-2xl">
          {/* User Profile Info in Drawer */}
          <div className="p-6 bg-slate-50 border-b border-gray-100">
            {user ? (
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                    <img
                      src={user.photoURL || "https://i.ibb.co/mR79Y6B/user.png"}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {role === "admin" && (
                    <div className="absolute bottom-0 right-0 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                      Admin
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold mt-3 text-gray-800 line-clamp-1 text-center">
                  {user.displayName || "User"}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{user.email}</p>
                <Link
                  to="/dashboard/profile"
                  className="btn btn-sm btn-outline btn-primary rounded-full w-full max-w-[140px]"
                >
                  <UserIcon className="w-4 h-4 mr-2" /> Profile
                </Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <Logo />
                <p className="text-sm text-gray-500 mt-2 italic">
                  Learn Life Lessons Digitally
                </p>
              </div>
            )}
          </div>

          {/* Nav Links */}
          <div className="p-4 flex-1">{links}</div>

          {/* Logout at bottom */}
          {user && (
            <div className="p-4 border-t mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-error px-4 py-3 rounded-xl hover:bg-red-50 w-full transition font-semibold"
              >
                <LogOut className="h-5 w-5" /> Logout
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Navbar;
