import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as an Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} removed from Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="p-2 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Manage Users
          <span className="ml-2 text-sm font-medium text-gray-500">
            ({users.length})
          </span>
        </h2>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          View, search and manage platform users
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-sm px-2">
        <label className="input input-bordered flex items-center gap-2 bg-white shadow-sm h-10 md:h-12">
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            className="grow text-sm"
            placeholder="Search users by name or email"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>
      </div>

      {/* Table Container - Responsive wrapper */}
      <div className="mx-2 overflow-hidden bg-white rounded-xl shadow-md border border-gray-100">
        <div className="overflow-x-auto w-full">
          <table className="table w-full table-zebra">
            {/* head */}
            <thead className="bg-gray-100 text-gray-700 text-xs md:text-sm uppercase">
              <tr>
                <th className="px-2 md:px-4">#</th>
                <th className="px-2 md:px-4">User Details</th>
                <th className="hidden lg:table-cell px-2 md:px-4">Email</th>
                <th className="px-2 md:px-4">Role</th>
                <th className="text-center px-2 md:px-4">Lessons</th>
                <th className="text-center px-2 md:px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition text-xs md:text-sm">
                  {/* Index */}
                  <td className="px-2 md:px-4 font-medium">{index + 1}</td>

                  {/* User Details (Image + Name + Email on mobile) */}
                  <td className="px-2 md:px-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="avatar hidden sm:block">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full ring ring-indigo-100">
                          <img src={user.photoURL || "https://i.ibb.co/mR79Y6B/user.png"} alt={user.displayName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 break-words max-w-[100px] md:max-w-none">
                          {user.displayName}
                        </div>
                        {/* Email only shows here on mobile/tablet */}
                        <div className="text-[10px] text-gray-500 lg:hidden truncate max-w-[120px]">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email - Hidden on mobile, shown on large screens */}
                  <td className="hidden lg:table-cell px-2 md:px-4 text-gray-600">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="px-2 md:px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Total Lessons */}
                  <td className="text-center px-2 md:px-4 font-medium text-gray-700">
                    {user.totalLessons ?? 0}
                  </td>

                  {/* Admin Action */}
                  <td className="text-center px-2 md:px-4">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-xs md:btn-sm bg-red-100 text-red-600 hover:bg-red-200 border-none"
                        title="Remove Admin"
                      >
                        <FiShieldOff className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-xs md:btn-sm bg-green-100 text-green-600 hover:bg-green-200 border-none"
                        title="Make Admin"
                      >
                        <FaUserShield className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;