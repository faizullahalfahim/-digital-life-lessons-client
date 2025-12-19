import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { BookOpen, Crown, Heart, Eye, X, Lock, Unlock } from "lucide-react";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useRole();

  const isAdmin = role === "admin";

  const { data: lessons = [], refetch } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons`);
      return res.data;
    },
  });

  const handleLessonDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this lesson!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Lesson has been removed.", "success");
          }
        });
      }
    });
  };

  // Visibility Toggle Function
  const handleToggleVisibility = async (id, currentVisibility) => {
    const newVisibility = currentVisibility === "public" ? "Private" : "public";
    try {
      const res = await axiosSecure.patch(`/lessons/${id}`, {
        visibility: newVisibility,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Success", `Lesson is now ${newVisibility}`, "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update visibility", "error");
    }
  };

  // Access Level Toggle Function (Only for Premium Users)
  const handleToggleAccess = async (id, currentAccess) => {
    if (!isAdmin) {
      return Swal.fire(
        "Upgrade Required",
        "Only premium users can change access level!",
        "warning"
      );
    }

    const newAccess = currentAccess === "free" ? "premium" : "free";

    try {
      const res = await axiosSecure.patch(`/lessons/${id}`, {
        accessLevel: newAccess,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Success", `Access set to ${newAccess}`, "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update access level", "error");
    }
  };

  const displayedLessons = lessons.map((lesson) => ({
    ...lesson,
    title: lesson.title || "No Title",
    accessLevel: lesson.accessLevel || "free",
    visibility: lesson.visibility || "public",
    createdAt: lesson.createdAt || new Date().toISOString(),
    reactionsCount: lesson.reactionsCount || 0,
  }));
  if (roleLoading) return <div className="text-center p-10 font-bold">Checking permissions...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm border">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-indigo-600" />
            My Lessons ({displayedLessons.length})
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your published content
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 text-sm uppercase">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Lesson</th>
                <th className="p-4">Access Level</th>
                <th className="p-4">Visibility</th>
                <th className="p-4">Stats</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedLessons.map((lesson, index) => (
                <tr
                  key={lesson._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-semibold">{lesson.title}</td>

                  {/* Access Level Toggle */}
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleToggleAccess(lesson._id, lesson.accessLevel)
                      }
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer capitalize ${
                        lesson.accessLevel === "premium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {lesson.accessLevel === "premium" ? (
                        <Crown size={12} />
                      ) : (
                        <Unlock size={12} />
                      )}
                      {lesson.accessLevel}
                    </button>
                  </td>

                  {/* Visibility Toggle */}
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleToggleVisibility(lesson._id, lesson.visibility)
                      }
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        lesson.visibility === "Public"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {lesson.visibility === "public" ? (
                        <Eye size={12} />
                      ) : (
                        <X size={12} />
                      )}
                      {lesson.visibility}
                    </button>
                  </td>

                  <td className="p-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Heart size={14} className="text-rose-500" />{" "}
                      {lesson.reactionsCount}
                    </span>
                  </td>

                  <td className="p-4 text-center space-x-3">
                    <Link
                      to={`/dashboard/update-lesson/${lesson._id}`}
                      className="inline-block p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                    >
                      <FiEdit size={18} />
                    </Link>
                    <button
                      onClick={() => handleLessonDelete(lesson._id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <FaTrashCan size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Simplified) */}
        <div className="md:hidden space-y-4">
          {displayedLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white p-4 rounded-xl border shadow-sm space-y-3"
            >
              <h3 className="font-bold">{lesson.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleToggleAccess(lesson._id, lesson.accessLevel)
                  }
                  className="text-xs px-2 py-1 bg-slate-100 rounded"
                >
                  {lesson.accessLevel}
                </button>
                <button
                  onClick={() =>
                    handleToggleVisibility(lesson._id, lesson.visibility)
                  }
                  className="text-xs px-2 py-1 bg-slate-100 rounded"
                >
                  {lesson.visibility}
                </button>
              </div>
              <div className="flex justify-between items-center pt-2">
                <Link
                  to={`/dashboard/update-lesson/${lesson._id}`}
                  className="text-indigo-600"
                >
                  <FiEdit size={20} />
                </Link>
                <button
                  onClick={() => handleLessonDelete(lesson._id)}
                  className="text-rose-600"
                >
                  <FaTrashCan size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLessons;
