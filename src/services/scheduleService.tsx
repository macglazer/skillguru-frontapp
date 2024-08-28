import axios from "axios";
import {MeetingTypeT, ScheduleFormInputT} from "../pages/app/Schedules/screens/ScheduleForm/_types/ScheduleFormInputT";
import {weekdays } from "../pages/app/Schedules/screens/ScheduleForm/_types/WeekdayT";
import { format, setHours, setMinutes} from "date-fns";
import type {WeekdayT} from "../pages/app/Schedules/screens/ScheduleForm/_types/WeekdayT";
import {WeekdayInputT} from "../pages/app/Schedules/screens/ScheduleForm/_types/WeekdayInputT";

type WeekTimes = Record<WeekdayT, {
    from: { time: string },
    to: { time: string }
}[]>;

export interface TimeSlotDTO {
    time: string;
}

export interface TimeIntervalDTO {
    from: TimeSlotDTO;
    to: TimeSlotDTO;
}

export interface ScheduleDTO {
    scheduleName: string;
    scheduleStartDay: string;
    scheduleEndDay: string;
    meetTime: number;
    resign: boolean;
    type: MeetingTypeT;
    participant: number;
    weekTimes: Partial<Record<WeekdayT, TimeIntervalDTO[]>>;
}

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
    const {scheduleName, dateFrom, dateTo, cancelAvailable, type, meetingLength, participantsNumber, weekdays} = currentState;
    const weekTimes = extractTimeIntervalsFromDays(weekdays);

    return await axios.post('/api/1.0/schedule', {
        scheduleName: scheduleName,
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
    // TODO type response tightly and eventually parse it
    return await axios.get<{ id: number, scheduleName: string }[]>('/api/1.0/schedule/fetch-all');
}

export const deleteSchedule = async (scheduleID: string) => {
    try {
        const response = await axios.post(`/api/1.0/schedule/delete?scheduleID=${scheduleID}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete schedule');
    }
};


export const getScheduleFormInitialData = async (scheduleId: string): Promise<ScheduleFormInputT> => {
    console.log('FETCHING SCHEDULE DATA with id: ' + scheduleId);

    const mock: ScheduleDTO = {
        scheduleName: 'Nowy Harmonogram test',
        scheduleStartDay: '2024-07-01',
        scheduleEndDay: '2024-07-31',
        meetTime: 50,
        resign: false,
        type: 'group',
        participant: 5,
        weekTimes: {
            monday: [
                {
                    from: {time: '21:00'},
                    to: {time: '22:00'}
                }
            ],
            wednesday: [
                {
                    from: {time: '09:00'},
                    to: {time: '15:00'}
                },
                {
                    from: {time: '17:00'},
                    to: {time: '19:00'}
                }
            ],
            thursday: [
                {
                    from: {time: '09:00'},
                    to: {time: '15:00'}
                }
            ],
            friday: [
                {
                    from: {time: '09:00'},
                    to: {time: '15:00'}
                }
            ]
        }
    };


    // TODO put axios GET here
    const axiosMock = () => new Promise<{ data: ScheduleDTO }>(res => {
        setTimeout(() => {
            res({data: mock})
        }, 1000)
    })

    const {data} = await axiosMock();
    const today = new Date();


    const defaultSlot = {
        dateFrom: setHours(setMinutes(today, 0), 9),
        dateTo: setHours(setMinutes(today, 0), 17)
    };


    return {
        scheduleName: data.scheduleName,
        meetingLength: data.meetTime,
        type: data.type,
        cancelAvailable: data.resign,
        dateFrom: new Date(data.scheduleStartDay),
        dateTo: new Date(data.scheduleEndDay),
        participantsNumber: data.participant,
        weekdays: weekdays.reduce((acc, day) => {
            acc[day] = {
                isActivated: !!data.weekTimes[day],
                slots: data.weekTimes[day]?.map(({from, to}) => ({
                    dateFrom: new Date(`2021-01-01T${from.time}:00`),
                    dateTo: new Date(`2021-01-01T${to.time}:00`)
                })) || [{
                    dateFrom: setHours(setMinutes(today, 0), 9),
                    dateTo: setHours(setMinutes(today, 0), 15),
                }]
            }
            return acc;
        }, {} as Record<WeekdayT, WeekdayInputT>)
    }
}

export const editMentorSchedule = async (scheduleId: string, updatedData: ScheduleFormInputT) => {
    try {
        const response = await axios.put(`/api/1.0/schedule/edit/${scheduleId}`, {
            // scheduleName: updatedData.scheduleName,
            // scheduleStartDay: updatedData.scheduleStartDay,
            // scheduleEndDay: updatedData.scheduleEndDay,
            // meetTime: updatedData.meetTime,
            // resign: updatedData.resign,
            // type: updatedData.type,
            // participant: updatedData.participant,
            // weekTimes: updatedData.weekTimes
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update schedule');
    }
};

