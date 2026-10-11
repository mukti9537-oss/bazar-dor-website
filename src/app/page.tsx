import Banner from "@/components/Banner";
import Link from "next/link";

type Product = {
    id: number;
    slug: string;
    nameBn: string;
    categoryNameBn: string;
    categoryIcon: string;
    image: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
};

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

async function getProducts(): Promise<Product[]> {
    const response = await fetch(API_URL, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("পণ্যের তথ্য লোড করা যায়নি");
    }

    const result = await response.json();

    return Array.isArray(result)
        ? result
        : result.products ?? result.data ?? [];
}

function toBanglaNumber(value: number | string) {
    return value
        .toLocaleString("en-US")
        .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
}

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

function ProductCard({ product }: { product: Product }) {
    const direction = product.change?.dir ?? "flat";

    const badgeStyle =
        direction === "up"
            ? "bg-green-100 text-green-700"
            : direction === "down"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600";

    const symbol =
        direction === "up" ? "▼" : direction === "down" ? "▲" : "—";

    return (
        <Link
            href={`/product/${product.slug}`}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#b3b6b3] text-xl sm:h-12 sm:w-12">
                    {product.image || product.categoryIcon}
                </div>
                <div>
                    <h2 className="text-[#1D271F]">{product.nameBn}</h2>
                    <p className="mt-0.5 text-xs text-[#1D271F]">{getUnit(product.unit)}</p>
                </div>
            </div>
            <div className="mt-4 flex min-w-0 items-end justify-between gap-2">
                <div className="min-w-0">
                    <p className="mb-1 text-xs text-[#1D271F]">আজকের দাম</p>
                    <p className="text-base font-extrabold text-[#1D271F] sm:text-lg">
                        {toBanglaNumber(product.today)} <span className="text-xs">টাকা</span>
                    </p>
                </div>
                <span className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold ${badgeStyle}`}>
                    {symbol} {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>
            </div>
        </Link>
    );
}

export default async function Home() {
    let products: Product[];

    try {
        products = await getProducts();
    } catch {
        products = [];
    }

    const risers = products
        .filter((product) => product.change?.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const fallers = products
        .filter((product) => product.change?.dir === "down")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <main className="min-h-screen bg-gray-50">
            <Banner />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {products.length === 0 ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                        <h2 className="font-bold text-red-700">
                            পণ্যের তথ্য লোড করা যায়নি
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            API সাময়িকভাবে কাজ না করলে কিছুক্ষণ পর আবার চেষ্টা করো।
                        </p>
                    </div>
                ) : (
                    <>
                        <section className="mb-12">
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                <span className="text-red-500">▲</span>আজ দাম বেড়েছে
                            </h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                                {fallers.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                <span className="text-green-500">▼</span>আজ দাম কমেছে
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                                {risers.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>

                        <section id="all-products" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-gray-900">
                                সব পণ্য
                            </h2>
                            <p className="mb-3 text-xs text-[#1D271F]">
                                মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
                            </p>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}

