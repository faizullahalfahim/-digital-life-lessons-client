import React, { useState } from "react";
import {
  Trash2,
  CheckCircle,
  Flag,
  Settings,
  Star,
  Users,
  Lock,
  Filter,
} from "lucide-react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";
import ErrorPage from "../../../../components/ErrorPage";

const ManageLessons = () => {
  
  

 
  const axiosSecure = useAxiosSecure();
  const [filterCategory, setFilterCategory] = useState("");
  const [filterVisibility, setFilterVisibility] = useState("");
  const [filterFlagged, setFilterFlagged] = useState(false);

  const {
    data: lessons = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-lessons-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  const publicCount = lessons.filter((l) => l.visibility === "Public").length;
  const privateCount = lessons.filter((l) => l.visibility === "Private").length;
  const flaggedCount = lessons.filter((l) => (l.flags || 0) > 0).length;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Lesson will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/lessons/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Lesson removed.", "success");
        }
      }
    });
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    const res = await axiosSecure.patch(`/lessons/${id}`, {
      isFeatured: !currentStatus,
    });
    if (res.data.modifiedCount > 0) refetch();
  };

  const handleMarkReviewed = async (id) => {
    const res = await axiosSecure.patch(`/lessons/${id}`, {
      status: "Reviewed",
    });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire("Success", "Marked as Reviewed", "success");
    }
  };

  const filteredLessons = lessons.filter((lesson) => {
  const matchesCategory = filterCategory ? lesson.category === filterCategory : true;
  const matchesVisibility = filterVisibility ? lesson.visibility === filterVisibility : true;
  const matchesFlagged = filterFlagged ? (lesson.flags > 0) : true;

  return matchesCategory && matchesVisibility && matchesFlagged;
});

  return (
    <div className="p-2 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3 px-2">
        <Settings className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" /> Manage
        All Lessons
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 px-2">
        <div className="bg-white shadow-sm p-3 md:p-5 border-l-4 border-blue-500 rounded-lg">
          <p className="text-[10px] md:text-sm font-medium text-gray-500 uppercase">
            Total
          </p>
          <h2 className="text-lg md:text-2xl font-bold">{lessons.length}</h2>
        </div>
        <div className="bg-white shadow-sm p-3 md:p-5 border-l-4 border-green-500 rounded-lg">
          <p className="text-[10px] md:text-sm font-medium text-gray-500 uppercase">
            Public
          </p>
          <h2 className="text-lg md:text-2xl font-bold">{publicCount}</h2>
        </div>
        <div className="bg-white shadow-sm p-3 md:p-5 border-l-4 border-yellow-500 rounded-lg">
          <p className="text-[10px] md:text-sm font-medium text-gray-500 uppercase">
            Private
          </p>
          <h2 className="text-lg md:text-2xl font-bold">{privateCount}</h2>
        </div>
        <div className="bg-white shadow-sm p-3 md:p-5 border-l-4 border-red-500 rounded-lg">
          <p className="text-[10px] md:text-sm font-medium text-gray-500 uppercase">
            Flagged
          </p>
          <h2 className="text-lg md:text-2xl font-bold">{flaggedCount}</h2>
        </div>
      </div>

      {/* --- Filters Section --- */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm items-center">
        <div className="flex items-center gap-2 text-gray-500 font-medium">
          <Filter className="w-4 h-4" /> <span>Filters:</span>
        </div>

        {/* Category Filter */}
        <select
          className="select select-bordered select-sm w-full md:w-auto"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(lessons.map((l) => l.category))].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Visibility Filter */}
        <select
          className="select select-bordered select-sm w-full md:w-auto"
          onChange={(e) => setFilterVisibility(e.target.value)}
        >
          <option value="">All Visibility</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>

        {/* Flags Filter (New) */}
        <label className="label cursor-pointer gap-2 bg-red-50 px-3 py-1 rounded-md border border-red-100">
          <span className="label-text text-red-600 font-bold text-xs uppercase">
            Show Flagged Only
          </span>
          <input
            type="checkbox"
            className="checkbox checkbox-error checkbox-xs"
            checked={filterFlagged}
            onChange={(e) => setFilterFlagged(e.target.checked)}
          />
        </label>
      </div>

      {/* --- Table Section: Responsive Wrapper --- */}
      <div className="mx-2 bg-white rounded-xl shadow-md border border-gray-100">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead className="bg-gray-100 text-gray-700 text-[10px] md:text-xs uppercase">
              <tr>
                <th className="px-2 md:px-4">Lesson</th>
                <th className="hidden lg:table-cell px-4">Creator</th>
                <th className="text-center px-2">Category</th>
                <th className="text-center px-2">Status</th>
                <th className="text-center px-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm">
              {filteredLessons.map((lesson) => (
                <tr key={lesson._id} className="hover:bg-gray-50 transition">
                  {/* Lesson Info */}
                  <td className="px-2 md:px-4">
                    <div className="font-bold text-gray-800 line-clamp-1 max-w-[100px] md:max-w-xs">
                      {lesson.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {lesson.visibility === "Public" ? (
                        <Users className="w-3 h-3 text-green-500" />
                      ) : (
                        <Lock className="w-3 h-3 text-yellow-500" />
                      )}
                      {lesson.flags > 0 && (
                        <span className="text-red-500 font-bold flex items-center gap-0.5">
                          <Flag className="w-3 h-3" /> {lesson.flags}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Creator: Hidden on small & medium screens */}
                  <td className="hidden lg:table-cell px-4 text-gray-500 truncate max-w-[150px]">
                    {lesson.creator}
                  </td>

                  {/* Category */}
                  <td className="text-center px-2">
                    <span className="badge badge-ghost badge-xs md:badge-sm whitespace-nowrap">
                      {lesson.category}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="text-center px-2">
                    <div
                      className={`badge badge-xs md:badge-sm text-white border-none ${
                        lesson.status === "Reviewed"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    >
                      {lesson.status || "Pending"}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-2">
                    <div className="flex justify-center gap-1 md:gap-2">
                      <button
                        onClick={() =>
                          handleToggleFeatured(lesson._id, lesson.isFeatured)
                        }
                        className={`btn btn-ghost btn-xs p-0 md:p-1 ${
                          lesson.isFeatured
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        <Star
                          className="w-3 h-3 md:w-4 md:h-4"
                          fill={lesson.isFeatured ? "currentColor" : "none"}
                        />
                      </button>

                      {lesson.status !== "Reviewed" && (
                        <button
                          onClick={() => handleMarkReviewed(lesson._id)}
                          className="btn btn-ghost btn-xs p-0 md:p-1 text-green-600"
                        >
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="btn btn-ghost btn-xs p-0 md:p-1 text-red-600"
                      >
                        <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLessons.length === 0 && (
          <div className="p-10 text-center text-gray-400 text-sm">
            No lessons found with these filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLessons;
