import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AnimalType, LifeStage, Prisma } from "@prisma/client";


export async function POST(req: Request) {
  const body = await req.json();

  const food = await prisma.food.create({
    data: {
      name: body.name,
      brand: body.brand,
      animalType: body.animalType as AnimalType,
      lifeStage: body.lifeStage as LifeStage,
      sizeCategory: body.sizeCategory,
      isPrescription: body.isPrescription ?? false,
      country: body.country,
      sourceUrl: body.sourceUrl,
    },
  });

  return NextResponse.json(food);
}

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   // 페이지 분할
//   const page = Math.max(1, Number(searchParams.get("page")) || 1);
//   const limit = Math.max(1, Number(searchParams.get("limit")) || 10);
//   const skip = (page - 1) * limit;
//   const sort = searchParams.get("sort");

//   let orderBy: Prisma.FoodOrderByWithRelationInput;;

//   if (sort === "name") {
//     orderBy = { name: "asc" };
//   } else if (sort === "brand") {
//     orderBy = { brand: "asc" };
//   } else {
//     orderBy = { id: "desc" }; // default 최신순
//   }

//   // 상세 정보 검색
//   const animalTypeParam = searchParams.get("animalType");
//   const animalType = Object.values(AnimalType).find(
//     (v) => v.toLowerCase() === animalTypeParam?.toLowerCase()
//   );

//   const lifeStageParam = searchParams.get("lifeStage");
//   const lifeStage = Object.values(LifeStage).find(
//     (v) => v.toLowerCase() === lifeStageParam?.toLowerCase()
//   );

//   const sizeCategory = searchParams.get("sizeCategory");
//   const proteinParams = searchParams.get("protein");
//   const proteins = proteinParams?.split(",");
//   const search = searchParams.get("search");
  

//   const where: Prisma.FoodWhereInput = {
//       ...(animalType && { animalType }),
//       ...(lifeStage && { lifeStage }),
//       ...(sizeCategory && { sizeCategory }),
//       ...(search && {
//         OR: [
//           { name: { contains: search, mode: "insensitive" as const } },
//           { brand: { contains: search, mode: "insensitive" as const } },
//         ],
//       }),

//       // ...(protein && {
//       //   proteins: {
//       //     some: {
//       //       proteinType: protein,
//       //       isPrimary: true,
//       //     },
//       //   },
//       // }),
//       ...(proteins && {
//         proteins: {
//           some: {
//             proteinType: { in: proteins },
//             isPrimary: true,
//           },
//         },
//       }),
//   }

//   const total = await prisma.food.count({ where });

//   // const foods = await prisma.food.findMany({
//   //   where: {
//   //     ...(animalType && { animalType }),
//   //     ...(lifeStage && { lifeStage }),
//   //     ...(sizeCategory && { sizeCategory }),
//   //     ...(search && {
//   //       OR: [
//   //         { name: { contains: search, mode: "insensitive" } },
//   //         { brand: { contains: search, mode: "insensitive" } },
//   //       ],
//   //     }),

//   //     ...(protein && {
//   //       proteins: {
//   //         some: {
//   //           proteinType: protein,
//   //           isPrimary: true,
//   //         },
//   //       },
//   //     }),
//   //   },

//   //   include: {
//   //     proteins: {
//   //       where: { isPrimary: true },
//   //       select: { proteinType: true },
//   //     },
//   //   },
//   // });

//   const foods = await prisma.food.findMany({
//     where,
//     skip,
//     take: limit,
//     orderBy,
//     include: {
//       proteins: {
//         where: { isPrimary: true },
//         select: { proteinType: true },
//       }
//     }
//   })

//   // 유저가 검색어(search)를 넣었고, 검색된 사료가 존재한다면 로그를 쌓습니다.
//   if (search && foods.length > 0) {
//     await prisma.foodViewLog.createMany({
//       data: foods.map((f) => ({
//         foodId: f.id,
//         type: "SEARCH", // 검색 결과 노출 로그
//       })),
//     });
//   }

