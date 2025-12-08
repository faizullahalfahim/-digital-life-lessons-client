import React from "react";
import { Outlet, useLocation } from "react-router";
import {
  TrendingUp,
  BookOpen,
  Clock,
  Settings,
  User,
  Heart,
  BarChart,
  PlusCircle,
} from "lucide-react";
import Navbar from "../components/Navbar/Navbar";

const sidebarNavItems = [
  { name: "Overview", href: "/dashboard", Icon: BarChart },
  
 
 
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

  return (
    <div>
      <header>
        <Navbar> </Navbar>
      </header>
      <main>
        <div className="flex bg-gray-50 min-h-[calc(100vh-64px)]">
          <div className=" lg:flex flex-col w-64 bg-white border-r border-gray-200 shadow-xl sticky top-0 h-full">
            <div className="p-4 mt-2">
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            </div>

            <nav className="flex-grow p-4">
              <ul className="space-y-2">
                {sidebarNavItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-3 p-3 rounded-lg transition duration-200 
                                        ${
                                          location.pathname === item.href ||
                                          (item.name === "" && isDashboardHome)
                                            ? "bg-primary text-white shadow-md"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                    >
                      <item.Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </a>
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
                    welcome, {userName}!
                  </h1>
                  <p className="text-gray-600">
                    learn, grow, and achieve your goals with your personalized
                    dashboard.
                  </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {statsData.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transition duration-300 hover:shadow-xl hover:scale-[1.01]"
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
