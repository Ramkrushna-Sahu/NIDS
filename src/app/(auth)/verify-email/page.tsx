"use client";

import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { MailCheck, MailX, ArrowRight, Home, ArrowLeft } from "lucide-react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setMessage("Invalid verification link");
        setSuccess(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/verify-email?token=${token}`);
        const result = response.data;

        setMessage(result.message);
        setSuccess(result.success);
        if (result.success) {
          toast.success("Email verified successfully!");
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        const errorMsg = error.response?.data?.message || "An error occurred while verifying email";
        setMessage(errorMsg);
        setSuccess(false);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-12">
            <div className="mx-auto w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-6" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Verifying Email...
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Please wait while we confirm your email address
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 p-8 md:p-10 shadow-violet-500/60">
          
          <div className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center mb-6 ${success
            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"
            : "bg-red-100 dark:bg-red-900/30 text-red-600"
          }`}>
            {success ? <MailCheck className="w-12 h-12" /> : <MailX className="w-12 h-12" />}
          </div>

          
          <h1 className={`text-3xl font-semibold mb-4 ${success ? "text-emerald-600" : "text-red-600"}`}>
            {success ? "Email Verified Successfully!" : "Verification Failed"}
          </h1>

          
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
            {message}
          </p>

          
          <div className="flex flex-col gap-4">
            {success ? (
              <Link
                href="/dashboard"
                className="w-full bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
              >
                <span className="flex justify-center align-center"><ArrowRight size={20} /><span>Go to Dashboard</span></span>
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-4 rounded-2xl transition-all"
                >
                  <span className="flex justify-center align-center"><ArrowLeft size={18}/><span>Back to Sign In</span></span>
                </Link>
                <Link
                  href="/"
                  className="w-full text-gray-500 dark:text-gray-400 hover:text-violet-600 flex items-center justify-center gap-2 py-3"
                >
                  <span className="flex justify-center align-center"><Home size={18} /><span>Go to Home</span></span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}