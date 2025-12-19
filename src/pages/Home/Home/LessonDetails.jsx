import React from "react";
import { Link, useParams } from "react-router";
import { Clock, Eye, BookOpen, User, Heart, Share2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth"; 
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/ErrorPage";
import AddComment from "./AddComment";
import ShowComment from "./ShowComment";
import Swal from "sweetalert2";

const LessonDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 

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

  const handleAddFavorite = async () => {
    if (!user?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add this lesson to favorites",
        showConfirmButton: true,
      });
    }

    const favoriteData = {
      userEmail: user.email,
      lessonId: lesson._id,
      title: lesson.title,
      creatorName: lesson.creator?.name || lesson.creator,
      category: lesson.category,
    };

    try {
      const res = await axiosSecure.post("/favorites", favoriteData);

      if (res.data.insertedId || res.data.message !== "Already added") {
        Swal.fire({
          icon: "success",
          title: "Added to Favorites",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch(); 
        Swal.fire("Note", "Already in your favorites", "info");
      }
    } catch (error) {
      console.error("Favorite Error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  const {
    title,
    description,
    category,
    emotionalTone,
    accessLevel,
    imageURL,
    creator,
    likesCount = 0,
    views = 0,
    createdAt,
  } = lesson;

  const creatorName = typeof creator === "object" ? creator.name : creator || "Unknown";

  const estimateReadMinutes = (text) => {
    if (!text) return 1;
    const words = text.replace(/<\/?[^>]+(>|$)/g, "").split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 180));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all gap-1">
          ← Back to Lessons
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            {/* Header Image */}
            <div className="relative h-80 w-full bg-slate-200">
              {imageURL ? (
                <img src={imageURL} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <BookOpen className="w-16 h-16" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                  accessLevel === "free" ? "bg-green-500 text-white" : "bg-amber-500 text-white"
                }`}>
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

              {/* Description */}
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed mb-8">
                <p className="whitespace-pre-line">{description}</p>
              </div>

              <hr className="my-6 border-slate-100" />

              {/* Action Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">{views} views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="font-semibold">{likesCount} likes</span>
                  </div>
                </div>
                <button 
                  onClick={handleAddFavorite}
                  className="btn btn-primary btn-sm flex items-center gap-2 rounded-lg"
                >
                  <Heart className="w-4 h-4 fill-current" /> Favorite
                </button>
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Discussions
            </h3>
            <AddComment lesson={lesson} refetch={refetch} />
            <div className="mt-8">
              <ShowComment lessonId={lesson?._id} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Author Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h4 className="font-bold text-slate-900 mb-4">Lesson Creator</h4>
            <div className="flex items-center gap-4">
              {creator?.photoURL ? (
                <img src={creator.photoURL} alt={creatorName} className="w-14 h-14 rounded-full border-2 border-primary/20 object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                  <User className="w-7 h-7 text-slate-400" />
                </div>
              )}
              <div>
                <p className="font-bold text-slate-800">{creatorName}</p>
                <p className="text-xs text-slate-500 uppercase font-medium">Instructor</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-50 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Est. Read</span>
                <span className="font-semibold text-slate-700">{estimateReadMinutes(description)} min</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Share2 className="w-4 h-4" /> Published</span>
                <span className="font-semibold text-slate-700">
                   {createdAt ? new Date(createdAt).toLocaleDateString() : "Recently"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Support/Ads/Safety Tip */}
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white">
            <h4 className="font-bold mb-2">Learning Tip</h4>
            <p className="text-sm opacity-90">
              Take notes while reading to retain information better. Engagement in the comments helps clarity!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;