import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import generateId, { setCryptoModule } from '../generateId'
import spyCrypto, {
    numCallsToRandomUUID,
    resetNumCallsToRandomUUID,
} from '../testDoubles/spyCrypto'

export default class GenerateIdTest extends AbstractSpruceTest {
    protected static async beforeEach() {
        await super.beforeEach()

        this.setSpyCrypto()
    }

    private static setSpyCrypto() {
        setCryptoModule(spyCrypto as typeof import('crypto'))
        resetNumCallsToRandomUUID()
    }

    @test()
    protected static async callsCryptoRandomUUID() {
        generateId()

        assert.isEqual(
            numCallsToRandomUUID,
            1,
            'Did not call crypto.randomUUID()!'
        )
    }
}
