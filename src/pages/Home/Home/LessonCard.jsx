import React from "react";
import { Star, Clock, BookOpen, DollarSign, Zap } from "lucide-react";

const LessonCard = ({ lesson }) => {
  // Destructuring lesson object using the provided field names, including _id
  const {
    _id,
    title,
    category,
    level,
    durationMinutes,
    isFree,
    rating,
    instructor,
    imageUrl,
    description, // Added for potential use
  } = lesson;

  // Logic to round rating and calculate duration
  const displayRating = rating ? rating.toFixed(1) : "N/A";
  const durationHours = Math.ceil(durationMinutes / 60);

  // Logic to set badge color based on level
  const getLevelBadge = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "badge-success text-white";
      case "intermediate":
        return "badge-warning text-white";
      case "advanced":
        return "badge-error text-white";
      default:
        return "badge-info text-white";
    }
  };

  return (
    // Card container: uses _id for the detail link
    <a
      href={`/lessons/${_id}`}
      className="card w-full bg-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition duration-300 group cursor-pointer border border-gray-100"
    >
      {/* 1. Lesson Image & Badges */}
      <figure className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition duration-300 group-hover:opacity-90"
        />

        {/* Level Badge (Top Left) */}
        <div
          className={`badge absolute top-3 left-3 ${getLevelBadge(
            level
          )} font-semibold z-10 p-3`}
        >
          <Zap className="h-4 w-4 mr-1" />
          {level}
        </div>

        {/* Free/Premium Tag (Top Right) */}
        <div
          className={`badge absolute top-3 right-3 text-white font-bold p-3 ${
            isFree ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {isFree ? "FREE" : <DollarSign className="h-4 w-4" />}
        </div>
      </figure>

      {/* 2. Card Body */}
      <div className="card-body p-6">
        {/* Title */}
        <h2 className="card-title text-xl font-bold text-gray-800 group-hover:text-primary transition duration-300 min-h-[60px]">
          {title}
        </h2>

        {/* Instructor & Category */}
        <p className="text-sm text-gray-500 flex flex-col gap-1 mt-1">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-gray-400" />
            Instructor:{" "}
            <span className="font-medium text-gray-700">{instructor}</span>
          </span>
          <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full inline-block w-fit mt-1">
            {category}
          </span>
        </p>

        {/* 3. Meta Data (Rating & Duration) */}
        <div className="flex justify-between items-center text-sm mt-3 border-t pt-3">
          {/* Rating */}
          <div className="flex items-center gap-1 font-semibold text-yellow-600">
            <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
            {displayRating} Rating
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="h-4 w-4 text-primary" />
            {durationHours} Hours
          </div>
        </div>

        {/* 4. Action Area */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-primary text-white hover:bg-blue-700">
            {isFree ? "Start Now" : "View Details"}
          </button>
        </div>
      </div>
    </a>
  );
};

export default LessonCard;
