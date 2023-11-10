import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ id: z.string().length(25) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findFirst({ where: { id: input.id } });
    }),
  getUsers: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.user.findMany();
    console.log({result})
    return _.filter(result, (u) => u.id !== ctx.session?.user.id);
  }),
});
