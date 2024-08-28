import {
    GetMentorAvailabilityParams,
    Slot,
    SlotDTO
} from "@services/mentoringSessions/getMentorAvailabilityByMeetingId.types";
import {format} from "date-fns";
import axios from "axios";


const getMock = (): Promise<SlotDTO[]> => new Promise((res) => {

    const mock = [
        {
            "id": 12441,
            "start": "2024-05-21T16:30:00",
            "end": "2024-05-21T17:30:00",
            "available": true
        },
        {
            "id": 1231,
            "start": "2024-05-29T15:30:00",
            "end": "2024-05-29T16:30:00",
            "available": true
        },
        {
            "id": 1211,
            "start": "2024-05-28T16:30:00",
            "end": "2024-05-28T17:30:00",
            "available": true
        },
        {
            "id": 121,
            "start": "2024-05-29T16:30:00",
            "end": "2024-05-29T17:30:00",
            "available": true
        }
    ];

    setTimeout(() => res(mock), 300);
});

const dataParser = (dto: SlotDTO): Slot => {
    const startDate = new Date(dto.start);

    return {
        id: dto.id,
        title: format(startDate, 'HH:mm'),
        start: startDate,
        end: new Date(dto.end),
        available: dto.available
    }
}

const getMentorAvailabilityByMentorIdService = async (mentorId: string, params: GetMentorAvailabilityParams) => {
    // return await axios.post<Output>('/api/1.0/fetch-calendar-session',mentorSessionRequest);

    // TODO API
    const data = await getMock();
    return data.map(dataParser);

};

export const getMentorAvailabilityByMeetingIdServiceKeyGenerator = (mentorId: string, params: GetMentorAvailabilityParams) => {
    return ['mentorAvailability', mentorId, `from-${params.from.toString()}`, `to-${params.to.toString()}`]
}

export default getMentorAvailabilityByMentorIdService;
