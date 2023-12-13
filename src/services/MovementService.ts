import { type Movement, PrismaClient } from "@prisma/client";
import _ from "lodash";
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

  async getMovementsByMajorBodyPart(targetMuscleGroups: string) {
    return await this.client.movement.findMany({
      where: { targetMuscleGroups },
    });
  }

  async createMovement(movement: Movement) {
    return await this.client.movement.create({ data: movement });
  }

  async createMovements(movements: Movement[]) {
    const targetMuscleGroups = _.uniq(_.map(movements, "targetMuscleGroups"));

    console.log("targetMuscleGroups", {targetMuscleGroups});
    const allWorkouts = await this.client.movement.findMany({
      where: {
        targetMuscleGroups: {
          in: targetMuscleGroups,
        },
      },
      select: {
        movementName: true,
      },
    });

    const existingMovements = _.map(allWorkouts, "movementName");
    const filteredMovements = _.filter(
      movements,
      (movement) => !existingMovements.includes(movement.movementName),
    );

    return await this.client.movement.createMany({ data: filteredMovements });
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
    return await this.client.movement.findMany({ where: { canHiit: true } });
  }

  async getMyMuscleAffeected(muscle: string) {
    return await this.client.movement.findMany({
      where: { literalMusclesAffected: { has: muscle } },
    });
  }
}
