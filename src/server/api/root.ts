import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/userRouter";
import { workoutRouter } from "./routers/workoutsRouter";
import { movementRouter } from "./routers/movementRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  workout: workoutRouter,
  movement: movementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
