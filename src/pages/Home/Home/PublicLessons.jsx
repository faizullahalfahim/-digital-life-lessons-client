import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LessonCard from "./LessonCard";
import { Loader2, AlertTriangle } from "lucide-react";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/ErrorPage";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: lessons = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");

      return res.data;
    },
  });

  if (isLoading) 
    return <Loading> </Loading>
  

  if (error) {
    return <ErrorPage> </ErrorPage>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          Explore All Digital Lessons ({lessons.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))
          ) : (
            <p className="col-span-full text-center text-xl text-gray-500 p-10">
              No public lessons found at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicLessons;
