import React from "react";
import { Outlet, useLocation, NavLink } from "react-router"; 
import {
  TrendingUp,
  BookOpen,
  Clock,
  Settings,
  User,
  Heart,
  BarChart,
  PlusCircle,
  FileText, 
} from "lucide-react";
import Navbar from "../components/Navbar/Navbar";


const sidebarNavItems = [
  { name: "Overview", href: "/dashboard", Icon: BarChart }, 
  { name: "My Courses", href: "/dashboard/courses", Icon: BookOpen },
  { name: "My Profile", href: "/dashboard/profile", Icon: User },
  { name: "Wishlist", href: "/dashboard/wishlist", Icon: Heart },
  { name: "Settings", href: "/dashboard/settings", Icon: Settings },
  { name: "Add Lesson", href: "/add-lesson", Icon: PlusCircle },
  { name: "My Lessons", href: "/my-lessons", Icon: FileText },
];

const statsData = [
  {
    title: "total lesson",
    value: "35",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Progress",
    value: "75%",
    icon: TrendingUp,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Time spend",
    value: "10 hours",
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
  },
];

const DashboardLayout = () => {
  const location = useLocation();
  const userName = "John Doe"; 

  const isDashboardHome =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";
    
  
  const getNavLinkClass = (href) => {
   
    if (href === "/dashboard") {
      return isDashboardHome
        ? "bg-primary text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100";
    }

  
    return location.pathname.startsWith(href)
      ? "bg-primary text-white shadow-md"
      : "text-gray-700 hover:bg-gray-100";
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="flex bg-gray-50 min-h-[calc(100vh-64px)]">
        
          <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 shadow-xl sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="p-4 mt-2">
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-sm text-gray-500">{userName}</p>
            </div>

            <nav className="flex-grow p-4">
              <ul className="space-y-2">
                {sidebarNavItems.map((item, index) => (
                  <li key={index}>
                  
                    <NavLink
                      to={item.href}
                     
                      className={({ isActive }) => 
                        `flex items-center gap-3 p-3 rounded-lg transition duration-200 
                         ${getNavLinkClass(item.href)}
                        `
                      }
                      end={item.href === "/dashboard"} 
                    >
                      <item.Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

      
          <div className="flex-1 p-4 md:p-8">
            {isDashboardHome && (
              <>
                <header className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                     Welcome {userName}!
                  </h1>
                  <p className="text-gray-600">
                  
                  </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {statsData.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transition duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100"
                    >
                      <div className="flex flex-col">
                        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                          {stat.title}
                        </h2>
                        <p className="text-3xl font-extrabold text-gray-900 mt-1">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

         
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;