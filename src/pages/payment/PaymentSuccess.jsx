import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { CheckCircle, Crown, Loader2, Home } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const isVerified = true;
  const lessonTitle = "Lifetime Premium Access";

  console.log("Session ID:", sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure.post("/payment-success", { sessionId });
    }
  }, [sessionId, axiosSecure]);

  console.log("Payment successful with session ID:", sessionId);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center border-t-4 border-green-500 transition-all duration-500 transform scale-100">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce-in" />

        <h2 className="text-3xl font-extrabold text-green-700 mt-4 mb-2">
          Payment Successful!
        </h2>

        <p className="text-lg text-slate-800 font-medium">
          Welcome to the Premium Club!
        </p>

        <div className="mt-5 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-sm text-indigo-700">
            You now have **Lifetime Access** to:
          </p>
          <h3 className="text-xl font-bold text-indigo-800 mt-1 flex items-center justify-center gap-2">
            <Crown className="w-5 h-5 fill-indigo-500 text-white" />
            {lessonTitle}
          </h3>
        </div>

        <p className="text-sm text-slate-600 mt-4">
          Your account access has been updated automatically. Enjoy your
          lessons!
        </p>

        <div className="mt-8 space-y-3">
         
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 transition"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
