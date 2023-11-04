import { type Movement } from '@prisma/client'
import { assert } from 'chai'
import _ from 'lodash'
import { generatorSerivce, movementService  } from '~/services/serviceMagik'

describe('Should generate a workout', () => {


    it('Should generate a workout', async() => {
        const parts = ['abs', 'chest', 'back', 'shoulders', 'arms', 'legs']
        const allMovements: Movement[] = []

        _.each(parts, async(part) => {
            const movements = await generatorSerivce.getMovements(part, 15)
            allMovements.push(...movements)
        })

        assert.isNotEmpty(allMovements)

        const result = await movementService.createMovements(allMovements)
        assert.isNotEmpty(result)
    })
})