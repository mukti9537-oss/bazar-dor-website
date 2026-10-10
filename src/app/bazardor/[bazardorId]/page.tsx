import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import SortProducts from "./SortProducts";


type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: string;
        pct: number;
    };
};

const toBanglaNumber = (value: number | string) =>
    value.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

const Bazardorpage = async ({
    params,
}: {
    params: Promise<{ bazardorId: string }>;
}) => {
    const { bazardorId } = await params;
    let data: Product[] = [];

    try {
        const res = await fetch(
            `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(bazardorId)}`,
            { cache: "no-store" }
        );

        if (res.ok) {
            const result = await res.json();

            if (Array.isArray(result)) {
                data = result.filter((item: Product) => item.category === bazardorId);
            }
        }
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }

    if (data.length === 0) {
        return (
            <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f0f5f0] px-4 py-10 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-[#607564]">
                    <FaSearch />
                </div>

                <h1 className="mb-3 text-xl font-bold text-[#26352b] sm:text-2xl">
                    পণ্য খুঁজে পাওয়া যায়নি।
                </h1>

                <Link href="/" className="rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800">
                    হোম পেজে ফিরে যান
                </Link>
            </main>
        );
    }
    const categoryNameBn = data[0].categoryNameBn;
    const categoryIcon = data[0].categoryIcon;

    return (
        <main className="min-h-[60] overflow-x-hidden bg-[#cfd9cf] px-3 py-4 sm:py-6 lg:px-6">
            <div className="mx-auto w-full max-w-5xl">

                {/* category header */}
                <section className="mb-4 flex min-w-0 items-center gap-3 rounded-xl bg-[#f6faf6] border border-[#fbfdfb] p-3 sm:p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full  text-4xl sm:h-12 sm:w-12">
                        {categoryIcon}
                    </div>

                    <div className="min-w-0">
                        <h1 className="break-word text-lg font-bold text-[#1D271F] sm:text-xl">
                            {categoryNameBn}
                        </h1>

                        <p className="mt-1 text-xs leading-5 text-[#1D271F] sm:text-sm">
                            {toBanglaNumber(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </section>
                {/* sort bar */}
                <SortProducts
                    data={data}
                    categoryIcon={categoryIcon} />

            </div>
        </main>
    );
};

export default Bazardorpage;