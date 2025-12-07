import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    setServerError("");
    setLoading(true);

    try {
      // assuming signInUser returns a promise
      const result = await signInUser(data.email, data.password);
      // console.log(result.user);
      // redirect to previous location or home
      navigate(location?.state || "/");
    } catch (err) {
      // You can map specific error messages here
      setServerError(
        err?.message || "Login failed. Please check your credentials and try again."
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
          {/* header */}
          <div className="px-6 py-7 text-center bg-gradient-to-r from-sky-600 to-indigo-600">
            <h1 className="text-2xl font-extrabold text-white">Welcome Back</h1>
            <p className="text-sm text-sky-100 mt-1">Sign in to continue to Digital Life Lessons</p>
          </div>

          {/* body */}
          <div className="p-6">
            {/* server error */}
            {serverError && (
              <div
                role="alert"
                className="mb-4 rounded-md bg-red-50 border border-red-100 text-red-700 px-4 py-3"
              >
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4" noValidate>
              {/* email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full input input-bordered rounded-md px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.email ? "border-red-300" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full input input-bordered rounded-md px-3 py-2 pr-12 transition focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                      errors.password ? "border-red-300" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link to="/forgot-password" className="text-sky-600 hover:underline">
                  Forgot password?
                </Link>
                <span className="text-gray-500">Need an account?{" "}
                  <Link to="/register" className="text-sky-600 hover:underline">
                    Register
                  </Link>
                </span>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 font-semibold shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </div>
            </form>

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
          By signing in you agree to our{" "}
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

export default Login;