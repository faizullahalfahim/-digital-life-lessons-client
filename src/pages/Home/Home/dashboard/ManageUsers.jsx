import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('')

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' }
        //TODO: must ask for confirmation before proceed
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} marked as an Admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' }
        //TODO: must ask for confirmation before proceed
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} removed from Admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

   return (
  <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
    {/* Header */}
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-gray-800">
        Manage Users
        <span className="ml-2 text-sm font-medium text-gray-500">
          ({users.length})
        </span>
      </h2>
      <p className="text-gray-500 mt-1">
        View, search and manage platform users
      </p>
    </div>

    {/* Search */}
    <div className="mb-6 max-w-sm">
      <label className="input input-bordered flex items-center gap-2 bg-white shadow-sm">
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

    {/* Table */}
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
      <table className="table w-full">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-center">Admin Action</th>
            
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className="hover:bg-gray-50 transition"
            >
              <td className="font-medium">{index + 1}</td>

              {/* User Info */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring ring-indigo-100">
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.displayName}
                    </p>
                   
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="text-sm text-gray-600">
                {user.email}
              </td>

              {/* Role */}
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              {/* Admin Action */}
              <td className="text-center">
                {user.role === "admin" ? (
                  <button
                    onClick={() => handleRemoveAdmin(user)}
                    className="btn btn-sm bg-red-100 text-red-600 hover:bg-red-200 border-none"
                    title="Remove Admin"
                  >
                    <FiShieldOff className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-sm bg-green-100 text-green-600 hover:bg-green-200 border-none"
                    title="Make Admin"
                  >
                    <FaUserShield className="w-4 h-4" />
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