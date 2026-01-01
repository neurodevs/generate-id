import crypto from 'crypto'

export default function generateShortId() {
    const uuid = cryptoModule.randomUUID()
    return uuid.replace(/-/g, '').slice(0, 6)
}

// For test doubles

export let cryptoModule = crypto

export function setCryptoModule(module: typeof crypto) {
    cryptoModule = module
}
