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
    if (!id) {
      throw new Error("No ID provided");
    }
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    });
    if (!course) throw new Error("Failed to fetch course");
    return course;
  } catch (e) {
    console.log("Database Error:", e);
    throw new Error("Failed to fetch course");
  }
}

export async function fetchPlayers() {
  try {
    const players = await prisma.player.findMany();
    if (!players) throw new Error("Failed to fetch players");
    return players;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to fetch players");
  }
}

export async function fetchPlayerById(id: number) {
  try {
    if (!id) {
      throw new Error("No ID provided");
    }
    const player = await prisma.player.findUnique({
      where: {
        id,
      },
    });
    if (!player) throw new Error("Failed to fetch player");
    return player;
  } catch (e) {
    console.log("Database Error:", e);
    throw new Error("Failed to fetch player");
  }
}
