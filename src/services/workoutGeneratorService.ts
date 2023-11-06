import { getNMajorMovements } from "~/promptTemplates.json";
import _ from "lodash";
import { Service } from "typedi";
import { OpenAIService } from "~/services/OpenAIService";
import { type Movement } from "@prisma/client";

@Service()
export class WorkoutGeneratorService {
  constructor(private openAiService: OpenAIService) {}

  async getMovements(majorBodyPart: string, workoutNumbers: number) {
    if (!majorBodyPart) throw new Error("Major Body Part is required");

    console.log("Generating Workouts", majorBodyPart);
    const result = await this.openAiService.getOpenAIChatCompletion(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      getNMajorMovements,
      [`${workoutNumbers}`, majorBodyPart],
    );
    if (!result) return [];

    const data = JSON.parse(result) as MovementResult;
    return data.movements;
  }
}

type MovementResult = {
  movements: Movement[];
};