import axios from "axios";
import type {ScheduleFormInputT} from "../pages/app/Schedules/screens/ScheduleForm/_types/ScheduleFormInputT";
import type { WeekdayT} from "../pages/app/Schedules/screens/ScheduleForm/_types/WeekdayT";
import {format} from "date-fns";

type WeekTimes = Record<WeekdayT, {
    from: { time: string },
    to: { time: string }
}[]>;

const extractTimeIntervalsFromDays = (weekdays: ScheduleFormInputT['weekdays']): WeekTimes => {
    return Object.entries(weekdays)
        .filter(([_, {isActivated}]) => isActivated)
        .reduce((acc, [day, {slots}]) => {
            acc[day as WeekdayT] = slots.map(({dateFrom, dateTo}) => ({
                from: {time: format(dateFrom, 'HH:mm')},
                to: {time: format(dateTo, 'HH:mm')}
            }));
            return acc;
        }, {} as WeekTimes);
}

export const createScheduleMeeting = async (currentState: ScheduleFormInputT) => {
    const {name, dateFrom, dateTo, cancelAvailable, type, meetingLength, participantsNumber, weekdays} = currentState;
    const weekTimes = extractTimeIntervalsFromDays(weekdays);

    return await axios.post('/api/1.0/schedule', {
        scheduleName: name,
        scheduleStartDay: format(dateFrom, 'yyyy-MM-dd'),
        scheduleEndDay: format(dateTo, 'yyyy-MM-dd'),
        meetTime: meetingLength,
        resign: cancelAvailable,
        type: type,
        weekTimes: weekTimes,
        participant: type === 'individual' ? 0 : participantsNumber
    });
};

export const fetchAllSchedules = async () => {
    return await axios.get('/api/1.0/schedule/fetch-all');
}

export const deleteSchedule = async (scheduleID: string) => {
    try {
        const response = await axios.post(`/api/1.0/schedule/delete?scheduleID=${scheduleID}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete schedule');
    }
};