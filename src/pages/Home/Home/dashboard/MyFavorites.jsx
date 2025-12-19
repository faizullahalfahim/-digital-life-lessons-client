import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Trash2, ExternalLink, Heart } from "lucide-react";
import { Link } from "react-router";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/favorites/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Removed from favorites.", "success");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Could not remove item", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-100 p-3 rounded-2xl">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">My Favorites</h2>
            <p className="text-slate-500 text-sm">
              You have saved {favorites.length} lessons to study later.
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-200">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-slate-200" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600">
              No favorites found
            </h3>
            <p className="text-slate-400 mb-6">
              Start exploring and save your favorite lessons!
            </p>
            <Link to="/" className="btn btn-primary rounded-xl px-8">
              Explore Lessons
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="table w-full">
              {/* Head */}
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="py-4 px-6">Lesson Info</th>
                  <th className="hidden md:table-cell">Creator</th>
                  <th className="hidden sm:table-cell">Category</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((fav) => (
                  <tr
                    key={fav._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800 text-base">
                        {fav.title}
                      </div>
                      <div className="text-xs text-slate-400 md:hidden mt-1">
                        {fav.category}
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <span className="text-slate-600 font-medium">
                        {fav.creatorName}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell">
                      <span className="badge badge-ghost badge-sm py-3 px-3 rounded-lg text-slate-500">
                        {fav.category || "General"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/lessons/${fav.lessonId}`}
                          className="btn btn-square btn-ghost btn-sm text-blue-500 hover:bg-blue-50"
                          title="View Lesson"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(fav._id)}
                          className="btn btn-square btn-ghost btn-sm text-red-500 hover:bg-red-50"
                          title="Remove"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
