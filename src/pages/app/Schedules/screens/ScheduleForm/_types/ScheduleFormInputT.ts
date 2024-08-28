import {WeekdayT} from "./WeekdayT";
import {WeekdayInputT} from "./WeekdayInputT";

export type MeetingTypeT = 'individual' | 'group'; // meeting

export type ScheduleFormInputT = {
    scheduleName: string;
    meetingLength: number;
    type: MeetingTypeT | '';
    cancelAvailable: boolean;
    dateFrom: Date;
    dateTo: Date;
    participantsNumber: number; // only for group
    weekdays: Record<WeekdayT, WeekdayInputT>,
}