import Container from "typedi"
import { WorkoutGeneratorService } from "~/services/workoutGeneratorService"

describe('Should generate a workout', () => {

    const service = Container.get(WorkoutGeneratorService)

    it('Should generate a workout', async() => {
        const result = await service.getMovements('chest')
    })
})