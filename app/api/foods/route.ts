import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AnimalType, LifeStage } from "@prisma/client";


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

  const animalTypeParam = searchParams.get("animalType");
  const animalType =
  animalTypeParam && Object.values(AnimalType).includes(animalTypeParam as AnimalType)
    ? (animalTypeParam as AnimalType)
    : undefined;
  const lifeStageParam = searchParams.get("lifeStage");
  const lifeStage =
  lifeStageParam &&
  Object.values(LifeStage).includes(lifeStageParam as LifeStage)
    ? (lifeStageParam as LifeStage)
    : undefined;
  const sizeCategory = searchParams.get("sizeCategory");
  const protein = searchParams.get("protein");
  const search = searchParams.get("search");

  const foods = await prisma.food.findMany({
    where: {
      ...(animalType && { animalType }),
      ...(lifeStage && { lifeStage }),
      ...(sizeCategory && { sizeCategory }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
        ],
      }),

      ...(protein && {
        proteins: {
          some: {
            proteinType: protein,
            isPrimary: true,
          },
        },
      }),
    },

    include: {
      proteins: {
        where: { isPrimary: true },
        select: { proteinType: true },
      },
    },
  });

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

  return NextResponse.json(result);
}