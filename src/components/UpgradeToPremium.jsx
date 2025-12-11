import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Crown, Lock, X, CheckCircle, Loader2 as Spinner } from "lucide-react";
import useAuth from "../hooks/UseAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";


const UpgradeToPremium = ({ lesson, lifetimePrice = 1500, onClose }) => {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();

  const { _id, title } = lesson || {};

  
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    modalRef.current?.focus?.();

    const onKey = (e) => {
      if (e.key === "Escape") {
        if (!processing) setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      prev?.focus?.();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, processing]);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    if (processing) return;
    setOpen(false);
    if (typeof onClose === "function") onClose();
  };

  

  const handlePayment = async () => {
    setProcessing(true);
    const paymentInfo ={
      lessonId: _id,
      lessonTitle: title,
      cost: lifetimePrice,
      customer: {
        name: user?.displayName || "Guest User",
        email: user?.email 
      }
      
    }
    
      const {data} = await axiosSecure.post(`/payment-checkout-session` , paymentInfo);
      window.location.href = data.url;
      console.log(data.url);
    
  };
     
  return (
    <div className="rounded-xl border bg-white shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex gap-4 items-start">
        <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 ring-1 ring-yellow-200">
          <Crown className="w-7 h-7 text-yellow-600" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">
            Unlock full access to{" "}
            <span className="text-indigo-600">“{title}”</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Upgrade to Premium for ad-free reading, bookmarking, and exclusive content.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 p-3 rounded-lg border bg-slate-50">
              <Lock className="w-5 h-5 text-slate-600 mt-1" />
              <div>
                <div className="text-sm font-medium text-slate-800">Full content</div>
                <div className="text-xs text-slate-500">Read without restrictions</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border bg-slate-50">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <div className="text-sm font-medium text-slate-800">Premium features</div>
                <div className="text-xs text-slate-500">Save, highlight & personalized picks</div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 items-center">
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              <Crown className="w-4 h-4" /> Upgrade to Premium
            </button>

            

            <div className="ml-auto text-xs text-slate-500">
             
                <span>Signed in as <span className="font-medium text-slate-700">{user?.email}</span></span>
              
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-400">Secure checkout • Refund policy applies</div>
        </div>
      </div>

      
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !processing && closeModal()}
            aria-hidden="true"
          />

          <div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="upgrade-title"
            className="relative z-10 w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl ring-1 ring-slate-200 transition-all duration-300 transform translate-y-0 sm:translate-y-0"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-50 p-2">
                  <Crown className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 id="upgrade-title" className="text-lg font-semibold text-slate-900">
                    Lifetime Premium Access
                  </h4>
                  <p className="text-xs text-slate-500">One-time payment — unlimited access</p>
                </div>
              </div>

              <button
                onClick={() => !processing && closeModal()}
                aria-label="Close"
                className="p-2 rounded-md text-slate-500 hover:text-slate-800"
                disabled={processing}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="text-center">
                <div className="inline-flex items-baseline gap-3 px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-100">
                  <span className="text-sm text-indigo-500">One-time</span>
                  <div className="text-2xl font-extrabold text-indigo-700">BDT {Number(lifetimePrice).toLocaleString()}</div>
                </div>

                <p className="mt-3 text-sm text-slate-600">Unlock every premium lesson, priority support, and exclusive perks.</p>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-left">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-1" /> Unlimited access to all premium lessons</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-1" /> Save, highlight & organize</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 mt-1" /> Priority support</li>
              </ul>

              <div className="mt-6">
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className={`w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-white font-semibold transition ${
                    processing ? "bg-slate-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {processing ? <Spinner className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                  <span>{processing ? "Processing…" : `Confirm & Pay BDT ${Number(lifetimePrice).toLocaleString()}`}</span>
                </button>

               
              </div>

              <p className="mt-4 text-xs text-slate-400 text-center">You will be redirected to a secure gateway to complete payment.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpgradeToPremium;