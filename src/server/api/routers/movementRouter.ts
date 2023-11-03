import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generatorSerivce } from "~/services/serviceMagik";


export const movementRouter = createTRPCRouter({
  getMovements: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.movement.findMany();
  }),
  generateMovement: publicProcedure
    .input(
      z.object({ majorBodyPart: z.string(), numberOfMovements: z.number() })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await generatorSerivce.getMovements(
        input.majorBodyPart,
        input.numberOfMovements
      );
      return result;
    }),
  createMovements: publicProcedure
    .input(
      z.object({
        movements: z.array(
          z.object({
            categoryName: z.string(),
            targetMuscleGroup: z.string(),
            movementName: z.string(),
            catHiit: z.boolean(),
            literalMuscledAffected: z.array(z.string()),
            literalMusclesAffectedCommonName: z.array(z.string()),
            averageCaloriesBurntAfterThirtySeconds: z.number(),
          })
        ),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.movement.createMany({ data: input.movements });
    }),
});
