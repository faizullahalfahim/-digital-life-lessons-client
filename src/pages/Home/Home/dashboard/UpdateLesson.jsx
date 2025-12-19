import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import useRole from "../../../../hooks/useRole";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const UpdateLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const [updating, setUpdating] = useState(false);
  
  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson-update", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const form = e.target;

      const updatedInfo = {
        title: form.title.value,
        description: form.description.value,
        category: form.category.value,
        accessLevel: form.accessLevel.value,
        visibility: form.visibility.value,
      };

      const res = await axiosSecure.patch(`/lessons/${id}`, updatedInfo);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Lesson updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/my-lessons");
      } else {
        Swal.fire("No Changes", "You didn't change anything!", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Update failed. Try again.", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100 my-8">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost btn-sm mb-4 gap-2"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Update Lesson Details
      </h2>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Lesson Title</label>
          <input
            type="text"
            name="title"
            defaultValue={lesson?.title}
            required
            className="input input-bordered"
          />
        </div>

        {/* Description */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            defaultValue={lesson?.description}
            className="textarea textarea-bordered h-28"
            required
          />
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label font-semibold">Category</label>
          <input
            type="text"
            name="category"
            defaultValue={lesson?.category}
            className="input input-bordered"
          />
        </div>

        {/* Access Level */}
        <div className="form-control">
          <label className="label font-semibold">Access Level</label>
          <select
            name="accessLevel"
            defaultValue={lesson?.accessLevel}
            className="select select-bordered"
            disabled={role !== "premium" && role !== "admin"}
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
          {role === "user" && (
            <p className="text-[10px] text-orange-600 mt-1 italic">
              * Upgrade to Premium to change this
            </p>
          )}
        </div>

        {/* Visibility */}
        <div className="form-control">
          <label className="label font-semibold">Visibility</label>
          <select
            name="visibility"
            defaultValue={lesson?.visibility}
            className="select select-bordered"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={updating}
            className="btn btn-primary w-full flex items-center gap-2"
          >
            {updating ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLesson;
