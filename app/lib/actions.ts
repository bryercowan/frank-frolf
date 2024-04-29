"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  prevState: string | undefined,
  formData: FormData,
) {
  const validatedFields = PlayerSchema.safeParse({
    name: formData.get("playerName"),
  });
  if (!validatedFields.success) {
    return "Error creating player.";
  }
  await prisma.player.create({
    data: {
      name: validatedFields.data.name,
    },
  });
}

export async function createCourse(
  prevState: string | undefined,
  formData: FormData,
) {
  const validatedFields = CourseSchema.safeParse({
    name: formData.get("name"),
    numHoles: Number(formData.get("numHoles")),
  });
  if (!validatedFields.success) {
    return "Error creating Course.";
  }
  try {
    await prisma.course.create({
      data: {
        name: validatedFields.data.name,
        numHoles: validatedFields.data.numHoles,
      },
    });
  } catch (e) {
    console.log(e);
    return "Error: Database failed creating Course";
  }
}
