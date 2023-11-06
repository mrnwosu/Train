import { env } from '~/env.mjs';
import OpenAI from 'openai'
import _ from 'lodash';
import { Service } from 'typedi';
import { dumpToFileForDev } from '~/utils/helpers';


@Service()
export class OpenAIService {
    async getOpenAIChatCompletion(prompt: string, inputs: string[]){
        console.log('Making OpenAI Request for prompt', prompt.substring(0, 15), '...')

        const openai = new OpenAI({
            apiKey: env.OPEN_AI_API_KEY
        });

        for(let i = 0; i < inputs.length; i++){
            prompt = prompt.replace(`{${i}}`, inputs[i] ?? "")
        }
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[
                {
                    role: "user",
                    content: prompt
                }
            ]
        })

        const choice = _.first(completion.choices)
        const content = choice?.message?.content
        dumpToFileForDev('openai', completion)
        return choice?.message?.content
    }
}