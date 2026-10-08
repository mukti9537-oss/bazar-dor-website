import Link from 'next/link';
import React from 'react';

interface Categories{
    slug: string,
    nameBn: string,
    id: string,
    icon: string
}

const Navlinks = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories")
    const data:Categories[] = await res.json()
    console.log(data)
    return (
        <div className="flex gap-8 items-center max-w-7xl mx-auto py-2 px-2">
            {data.map((d , i) => <Link key={i} href={d.slug}> {d.icon}{d.nameBn}</Link>)}
        </div>
    );
};

export default Navlinks;