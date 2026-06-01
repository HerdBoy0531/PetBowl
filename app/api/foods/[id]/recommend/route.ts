import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json(
      { message: "Invalid ID" },
      { status: 400 }
    );
  }

  try {
    const currentFood = await prisma.food.findUnique({
      where: { id },
      include: {
        proteins: true,
      },
    });

    if (!currentFood) {
      return NextResponse.json(
        { message: "Food not found" },
        { status: 404 }
      );
    }

    const primaryProtein =
      currentFood.proteins.find(
        (protein) => protein.isPrimary
      )?.proteinType;

    const recommendations =
      await prisma.food.findMany({
        where: {
          id: {
            not: id,
          },

          proteins: {
            some: {
              proteinType:
                primaryProtein,
            },
          },
        },

        take: 6,

        include: {
          proteins: true,
        },
      });

    const result = recommendations.map(
      (food) => ({
        id: food.id,
        nameKo: food.nameKo,
        brandEn: food.brandEn,
        animalType: food.animalType,
        lifeStage: food.lifeStage,
        kibbleSize: food.kibbleSize,

        mainProtein:
          food.proteins.find(
            (protein) => protein.isPrimary
          )?.proteinType ?? null,
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}