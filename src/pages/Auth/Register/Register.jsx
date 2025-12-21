import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

import { UserPlus } from "lucide-react";
import axios from "axios";
import { saveOrUpdateUser } from "../../../utilites";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    const profileImg = data.photo[0];

    if (!profileImg) {
      Swal.fire({
        icon: "error",
        title: "Image Required",
        text: "Please upload a profile picture.",
      });
      return;
    }

    try {
      await registerUser(data.email, data.password);

      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host
      }`;

      const imageRes = await axios.post(image_API_URL, formData);
      const photoURL = imageRes.data.data.url;

      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      };
      await updateUserProfile(userProfile);

      await saveOrUpdateUser({
        email: data.email,
        displayName: data.name,
        image: photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to Digital Life",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(location.state || "/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "An unknown error occurred.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-7 text-center bg-gradient-to-r from-sky-600 to-indigo-600">
            <h1 className="text-2xl font-extrabold text-white">
              Welcome to Zap Shift
            </h1>
            <p className="text-sm text-sky-100 mt-1">
              Create your account to start your journey
            </p>
          </div>

          <div className="p-6">
            <form
              onSubmit={handleSubmit(handleRegistration)}
              className="space-y-4"
              noValidate
            >
              {/* Name field */}
              <div className="form-control">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full input input-bordered rounded-md px-3 py-2 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Profile Photo (Required)
                </label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  {...register("photo", {
                    required: "Profile photo is required",
                  })}
                  className={`file-input file-input-bordered w-full rounded-md ${
                    errors.photo ? "border-red-500" : ""
                  }`}
                />
                {errors.photo && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.photo.message}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div className="form-control">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full input input-bordered rounded-md px-3 py-2 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="form-control">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                      message:
                        "Must include uppercase, lowercase, number, and special character",
                    },
                  })}
                  className={`w-full input input-bordered rounded-md px-3 py-2 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 font-semibold shadow-lg transition transform hover:scale-[1.01] mt-6"
              >
                <UserPlus className="w-5 h-5" />
                <span>Register</span>
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-sky-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
