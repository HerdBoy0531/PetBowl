"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import RankingCard from "@/components/molecules/RankingCard";

interface RankedFood {
  id: number;
  nameKo: string;
  brandEn: string;
  viewCount: number;
  mainProtein: string[];
}

export default function PopularSection() {
  const router = useRouter();

  const [period, setPeriod] = useState<
    "weekly" | "monthly" | "total"
  >("weekly");

  const [rankedFoods, setRankedFoods] = useState<RankedFood[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    async function fetchRanking() {
      try {
        if (rankedFoods.length === 0) {
          setIsLoading(true);
        } else {
          setIsRefreshing(true);
        }

        const res = await fetch(
          `/api/foods/ranking?period=${period}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) return;

        const result = await res.json();

        setRankedFoods(result.data ?? []);
      } catch (error) {
        console.error("랭킹 데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }

    fetchRanking();
  }, [period]);

  const tabs = [
    { id: "weekly", label: "주간" },
    { id: "monthly", label: "월간" },
    { id: "total", label: "전체" },
  ] as const;

  return (
    <section className="w-full max-w-4xl mx-auto px-4 space-y-8 animate-fade-in">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">
            실시간 인기 사료
          </h3>
        </div>

        {/* 탭 */}
        <div className="flex items-center gap-3">
          {isRefreshing && (
            <span className="text-xs text-zinc-400 animate-pulse">
              업데이트 중...
            </span>
          )}

          <div className="flex bg-zinc-100 p-1 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPeriod(tab.id)}
                className={`
                  text-xs px-5 py-2 rounded-full font-medium
                  transition-all duration-300
                  ${
                    period === tab.id
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 최초 로딩 */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-[92px] w-full bg-zinc-100 rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : rankedFoods.length === 0 ? (
        <div className="py-20 text-center text-zinc-400 font-light border border-dashed border-zinc-200 rounded-3xl">
          수집된 랭킹 데이터가 없습니다.
        </div>
      ) : (
        <motion.div
          layout
          className={`
            space-y-4
            transition-opacity duration-300
            ${isRefreshing ? "opacity-60" : "opacity-100"}
          `}
        >
          <AnimatePresence mode="popLayout">
            {rankedFoods.map((food, index) => (
              <motion.div
                key={food.id}
                layout
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  },
                  opacity: {
                    duration: 0.2,
                  },
                }}
              >
                <RankingCard
                  index={index}
                  brand={food.brandEn}
                  name={food.nameKo}
                  mainProtein={food.mainProtein || []}
                  viewCount={food.viewCount || 0}
                  onClick={() =>
                    router.push(`/foods/${food.id}`)
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}