import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 데이터 조회 (null 제거 및 정렬 강화)
    const [distinctBrands, distinctSizes] = await Promise.all([
      prisma.food.findMany({
        distinct: ["brandKo", "brandEn"],
        select: { brandKo: true, brandEn: true },
        where: {
          brandKo: {
            not: "",
          },
          brandEn: {
            not: "",
          },
        },
        orderBy: { brandKo: "asc" },
      }),
      prisma.food.findMany({
        distinct: ["sizeCategory"],
        select: { sizeCategory: true },
        where: {
          sizeCategory: { not: "" }
        },
        orderBy: { sizeCategory: "asc" },
      }),
    ]);

    // 메타데이터 구성
    const metaData = {
      brands: distinctBrands.map((b) => ({
        ko: b.brandKo,
        en: b.brandEn,
      })),
      
      animals: [
        { value: "dog", label: "강아지" }, // DB Enum이 대문자인지 확인 필요
        { value: "cat", label: "고양이" },
      ],
      
      // prescription은 boolean으로 변환해서 처리하는 것이 더 명확함
      types: [
        { value: "false", label: "일반식" },
        { value: "true", label: "처방식" },
      ],

      sizes: distinctSizes.map((s) => s.sizeCategory),

      proteins: [
        { value: "chicken", label:"닭고기"},
        { value: "duck", label:"오리"},
        { value: "salmon", label:"연어"},
        { value: "beef", label:"소고기"},
        { value: "lamb", label:"양고기"},
      ],

      stages: [
        { value: "puppy", label: "퍼피" },
        { value: "adult", label: "어덜트" },
        { value: "senior", label: "시니어" },
        { value: "all", label: "전연령" },
      ],

      allergies: [
        { value: "HYDROLYZED", label: "가수분해" },
        { value: "GLUTEN_FREE", label: "글루텐프리" },
        { value: "GRAIN_FREE", label: "그레인프리" },
        { value: "LID", label: "LID (제한된 원료)" },
      ],

      certifications: [
        { value: "AAFCO", label: "AAFCO" },
        { value: "FEDIAF", label: "FEDIAF" },
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