//   console.log("LifeStage enum:", Object.values(LifeStage));
//   console.log("param:", lifeStageParam);

//   const result = foods.map((food) => ({
//     id: food.id,
//     name: food.name,
//     brand: food.brand,
//     animalType: food.animalType,
//     lifeStage: food.lifeStage,
//     sizeCategory: food.sizeCategory,
//     mainProtein: food.proteins.map(
//       (p: { proteinType: string }) => p.proteinType
//     ),
//   }));

//   return NextResponse.json({
//     data: result,
//     total,
//     page,
//     limit,
//   });
// }

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // 페이지 분할 및 정렬
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);
  const skip = (page - 1) * limit;
  const sort = searchParams.get("sort");

  let orderBy: Prisma.FoodOrderByWithRelationInput;
  if (sort === "name") orderBy = { name: "asc" };
  else if (sort === "brand") orderBy = { brand: "asc" };
  else orderBy = { id: "desc" };

  // 💡 다중 검색 필터 조립 파이프라인 (Comma Separated Strings -> Arrays 대응)
  const search = searchParams.get("search");
  const brandParam = searchParams.get("brand");
  const animalTypeParam = searchParams.get("animalType");
  const lifeStageParam = searchParams.get("lifeStage");
  const sizeCategoryParam = searchParams.get("sizeCategory");
  const prescriptionParam = searchParams.get("isPrescription");
  const proteinParams = searchParams.get("protein");

  const where: Prisma.FoodWhereInput = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  // 1. 제조사 다중 필터 적용
  if (brandParam) {
    where.brand = { in: brandParam.split(",") };
  }

  // 2. 반려동물 축종 다중 필터 적용 (Enum 캐스팅)
  if (animalTypeParam) {
    where.animalType = { in: animalTypeParam.split(",") as AnimalType[] };
  }

  // 3. 생애주기 다중 필터 적용 (Enum 캐스팅)
  if (lifeStageParam) {
    where.lifeStage = { in: lifeStageParam.split(",") as LifeStage[] };
  }

  // 4. 크기 카테고리 다중 필터 적용
  if (sizeCategoryParam) {
    where.sizeCategory = { in: sizeCategoryParam.split(",") };
  }

  // 5. 사료종류(일반/처방) 다중 필터 적용 (String -> Boolean 변환)
if (prescriptionParam) {
    const booleans = prescriptionParam.split(",").map((v) => v === "true");
    
    // 💡 해결 포인트: 둘 다 체크(true, false)했으면 전체 조회가 되므로 필터를 적용하지 않고,
    // 오직 하나만 체크했을 때만 해당 Boolean 값을 직접 매칭(equals)해 줍니다.
    if (booleans.length === 1) {
      where.isPrescription = booleans[0]; // 또는 { equals: booleans[0] }
    }
  }

  // 6. 단백질 원료 다중 필터 적용 (기존 구조 유지)
  if (proteinParams) {
    const proteins = proteinParams.split(",");
    where.proteins = {
      some: {
        proteinType: { in: proteins },
        isPrimary: true,
      },
    };
  }

  try {
    const total = await prisma.food.count({ where });
    const foods = await prisma.food.findMany({
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
    });

    // 💡 검색로그 쌓기 (상세페이지 랭킹 집계용 인프라 보존)
    if (search && foods.length > 0) {
      await prisma.foodViewLog.createMany({
        data: foods.map((f) => ({ foodId: f.id, type: "SEARCH" })),
      });
    }

    const result = foods.map((food) => ({
      id: food.id,
      name: food.name,
      brand: food.brand,
      animalType: food.animalType,
      lifeStage: food.lifeStage,
      sizeCategory: food.sizeCategory,
      mainProtein: food.proteins.map((p) => p.proteinType),
    }));

    return NextResponse.json({ data: result, total, page, limit });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "조회 중 서버 에러 발생" }, { status: 500 });
  }
}