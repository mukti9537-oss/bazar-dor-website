import React from 'react';
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

type Product = {
    id: string | number;
    image: string;
    nameBn: string;
    today: number | string;
    unit: string;
    change: {
        dir: "up" | "down" | string;
        pct: number | string;
    };
};

const toBanglaNumber = (number: number | string) => {
    return number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)] ?? digit);
};

const Marquee = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const headlines: Product[] = await res.json();

    return (
        <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
            <MarqueeText direction="right" duration={10}>
                <div className="flex items-center">
                    {headlines.map((h) => (
                        <div
                            key={h.id}
                            className="flex h-10 shrink-0 items-center border-r border-gray-200 px-5 whitespace-nowrap"
                        >
                            <span>{h.image}</span>
                            <span className="font-extrabold text-[#1D271F] mr-1.5">{h.nameBn}</span>
                            <span className="ml-1 text-[#1D271F]">
                                {toBanglaNumber(h.today)} টাকা/{h.unit === "kg" ? "কেজি" : h.unit}
                            </span>
                            <span
                                className={`ml-2 font-semibold ${
                                    h.change.dir === "up" ? "text-[#D03739]" : "text-[#1A9951]"
                                }`}
                            >
                                {h.change.dir === "up" ? "▲" : "▼"} {toBanglaNumber(h.change.pct)} %
                            </span>
                        </div>
                    ))}
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;
