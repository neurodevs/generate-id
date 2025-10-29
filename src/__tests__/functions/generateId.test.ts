import AbstractModuleTest, { assert, test } from '@neurodevs/node-tdd'

import generateId, { setCryptoModule } from '../../functions/generateId.js'
import spyCrypto, {
    numCallsToRandomUUID,
    resetNumCallsToRandomUUID,
} from '../../testDoubles/spyCrypto.js'

export default class GenerateIdTest extends AbstractModuleTest {
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
    protected static async returnsUuidWithNoDashesByDefault() {
        const id = this.generateId()

        assert.doesNotInclude(id, '-', 'UUID should not have dashes!')
    }

    @test()
    protected static async providesOptionToIncludeDashes() {
        const id = this.generateId(true)

        assert.doesInclude(id, '-', 'UUID should have dashes when requested!')
    }

    private static setSpyCrypto() {
        setCryptoModule(spyCrypto as typeof import('crypto'))
        resetNumCallsToRandomUUID()
    }

    private static generateId(includeDashes?: boolean) {
        return generateId(includeDashes)
    }
}
