// app/api/foods/ranking/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // period 종류: "weekly" (주간), "monthly" (월간), "total" (누적 / 기본값)
  const period = searchParams.get("period") || "total";

  try {
    let dateLimit = new Date();

    // 기간 분기 처리 계산
    if (period === "weekly") {
      dateLimit.setDate(dateLimit.getDate() - 7);
    } else if (period === "monthly") {
      dateLimit.setDate(dateLimit.getDate() - 30);
    } else {
      dateLimit = new Date(0); // 누적은 서비스 태초의 시간부터 집계
    }

    // 1. FoodViewLog에서 조건에 맞는 데이터를 그룹화하여 카운팅 연산
    const groupRows = await prisma.foodViewLog.groupBy({
      by: ["foodId"],
      where: {
        type: "VIEW", // 상세페이지 조회 기준 랭킹 정렬
        createdAt: {
          gte: dateLimit, // 설정한 기준일자보다 크거나 같은 데이터만
        },
      },
      _count: {
        foodId: true,
      },
      orderBy: {
        _count: {
          foodId: "desc", // 조회수 높은 순서대로
        },
      },
      take: 5, // 상위 5개 사료만 추출
    });

    // 2. 집계된 foodId 배열을 추출하여 실제 사료들의 세부 마스터 정보 매핑 조회
    const targetIds = groupRows.map((row) => row.foodId);

    const foods = await prisma.food.findMany({
      where: {
        id: { in: targetIds },
      },
      include: {
        proteins: {
          where: { isPrimary: true },
          select: { proteinType: true },
        },
      },
    });

    // 3. groupBy의 순서(순위)가 findMany 조회 시 섞이므로 원래 순위 배열대로 정렬 재조립
    const rankedResult = groupRows
      .map((row) => {
        const foodInfo = foods.find((f) => f.id === row.foodId);
        
        return {
          id: row.foodId,
          // ⭐️ 변경: 단일 name/brand 대신 Ko, En을 명확히 구분하여 전달 (메인 카드 정보 정립)
          nameKo: foodInfo?.nameKo || "알 수 없는 사료",
          nameEn: foodInfo?.nameEn || "Unknown Food",
          brandKo: foodInfo?.brandKo || "미지정 브랜드",
          brandEn: foodInfo?.brandEn || "Unknown Brand",
          animalType: foodInfo?.animalType,
          lifeStage: foodInfo?.lifeStage,
          
          // ⭐️ 추가: 메인 페이지 카드 컴포넌트 정보 정립을 위한 필수 메타데이터 수수료 추가
          price: foodInfo?.price || 0,
          kibbleSize: foodInfo?.kibbleSize || null,
          allergies: foodInfo?.allergies || [],
          certifications: foodInfo?.certifications || [],
          
          viewCount: row._count.foodId,
          mainProtein: foodInfo?.proteins.map((p) => p.proteinType) || [],
        };
      })
      .filter((item) => item.nameKo !== "알 수 없는 사료");

    return NextResponse.json({
      period,
      data: rankedResult,
    });
  } catch (error) {
    console.error("Ranking API Error:", error);
    return NextResponse.json({ message: "Ranking Server Error" }, { status: 500 });
  }
}