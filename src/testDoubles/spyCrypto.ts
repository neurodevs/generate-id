import crypto from 'crypto'

export let numCallsToRandomUUID = 0

export function resetNumCallsToRandomUUID() {
    numCallsToRandomUUID = 0
}

const spyCrypto = {
    randomUUID() {
        numCallsToRandomUUID++
        return crypto.randomUUID()
    },
}

export default spyCrypto
