import React from "react";
import { Link, useParams } from "react-router";
import {
  Clock,
  Eye,
  BookOpen,
  User,
  Heart,
  Share2,
  Flag,
  Lock,
  Crown,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/ErrorPage";
import AddComment from "./AddComment";
import ShowComment from "./ShowComment";
import UpgradeToPremium from "../../../components/UpgradeToPremium"; // পাথ ঠিক করে নিন

import Swal from "sweetalert2";

const LessonDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ১. লেসন ডাটা ফেচ করা
  const {
    data: lesson = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["public-lessons", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  // ২. ইউজারের রোল এবং প্রিমিয়াম স্ট্যাটাস ফেচ করা (Single Source of Truth)
  const { data: userRole } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/user/role");
      return res.data;
    },
  });

  const {
    _id,
    title,
    description,
    category,
    emotionalTone,
    accessLevel,
    imageURL,
    creator,
    likesCount = 0,
    likedBy = [],
    views = 0,
    createdAt,
  } = lesson;

  // কন্ডিশনাল লজিক
  const isPremiumUser = userRole?.isPremium === true || userRole?.role === "admin";
  const isCreator = lesson?.creator === user?.email;
  const isLocked = accessLevel === "premium" && !isPremiumUser && !isCreator;

  // রিপোর্ট হ্যান্ডেলার
  const handleReport = async () => {
    if (!user) return Swal.fire("Warning", "Please login to report", "warning");

    const { value: reason } = await Swal.fire({
      title: "Report Lesson",
      input: "select",
      inputOptions: {
        "Inappropriate Content": "Inappropriate Content",
        "Hate Speech": "Hate Speech",
        "False Information": "False Information",
        Other: "Other",
      },
      inputPlaceholder: "Select a reason",
      showCancelButton: true,
    });

    if (reason) {
      const reportData = {
        lessonId: id,
        reportedUserEmail: user?.email,
        reason: reason,
        timestamp: new Date(),
      };
      await axiosSecure.post("/lessonsReports", reportData);
      Swal.fire("Success", "Report submitted.", "success");
    }
  };

  // লাইক হ্যান্ডেলার
  const handleLike = async () => {
    if (!user) return Swal.fire("Login Required", "Please login to like", "warning");
    if (isLocked) return Swal.fire("Locked", "Upgrade to interact", "info");

    try {
      const res = await axiosSecure.patch(`/lessons/${id}/like`);
      if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ফেভারিট হ্যান্ডেলার
  const handleAddFavorite = async () => {
    if (!user?.email) return Swal.fire("Warning", "Login required", "warning");
    if (isLocked) return Swal.fire("Locked", "Upgrade to favorite", "info");

    const favoriteData = { userEmail: user.email, lessonId: _id, title };
    const res = await axiosSecure.post("/favorites", favoriteData);
    if (res.data.insertedId) {
      Swal.fire("Success", "Added to favorites", "success");
      refetch();
    } else {
      Swal.fire("Note", "Already in favorites", "info");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  const creatorName = typeof creator === "object" ? creator.name : creator || "Unknown";

  const estimateReadMinutes = (text) => {
    if (!text) return 1;
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 180));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/" className="text-primary font-medium flex items-center gap-1">
          ← Back to Lessons
        </Link>
        <button onClick={handleReport} className="btn btn-ghost btn-sm text-red-500 gap-2">
          <Flag className="w-4 h-4" /> Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
            <div className="relative h-80 w-full bg-slate-200">
              {imageURL ? (
                <img src={imageURL} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <BookOpen className="w-16 h-16 text-slate-400" />
                </div>
              )}

              <div className="absolute top-4 right-4">
                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                  accessLevel === "free" ? "bg-green-500" : "bg-amber-500"
                } text-white shadow-lg`}>
                  {accessLevel}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="flex gap-2 mb-4">
                <span className="badge badge-outline badge-primary">{category || "General"}</span>
                <span className="badge badge-outline">{emotionalTone || "Tone"}</span>
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{title}</h1>

              <div className="relative">
                {isLocked ? (
                  <div className="relative">
                    <p className="blur-md select-none text-slate-700 leading-relaxed">
                      {description?.substring(0, 200)}... This is a premium content. Please upgrade to read the full wisdom and insights shared in this lesson.
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                      <UpgradeToPremium lesson={lesson} />
                    </div>
                  </div>
                ) : (
                  <p className="prose text-slate-700 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                )}
              </div>

              <hr className="my-6 border-slate-100" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">{views} views</span>
                  </div>

                  <button
                    onClick={handleLike}
                    disabled={isLocked}
                    className="flex items-center gap-1.5 hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    <Heart className={`w-5 h-5 ${
                      likedBy?.includes(user?.email) ? "fill-red-500 text-red-500" : "text-slate-400"
                    }`} />
                    <span className="font-semibold">{likesCount} likes</span>
                  </button>
                </div>

                <button
                  onClick={handleAddFavorite}
                  disabled={isLocked}
                  className="btn btn-primary btn-sm flex items-center gap-2 rounded-lg"
                >
                  <Heart className="w-4 h-4 fill-current" /> Favorite
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h3 className="text-xl font-bold mb-6">Discussions</h3>
            {isLocked ? (
              <div className="text-center py-6 bg-slate-50 rounded-lg">
                <Lock className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-slate-500">Comments are locked for free users</p>
              </div>
            ) : (
              <>
                <AddComment lesson={lesson} refetch={refetch} />
                <div className="mt-8">
                  <ShowComment lessonId={_id} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* --- এখানে মেম্বারশিপ স্ট্যাটাস কার্ডটি যোগ করা হয়েছে --- */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 text-center">
            <h4 className="font-bold text-slate-900 mb-3">Membership Status</h4>
            {user && !userRole?.isPremium ? (
              <div className="space-y-3">
                <div className="flex justify-center">
                   <div className="bg-slate-100 p-3 rounded-full"><Lock className="w-6 h-6 text-slate-400" /></div>
                </div>
                <p className="text-sm text-slate-500">You are on the Free Plan</p>
                <Link to="/upgrade" className="btn btn-warning btn-sm w-full rounded-full text-white font-bold">
                  Upgrade to Premium
                </Link>
              </div>
            ) : userRole?.isPremium ? (
              <div className="flex flex-col items-center gap-2">
                <div className="bg-yellow-50 p-3 rounded-full">
                  <Crown className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold flex items-center gap-1">
                  Premium Member ⭐
                </span>
                <p className="text-xs text-slate-400 italic">Unlimited access enabled</p>
              </div>
            ) : null}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h4 className="font-bold text-slate-900 mb-4">Lesson Creator</h4>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="w-7 h-7 text-slate-400" />
              </div>
              <div>
                <p className="font-bold text-slate-800">{creatorName}</p>
                <p className="text-xs text-slate-500 uppercase">Instructor</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
            <h4 className="font-bold mb-2">Learning Tip</h4>
            <p className="text-sm opacity-90">
              Engaging in discussions helps you retain insights longer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;