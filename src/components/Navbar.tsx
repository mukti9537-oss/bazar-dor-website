import React from 'react';
import logo from "@/assets/logo-icon.png"
import Image from 'next/image';
import Navlinks from './Navlinks';
import Link from 'next/link';
import UserInfo from './UserInfo';



const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div className=" border-b w-full max-w-full border-gray-200 top-0 z-50 bg-white">
      {/* mobile navbar */}

      <nav className="flex w-full min-w-0 md:hidden items-center justify-between gap-2 px-3 py-4 sm:px-5">
        <Link href="/" className="flex items-center gap-2">
          <Image className="bg-[#05893E] rounded-2xl px-2 py-2"
            src={logo}
            alt="Bazar-dor"
            width={40}
            height={40}
            priority
          />

          <div>
            <h2 className="text-[#1D271F] font-extrabold">বাজার দর</h2>
            <p className="text-[#1D271F] text-xs">{date}</p>
          </div>
        </Link>

        <div className="flex shrink-0 gap-1 sm:gap-2">
          <button className="btn">সাইন ইন</button>
          <button className="btn bg-[#05893E] text-[#F3FBF4]">সাইন আপ</button>
        </div>
      </nav>

      {/* desktop navbar */}
      <nav className="hidden md:flex w-full items-center justify-between gap-4 px-4 lg:px-6 max-w-7xl mx-auto py-5">
        <Link href="/" className="flex items-center gap-2">
          <Image className="bg-[#05893E] rounded-2xl px-2 py-2"
            src={logo}
            alt="Bazar-dor"
            width={40}
            height={40}
            priority
          />
          <div>
            <h2 className="text-[#1D271F] font-extrabold">বাজার দর</h2>
            <p className="text-[#1D271F] text-xs">{date}</p>
          </div>
        </Link>

        <UserInfo />

       
      </nav>
      <Navlinks />

    </div>

  )
};

export default Navbar;