import React, { useState } from "react";
import { Trash2, Eye, XCircle, Flag, AlertTriangle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedLesson, setSelectedLesson] = useState(null);

  const {
    data: reportedLessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessonsReports");
      return res.data;
    },
  });

  const ignoreMutation = useMutation({
    mutationFn: async (lessonId) => {
      return await axiosSecure.delete(`/lessonsReports/${lessonId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reported-lessons"]);
      Swal.fire("Ignored!", "Reports have been cleared.", "success");
      setSelectedLesson(null);
    },
  });

  const deleteLessonMutation = useMutation({
    mutationFn: async (lessonId) => {
      return await axiosSecure.delete(`/lessons/${lessonId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reported-lessons"]);
      Swal.fire("Deleted!", "The lesson has been removed.", "success");
      setSelectedLesson(null);
    },
  });

  const handleIgnore = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all flags for this lesson.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, ignore it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ignoreMutation.mutate(id);
      }
    });
  };

  const handleDeleteLesson = (id) => {
    Swal.fire({
      title: "Dangerous Action!",
      text: "This lesson will be permanently deleted.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete Anyway",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLessonMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-6 flex items-center gap-3">
        <Flag className="w-7 h-7" /> Reported Lessons
      </h1>

      {/* --- Stats --- */}
      <div className="card bg-red-100 shadow-md p-5 mb-8 border-l-4 border-red-500 flex flex-row justify-between items-center">
        <div>
          <p className="text-sm font-medium text-red-500">Flagged Lessons</p>
          <h2 className="text-3xl font-bold text-red-800">
            {reportedLessons.length}
          </h2>
        </div>
        <AlertTriangle className="w-10 h-10 text-red-500 opacity-60" />
      </div>

      {/* --- Table --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-red-50 text-gray-700 uppercase text-sm">
              <th>Lesson Title</th>
              <th>Reporter Info</th>
              <th className="text-center">Reason</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {reportedLessons.map((report) => (
              <tr key={report._id} className="border-b hover:bg-red-50/30">
                <td>
                  <div className="font-semibold text-gray-900">
                    {report.lessonTitle || "Untitled Lesson"}
                  </div>
                  <div className="text-xs text-gray-400">
                    ID: {report.lessonId}
                  </div>
                </td>
                <td>
                  <div className="text-sm">{report.reportedUserEmail}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(report.timestamp).toLocaleDateString()}
                  </div>
                </td>
                <td className="text-center">
                  <span className="badge badge-error badge-outline text-xs">
                    {report.reason}
                  </span>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setSelectedLesson(report)}
                      className="btn btn-info btn-xs text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleIgnore(report._id)}
                      className="btn btn-ghost btn-xs text-green-600"
                      title="Ignore Report"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(report.lessonId)}
                      className="btn btn-error btn-xs text-white"
                      title="Delete Lesson"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Modal --- */}
      {selectedLesson && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="text-xl font-bold border-b pb-2">Report Details</h3>
            <div className="py-4 space-y-3">
              <p>
                <strong>Reason:</strong>{" "}
                <span className="text-red-600">{selectedLesson.reason}</span>
              </p>
              <p>
                <strong>Reporter:</strong> {selectedLesson.reportedUserEmail}
              </p>
              <p>
                <strong>Reported At:</strong>{" "}
                {new Date(selectedLesson.timestamp).toLocaleString()}
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <p className="text-sm text-gray-600 italic">
                  "Admin can review the lesson content before taking action."
                </p>
              </div>
            </div>
            <div className="modal-action">
              <button
                onClick={() => setSelectedLesson(null)}
                className="btn btn-sm"
              >
                Close
              </button>
              <button
                onClick={() => handleIgnore(selectedLesson._id)}
                className="btn btn-sm btn-success text-white"
              >
                Ignore
              </button>
              <button
                onClick={() => handleDeleteLesson(selectedLesson.lessonId)}
                className="btn btn-sm btn-error text-white"
              >
                Delete Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;
