import 'reflect-metadata'
import { Container } from 'typedi'
import { WorkoutGeneratorService } from './workoutGeneratorService'
import { MovementService } from './MovementService'
import { WorkoutService } from './WorkoutService'

export const generatorSerivce = Container.get(WorkoutGeneratorService)
export const movementService = Container.get(MovementService)
export const workoutService = Container.get(WorkoutService)