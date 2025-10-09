import crypto from 'crypto'

export default function generateId() {
    return cryptoModule.randomUUID()
}

// For test doubles

export let cryptoModule = crypto

export function setCryptoModule(module: typeof crypto) {
    cryptoModule = module
}
