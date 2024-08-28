import { CalendarSlot } from "@customTypes/booking"

export type GetMentoringSessionSlotsInput = {
    mentorId: string
    serviceId: string
}

export type GetMentoringSessionSlotsOutput = {
    slots: CalendarSlot[]
}
