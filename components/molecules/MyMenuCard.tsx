"use client";

import Link from "next/link";

interface MyMenuCardProps {
  href: string;
  emoji: string;
  title: string;
  description: string;
}

export default function MyMenuCard({ href, emoji, title, description }: MyMenuCardProps) {
  return (
    <Link href={href} className="group w-full">
      <div className="bg-zinc-50/40 border border-zinc-100 rounded-3xl p-6 hover:bg-white hover:border-zinc-200 hover:shadow-md transition-all duration-300 h-full space-y-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-lg select-none">{emoji}</span>
          <span className="text-zinc-300 group-hover:text-black transition-colors font-mono font-light text-lg">
            →
          </span>
        </div>
        <div>
          <h3 className="text-base font-bold text-black tracking-tight">{title}</h3>
          <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}