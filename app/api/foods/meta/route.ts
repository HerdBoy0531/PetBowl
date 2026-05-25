// app/api/foods/meta/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. DB에서 중복 없는 고유 브랜드 한글명, 영문명 목록 추출
    const distinctBrands = await prisma.food.findMany({
      distinct: ["brandKo", "brandEn"],
      select: { brandKo: true, brandEn: true },
      orderBy: { brandKo: "asc" },
    });

    // 2. DB에서 중복 없는 고유 크기 카테고리 목록 추출
    const distinctSizes = await prisma.food.findMany({
      distinct: ["sizeCategory"],
      select: { sizeCategory: true },
      orderBy: { sizeCategory: "asc" },
    });

    // 3. 확장된 요구사항 명세 튜플 구조화
    const metaData = {
      // 프론트엔드에서 한글/영어 혼용하여 렌더링 및 필터링할 수 있도록 객체 배열 형태로 추출
      brands: distinctBrands.map((b) => ({
        ko: b.brandKo,
        en: b.brandEn,
      })),
      
      animals: [
        { value: "dog", label: "강아지" },
        { value: "cat", label: "고양이" },
      ],
      
      types: [
        { value: "false", label: "일반식" },
        { value: "true", label: "처방식" },
      ],

      sizes: distinctSizes.map((s) => s.sizeCategory),

      // ⭐️ 변경: 오늘 스키마에 추가된 'all (전연령)' 반영
      stages: [
        { value: "puppy", label: "퍼피 (베이비)" },
        { value: "adult", label: "어덜트" },
        { value: "senior", label: "시니어 (올드)" },
        { value: "all", label: "전연령" },
      ],

      // ⭐️ 추가: SearchFilterCard에서 쓰일 알레르기 한글 매핑 리스트
      allergies: [
        { value: "HYDROLYZED", label: "가수분해" },
        { value: "GLUTEN_FREE", label: "글루텐프리" },
        { value: "GRAIN_FREE", label: "그레인프리" },
        { value: "LID", label: "LID (제한된 원료)" },
      ],

      // ⭐️ 추가: SearchFilterCard에서 쓰일 인증마크 한글 매핑 리스트
      certifications: [
        { value: "AAFCO", label: "AAFCO" },
        { value: "FEDIAF", label: "FEDIAF" },
        { value: "USDA_ORGANIC", label: "USDA 유기농" },
        { value: "FDA", label: "FDA" },
        { value: "HACCP", label: "HACCP" },
        { value: "ISO22000", label: "ISO22000" },
        { value: "GMP", label: "GMP" },
        { value: "FSSC22000", label: "FSSC22000" },
        { value: "ECOCERT", label: "에코서트" },
        { value: "ORGANIC", label: "유기농인증" },
      ],
    };

    return NextResponse.json(metaData);
  } catch (error) {
    console.error("Filter Meta API Error:", error);
    return NextResponse.json({ message: "메타데이터 조회 실패" }, { status: 500 });
  }
}