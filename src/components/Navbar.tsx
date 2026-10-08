import React from 'react';
import logo from "@/assets/logo-icon.png"
import Image from 'next/image';


const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div className="border-b border-gray-200 top-0 z-50 bg-white">
      {/* mobile navbar */}

      <nav className="flex md:hidden justify-between gap-4 max-w-7xl mx-auto py-5">
        <div className="flex items-center gap-2">
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
        </div>

        <div className="flex gap-2">
          <button className="btn">সাইন ইন</button>
          <button className="btn bg-[#05893E] text-[#F3FBF4]">সাইন আপ</button>
        </div>
      </nav>

      {/* desktop navbar */}
      <nav className="hidden md:flex justify-between gap-4 max-w-7xl mx-auto py-5">
        <div className="flex items-center gap-2">
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
        </div>

        <div className="flex gap-4 items-center">
          <button className="btn">সাইন ইন</button>
          <button className="btn bg-[#05893E] text-[#F3FBF4]">সাইন আপ</button>
        </div>
      </nav>
    </div>

  )
};

export default Navbar;