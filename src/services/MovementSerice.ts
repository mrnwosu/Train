import { Movement, PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class MovementService {
  client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }

  async getMovement(id: number) {
    return await this.client.movement.findFirst({ where: { id: id } });
  }

  async getMovementsByCategory(categoryName: string) {
    return await this.client.movement.findMany({ where: { categoryName } });
  }

  async getMovementsByMajorBodyPart(targetMuscleGroup: string) {
    return await this.client.movement.findMany({
      where: { targetMuscleGroup },
    });
  }

  async createMovement(movement: Movement) {
    return await this.client.movement.create({ data: movement });
  }

  async createMovements(movements: Movement[]) {
    return await this.client.movement.createMany({ data: movements });
  }

  async updateMovement(id: number, movement: Movement) {
    return await this.client.movement.update({ where: { id }, data: movement });
  }

  async deleteMovement(id: number) {
    return await this.client.movement.delete({ where: { id } });
  }

  async getMovements() {
    return await this.client.movement.findMany();
  }

  async getHiitWorkouts() {
    return await this.client.movement.findMany({ where: { catHiit: true } });
  }

  async getMyMuscleAffeected(muscle: string) {
    return await this.client.movement.findMany({
      where: { literalMuscledAffected: { has: muscle } },
    });
  }
}
