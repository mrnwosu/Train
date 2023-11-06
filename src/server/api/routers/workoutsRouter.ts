import { PrismaClient } from "@prisma/client";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const workoutRouter = createTRPCRouter({
  getWorkouts: publicProcedure.query(async ({ ctx }) => {
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
});
