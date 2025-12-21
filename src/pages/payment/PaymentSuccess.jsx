import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";

import { CheckCircle, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .post("/payment-success", { sessionId })
        .then((res) => {
          if (res.data.success) {
            setLoading(false);
            Swal.fire({
              title: "Success!",
              text: "Your account has been upgraded to Premium.",
              icon: "success",
              confirmButtonText: "Go to Dashboard",
            }).then(() => {
              navigate("/dashboard");
           
              window.location.reload();
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
        <h2 className="text-xl font-semibold mt-4">Verifying Payment...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      <p className="text-gray-600 mt-2 text-center">
        Thank you for upgrading. Your lifetime access is now active.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
