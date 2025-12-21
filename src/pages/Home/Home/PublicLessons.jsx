import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LessonCard from "./LessonCard";
import Loading from "../../../components/Loading";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [emotionalTone, setEmotionalTone] = useState("");
  const [sort, setSort] = useState("newest");
  const itemsPerPage = 8;

  const { data: { lessons = [], count = 0 } = {}, isLoading } = useQuery({
    queryKey: ["public-lessons", currentPage, search, category, emotionalTone, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons?page=${currentPage}&size=${itemsPerPage}&search=${search}&category=${category}&emotionalTone=${emotionalTone}&sort=${sort}`
      );
      return res.data;
    },
  });

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(0);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Public Lessons Gallery
        </h2>

        <div className="flex flex-wrap gap-4 justify-center mb-10 bg-white p-6 rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => handleFilterChange(setSearch, e.target.value)}
          />

          <select
            className="select select-bordered"
            onChange={(e) => handleFilterChange(setCategory, e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="RelationShips">Relationships</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Professional">Professional</option>
          </select>

          <select
            className="select select-bordered"
            onChange={(e) => handleFilterChange(setEmotionalTone, e.target.value)}
          >
            <option value="">All Tones</option>
            <option value="Motivational">Motivational</option>
            <option value="Calm">Calm</option>
            <option value="Serious">Serious</option>
          </select>

          <select
            className="select select-bordered font-semibold text-sky-600"
            onChange={(e) => handleFilterChange(setSort, e.target.value)}
          >
            <option value="newest">Sort: Newest First</option>
            <option value="mostSaved">Sort: Most Saved</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>

        <div className="flex justify-center mt-10 gap-2">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn btn-sm ${
                currentPage === page ? "btn-primary" : "btn-outline"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicLessons;
