"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Categories{
    slug: string,
    nameBn: string,
    id: string,
    icon: string
}

const Navlinks = () => {
    const [data, setData] = useState<Categories[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
            const categories: Categories[] = await res.json();
            setData(categories);
        };

        fetchCategories();
    }, []);

    return (
        <nav className="w-full max-w-full border-t border-gray-100">
        <div className=" mx-auto flex w-full gap-5  max-w-7xl overflow-x-auto py-3 px-4 lg:px-6">
            {data.map((d) => {
                const isActive = pathname === `/bazardor/${d.slug}`;
                return (
                <Link key={d.id} href={`/bazardor/${d.slug}`}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                    ? "bg-[#05893E] text-white"
                    : "text-[#020202] hover:bg-green-500"
                }`}> 
                <span>{d.icon}</span>
                <span>{d.nameBn}</span> 
                </Link>
                );
            })}
        </div>
        </nav>
    );
};

export default Navlinks;