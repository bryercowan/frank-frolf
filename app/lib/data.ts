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
