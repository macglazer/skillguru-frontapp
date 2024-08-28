export type ReactSelectOptionType = {
    value: string, label: string
}

export const sessionDurationOptions : ReactSelectOptionType[] = [
    30, 45, 60, 90, 120, 150, 180
].map((value) => ({ value: String(value), label: String(value) }))

export const responseTimeOptions : ReactSelectOptionType[] = [
    12, 18, 24, 36, 48, 72, 96, 120
].map((value) => ({ value: String(value), label: String(value)+'h' }))
