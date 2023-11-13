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
      include: {
        movements: true,
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
  getCurrentAssignments: trainerOnlyProcedure
    .input(
      z.object({
        clientId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const creatorId = ctx.session?.user.id;

      if (input.clientId) {
        return ctx.db.workoutUserMap.findMany({
          where: {
            clientId: {
              equals: input.clientId,
            },
            assignedByTrainerId: {
              equals: creatorId,
            },
          },
          include: {
            workout: true,
            client: true,
          },
        });
      }

      return ctx.db.workoutUserMap.findMany({
        where: {
          assignedByTrainerId: {
            equals: creatorId,
          },
        },
        include: {
          workout: true,
          client: true,
        },
      });
    }),
    deleteWorkout: trainerOnlyProcedure
    .input(
      z.object({
        workoutId: z.number(),
      }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.workout.delete({
        where: {
          id: input.workoutId,
        },
      });
    })
});
