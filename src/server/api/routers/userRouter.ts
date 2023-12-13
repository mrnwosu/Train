import _ from "lodash";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {

      if(['none', '', 'undefined'].includes(input.id)){
        return null;
      }

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
