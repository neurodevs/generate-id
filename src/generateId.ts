import crypto from 'crypto'

export default function generateId(includeDashes = false) {
    const uuid = cryptoModule.randomUUID()
    return includeDashes ? uuid : uuid.replace(/-/g, '')
}

// For test doubles

export let cryptoModule = crypto

export function setCryptoModule(module: typeof crypto) {
    cryptoModule = module
}
