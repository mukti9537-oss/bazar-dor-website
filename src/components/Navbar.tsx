"use client";

import logo from "@/assets/logo-icon.png";
import Image from "next/image";
import Navlinks from "./Navlinks";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="relative z-50 w-full max-w-full border-b border-gray-200 bg-white">
      {/* Mobile Navbar */}
      <nav className="flex w-full min-w-0 items-center justify-between gap-2 px-3 py-4 sm:px-5 md:hidden">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image
            className="rounded-2xl bg-[#05893E] px-2 py-2"
            src={logo}
            alt="Bazar-dor"
            width={40}
            height={40}
            priority
          />

          <div className="min-w-0">
            <h2 className="font-extrabold text-[#1D271F]">
              বাজার দর
            </h2>

            <p className="text-xs text-[#1D271F]">{date}</p>
          </div>
        </Link>

        {/* Mobile User Info */}
        <div className="shrink-0">
          <UserInfo />
        </div>
      </nav>

      {/* Desktop Navbar */}
      <nav className="mx-auto hidden w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 md:flex lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="rounded-2xl bg-[#05893E] px-2 py-2"
            src={logo}
            alt="Bazar-dor"
            width={40}
            height={40}
            priority
          />

          <div>
            <h2 className="font-extrabold text-[#1D271F]">
              বাজার দর
            </h2>

            <p className="text-xs text-[#1D271F]">{date}</p>
          </div>
        </Link>

        <UserInfo />
      </nav>

      <Navlinks />
    </div>
  );
};

export default Navbar;