import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

import { useNavigate } from "react-router"; 
import Swal from "sweetalert2"; 
import useAuth from "../../../../hooks/useAuth";
const image_API_URL = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_image_host
}`;

const AddLessons = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); 
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "Personal Growth",
      emotionalTone: "Motivational",
      visibility: "public",
      accessLevel: "free",
    },
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(image_API_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };

  const onSubmit = async (data) => {
    const imageFile = data.imageFile[0];
    let hostedImageUrl = "";

    try {
      if (imageFile) {
        hostedImageUrl = await uploadImage(imageFile);
      }

      const lessonData = {
        title: data.title,
        description: data.description,
        category: data.category,
        emotionalTone: data.emotionalTone,
        visibility: data.visibility,
        accessLevel: data.accessLevel,
        imageURL: hostedImageUrl,
        creator: user.displayName,
        likes: [],
        likesCount: 0,
        favoritesCount: 0,
        views: 0,
        isFeatured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      
      const res = await axiosSecure.post("/lessons", lessonData);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Lesson added successfully",
          icon: "success",
          confirmButtonText: "Cool",
          timer: 1500,
        });
        reset();
        navigate("/"); 
      }
    } catch (error) {
      console.error("Lesson Submission error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to submit lesson data.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Lesson</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", {
              required: "Title is required.",
              minLength: { value: 5, message: "Too short." },
            })}
            className={`mt-1 block w-full border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required.",
            })}
            rows="4"
            className={`mt-1 block w-full border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500`}
          ></textarea>
        </div>

        {/* Image File */}
        <div>
          <label
            htmlFor="imageFile"
            className="block text-sm font-medium text-gray-700"
          >
            Lesson Image
          </label>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            {...register("imageFile")}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          /> 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("category")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
            >
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="RelationShips">RelationShips</option>
              <option value="MindSet">MindSet</option>
              <option value="Mistake Learned">Mistake Learned</option>
            </select>
          </div>

          {/* Emotional Tone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emotional Tone
            </label>
            <select
              {...register("emotionalTone")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
            >
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </div>
        </div>

        {/* Visibility & Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visibility
            </label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  {...register("visibility")}
                  value="public"
                  defaultChecked
                />{" "}
                Public
              </label>
              <label>
                <input
                  type="radio"
                  {...register("visibility")}
                  value="private"
                />{" "}
                Private
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Level
            </label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  {...register("accessLevel")}
                  value="free"
                  defaultChecked
                />{" "}
                Free
              </label>
              <label>
                <input type="radio" {...register("accessLevel")} value="paid" />{" "}
                Paid
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Processing..." : "Save Lesson"}
        </button>
      </form>
    </div>
  );
};

export default AddLessons;
