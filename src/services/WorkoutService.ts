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

  async getWorkoutMapsForClient(userId: string) {
    return await this.client.workoutUserMap.findMany({
      where: {
        clientId: {
          equals: userId,
        }
      },
      orderBy: {
        dayOfWeek: 'asc'
      }
    });
  }

  async getNextWorkoutForClient(userId: string) {
    const workoutMaps = await this.getWorkoutMapsForClient(userId);
    if (workoutMaps.length === 0) {
      return null;
    }

    const today = new Date().getDay();

    if(workoutMaps.filter(m => m.dayOfWeek >= today)){
      return workoutMaps.filter(m => m.dayOfWeek >= today)[0];
    }
    else{
      return workoutMaps[0];
    }
  }
}
