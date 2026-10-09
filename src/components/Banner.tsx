import Image from "next/image";
import React from "react";
import bannerImg from "@/assets/bazar-hero.png";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className=" gap-4 max-w-7xl mx-auto px-4 py-7">
      <div className="bg-[#F9FCF9]  rounded-2xl min-h-[190] md:min-h[220] flex justify-between gap-4 items-center
       flex-col md:flex-row px-4 md:px-6 py-4 md:py-4 ">

        {/* Content */}
        <div className="space-y-3 text-center md:text-left w-full md:w-1/2">

          <h4 className=" inline-block w-fit px-3 py-1  text-[#05893E] rounded-full bg-[#b0f4cf]">
            {date}
          </h4>

          <h2 className=" text-xs font-extrabold leading-tight  text-[#1D271F] md:text-3xl lg:text-4xl">
           আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="text-base text-[#686d68] leading-7 md:text-lg">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, 
          <br />
          সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a href="#"
            className="btn  bg-[#047F39] text-[#F3FBF4]">
            সব পণ্য দেখুন
          </a>

        </div>

        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl w-full md:w-1/2 flex justify-end ">
          <Image
            src={bannerImg}
            alt="bazar image"
            priority
            className="w-48 md:w-64 lg:w-72"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;