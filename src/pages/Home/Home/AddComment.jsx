import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Send } from "lucide-react"; 
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddComment = ({ lesson }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (commentData) => {
      
      const res = await axiosSecure.post("/comments", commentData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Comment added successfully!");
      setComment("");
     
      queryClient.invalidateQueries(["comments", lesson._id]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to post comment");
    },
  });

  const handleSubmitComment = async () => {
    if (!user) return toast.error("Please login to comment");
    if (!comment.trim()) return toast.error("Comment cannot be empty");

    const commentData = {
      lessonId: lesson._id,
      lessonTitle: lesson.title,
      userName: user.displayName || "Anonymous",
      userEmail: user.email,
      userImage: user.photoURL || "",
      comment: comment,
      date: new Date(),
    };

    await mutateAsync(commentData);
  };

  return ( 
    <div className="mt-10">
      <div className="bg-white p-5 md:p-7 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-800">Discussion</h3>
        </div>

        <div className="flex gap-4">
          {/* User Avatar */}
          <div className="shrink-0">
            <img
              src={user?.photoURL || "https://i.ibb.co/mR79Y6B/user.png"}
              alt="user"
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
          </div>

          {/* Comment Input */}
          <div className="flex-1">
            <textarea
              className="textarea textarea-bordered w-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all border-gray-200 rounded-xl p-4 text-gray-700 h-28 resize-none"
              placeholder="Ask a question or share your thoughts about this lesson..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSubmitComment}
                disabled={isPending}
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none px-6 rounded-lg normal-case flex items-center gap-2 shadow-md disabled:bg-gray-300"
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    Post Comment <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;