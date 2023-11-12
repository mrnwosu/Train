import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure, trainerOnlyProcedur } from "~/server/api/trpc";
import { generatorSerivce, movementService } from "~/services/serviceMagik";

export const movementRouter = createTRPCRouter({
  getMovements: protectedProcedure
    .input(
      z.object({
        targetMuscleGroups: z.string().optional(),
        searchQuery: z.string().optional(),
        onlyHitt: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const query: any = {};

      if (input.targetMuscleGroups) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        query.targetMuscleGroups = {
          contains: input.targetMuscleGroups,
        };
      }

      if (input.searchQuery) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        query.movementName = {
          contains: input.searchQuery,
          mode: "insensitive",
        };
      }

      if (input.onlyHitt) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        query.canHiit = {
          equals: true,
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      console.log({ query });

      return ctx.db.movement.findMany({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        where: query,
      });
    }),
  generateMovements: trainerOnlyProcedur
    .input(
      z.object({ majorBodyPart: z.string(), numberOfMovements: z.number() }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await generatorSerivce.getMovements(
        input.majorBodyPart,
        input.numberOfMovements,
      );

      console.log("result in routers", { result });
      await movementService.createMovements(result);
    }),
  createMovements: trainerOnlyProcedur
    .input(
      z.object({
        movements: z.array(
          z.object({
            categoryName: z.string(),
            targetMuscleGroups: z.string(),
            movementName: z.string(),
            canHiit: z.boolean(),
            literalMuscledAffected: z.array(z.string()),
            literalMusclesAffectedCommonName: z.array(z.string()),
            averageCaloriesBurntAfterThirtySeconds: z.number(),
          }),
        ),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.movement.createMany({ data: input.movements });
    }),
});
