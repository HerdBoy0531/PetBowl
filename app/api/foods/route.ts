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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // 페이지 분할
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);
  const skip = (page - 1) * limit;

  // sorting
  const sort = searchParams.get("sort");

  let orderBy: Prisma.FoodOrderByWithRelationInput;;

  if (sort === "name") {
    orderBy = { name: "asc" };
  } else if (sort === "brand") {
    orderBy = { brand: "asc" };
  } else {
    orderBy = { id: "desc" }; // default 최신순
  }

  // 상세 정보 검색
  const animalTypeParam = searchParams.get("animalType");
  const animalType = Object.values(AnimalType).find(
    (v) => v.toLowerCase() === animalTypeParam?.toLowerCase()
  );

  const lifeStageParam = searchParams.get("lifeStage");
  const lifeStage = Object.values(LifeStage).find(
    (v) => v.toLowerCase() === lifeStageParam?.toLowerCase()
  );

  const sizeCategory = searchParams.get("sizeCategory");
  const proteinParams = searchParams.get("protein");
  const proteins = proteinParams?.split(",");
  const search = searchParams.get("search");
  

  const where: Prisma.FoodWhereInput = {
      ...(animalType && { animalType }),
      ...(lifeStage && { lifeStage }),
      ...(sizeCategory && { sizeCategory }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { brand: { contains: search, mode: "insensitive" as const } },
        ],
      }),

      // ...(protein && {
      //   proteins: {
      //     some: {
      //       proteinType: protein,
      //       isPrimary: true,
      //     },
      //   },
      // }),
      ...(proteins && {
        proteins: {
          some: {
            proteinType: { in: proteins },
            isPrimary: true,
          },
        },
      }),
  }

  const total = await prisma.food.count({ where });

  // const foods = await prisma.food.findMany({
  //   where: {
  //     ...(animalType && { animalType }),
  //     ...(lifeStage && { lifeStage }),
  //     ...(sizeCategory && { sizeCategory }),
  //     ...(search && {
  //       OR: [
  //         { name: { contains: search, mode: "insensitive" } },
  //         { brand: { contains: search, mode: "insensitive" } },
  //       ],
  //     }),

  //     ...(protein && {
  //       proteins: {
  //         some: {
  //           proteinType: protein,
  //           isPrimary: true,
  //         },
  //       },
  //     }),
  //   },

  //   include: {
  //     proteins: {
  //       where: { isPrimary: true },
  //       select: { proteinType: true },
  //     },
  //   },
  // });

  const foods = await prisma.food.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    include: {
      proteins: {
        where: { isPrimary: true },
        select: { proteinType: true },
      }
    }
  })

  console.log("LifeStage enum:", Object.values(LifeStage));
  console.log("param:", lifeStageParam);

  const result = foods.map((food) => ({
    id: food.id,
    name: food.name,
    brand: food.brand,
    animalType: food.animalType,
    lifeStage: food.lifeStage,
    sizeCategory: food.sizeCategory,
    mainProtein: food.proteins.map(
      (p: { proteinType: string }) => p.proteinType
    ),
  }));

  return NextResponse.json({
    data: result,
    total,
    page,
    limit,
  });
}