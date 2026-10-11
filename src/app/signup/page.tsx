"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? ""
    );

    if (password !== confirmPassword) {
      alert("দুটি পাসওয়ার্ড মিলছে না!");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        alert(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setSocialLoading("google");

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        alert(error.message || "Google দিয়ে সাইন ইন করা যায়নি!");
        setSocialLoading(null);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে!");
      setSocialLoading(null);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setSocialLoading("github");

      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
if (error) {
        alert(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি!");
        setSocialLoading(null);
      }
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      alert("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে!");
      setSocialLoading(null);
    }
  };

  return (
    <main className=" flex min-h-screen items-center justify-between bg-[#f0f6f1] px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#1D271F] sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-[#676867]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Signup Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#1D271F]"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="যেমন: রহিম উদ্দিন"
                autoComplete="name"
                required
                disabled={isLoading}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20 disabled:bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#1D271F]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={isLoading}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20 disabled:bg-gray-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#1D271F]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="new-password"
                minLength={8}
                required
                disabled={isLoading}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20 disabled:bg-gray-100"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#1D271F]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="আবার পাসওয়ার্ড লিখুন"
                autoComplete="new-password"
                minLength={8}
                required
                disabled={isLoading}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/20 disabled:bg-gray-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || socialLoading !== null}
              className="w-full rounded-lg bg-[#08b04b] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#047532] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-sm text-gray-500">অথবা</span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading || socialLoading !== null}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FcGoogle className="text-lg" />

                {socialLoading === "google"
                  ? "অপেক্ষা করুন..."
                  : "Google দিয়ে চালিয়ে যান"}
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={handleGithubSignIn}
                disabled={isLoading || socialLoading !== null}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaGithub className="text-lg" />

                {socialLoading === "github"
                  ? "অপেক্ষা করুন..."
                  : "GitHub দিয়ে চালিয়ে যান"}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <p className="mt-5 text-center text-sm text-gray-500">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#05893e] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-[#05893e]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;