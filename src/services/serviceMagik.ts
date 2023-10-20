import 'reflect-metadata'
import { Container } from 'typedi'
import { OpenAIService } from './OpenAIService'
import { WorkoutGeneratorService } from './workoutGeneratorService'
import { MovementService } from './MovementSerice'

export const services = {
    workoutGeneratorService: Container.get(WorkoutGeneratorService),
    openAiService: Container.get(OpenAIService),
    movementService: Container.get(MovementService)
}