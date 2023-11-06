import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generatorSerivce, movementService } from "~/services/serviceMagik";

export const movementRouter = createTRPCRouter({
  getMovements: publicProcedure
    .input(z.object({ targetMuscleGroups: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (!input.targetMuscleGroups || input.targetMuscleGroups === "All") {
        return ctx.db.movement.findMany();
      }
      else{
        return ctx.db.movement.findMany({
          where: {
            targetMuscleGroups: {
              contains: input.targetMuscleGroups,
            },
          },
        });
      }
    }),
  generateMovements: publicProcedure
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
  createMovements: publicProcedure
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
