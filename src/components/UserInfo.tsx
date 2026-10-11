"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [open, setOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const router = useRouter();

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);

            const { error } = await authClient.signOut();

            if (error) {
                toast.error("সাইন আউট করা যায়নি।");
                return;
            }

            setOpen(false);
            toast.success("সফলভাবে সাইন আউট হয়েছে!");

            router.push("/sign-in");
            router.refresh();
        } catch {
            toast.error("সাইন আউট করার সময় সমস্যা হয়েছে।");
        } finally {
            setIsSigningOut(false);
        }
    };

    if (!user) {
        return (
            <div className="flex shrink-0 items-center gap-2">
                <Link
                    href="/signin"
                    className="rounded-lg border border-[#05893e] px-3 py-2 text-sm font-medium text-[#05893e] hover:bg-green-50"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/signup"
                    className="rounded-lg bg-[#05893e] px-3 py-2 text-sm font-medium text-white hover:bg-[#047532]"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    return (
        <div className="relative shrink-0">
            {/* Profile Button */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-haspopup="menu"
                className="flex max-w-[190] items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-100 sm:max-w-[230]"
            >
                {/* Profile Image */}
                {user.image ? (
                    <Image
                        src={user.image}
                        alt={user.name ? `${user.name} Profile` : "Profile"}
                        width={36}
                        height={36}
                        unoptimized
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 font-semibold text-[#05893e]">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                )}

                {/* Name */}
                <span className="truncate text-sm font-medium text-[#1d271f]">
                    {user.name}
                </span>

                {/* Dropdown Icon */}
                <svg
                    className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${open ? "rotate-180" : ""
                        }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.09 1.032l-4.25 4.3a.75.75 0 01-1.07 0l-4.25-4.3a.75.75 0 01.02-1.052z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {open && (
                <>
                    {/* Outside Click Area */}
                    <button
                        type="button"
                        aria-label="Close dropdown"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setOpen(false)}
                    />

                    <div
                        role="menu"
                        className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg"
                    >
                        {/* User Details */}
                        <div className="border-b border-gray-100 px-3 py-3">
                            <p className="truncate text-sm font-semibold text-[#1d271f]">
                                {user.name}
                            </p>

                            <p className="mt-1 break-all text-xs text-gray-500">
                                {user.email}
                            </p>
                        </div>
                        {/* Edit Profile */}
                        <Link
                            href="/profile"
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-[#05893e]"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                aria-hidden="true"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.12 2.12 0 013 3L9 17l-4 1 1-4Z" />
                            </svg>

                            প্রোফাইল সম্পাদনা
                        </Link>

                        {/* Sign Out */}
                        <button
                            type="button"
                            role="menuitem"
                            disabled={isSigningOut}
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                aria-hidden="true"
                            >
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                <path d="M16 17l5-5-5-5" />
                                <path d="M21 12H9" />
                            </svg>

                            {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserInfo;