"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { Player, Scorecard } from "@prisma/client";
import fs from "fs";
import path from "path";

const PlayerSchema: z.ZodSchema<any> = z.lazy(() => PlayerActualSchema);
const CourseSchema: z.ZodSchema<any> = z.lazy(() =>
  CourseActualSchema.omit({ id: true, scorecards: true }),
);
const ScorecardSchema: z.ZodSchema<any> = z.lazy(() => ScorecardActualSchema);
const HoleScoreSchema: z.ZodSchema<any> = z.lazy(() => HoleScoreActualSchema);

// Define the actual schemas
const PlayerActualSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  scorecards: z.array(ScorecardSchema).optional(),
});

const CourseActualSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  numHoles: z.number(),
  scorecards: z.array(ScorecardSchema).optional(),
});

const ScorecardActualSchema = z.object({
  id: z.number().optional(),
  score: z.number(),
  createdAt: z.date().optional(),
  course: CourseSchema,
  courseName: z.string(),
  courseId: z.number(),
  player: PlayerSchema,
  playerId: z.number(),
  holeScores: z.array(HoleScoreSchema).optional(),
});

const HoleScoreActualSchema = z.object({
  id: z.number().optional(),
  holeNumber: z.number(),
  score: z.number(),
  scorecard: ScorecardSchema.optional(),
  scorecardId: z.number(),
});

const CreateCourse = CourseActualSchema.omit({ id: true, scorecards: true });

export async function exportScorecardsToCsv(
  scorecards: Scorecard[],
  players: Player[],
): Promise<string> {
  const header = "Player,Course,Date,Score\n";
  const csvContent = scorecards.reduce((acc, scorecard) => {
    const player = players.find((player) => player.id === scorecard.playerId);
    if (!player) {
      return acc;
    }
    return (
      acc +
      `${player.name},${scorecard.courseName},${scorecard.createdAt.toISOString()},${scorecard.score}\n`
    );
  }, header);

  const fileName = "scorecards.csv";
  const filePath = path.join(process.cwd(), "public", fileName);

  await fs.promises.writeFile(filePath, csvContent, "utf-8");

  const t = await fs.promises.readFile("public/scorecards.csv", "utf-8");

  return `/${fileName}`;
}

export async function createPlayer(
  course_id: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = PlayerSchema.safeParse({
    name: formData.get("playerName"),
  });
  if (!validatedFields.success) {
    return {
      error: "Error creating Player.",
    };
  }
  try {
    const player = await prisma.player.create({
      data: {
        name: validatedFields.data.name,
      },
    });
    if (player) {
      revalidatePath(`/courses/${course_id}`);
      return { player, success: true };
    }
  } catch (e: any) {
    if (e.code && e.code === "P2002") {
      return { error: "Error: A course with this name already exists." };
    } else {
      console.log(e);
      return { error: "Error: Database failed creating Course" };
    }
  }
}

export async function createScorecard(courseId: string, formData: FormData) {
  const players = JSON.parse(formData.get("players") as string);
  const scores = JSON.parse(formData.get("scores") as string);

  const course = await prisma.course.findUnique({
    where: {
      id: parseInt(courseId),
    },
  });

  if (!course) {
    return { error: "Error: Course not found." };
  }

  try {
    console.log(
      "Creating scorecards for course",
      courseId,
      "with players",
      players,
    );
    const createdScorecards = await Promise.all(
      players.map(async (passedPlayer: { id: number; name: string }) => {
        const playerScores = scores[passedPlayer.id];
        const totalScore: number = playerScores.reduce(
          (sum: number, score: number) => sum + score,
          0,
        );
        const player = await prisma.player.findUnique({
          where: {
            id: passedPlayer.id,
          },
        });
        if (!player) {
          return { error: "Error: Player not found." };
        }

        const validatedFields = ScorecardSchema.safeParse({
          score: totalScore,
          course: course,
          player: player,
          courseName: course.name,
          courseId: parseInt(courseId),
          playerId: player.id,
        });

        if (!validatedFields.success) {
          return { error: "Error creating Scorecard." };
        }

        console.log(
          "Creating scorecard for player",
          player.id,
          "on course",
          courseId,
        );

        return prisma.scorecard.create({
          data: {
            courseId: parseInt(courseId),
            playerId: player.id,
            courseName: course.name,
            score: totalScore,
            HoleScore: {
              create: playerScores.map((score: number, index: number) => ({
                holeNumber: index + 1,
                score: score,
              })),
            },
          },
          include: {
            HoleScore: true,
          },
        });
      }),
    );

    revalidatePath(`/courses/${courseId}`);
    const failedScorecards = createdScorecards.filter((scorecard) =>
      Boolean(scorecard.error),
    );
    if (failedScorecards.length > 0) {
      return { error: "Error: Failed to create scorecards" };
    }
    return { scorecards: createdScorecards, success: true };
  } catch (e: any) {
    console.error(e);
    return { error: "Error: Failed to create scorecards" };
  }
}

export async function createCourse(prevState: any, formData: FormData) {
  const validatedFields = CourseSchema.safeParse({
    name: formData.get("name"),
    numHoles: Number(formData.get("numHoles")),
  });
  if (!validatedFields.success) {
    return { error: "Error creating Course." };
  }
  try {
    const course = await prisma.course.create({
      data: {
        name: validatedFields.data.name,
        numHoles: validatedFields.data.numHoles,
      },
    });
    if (course) {
      revalidatePath(`/`);
      return { course, success: true };
    }
  } catch (e: any) {
    if (e.code && e.code === "P2002") {
      return { error: "Error: A course with this name already exists." };
    } else {
      console.log(e);
      return { error: "Error: Database failed creating Course" };
    }
  }
}
