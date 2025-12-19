import React from "react";
import { Link } from "react-router";
import { BookOpen, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <BookOpen className="w-8 h-8" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold text-indigo-600 mb-2">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-8">
          Sorry, the lesson or page you are looking for doesn’t exist,
          or it may have been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;