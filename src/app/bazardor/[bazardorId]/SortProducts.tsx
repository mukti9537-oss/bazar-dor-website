"use client"
import { useState } from "react";

type Product = {
    id: number;
    nameBn: string;
    unit: string;
    image: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
};
type Props = {
    data: Product[];
    categoryIcon: string;
}

const toBanglaNumber = (value: number | string) =>
    value.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

export default function SortProducts({ data, categoryIcon }: Props) {
    const [sortBy, setSortBy] = useState("default");

    const sortedData = [...data].sort((a, b) => {
        if (sortBy === "low") {
            return a.today - b.today;
        }
        if (sortBy === "high") {
            return b.today - a.today;
        }
        return 0;
    });
    return (
        <>
            <section className="mb-3 flex min-h-[76] items-center md:justify-end  gap-2 rounded-2xl bg-[#f6faf6] border border-[#fbfdfb] p-3 sm:flex-row sm:justify-between sm:px-4 sm:py-3 ">

                <label className="flex min-w-0 items-center gap-2 text-xs text-gray-600 sm:justify-end sm:text-sm">
                    <span className=" text-sm">সাজান</span>
                    <select value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                        className="min-w-0 max-w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs text-gray-700 outline-none
                    focus:border-gray-300 sm:text-sm ">
                        <option value="default"> ডিফল্ট</option>
                        <option value="low">দাম: কম থেকে বেশি</option>
                        <option value="high">দাম: বেশি থেকে কম</option>
                    </select>
                </label>
            </section>

            <p className="mb-3 text-xs text-[#1D271F]">
                মোট {toBanglaNumber(data.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            <section className="grid grid-col-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {sortedData.map((product) => {
                    const isUp = product.change.dir === "up";
                    const isDown = product.change.dir === "down"
                    return (
                        <article key={product.id}
                            className="rounded-xl border border-[#fbfdfb] bg-[#f6faf6] p-3 justify-between transition-shadow-sm hover:shadow-sm sm:p-4 ">
                            <div className="mb-4 flex  items-center gap-3 ">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#b3b6b3] rounded-full text-1xl sm:h-12 sm:w-12">
                                    {product.image || categoryIcon}
                                </div>
                                <div>
                                    <h2 className="text-[#1D271F]">
                                        {product.nameBn}
                                    </h2>

                                    <p className="mt-0.5 text-xs text-[#1D271F]">
                                        প্রতি{" "}
                                        {product.unit === "kg"
                                            ? "কেজি"
                                            : product.unit === "piece"
                                                ? "পিস"
                                                : product.unit === "dozen"
                                                    ? "ডজন"
                                                    : product.unit === "litre"
                                                        ? " লিটার"
                                                        : product.unit}
                                    </p>
                                </div>
                            </div>
                            {/* price */}
                            <div className="flex min-w-0 items-end justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="mb-1 text-xs text-[#1D271F]">
                                        আজকের দাম
                                    </p>
                                    <p className="break-word text-base font-extrabold text-[#1D271F] sm:text-lg ">
                                        {toBanglaNumber(product.today)} <span className="text-xs ">টাকা</span>
                                    </p>
                                </div>
                                <span className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1 text[10] font-semibold sm:text-xs
                                        ${isUp
                                        ? "bg-[#fff0ee] text-[#d9473f]"
                                        : isDown
                                            ? "bg-[#edf7ef] text-[#25964b]"
                                            : "bg-[#fff0ee] text-[#68736b]"
                                    }`}>
                                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                                    {toBanglaNumber(Math.abs(product.change.pct))}%

                                </span>
                            </div>

                        </article>
                    )
                })}
            </section>
        </>
    )
}