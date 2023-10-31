import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ id: z.string().length(25) }))
    .query(async({ ctx, input }) => {
      return ctx.db.user.findFirst({ where: { id: input.id } });
    }),
});
