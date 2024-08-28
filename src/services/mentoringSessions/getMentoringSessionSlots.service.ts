import { CalendarSlot } from '@customTypes/booking'
import { GetMentoringSessionSlotsInput, GetMentoringSessionSlotsOutput } from './getMentoringSessionSlots.types'

export const getMentoringSessionSlots = async ({ mentorId } : GetMentoringSessionSlotsInput) : Promise<GetMentoringSessionSlotsOutput> => {
    const res = await fetch('/booking-slots.json')
    const data = await res.json()
    
    return {
        slots: data.slots as CalendarSlot[]
    }
}
