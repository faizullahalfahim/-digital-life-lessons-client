import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, User } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { formatDistanceToNow } from "date-fns";

const ShowComment = ({ lessonId }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", lessonId],
    enabled: !!lessonId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${lessonId}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-6">
        Error loading comments.
      </p>
    );

  return (
    <div className="mt-12 mb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-xl font-bold text-gray-800">
          Discussion ({comments.length})
        </h3>
        <div className="h-px flex-1 bg-gray-100"></div>
      </div>

      {/* Empty State */}
      {comments.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400">
            No comments yet. Be the first to start the discussion!
          </p>
        </div>
      ) : (
        /* Comments List */
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-4 group">
              {/* Avatar */}
              <div className="shrink-0">
                {comment.userImage ? (
                  <img
                    src={comment.userImage}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Comment Body */}
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:border-indigo-100 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="font-bold text-gray-900 text-sm">
                    {comment.userName}
                  </h4>

                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {comment.date
                      ? formatDistanceToNow(new Date(comment.date), {
                          addSuffix: true,
                        })
                      : "Just now"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowComment;