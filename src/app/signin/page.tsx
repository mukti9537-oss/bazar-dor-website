"use client";

import { useSyncExternalStore } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const subscribe = () => () => { };
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const SignInPage = () => {
    const isMounted = useSyncExternalStore(
        subscribe,
        getClientSnapshot,
        getServerSnapshot,
    );

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: "/",
        });

        if (data) {
            toast.success("Sign In successfull!");
            console.log(data);
        }

        if (error) {
            toast.error("Something went error!");
            console.log(error);
        }
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    const handleGithubSignIn = async () => {
        await authClient.signIn.social({
            provider: "github",
        });
    };

    if (!isMounted) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f0f6f1] px-4 py-8 sm:py-12">
                <div className="mx-auto w-full max-w-md">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-[#1D271F] sm:text-3xl">
                            সাইন ইন
                        </h1>
                        <p className="mt-2 text-sm text-[#676867]">
                            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
                        <div className="space-y-4">
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
                                    minLength={8}
                                    required
                                    readOnly
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#0e0f0e]"
                                />
                            </div>

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
                                    autoComplete="current-password"
                                    minLength={8}
                                    required
                                    readOnly
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#0e0f0e]"
                                />
                            </div>

                            <button
                                type="button"
                                disabled
                                className="w-full rounded-lg bg-[#08b04b] px-4 py-3 text-sm font-bold text-[#F3FBF4] shadow-sm transition hover:bg-[#047532] active:scale-[0.99]"
                            >
                                সাইন ইন
                            </button>

                            <div className="flex items-center gap-3 py-1">
                                <div className="h-px flex-1 bg-gray-200" />
                                <span className="text-sm text-gray-500">অথবা</span>
                                <div className="h-px flex-1 bg-gray-200" />
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    disabled
                                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    <FcGoogle />
                                    Google দিয়ে চালিয়ে যান
                                </button>

                                <button
                                    type="button"
                                    disabled
                                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    <FaGithub />
                                    Github দিয়ে চালিয়ে যান
                                </button>
                            </div>
                        </div>

                        <p className="mt-5 text-center text-sm text-gray-500">
                            অ্যাকাউন্ট আছে?{" "}
                            <Link
                                href="/signup"
                                className="font-medium text-[#05893e] hover:underline"
                            >
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </div>

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
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f0f6f1] px-4 py-8 sm:py-12">
            <div className="mx-auto w-full max-w-md">
                {/* Heading */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-[#1D271F] sm:text-3xl">
                        সাইন ইন
                    </h1>
                    <p className="mt-2 text-sm text-[#676867]">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                {/* Sign in form */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
                    <form className="space-y-4" onSubmit={onSubmit}>
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
                                minLength={8}
                                required
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#0e0f0e]"
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
                                autoComplete="current-password"
                                minLength={8}
                                required
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#0e0f0e]"
                            />
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#08b04b] px-4 py-3 text-sm font-bold text-[#F3FBF4] shadow-sm transition hover:bg-[#047532] active:scale-[0.99]"
                        >
                            সাইন ইন
                        </button>
                        {/* Divider */}
                        <div className="flex items-center gap-3 py-1">
                            <div className="h-px flex-1 bg-gray-200" />
                            <span className="text-sm text-gray-500">অথবা</span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        {/* Social login */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <button
                                onClick={handleGoogleSignIn}
                                type="button"
                                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                <span className="font-bold text-base text-blue-600">
                                    <FcGoogle />
                                </span>
                                Google দিয়ে চালিয়ে যান
                            </button>

                            <button
                                onClick={handleGithubSignIn}
                                type="button"
                                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                <span className="font-bold text-base text-blue-600">
                                    <FaGithub />
                                </span>
                                Github দিয়ে চালিয়ে যান
                            </button>
                        </div>
                    </form>

                    {/* Sign up link */}
                    <p className="mt-5 text-center text-sm text-gray-500">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-[#05893e] hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                {/* Back to home */}
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

export default SignInPage;