import Link from "next/link";
import { notFound } from "next/navigation";

type Market = {
    market: string;
    division: string;
    min: number;
    max: number;
};

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
    markets: Market[];
};

const toBanglaNumber = (value: number | string) =>
    value.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

function getUnit(unit: string) {
    const units: Record<string, string> = {
        kg: "প্রতি কেজি",
        liter: "প্রতি লিটার",
        litre: "প্রতি লিটার",
        dozen: "প্রতি ডজন",
        piece: "প্রতি পিস",
        pcs: "প্রতি পিস",
    };
    return units[unit.toLowerCase()] || `প্রতি ${unit}`;
}

async function getProduct(slug: string): Promise<Product |
    undefined> {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products",
        {
            cache: "no-store"

        });

    if (!response.ok) {
        throw new Error("পণ্যের তথ্য লোড করা যায়নি")
    }
    const result = await response.json();
    const products: Product[] = Array.isArray(result)
        ? result
        : result.products ?? result.data ?? [];

    return products.find((products) => products.slug === slug);
}
function PriceCard({
    title,
    value,
    description,
}: {
    title: string;
    value: number;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{title}</p>

            <p className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
                {toBanglaNumber(value)} টাকা
            </p>

            <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
    )
};
export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let product: Product | undefined;

    try {
        product = await getProduct(slug);
    } catch {
        return (
            <main className="mx-auto min-h-screen max-w-5xl px-4 py-16">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                    <h1 className="text-xl font-bold text-red-700">
                        পণ্যের তথ্য লোড করা যায়নি
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        API সাময়িকভাবে কাজ করছে না। কিছুক্ষণ পর আবার চেষ্টা করো।
                    </p>

                    <Link
                        href="/"
                        className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 font-semibold text-white"
                    >
                        Home Page-এ ফিরে যাও
                    </Link>
                </div>
            </main>
        );
    }

    if (!product) return notFound();

    const priceDifference = product.today - product.yesterday;
    const priceMessage =
        priceDifference > 0
            ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBanglaNumber(priceDifference)}`
            : priceDifference < 0
              ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBanglaNumber(Math.abs(priceDifference))}`
              : "গতকালের তুলনায় আজ দাম অপরিবর্তিত আছে";

    const markets = product?.markets ?? [];

    const minimumPrice =
        markets.length > 0
            ? Math.min(...markets.map((market) => market.min))
            : product!.today;

    const maximumPrice =
        markets.length > 0
            ? Math.max(...markets.map((market) => market.max))
            : product!.today;

    const averagePrice =
        markets.length > 0
            ? Math.round(
                markets.reduce(
                    (total, market) => total + (market.min + market.max) / 2,
                    0
                ) / markets.length
            )
            : product.today;
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-700"
                >
                    ← সব পণ্যে ফিরে যাও
                </Link>

                {/* Product Summary */}
                <section className="mt-6 rounded-3xl bg-[#E1E8E1] p-6 text-[#1D271F] sm:p-10">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white text-5xl">
                            {product.image || product.categoryIcon || "🛒"}
                        </div>

                        <div className="flex-1">
                          
                            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                                {product.nameBn}
                            </h1>

                              <div className="flex flex-wrap">

                                 <span className="rounded-full text-[#1D271F] text-sm">
                                    {getUnit(product.unit)}.
                                </span><span className="rounded-full text-[#1D271F] text-sm">
                                     {product.categoryNameBn}
                                </span>

                               
                            </div>

                            <p className="text-sm leading-7 text-[#1D271F] sm:text-base">
                                {priceMessage} টাকা
               
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-5 text-gray-900 sm:min-w-48">
                            <p className="text-sm text-gray-500">আজকের দাম</p>

                            <p className="mt-2 text-3xl font-extrabold">
                                {toBanglaNumber(product.today)}
                            </p>

                            <p className="mt-1 text-sm">টাকা / একক</p>
                            <span
                                className={`ml-2 font-semibold ${product.change.dir === "up"
                                    ? "text-[#D03739]"
                                    : "text-[#1A9951]"
                                    }`}
                            >
                                {product.change.dir === "up" ? "▲" : "▼"} {toBanglaNumber(product.change.pct)} %
                            </span>
                        </div>
                    </div>
                </section>

                {/* Overall Price Summary */}
                <section className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-900">
                        দামের সারসংক্ষেপ
                    </h2>
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <PriceCard title="সর্বনিম্ন দাম" value={minimumPrice} description = "সবচেয়ে কম দামের বাজার" />

                        <PriceCard title="সর্বোচ্চ দাম" value={maximumPrice} description = "সবচেয়ে বেশি দামের বাজার"/>

                        <PriceCard title="গড় বাজারদর" value={averagePrice} description = "প্রতি কেজি-এর হিসাবে"/>
                    </div>
                </section>

                {/* Market-wise Prices */}
                <section className="mt-10">
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold text-gray-900">
                            বাজারভিত্তিক আজকের দাম
                        </h2> 
                    </div>

                    {markets.length === 0 ? (
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                            এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
                                <table className="w-full text-left">
                                    <thead className="bg-green-50 text-sm text-gray-600">
                                        <tr>
                                            <th className="px-4 py-4 font-semibold">বাজার</th>
                                            <th className="px-4 py-4 font-semibold">বিভাগ</th>
                                            <th className="px-4 py-4 font-semibold">
                                                সর্বনিম্ন দাম
                                            </th>
                                            <th className="px-4 py-4 font-semibold">
                                                সর্বোচ্চ দাম
                                            </th>
                                            <th className="px-4 py-4 font-semibold">
                                                গড় দাম
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {markets.map((market, index) => {
                                            const marketAverage = Math.round(
                                                (market.min + market.max) / 2
                                            );

                                            return (
                                                <tr
                                                    key={`${market.market}-${index}`}
                                                    className="border-t border-gray-100 transition hover:bg-gray-50">
                                                    <td className="px-4 py-4 font-semibold text-gray-800">
                                                        {market.market}
                                                    </td>

                                                    <td className="px-4 py-4 text-gray-600">
                                                        {market.division}
                                                    </td>

                                                    <td className="px-4 py-4 font-semibold text-green-700">
                                                        {toBanglaNumber(market.min)} টাকা
                                                    </td>

                                                    <td className="px-4 py-4 font-semibold text-red-600">
                                                        {toBanglaNumber(market.max)} টাকা
                                                    </td>

                                                    <td className="px-4 py-4 font-bold text-blue-700">
                                                        {toBanglaNumber(marketAverage)} টাকা
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* Mobile Cards */}
                            <div className="grid grid-cols-1 gap-4 md:hidden">
                                {markets.map((market, index) => {
                                    const marketAverage = Math.round(
                                        (market.min + market.max) / 2
                                    );

                                    return (
                                        <div
                                            key={`${market.market}-${index}`}
                                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                        >
                                            <div>
                                                <h3 className="font-bold text-gray-900">
                                                    {market.market}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {market.division}
                                                </p>
                                            </div>

                                            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                                <div className="rounded-xl bg-green-50 p-3">
                                                    <p className="text-xs text-gray-500">
                                                        সর্বনিম্ন দাম
                                                    </p>

                                                    <p className="mt-1 font-bold text-green-700">
                                                        {toBanglaNumber(market.min)} টাকা
                                                    </p>
                                                </div>

                                                <div className="rounded-xl bg-red-50 p-3">
                                                    <p className="text-xs text-gray-500">
                                                        সর্বোচ্চ দাম
                                                    </p>

                                                    <p className="mt-1 font-bold text-red-600">
                                                        {toBanglaNumber(market.max)} টাকা
                                                    </p>
                                                </div>

                                                <div className="rounded-xl bg-blue-50 p-3">
                                                    <p className="text-xs text-gray-500">
                                                        গড় দাম
                                                    </p>

                                                    <p className="mt-1 font-bold text-blue-700">
                                                        {toBanglaNumber(marketAverage)} টাকা
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )
                    }
                </section >


            </div >
        </main >
    );
}
