
import {MentoringSessionInListDTO, MentoringSessionInListT} from "./mentoringSession.types";
import {GetMentoringSessionsInDatesServiceParams} from "./getMentoringSessionsInDates.types";
import {parseMentoringSessionInListForFE} from "./mentoringSession.parsers";
import prepareParams from "../../helpers/prepareParams";
import axios from "axios";

const getMentoringSessionsInDatesService = async (params: GetMentoringSessionsInDatesServiceParams): Promise<MentoringSessionInListT[]> => {
    const { data } =  await axios.post<MentoringSessionInListDTO[]>(prepareParams('/api/1.0/fetch-all-calendar-user-events', params))
    return data.map(parseMentoringSessionInListForFE);
};

export const getMentoringSessionsInDatesServiceKeyGenerator = (params: GetMentoringSessionsInDatesServiceParams) => {
    return ['calendarEvents', `from-${params.from.toString()}`, `to-${params.to.toString()}`]
}

export default getMentoringSessionsInDatesService;