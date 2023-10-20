import { get15OfMajor } from '~/promptTemplates.json';
import _ from 'lodash';
import { Service } from 'typedi';
import { OpenAIService } from '~/services/OpenAIService';
import { type Movement } from '@prisma/client';


@Service()
export class WorkoutGeneratorService{
    
    constructor(
        public openAiService: OpenAIService
    ){}
    
    async getMovements(majorBodyPart: string, workoutNumbers: number){
        if(!majorBodyPart) throw new Error('Major Body Part is required')

        console.log('Generating Workouts', majorBodyPart)
        const result = await this.openAiService.getOpenAIChatCompletion(get15OfMajor, [majorBodyPart, `${workoutNumbers}`])
        if(!result) return []
        return JSON.parse(result) as Movement[]
    }
}