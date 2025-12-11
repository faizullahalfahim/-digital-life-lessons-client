import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/UseAuth";

const image_API_URL = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_image_host
}`;

const AddLessons = () => {
  const {user} = useAuth()
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
  const axiosSecure = useAxiosSecure()

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(image_API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error.message ||
            `Image upload failed with status ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success) {
        console.log("Image Upload Successful:", data.data.url);
        return data.data.url;
      } else {
        throw new Error(
          data.status_code
            ? `Image host error: ${data.status_code}`
            : "Image upload response was not successful."
        );
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };

  const onSubmit = async (data) => {
    const imageFile = data.imageFile[0];
    let hostedImageUrl = "";

    if (imageFile) {
      try {
        hostedImageUrl = await uploadImage(imageFile);
      } catch (error) {
        alert(error.message);
        return;
      }
    }

    const lessonData = {
      title: data.title,
      description: data.description,
      category: data.category,
      emotionalTone: data.emotionalTone,
      visibility: data.visibility,
      accessLevel: data.accessLevel,
      imageURL: hostedImageUrl,
      creator: user.gmail,
      likes: [],
      likesCount: 0,
      favoritesCount: 0,
      views: 0,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    axiosSecure.post('/lessons', lessonData).then((res) => {
      console.log("Lesson data successfully sent to backend:", res.data);
    })
    

    console.table("Final Lesson Data Ready for Backend:", lessonData);

    try {
      alert("Lesson submitted successfully! Check console for final data.");
      reset();
    } catch (error) {
      console.error("Lesson Submission error:", error);
      alert("Failed to submit lesson data.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Lesson</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters long.",
              },
            })}
            className={`mt-1 block w-full border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

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
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters long.",
              },
            })}
            rows="4"
            className={`mt-1 block w-full border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500`}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="imageFile"
            className="block text-sm font-medium text-gray-700"
          >
            Lesson Image (Will be uploaded to ImgBB)
          </label>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            {...register("imageFile")}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.imageFile && (
            <p className="mt-1 text-sm text-red-500">
              {errors.imageFile.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category", {
                required: "Category selection is required.",
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="RelationShips">RelationShips</option>
              <option value="MindSet">MindSet</option>
              <option value="Mistake Learned">Mistake Learned</option>
              
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="emotionalTone"
              className="block text-sm font-medium text-gray-700"
            >
              Emotional Tone
            </label>
            <select
              id="emotionalTone"
              {...register("emotionalTone", {
                required: "Emotional Tone selection is required.",
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
              
            </select>
            {errors.emotionalTone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.emotionalTone.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visibility
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register("visibility")}
                  value="public"
                  className="form-radio text-blue-600"
                  defaultChecked
                />
                <span className="ml-2">Public</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register("visibility")}
                  value="private"
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Private</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Level
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register("accessLevel")}
                  value="free"
                  className="form-radio text-blue-600"
                  defaultChecked
                />
                <span className="ml-2">Free</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register("accessLevel")}
                  value="paid"
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Paid</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
        >
          {isSubmitting ? "Processing..." : "Save Lesson"}
        </button>
      </form>
    </div>
  );
};

export default AddLessons;
