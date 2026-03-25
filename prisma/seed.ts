import { PrismaClient } from '@prisma/client'
import { foods } from './seeds'

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 seeding start")

  await prisma.food.deleteMany()

  for (const food of foods) {
    await prisma.food.create({ data: food })
  }

  console.log("✅ seeding done")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })