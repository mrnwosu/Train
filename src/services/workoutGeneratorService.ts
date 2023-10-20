import * as prompts from '../promptTemplates.json';
import { env } from '~/env.mjs';
import OpenAI from 'openai'
import _ from 'lodash';
import { Service } from 'typedi';


@Service()
export class WorkoutGeneratorService {
    
    async getMovements(majorBodyPart: string){
        const prompt = prompts.get15OfMajor.replace('{0}', majorBodyPart)
        const openai = new OpenAI({
            apiKey: env.OPEN_AI_API_KEY
        });
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[
                {
                    role: "user",
                    content: prompt
                }
            ]
        })

        const data = _.first(completion.choices)
        if(!data) return []
    }
}

type Movement = {
    catergoryName: string,
    targetMuscleGroups: string[],
    movementName: string,
    canHiit: boolean,
    literalMusclesAffected: string[],
    literalMusclesAffectedCommonNames: string[],
    averageCaloriesBurntAfterThirtySeconds: number,
}
