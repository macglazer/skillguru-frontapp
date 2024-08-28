export type GetMentorAvailabilityParams = {
    from: Date,
    to: Date,
}

export type SlotDTO = {
    id: number,
    start: string,
    end: string,
    available: boolean
}

export type Slot = {
    id: number,
    title: string,
    start: Date,
    end: Date,
    available: boolean
}