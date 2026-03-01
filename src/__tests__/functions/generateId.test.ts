import crypto from 'crypto'
import { assert, test } from '@neurodevs/node-tdd'

import generateId, { setCryptoModule } from '../../functions/generateId.js'
import spyCrypto, {
    numCallsToRandomUUID,
    resetNumCallsToRandomUUID,
} from '../../testDoubles/spyCrypto.js'
import AbstractPackageTest from '../AbstractPackageTest.js'

export default class GenerateIdTest extends AbstractPackageTest {
    protected static async beforeEach() {
        await super.beforeEach()

        this.setSpyCrypto()
    }

    @test()
    protected static async callsCryptoRandomUUID() {
        this.generateId()

        assert.isEqual(
            numCallsToRandomUUID,
            1,
            'Did not call crypto.randomUUID()!'
        )
    }

    @test()
    protected static async returnsIdWithNoDashesByDefault() {
        const id = this.generateId()

        assert.doesNotInclude(id, '-', 'Should not have dashes by default!')
    }

    @test()
    protected static async includesDashesWhenRequested() {
        const id = this.generateId(true)

        assert.doesInclude(id, '-', 'Should include dashes when requested!')
    }

    protected static generateId(includeDashes?: boolean) {
        return generateId(includeDashes)
    }

    protected static setSpyCrypto() {
        setCryptoModule(spyCrypto as typeof crypto)
        resetNumCallsToRandomUUID()
    }
}
