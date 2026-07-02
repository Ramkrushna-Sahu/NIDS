"use client";

import { useEffect, useState } from "react";
import { Calendar, Mail, User, CheckCircle, XCircle, Clock, ArrowLeft, Fingerprint } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

interface UserProfile {
  name: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/profile");
        if (data.success) {
          setProfile(data.data);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide">Loading secure profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-4">
        <div className="text-center max-w-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 dark:text-white font-medium mb-4">Failed to load profile details</p>
          <Link href="/">
            <button className="cursor-pointer px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-all">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  
  const userInitial = profile.name ? profile.name.trim().charAt(0).toUpperCase() : "";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-200/60 dark:border-zinc-800/80 overflow-hidden">
          
          <div className="h-32 bg-linear-to-r from-violet-600 to-indigo-700 relative" />

          <div className="px-6 pb-6 relative flex flex-col items-center sm:items-start sm:flex-row gap-5 -mt-12 border-b border-gray-100 dark:border-zinc-800/80">
            
            <div className="w-24 h-24 bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md ring-4 ring-white dark:ring-zinc-900 select-none">
              {userInitial ? (
                <span className="text-3xl font-bold text-white tracking-wider">{userInitial}</span>
              ) : (
                <Fingerprint className="w-11 h-11 text-white" />
              )}
            </div>

            <div className="text-center sm:text-left sm:pt-14 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Account Profile</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Identity & credentials for secure operations</p>
            </div>
            
            <div className="sm:pt-14">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide border ${
                profile.isVerified 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/50" 
                  : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50"
              }`}>
                {profile.isVerified ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" /> Verified User
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" /> Pending Verification
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="flex items-start gap-4 bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800/50 p-5 rounded-2xl hover:border-violet-500/20 dark:hover:border-violet-500/20 transition-all">
              <div className="p-2.5 bg-violet-50 dark:bg-violet-950/50 rounded-xl">
                <User className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Full Name</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1 truncate">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800/50 p-5 rounded-2xl hover:border-violet-500/20 dark:hover:border-violet-500/20 transition-all">
              <div className="p-2.5 bg-violet-50 dark:bg-violet-950/50 rounded-xl">
                <Mail className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Email Address</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1 truncate">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800/50 p-5 rounded-2xl hover:border-violet-500/20 dark:hover:border-violet-500/20 transition-all">
              <div className="p-2.5 bg-violet-50 dark:bg-violet-950/50 rounded-xl">
                <Calendar className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Account Created</p>
                <p className="text-base font-medium text-gray-900 dark:text-white mt-1">{formatDate(profile.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800/50 p-5 rounded-2xl hover:border-violet-500/20 dark:hover:border-violet-500/20 transition-all">
              <div className="p-2.5 bg-violet-50 dark:bg-violet-950/50 rounded-xl">
                <Clock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Last System Update</p>
                <p className="text-base font-medium text-gray-900 dark:text-white mt-1">{formatDate(profile.updatedAt)}</p>
              </div>
            </div>

          </div>

          
          <div className="px-6 py-5 bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center sm:text-left">
              Data protected under global encryption parameters.
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <button className="w-full text-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm">
                  Go to Dashboard
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}