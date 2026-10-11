"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleUpdateProfile = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") ?? "").trim();

        if (!name) {
            toast.error("আপনার নাম লিখুন!");
            return;
        }

        if (name === user?.name) {
            toast.info("নামে কোনো পরিবর্তন করা হয়নি।");
            return;
        }

        try {
            setIsUpdating(true);

            const { error } = await authClient.updateUser({ name });

            if (error) {
                toast.error(error.message || "নাম আপডেট করা যায়নি!");
                return;
            }

            toast.success("নাম সফলভাবে আপডেট হয়েছে!");
        } catch {
            toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন!");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);

            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "সাইন আউট করা যায়নি!");
                return;
            }

            router.push("/signin");
            router.refresh();
        } catch {
            toast.error("সাইন আউট করার সময় সমস্যা হয়েছে!");
        } finally {
            setIsSigningOut(false);
        }
    };

    if (isPending) {
        return (
            <main className="flex min-h-[65vh] items-center justify-center bg-[#f0f6f1]">
                <span className="loading loading-spinner loading-lg text-[#05893e]" />
            </main>
        );
    }

    if (!user) {
        return (
            <main className="flex min-h-[65vh] flex-col items-center justify-center bg-[#f0f6f1] px-4 text-center">
                <h1 className="text-2xl font-bold text-[#1d271f]">
                    আমার প্রোফাইল
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
                </p>

                <Link
                    href="/signin"
                    className="mt-5 rounded-lg bg-[#05893e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#047532]"
                >
                    সাইন ইন করুন
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-[70vh] bg-[#f0f6f1] px-4 py-16 sm:py-[72]">
            <div className="mx-auto w-full max-w-[672]">

                {/* Page Heading */}
                <div className="mb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-[#1d271f]">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য দেখুন।
                    </p>
                </div>

                {/* Profile Information Card */}
                <section className="flex min-h-[88] flex-col justify-between gap-4 rounded-xl border border-[#e6ece7] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:px-5">

                    <div className="flex min-w-0 items-center gap-3">

                        {/* Profile Image */}
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "Profile"}
                                width={48}
                                height={48}
                                unoptimized
                                className="h-12 w-12 shrink-0 rounded-xl object-cover"
                            />
                        ) : (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e3f3e8] text-xl font-bold text-[#05893e]">
                                {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                        )}

                        {/* Name and Email */}
                        <div className="min-w-0">
                            <h2 className="truncate text-sm font-bold text-[#1d271f]">
                                {user.name || "ব্যবহারকারী"}
                            </h2>

                            <p className="mt-1 break-all text-xs text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Sign Out Button */}
                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="shrink-0 self-start rounded-lg border border-[#ff7777] px-3 py-2 text-xs font-medium text-[#e65353] transition hover:bg-red-50 disabled:opacity-50 sm:self-auto"
                    >
                        {isSigningOut ? "সাইন আউট হচ্ছে..." : "↩️ সাইন আউট"}
                    </button>
                </section>

                {/* Edit Name Card */}
                <section className="mt-4 rounded-xl border border-[#e6ece7] bg-[#fbfdfb] px-5 py-5 sm:px-6 sm:py-6">

                    <h2 className="mb-5 text-base font-bold text-[#27332a]">
                        তথ্য
                    </h2>

                    <form
                        onSubmit={handleUpdateProfile}
                        className="space-y-2"
                    >
                        <label
                            htmlFor="name"
                            className="block text-xs font-medium text-[#303a32]"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={user.name || ""}
                            placeholder="আপনার নাম লিখুন"
                            autoComplete="name"
                            required
                            className="h-[38] w-full rounded-lg border border-[#e5ebe6] bg-transparent px-3 text-sm text-[#1d271f] outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/10"
                        />

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="mt-2 flex h-[38] w-full items-center justify-center rounded-lg bg-[#078b40] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#047532] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </section>

            </div>
        </main>
    );
};

export default ProfilePage;