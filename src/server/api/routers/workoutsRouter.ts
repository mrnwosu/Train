import { Movement, PrismaClient, Workout } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  trainerOnlyProcedur as trainerOnlyProcedure,
} from "~/server/api/trpc";

export const workoutRouter = createTRPCRouter({
  getWorkouts: protectedProcedure.query(async ({ ctx }) => {
    const creator = ctx.session?.user.id;
    if (!creator) {
      return [];
    }
    return ctx.db.workout.findMany({
      where: {
        creator: {
          id: {
            equals: creator,
          },
        },
      },
    });
  }),
  createWorkout: trainerOnlyProcedure
    .input(
      z.object({
        workoutName: z.string(),
        movements: z.array(
          z.object({
            categoryName: z.string(),
            targetMuscleGroups: z.string(),
            movementName: z.string(),
            canHiit: z.boolean(),
            literalMusclesAffected: z.array(z.string()),
            literalMusclesAffectedCommonNames: z.array(z.string()),
            averageCaloriesBurntAfterThirtySeconds: z.number(),
          }),
        ),
        sets: z.number(),
        secondsBetweenSets: z.number().optional(),
        secondsDuringReps: z.number().optional(),
        notes: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session?.user.id) {
        const result = await ctx.db.workout.create({
          data: {
            workoutName: input.workoutName,
            sets: input.sets,
            secondsBetweenSets: input.secondsBetweenSets,
            secondsDuringReps: input.secondsDuringReps,
            notes: input.notes,
            creator: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            movements: {
              create: input.movements,
            },
          },
        });
      }
    }),
});
