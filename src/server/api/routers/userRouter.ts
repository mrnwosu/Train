import _ from "lodash";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ id: z.string().length(25) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findFirst({ where: { id: input.id } });
    }),
  getUsers: protectedProcedure
  .input(z.object({ role: z.enum(["TRAINER", "CLIENT"]).optional() }))
  .query(async ({ input, ctx }) => {

    if(input.role){
      const result = await ctx.db.user.findMany({
        where: {
          role: input.role
        }
      });
      return result;
    }

    const result = await ctx.db.user.findMany();
    console.log({result})
    return _.filter(result, (u) => u.id !== ctx.session?.user.id);
  }),
});
