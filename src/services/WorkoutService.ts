import { PrismaClient, type Workout } from "@prisma/client";
import { Service } from "typedi";


@Service()
export class WorkoutService {
  client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }

  async getWorkout(id: number) {
    return await this.client.workout.findFirst({ where: { id: id } });
  }

  async getAllWorkouts() {
    return await this.client.workout.findMany();
  }

  async createWorkout(workout: Workout) {
    return await this.client.workout.create({ data: workout });
  }
}
