import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchCourses() {
  try {
    const courses = await prisma.course.findMany();
    if (!courses) throw new Error("Failed to fetch courses");
    return courses;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to fetch courses");
  }
}

export async function fetchCourseById(id: number) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    });
    if (!course) throw new Error("Failed to fetch course");
    return course;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to fetch course");
  }
}

export async function fetchPlayers() {
  try {
    const players = await prisma.player.findMany();
    if (!players) throw new Error("Failed to fetch courses");
    return players;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to fetch courses");
  }
}
