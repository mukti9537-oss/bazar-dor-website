import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';

const SignUpPage = () => {
   
    return (
        <main className="min-h-screen bg-[#f0f6f1] px-4 py-10 sm:py-14">
            <div className="mx-auto w-full max-w-md">
                {/* heading */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-[#1D271F] sm:text-3xl">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>
                    <p className="mt-2 text-sm text-[#676867]">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>
                {/* signup from */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
                    <form className="space-y-4">
                        {/* name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-[#1D271F]">
                                নাম
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="যেমন: রহিম উদ্দিন"
                                autoComplete="name"
                                required
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800
                            outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#0e0f0e]"
                            />
                        </div>
                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-[#1D271F]">
                                ইমেইল
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800
                            outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#0e0f0e]"
                            />
                        </div>
                        {/* password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-[#1D271F]">
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
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800
                            outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#0e0f0e]"
                            />
                        </div>
                        {/* cheak password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium text-[#1D271F]">
                                পাসওয়ার্ড নিশ্চিত করুন
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="আবার লিখুন"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800
                            outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#0e0f0e]"
                            />
                        </div>
                        {/* sumit button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#08b04b] px-4 py-3 text-sm font-bold text-[#F3FBF4] shadow-sm transition hover:bg-[#047532] active:scale-[0.99]"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </button>
                        {/* divided */}

                        <div className="flex items-center gap-3 py-1">
                            <div className="h-px flex-1 bg-gray-200 "/>
                            <span className="text-sm text-gray-500">
                                অথবা
                            </span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        {/* social login button */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <button 
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3
                            py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                <span className="font-bold text-base text-blue-600">
                                    <FcGoogle />
                                </span>
                                Google দিয়ে চালিয়ে যান
                            </button>
                            <button 
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3
                            py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                <span className="font-bold text-base text-blue-600">
                                    <FaGithub />
                                </span>
                               Github দিয়ে চালিয়ে যান
                            </button>
                        </div>
                    </form>
                    {/* sign in link */}
                    <p className="mt-5 text-center text-sm text-gray-500">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                        href="/signin"
                        className="font-medium text-[#05893e] hover:underline">
                            সাইন ইন করুন
                        </Link>
                    </p>
                </div>
                {/* back to home */}
                <div className="mt-6 text-center">
                    <Link
                    href="/"
                    className="text-sm text-gray-500 transition hover:text-[##05893e]">
                        ← হোম পেজে ফিরে যান
                    </Link> 
                </div>
            </div>
        </main>
       
    );
};

export default SignUpPage;