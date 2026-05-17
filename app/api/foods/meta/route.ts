// app/api/foods/meta/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. DB의 Food 테이블에서 중복 없는 고유 브랜드(제조사) 목록 추출
    const distinctBrands = await prisma.food.findMany({
      distinct: ["brand"],
      select: { brand: true },
      orderBy: { brand: "asc" },
    });

    // 2. DB의 Food 테이블에서 중복 없는 고유 크기 카테고리 목록 추출
    const distinctSizes = await prisma.food.findMany({
      distinct: ["sizeCategory"],
      select: { sizeCategory: true },
      orderBy: { sizeCategory: "asc" },
    });

    // 3. 한글 매핑 정보 및 동적 튜플 구조화
    const metaData = {
      // 데이터 변환: [{brand: "Royal Canin"}] -> ["Royal Canin"]
      brands: distinctBrands.map((b) => b.brand),
      
      // 고정된 Enum 구조 한글 변환 매핑 명세
      animals: [
        { value: "dog", label: "강아지" },
        { value: "cat", label: "고양이" },
      ],
      
      types: [
        { value: "false", label: "일반식" },
        { value: "true", label: "처방식" },
      ],

      sizes: distinctSizes.map((s) => s.sizeCategory),

      stages: [
        { value: "puppy", label: "퍼피 (베이비)" },
        { value: "adult", label: "어덜트" },
        { value: "senior", label: "시니어 (올드)" },
      ],
    };

    return NextResponse.json(metaData);
  } catch (error) {
    console.error("Filter Meta API Error:", error);
    return NextResponse.json({ message: "메타데이터 조회 실패" }, { status: 500 });
  }
}