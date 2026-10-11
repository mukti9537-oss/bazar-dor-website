import Link from 'next/link';
import React from 'react';

interface Categories{
    slug: string,
    nameBn: string,
    id: string,
    icon: string
}

const Navlinks = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories")
    const data:Categories[] = await res.json()
    console.log(data)
    return (
        <nav className="w-full max-w-full border-t border-gray-100">
        <div className=" mx-auto flex w-full gap-5  max-w-7xl overflow-x-auto py-3 px-4 lg:px-6">
            {data.map((d , i) => 
            <Link key={i} href={`/bazardor/${d.slug}`}> {d.icon}{d.nameBn}</Link>)}
        </div>
        </nav>
    );
};

export default Navlinks;