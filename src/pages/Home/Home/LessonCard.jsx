import React from "react";
import { useNavigate } from "react-router";
import {
  Clock,
  BookOpen,
  Heart,
  Bookmark,
  Eye,
  Crown,
  User,
  Calendar,
  Lock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LessonCard = ({ lesson }) => {
  const {
    _id,
    title,
    category,
    emotionalTone,
    accessLevel,
    creator,
    imageURL,
    description,
    likesCount = 0,
    favoritesCount = 0,
    views = 0,
    createdAt,
  } = lesson;

  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/user/role");
      return res.data;
    },
  });

  const isPremiumUser =
    userRole?.isPremium === true || userRole?.role === "admin";
  const isCreator =
    typeof creator === "string"
      ? creator === user?.email
      : creator?.email === user?.email;

  const handleSeeDetails = () => {
    if (accessLevel === "free" || isPremiumUser || isCreator) {
      navigate(`/lessons/${_id}`);
    } else {
      navigate("/upgrade");
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const readMinutes = description
    ? Math.max(1, Math.ceil(description.split(/\s+/).length / 180))
    : 1;

  const toneClass = (tone) => {
    switch ((tone || "").toLowerCase()) {
      case "motivational":
        return "bg-amber-100 text-amber-800";
      case "emotional":
        return "bg-rose-100 text-rose-800";
      case "calm":
        return "bg-sky-100 text-sky-800";
      case "reflective":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <article className="group rounded-xl bg-white border shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        {imageURL ? (
          <img
            src={imageURL}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:opacity-90 transition"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <BookOpen className="w-10 h-10 opacity-40" />
          </div>
        )}

        <span
          className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-md font-semibold ${toneClass(
            emotionalTone
          )}`}
        >
          {emotionalTone || "Tone"}
        </span>

        <span
          className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold ${
            accessLevel === "free"
              ? "bg-green-600 text-white"
              : "bg-yellow-600 text-white flex items-center gap-1"
          }`}
        >
          {accessLevel === "free" ? (
            "FREE"
          ) : (
            <>
              <Crown className="w-3 h-3" /> PREMIUM
            </>
          )}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition min-h-[50px] line-clamp-2">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          {creator?.photoURL ? (
            <img
              src={creator.photoURL}
              className="w-6 h-6 rounded-full"
              alt="creator"
            />
          ) : (
            <User className="w-5 h-5 text-gray-400" />
          )}
          <span>
            {creator?.name ||
              (typeof creator === "string" ? creator : "Unknown Author")}
          </span>
        </div>

        <span className="mt-2 inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          {category}
        </span>

        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
          {description || "No description available."}
        </p>

        <div className="mt-4 border-t pt-3 space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readMinutes} min
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-500" />
                {likesCount}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-blue-600" />
                {views}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSeeDetails}
            className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition flex items-center gap-2"
          >
            {accessLevel === "premium" && !isPremiumUser && !isCreator && (
              <Lock className="w-4 h-4" />
            )}
            See Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default LessonCard;
