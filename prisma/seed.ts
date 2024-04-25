import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const newCourse = await prisma.course.create({
    data: {
      name: "Example Course",
      numHoles: 18,
    },
  });
  console.log(`Created new course with id: ${newCourse.id}`);
  const newPlayer = await prisma.player.create({
    data: {
      name: "Alice",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
