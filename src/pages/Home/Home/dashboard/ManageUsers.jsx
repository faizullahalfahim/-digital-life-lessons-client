import React from "react";
import { ShieldCheck, UserCog } from "lucide-react";

const usersData = [
  {
    id: 1,
    name: "Fahim Hasan",
    email: "fahim@gmail.com",
    role: "user",
    lessons: 5,
  },
  {
    id: 2,
    name: "Rahim Uddin",
    email: "rahim@gmail.com",
    role: "admin",
    lessons: 18,
  },
  {
    id: 3,
    name: "Karim Ahmed",
    email: "karim@gmail.com",
    role: "user",
    lessons: 9,
  },
];

const ManageUsers = () => {
  const handleMakeAdmin = (user) => {
    console.log("Promote to admin:", user);
    // later: API call
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-full">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Manage Users
      </h1>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Total Lessons</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {usersData.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td>{index + 1}</td>

                <td className="font-medium text-gray-800">
                  {user.name}
                </td>

                <td className="text-gray-600">
                  {user.email}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-700"
                      }
                    `}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="text-center">
                  {user.lessons}
                </td>

                <td className="text-center">
                  {user.role === "admin" ? (
                    <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                      <ShieldCheck className="w-4 h-4" />
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium
                      bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                      <UserCog className="w-4 h-4" />
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;