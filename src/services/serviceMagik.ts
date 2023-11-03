import 'reflect-metadata'
import { Container } from 'typedi'
import { WorkoutGeneratorService } from './workoutGeneratorService'
import { MovementService } from './MovementSerice'

export const generatorSerivce = Container.get(WorkoutGeneratorService)
export const movementService = Container.get(MovementService)