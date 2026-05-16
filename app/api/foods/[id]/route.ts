// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   context: { params: Promise<{ id: string }> } // 👈 핵심
// ) {
//   const params = await context.params; // 👈 반드시 await

//   const id = Number(params.id);

//   if (isNaN(id)) {
//     return NextResponse.json(
//       { message: "Invalid ID" },
//       { status: 400 }
//     );
//   }

//   try {
//     const food = await prisma.food.findUnique({
//       where: { id },
//       include: {
//         analysis: true,
//         ingredients: true,
//         proteins: true,
//         carbohydrates: true,
//         vegetables: true,
//       },
//     });

//     if (!food) {
//       return NextResponse.json(
//         { message: "Food not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(food);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Server Error" },
//       { status: 500 }
//     );
//   }
// }


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const food = await prisma.food.findUnique({
      where: { id },
      include: {
        analysis: true,
        ingredients: true,
        proteins: true,
        carbohydrates: true,
        vegetables: true,
      },
    });

    if (!food) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }

    // 💡 미니멀 오가닉 포인트: 상세 조회가 성공하면 비동기로 조회 로그를 1개 쌓습니다.
    await prisma.foodViewLog.create({
      data: {
        foodId: id,
        type: "VIEW"
      }
    });

    return NextResponse.json(food);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}