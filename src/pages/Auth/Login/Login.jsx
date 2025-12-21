import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { saveOrUpdateUser } from "../../../utilites";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    try {
      const { user } = await signInUser(data.email, data.password);
      await saveOrUpdateUser({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Login Failed", text: error.message });
    }
  };

  return (
   
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[420px]">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header with Gradient */}
          <div className="px-6 py-10 text-center bg-gradient-to-br from-sky-500 to-indigo-700">
            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="text-sky-100 mt-2 text-sm opacity-90">
              Sign in to continue to Digital Life Lessons
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 transition-all outline-none ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("email", { required: "Email is required" })}
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 transition-all outline-none ${
                      errors.password ? "border-red-400" : "border-gray-200"
                    }`}
                    {...register("password", { required: "Password is required" })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-600 font-medium text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                <Link to="/forgot-password" size="sm" className="text-sky-600 hover:underline font-medium">
                  Forgot password?
                </Link>
                <Link to="/register" className="text-sky-600 hover:underline font-bold">
                  Create account
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-200 transition-all transform active:scale-95"
              >
                Login
              </button>
            </form>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-[1px] flex-1 bg-gray-100"></div>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Or login with</span>
              <div className="h-[1px] flex-1 bg-gray-100"></div>
            </div>

            <div className="mt-6">
              <SocialLogin />
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-gray-600">Terms</Link> &{" "}
          <Link to="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;