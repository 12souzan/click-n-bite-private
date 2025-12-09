export const basePrice = 15

export const annualDiscount = 0.2

export const annualPrice = Math.round(basePrice * 12 * (1 - annualDiscount))
