"use client";

import Image from "next/image";
import Badge from "@atoms/Badge"; // 기존에 만든 Badge 활용

interface FoodCardProps {
  name: string;
  brand: string;
  tags: string[];
  imageUrl?: string;
}

export default function FoodCard({ name, brand, tags, imageUrl }: FoodCardProps) {
  return (
    <div className="group border-2 border-gray-200 dark:border-gray-700 p-4 rounded-sm bg-white dark:bg-gray-800 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all cursor-pointer">
      {/* 사료 이미지 영역 */}
      <div className="aspect-square w-full bg-gray-100 dark:bg-gray-700 rounded-sm mb-4 relative overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
        )}
      </div>

      {/* 정보 영역 */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{brand}</p>
      <h3 className="font-bold text-black dark:text-white mb-3 line-clamp-1">{name}</h3>
      
      {/* 태그 영역 */}
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <Badge key={tag} color="gray">{tag}</Badge>
        ))}
      </div>
    </div>
  );
}