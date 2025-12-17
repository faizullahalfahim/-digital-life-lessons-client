
import React from "react";
import { useLocation, Link, useParams } from "react-router";
import { Clock, Eye, BookOpen, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/ErrorPage";


const LessonDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams(); 
  const {
    data: lesson = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["public-lessons" , id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);

      return res.data;
    },
  });

  if (isLoading) 
    return <Loading> </Loading>
  

  if (error) {
    return <ErrorPage> </ErrorPage>
  }

  console.log(lesson);

  const {
    title,
    description,
    category,
    emotionalTone,
    accessLevel,
    imageURL,
    creator,
    likesCount = 0,
    favoritesCount = 0,
    views = 0,
    createdAt,
  } = lesson;

  const creatorName = typeof creator === "object" ? creator.name : creator || "Unknown";

  // simple read time estimate (words/180)
  const estimateReadMinutes = (text) => {
    if (!text) return 1;
    const words = text.replace(/<\/?[^>]+(>|$)/g, "").split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 180));
  };

  const readMinutes = estimateReadMinutes(description);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-sm text-slate-600 hover:underline">
          ← Home
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Hero / Image */}
        {imageURL ? (
          <div className="h-64 w-full overflow-hidden">
            <img src={imageURL} alt={title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-40 w-full bg-slate-100 flex items-center justify-center text-slate-400">
            <BookOpen className="w-12 h-12" />
          </div>
        )}

        <div className="p-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>

          {/* Meta */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readMinutes} min read</span>
            </div>

            <div className="inline-block px-2 py-0.5 bg-slate-100 rounded text-xs">
              {category || "General"}
            </div>

            <div className="inline-block px-2 py-0.5 bg-slate-100 rounded text-xs">
              {emotionalTone || "Tone"}
            </div>

            <div className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded ${accessLevel === "free" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}`}>
              {accessLevel === "free" ? "FREE" : "PREMIUM"}
            </div>
          </div>

          {/* Author */}
          <div className="mt-4 flex items-center gap-3">
            {creator && creator.photoURL ? (
              <img src={creator.photoURL} alt={creatorName} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="text-sm font-medium text-slate-800">{creatorName}</div>
              <div className="text-xs text-slate-500">{createdAt ? new Date(createdAt).toLocaleDateString() : ""}</div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 text-slate-700 leading-relaxed prose max-w-none">
            {/* Render as plain text to avoid XSS. If you store HTML intentionally, replace with trusted renderer. */}
            <p>{description || "No description available for this lesson."}</p>
          </div>

          {/* Stats */}
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <span className="font-semibold">{likesCount}</span>
              <span>Likes</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{favoritesCount}</span>
              <span>Saved</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-slate-500" />
              <span>{views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;