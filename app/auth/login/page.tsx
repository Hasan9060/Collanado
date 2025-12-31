"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import nookies from "nookies";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // ✅ Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // ✅ Get token and save it in cookie for middleware
      const token = await userCredential.user.getIdToken();
      nookies.set(null, "logged_in", token, {
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      // ✅ Redirect to home page
      router.push("/");
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Better error messages
      if (err.code === 'auth/invalid-email') {
        setError("Invalid email address.");
      } else if (err.code === 'auth/user-not-found') {
        setError("No account found with this email.");
      } else if (err.code === 'auth/wrong-password') {
        setError("Incorrect password.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    setError("");
    
    try {
      // ✅ Sign in with Google and get user credential
      const userCredential = await signInWithPopup(auth, provider);
      
      // ✅ Get token and save it in cookie for middleware
      const token = await userCredential.user.getIdToken();
      nookies.set(null, "logged_in", token, {
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      // ✅ Redirect to home page
      router.push("/");
    } catch (err: any) {
      console.error("Google login error:", err);
      
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Google login was cancelled.");
      } else if (err.code === 'auth/popup-blocked') {
        setError("Popup was blocked. Please allow popups for this site.");
      } else {
        setError("Google login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-28 min-h-screen flex items-center justify-center transition-colors duration-300 p-4 dark:bg-gray-900">
      <div className="w-full max-w-4xl flex flex-col sm:flex-row rounded-3xl shadow-2xl overflow-hidden border backdrop-blur-lg bg-white/80 border-white/20 dark:bg-gray-900/60 dark:border-gray-700">
        
        {/* LEFT SIDE — Header */}
        <div className="sm:w-1/2 bg-gradient-to-r from-blue-600 to-indigo-500 relative flex flex-col justify-center items-center sm:items-start sm:pl-10 p-8 text-center sm:text-left">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full"></div>

          <img
            src="/Images/logo.png"
            alt="Logo"
            className="w-24 h-auto object-contain drop-shadow-lg sm:w-32 mb-4"
          />

          <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md">
            Welcome Back
          </h1>
          <p className="text-amber-100 text-sm sm:text-base mt-2">
            Login to your account
          </p>
        </div>

        {/* RIGHT SIDE — Form */}
        <div className="sm:w-1/2 p-6 sm:p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-6 text-sm sm:text-base">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 bg-white/70 dark:bg-gray-800/50 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 bg-white/70 dark:bg-gray-800/50 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </button>
          </div>

          <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}