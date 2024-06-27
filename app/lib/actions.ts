"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma-client";
import { revalidatePath } from "next/cache";

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

  try {
    const createdScorecards = await Promise.all(
      players.map(async (player: { id: number; name: string }) => {
        const validatedFields = ScorecardSchema.safeParse({
          score: scores[player.id].reduce(
            (sum: number, score: number) => sum + score,
            0,
          ),
          courseId: courseId,
          playerId: player.id,
        });
        if (!validatedFields.success) {
          return { error: "Error creating Scorecard." };
        }
        return await prisma.scorecard.create({
          data: {
            courseId: parseInt(courseId),
            playerId: player.id,
            score: scores[player.id].reduce(
              (sum: number, score: number) => sum + score,
              0,
            ),
            HoleScore: {
              create: scores[player.id].map((score: number, index: number) => ({
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
