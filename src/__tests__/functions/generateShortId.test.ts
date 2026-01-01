import crypto from 'crypto'
import AbstractModuleTest, { assert, test } from '@neurodevs/node-tdd'

import generateShortId, {
    setCryptoModule,
} from '../../functions/generateShortId.js'
import spyCrypto, {
    numCallsToRandomUUID,
    resetNumCallsToRandomUUID,
} from '../../testDoubles/spyCrypto.js'

export default class GenerateShortIdTest extends AbstractModuleTest {
    protected static async beforeEach() {
        await super.beforeEach()

        this.setSpyCrypto()
    }

    @test()
    protected static async callsCryptoRandomUUID() {
        this.generateShortId()

        assert.isEqual(
            numCallsToRandomUUID,
            1,
            'Did not call crypto.randomUUID()!'
        )
    }

    @test()
    protected static async returnsUuidWithNoDashes() {
        const id = this.generateShortId()

        assert.doesNotInclude(id, '-', 'Short ID should not have dashes!')
    }

    @test()
    protected static async returnsIdWithLengthSix() {
        const id = this.generateShortId()

        assert.isEqual(id.length, 6, 'Short ID should be of length 6!')
    }

    protected static generateShortId() {
        return generateShortId()
    }

    protected static setSpyCrypto() {
        setCryptoModule(spyCrypto as typeof crypto)
        resetNumCallsToRandomUUID()
    }
}
