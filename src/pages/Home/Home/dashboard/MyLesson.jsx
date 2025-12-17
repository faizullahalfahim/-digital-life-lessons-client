import { useQuery } from "@tanstack/react-query";
import React from "react";


import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";
import {
  BookOpen,
  Crown,
  Heart,
  Eye,
  Calendar,
  Lock,
  Unlock,
  X,
} from "lucide-react";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
            Swal.fire({
              title: "Deleted!",
              text: "Your lesson has been permanently deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleToggleAccess = (lesson) => {
    Swal.fire({
      title: "Feature Not Implemented",
      text: `Toggle Access Level for: ${lesson.title}`,
      icon: "info",
    });
  };

  const handleToggleVisibility = (lesson) => {
    Swal.fire({
      title: "Feature Not Implemented",
      text: `Toggle Visibility for: ${lesson.title}`,
      icon: "info",
    });
  };

  const displayedLessons = lessons.map((lesson) => ({
    ...lesson,
    title: lesson.title || lesson.parcelName || "No Title",
    accessLevel:
      lesson.accessLevel ||
      (lesson.paymentStatus === "paid" ? "Premium" : "Free"),
    visibility:
      lesson.visibility ||
      (lesson.trackingId === "public" ? "Public" : "Private"),
    createdAt: lesson.createdAt || new Date().toISOString(),
    reactionsCount: lesson.reactionsCount || 15,
    savesCount: lesson.savesCount || 8,
  }));

  return (
  <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm border">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-indigo-600" />
          My Lessons
          <span className="text-sm font-medium text-slate-500">
            ({displayedLessons.length})
          </span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage, update & track your published lessons
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 text-slate-700 text-sm uppercase">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Lesson</th>
              <th className="p-4 text-left">Access</th>
              <th className="p-4 text-left">Stats</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayedLessons.map((lesson, index) => (
              <tr
                key={lesson._id}
                className="border-t hover:bg-indigo-50/50 transition"
              >
                <td className="p-4 font-medium">{index + 1}</td>

                <td className="p-4">
                  <div className="font-semibold text-slate-800">
                    {lesson.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {lesson.category || "General"}
                  </div>
                </td>

                <td className="p-4 space-y-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full font-semibold ${
                      lesson.accessLevel === "Premium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    <Crown className="w-3 h-3" />
                    {lesson.accessLevel}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full font-semibold ${
                      lesson.visibility === "Public"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {lesson.visibility === "Public" ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <X className="w-3 h-3" />
                    )}
                    {lesson.visibility}
                  </span>
                </td>

                <td className="p-4 text-sm text-slate-600">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      {lesson.reactionsCount}
                    </span>
                    <span className="flex items-center gap-1">
                     
                    
                    </span>
                  </div>
                </td>

                <td className="p-4 text-sm text-slate-600">
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 text-center space-x-2">
                  <Link
                    to={`/lesson/details/${lesson._id}`}
                    className="inline-flex items-center justify-center rounded-md p-2 hover:bg-indigo-100"
                  >
                    
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => handleLessonDelete(lesson._id)}
                    className="inline-flex items-center justify-center rounded-md p-2 hover:bg-red-100 text-red-600"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {displayedLessons.map((lesson) => (
          <div
            key={lesson._id}
            className="bg-white rounded-xl p-4 shadow-sm border space-y-3"
          >
            <div>
              <h3 className="font-semibold text-slate-800">
                {lesson.title}
              </h3>
              <p className="text-xs text-slate-500">
                {lesson.category || "General"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-semibold">
                {lesson.accessLevel}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-semibold">
                {lesson.visibility}
              </span>
            </div>

            <div className="flex justify-between text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                {lesson.reactionsCount}
              </span>
             
            </div>

            <div className="flex justify-end gap-3 pt-2">
              
              <Link to={`/dashboard/update-lesson/${lesson._id}`}>
                <FiEdit />
              </Link>
              <button
                onClick={() => handleLessonDelete(lesson._id)}
                className="text-red-600"
              >
                <FaTrashCan />
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
