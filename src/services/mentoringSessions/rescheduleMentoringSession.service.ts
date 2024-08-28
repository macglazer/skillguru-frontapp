import axios from "axios";

// TODO Parse it if needed
type RescheduleMentoringSessionParams = {
    // id obecnej sesji
    id: string;
    body: {
        // id nowego time slotu
        timeSlotId: number;

    }
}

const rescheduleMentoringSessionService = async ({id, body}: RescheduleMentoringSessionParams): Promise<number> => {
    // TODO API
    const {status} = await axios.patch(`/api/1.0/update-calendar-event/${id}/${body.timeSlotId}`);
    return status;

};


export default rescheduleMentoringSessionService;