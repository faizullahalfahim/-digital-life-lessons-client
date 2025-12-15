import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

import useAuth from "../../../hooks/UseAuth";
import { UserPlus } from "lucide-react";
import axios from "axios";
import { saveOrUpdateUser } from "../../../utilites";
import Swal from "sweetalert2"; 


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

    try {
        
        
        await registerUser(data.email, data.password) 
        
        
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
        })
        
        
        Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            text: "Welcome to Zap Shift!",
            timer: 1500,
            showConfirmButton: false,
        });
        
        navigate(location.state || "/");

    } catch (error) {
      
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: error.message || "An unknown error occurred during registration.",
        });
    }

  };

  return (
   <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
          {/* Header: Gradient Background */}
          <div className="px-6 py-7 text-center bg-gradient-to-r from-sky-600 to-indigo-600">
            <h1 className="text-2xl font-extrabold text-white">
              Welcome to Zap Shift
            </h1>
            <p className="text-sm text-sky-100 mt-1">
              Create your account to start your digital journey
            </p>
          </div>

          {/* Body */}
          <div className="p-6">
            <form
              onSubmit={handleSubmit(handleRegistration)}
              className="space-y-4"
              noValidate
            >
              {/* name field */}
              <div className="form-control">
                <label
                  htmlFor="name"
                  className="label text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                  className={`w-full input input-bordered rounded-md px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.name ? "border-red-300" : ""
                  }`}
                  placeholder="Your Name"
                />
                {errors.name && errors.name.type === "required" && (
                  <p className="mt-1 text-sm text-red-600">Name is required.</p>
                )}
              </div>

              {/* photo image field (Not required for Firebase Auth) */}
              <div className="form-control">
                <label
                  htmlFor="photo"
                  className="label text-sm font-medium text-gray-700 mb-1"
                >
                  Photo (Optional)
                </label>
                <input
                  id="photo"
                  type="file"
                  {...register("photo")}
                  className="file-input file-input-bordered w-full rounded-md file-input-primary"
                />
              </div>

              {/* email field */}
              <div className="form-control">
                <label
                  htmlFor="email"
                  className="label text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className={`w-full input input-bordered rounded-md px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.email ? "border-red-300" : ""
                  }`}
                  placeholder="Email"
                />
                {errors.email && errors.email.type === "required" && (
                  <p className="mt-1 text-sm text-red-600">
                    Email is required.
                  </p>
                )}
              </div>

              {/* password field */}
              <div className="form-control">
                <label
                  htmlFor="password"
                  className="label text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  })}
                  className={`w-full input input-bordered rounded-md px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.password ? "border-red-300" : ""
                  }`}
                  placeholder="Password"
                />

                {/* Error Handling (Simplified and professional) */}
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.type === "required"
                      ? "Password is required."
                      : errors.password.type === "minLength"
                      ? "Password must be 6 characters or longer."
                      : "Password must have at least one uppercase, lowercase, number, and special character."}
                  </p>
                )}
              </div>

              {/* Register Button (Enhanced) */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition transform hover:scale-[1.01] mt-6"
              >
                <UserPlus className="w-5 h-5" />
                <span>Register</span>
              </button>
            </form>

            {/* Already have an account link */}
            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                state={location.state}
                className="text-sky-600 hover:underline font-medium"
                to="/login"
              >
                Login
              </Link>
            </p>

            {/* divider */}
            <div className="mt-6 flex items-center gap-3">
              <hr className="flex-1 border-gray-200" />
              <span className="text-xs text-gray-400">or continue with</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            {/* Social Login component */}
            <div className="mt-4">
              <SocialLogin />
            </div>
          </div>
        </div>

        {/* small note */}
        <p className="mt-4 text-center text-sm text-gray-500">
          By registering you agree to our{" "}
          <Link to="/terms" className="underline text-gray-700">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline text-gray-700">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;