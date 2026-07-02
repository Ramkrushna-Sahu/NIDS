"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/signupSchema";
import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Shield, Eye, EyeOff, KeyRound } from "lucide-react";
import {useRouter} from "next/navigation";

type RegistrationFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegistrationFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setLoading(true);
      const response = await axios.post("./api/sign-up", data);
      const result = response.data;

      if (result.success) {
        toast.success("Account created successfully!");
        reset();
        
        setTimeout(() => router.push("/sign-in"), 1500);
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center p-4 ">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 p-8 md:p-10 shadow-violet-500/60">
          
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-linear-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
              <KeyRound className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Create Account</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Join the future of network security</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Full Name
              </label>
              <input
                {...register("name")}
                placeholder="John Doe"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1.5">{errors.name.message}</p>}
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                autoComplete="email"
                {...register("email")}
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email.message}</p>}
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1.5">{errors.password.message}</p>}
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1.5">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-violet-600 hover:text-violet-500 font-medium">
              Sign in
            </Link>
          </p>

          <div className="mt-6">
            <button
              onClick={() => signIn("google")}
              className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white dark:bg-zinc-800 border-2 border-gray-300 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 py-3.5 rounded-2xl font-medium text-gray-700 dark:text-gray-300 transition-all"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {signupSchema} from "@/schemas/signupSchema";
// import { useState } from "react";
// import axios from "axios";
// import { z } from "zod";
// import { signIn } from "next-auth/react";


// type RegistrationFormData = z.infer<typeof signupSchema>;

// export default function SignupPage() {

//     const [loading, setLoading] = useState(false);
//     const { register, handleSubmit, reset, formState: { errors } } = useForm<RegistrationFormData>({
//         resolver: zodResolver(signupSchema)
//     });
//     const onSubmit = async (data: RegistrationFormData) => {
//         try {
//             setLoading(true);
//             const response = await axios.post("/api/sign-up", data);
//             // console.log(response)
//             const result = response.data;
//             alert(result.message);

//             if (result.success) {
//                 reset();
//             }
//         } catch (error) {
//             console.error("Error occurred while registering user:", error);
//             alert("An error occurred while registering. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//             <div className="flex min-h-full items-center justify-center">
//                 <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center px-6 pt-6 pb-10 w-full md:w-[70%] lg:w-[40%]">
//                     <div className="w-full max-w-md">

//                         <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10">
//                             <div className="text-center mb-8">
//                                 <div className="mx-auto w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
//                                     <span className="text-white text-3xl">✦</span>
//                                 </div>
//                                 <h2 className="text-3xl font-semibold text-white">Create Account</h2>
//                                 <p className="text-slate-400 mt-2">Join us today</p>
//                             </div>

//                             <form
//                                 onSubmit={handleSubmit(onSubmit)}
//                                 className="space-y-6"
//                             >

//                                 <div>
//                                     <label className="text-sm font-medium text-slate-300 mb-1.5 block">
//                                         Full Name
//                                     </label>
//                                     <input
//                                         placeholder="John Doe"
//                                         {...register("name")}
//                                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
//                                     />
//                                     {errors.name && (
//                                         <p className="text-red-400 text-sm mt-1.5">{errors.name.message}</p>
//                                     )}
//                                 </div>


//                                 <div>
//                                     <label className="text-sm font-medium text-slate-300 mb-1.5 block">
//                                         Email Address
//                                     </label>
//                                     <input
//                                         type="email"
//                                         placeholder="you@example.com"
//                                         {...register("email")}
//                                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
//                                     />
//                                     {errors.email && (
//                                         <p className="text-red-400 text-sm mt-1.5">{errors.email.message}</p>
//                                     )}
//                                 </div>


//                                 <div>
//                                     <label className="text-sm font-medium text-slate-300 mb-1.5 block">
//                                         Password
//                                     </label>
//                                     <input
//                                         type="password"
//                                         placeholder="••••••••"
//                                         {...register("password")}
//                                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
//                                     />
//                                     {errors.password && (
//                                         <p className="text-red-400 text-sm mt-1.5">{errors.password.message}</p>
//                                     )}
//                                 </div>


//                                 <div>
//                                     <label className="text-sm font-medium text-slate-300 mb-1.5 block">
//                                         Confirm Password
//                                     </label>
//                                     <input
//                                         type="password"
//                                         placeholder="••••••••"
//                                         {...register("confirmPassword")}
//                                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
//                                     />
//                                     {errors.confirmPassword && (
//                                         <p className="text-red-400 text-sm mt-1.5">
//                                             {errors.confirmPassword.message}
//                                         </p>
//                                     )}
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 rounded-2xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
//                                 >
//                                     {loading ? (
//                                         <>
//                                             <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
//                                             Creating account...
//                                         </>
//                                     ) : (
//                                         "Create Account"
//                                     )}
//                                 </button>
//                             </form>

//                             <p className="text-center text-slate-500 text-sm mt-6">
//                                 Already have an account?{" "}
//                                 <a href="/sign-in" className="text-purple-400 hover:text-purple-300 font-medium">
//                                     Sign in
//                                 </a>
//                             </p>
//                             <div className="flex justify-center py-4 ">
//                                 <button className="bg-white w-[90%] sm:w-[70%] rounded-2xl p-2 font-semibold cursor-pointer hover:bg-gray-200" onClick={() => signIn("google")}>
//                                     Sign in With Google
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//     )
// }