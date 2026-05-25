// app/api/foods/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AnimalType, LifeStage, Allergy, Certification, Prisma } from "@prisma/client";

/**
 * 🆕 사료 데이터 추가 (POST)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const food = await prisma.food.create({
      data: {
        nameKo: body.nameKo,
        nameEn: body.nameEn,
        brandKo: body.brandKo,
        brandEn: body.brandEn,
        animalType: body.animalType as AnimalType,
        lifeStage: body.lifeStage as LifeStage,
        sizeCategory: body.sizeCategory,
        isPrescription: body.isPrescription ?? false,
        price: Number(body.price) || 0,
        kibbleSize: body.kibbleSize ? Number(body.kibbleSize) : null,
        allergies: (body.allergies || []) as Allergy[],
        certifications: (body.certifications || []) as Certification[],
        country: body.country,
        sourceUrl: body.sourceUrl,
      },
    });

    return NextResponse.json(food);
  } catch (error) {
    console.error("Food Create Error:", error);
    return NextResponse.json({ message: "사료 데이터 생성 실패" }, { status: 500 });
  }
}

/**
 * 🔍 사료 다중 필터 및 통합 검색 (GET)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // 1. 페이지네이션 변수 파싱
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);
  const skip = (page - 1) * limit;
  const sort = searchParams.get("sort");

  // 2. 이름순, 가격순 정렬 조건 처리 (인기순은 프론트에서 랭킹 API 연동 또는 추후 로그 연동)
  let orderBy: Prisma.FoodOrderByWithRelationInput;
  if (sort === "name") {
    orderBy = { nameKo: "asc" }; // 가나다 이름순 정렬
  } else if (sort === "price") {
    orderBy = { price: "asc" };  // 최저가 가격순 정렬
  } else {
    orderBy = { id: "desc" };    // 기본 최신 등록순
  }

  // 3. 필터 파라미터 수집
  const search = searchParams.get("search");
  const brandParam = searchParams.get("brand");
  const animalTypeParam = searchParams.get("animalType");
  const lifeStageParam = searchParams.get("lifeStage");
  const sizeCategoryParam = searchParams.get("sizeCategory");
  const prescriptionParam = searchParams.get("isPrescription");
  const kibbleSizeParam = searchParams.get("kibbleSize"); // 숫자 기반
  const allergiesParam = searchParams.get("allergies");   // Enum 배열 대응
  const certificationsParam = searchParams.get("certifications"); // Enum 배열 대응

  // 4. Prisma Where 조건 뼈대 빌드업
  const where: Prisma.FoodWhereInput = {};

  // 💡 한글/영어 이름 및 브랜드 혼용 통합 검색 고도화
  if (search) {
    where.OR = [
      { nameKo: { contains: search, mode: "insensitive" } },
      { nameEn: { contains: search, mode: "insensitive" } },
      { brandKo: { contains: search, mode: "insensitive" } },
      { brandEn: { contains: search, mode: "insensitive" } },
    ];
  }

  // 제조사(브랜드 한글명 기준) 다중 필터
  if (brandParam) {
    where.brandKo = { in: brandParam.split(",") };
  }

  // 축종 다중 필터
  if (animalTypeParam) {
    where.animalType = { in: animalTypeParam.split(",") as AnimalType[] };
  }

  // 생애주기 다중 필터
  if (lifeStageParam) {
    where.lifeStage = { in: lifeStageParam.split(",") as LifeStage[] };
  }

  // 크기 카테고리 다중 필터
  if (sizeCategoryParam) {
    where.sizeCategory = { in: sizeCategoryParam.split(",") };
  }

  // 처방식 여부 필터
  if (prescriptionParam) {
    const booleans = prescriptionParam.split(",").map((v) => v === "true");
    if (booleans.length === 1) {
      where.isPrescription = booleans[0];
    }
  }

  // ⭐️ 신규 추가: 키블 크기 다중 필터 (유저가 선택한 mm 크기 배열 일치 검색)
  if (kibbleSizeParam) {
    const sizes = kibbleSizeParam.split(",").map(Number);
    where.kibbleSize = { in: sizes };
  }

  // ⭐️ 신규 추가: 알레르기 제어 Enum 다중 배열 검색 (AND 조건 처리: 선택한 알러지 케어를 전부 만족하는 제품)
  if (allergiesParam) {
    const allergyList = allergiesParam.split(",") as Allergy[];
    where.allergies = {
      hasEvery: allergyList, 
    };
  }

  // ⭐️ 신규 추가: 인증마크 Enum 다중 배열 검색 (AND 조건 처리: 선택한 인증을 전부 획득한 제품)
  if (certificationsParam) {
    const certList = certificationsParam.split(",") as Certification[];
    where.certifications = {
      hasEvery: certList,
    };
  }

  try {
    // 5. DB 동시 총 개수 집계 및 조회 데이터 Fetch
    const [total, foods] = await prisma.$transaction([
      prisma.food.count({ where }),
      prisma.food.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          proteins: {
            where: { isPrimary: true },
            select: { proteinType: true },
          },
        },
      }),
    ]);

    // 6. 상세페이지 랭킹 집계용 실시간 인프라 로그 축적
    if (search && foods.length > 0) {
      await prisma.foodViewLog.createMany({
        data: foods.map((f) => ({ foodId: f.id, type: "SEARCH" })),
      });
    }

    // 7. 정립된 Search Page 결과 카드 규격에 맞춰 결과 가공 전송
    const result = foods.map((food) => ({
      id: food.id,
      nameKo: food.nameKo,
      nameEn: food.nameEn,
      brandKo: food.brandKo,
      brandEn: food.brandEn,
      animalType: food.animalType,
      lifeStage: food.lifeStage,
      sizeCategory: food.sizeCategory,
      price: food.price,
      kibbleSize: food.kibbleSize,
      allergies: food.allergies,
      certifications: food.certifications,
      mainProtein: food.proteins.map((p) => p.proteinType),
    }));

    return NextResponse.json({ data: result, total, page, limit });
  } catch (error) {
    console.error("Food Grid Query API Error:", error);
    return NextResponse.json({ message: "조회 중 서버 에러 발생" }, { status: 500 });
  }
}