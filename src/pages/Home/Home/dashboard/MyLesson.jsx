import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LessonCard from '../LessonCard';
import { Loader2 } from 'lucide-react';

const MyLesson = () => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] p-10">
        <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
        <p className="text-xl text-gray-600">Loading lessons, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-10 bg-red-50 border border-red-200 rounded-lg max-w-lg mx-auto mt-10">
        <AlertTriangle className="w-8 h-8 text-red-600 mb-3" />
        <h3 className="text-lg font-semibold text-red-700">
          Failed to Fetch Data
        </h3>
        <p className="text-sm text-gray-600 text-center">
          There was an issue loading the lessons. Please check your API
          connection. ({error.message})
        </p>
      </div>
    );
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
export default MyLesson;