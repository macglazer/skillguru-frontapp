import { CalendarSlot } from 'src/types/booking'
import { Mentor } from "@customTypes/mentor";
import { ServiceMentoring, ServiceSession } from "@customTypes/order";

export type ActionType =
  | "SET_MENTOR"
  | "SET_SERVICE"
  | "SET_CALENDAR_WEEK_PREV"
  | "SET_SLOTS"
  | "SELECT_SLOT"
  | "SET_EMAIL"
  | "SET_PHONE"
  | "SET_MESSAGE"
  | "SWITCH_CONSENTS"
  | "SWITCH_INVITE_TEAM"
  | "UPDATE_TEAM_MEMBERS"

export type BookingState = {
  mentor: null|Mentor
  service: null|ServiceMentoring|ServiceSession
  selectedDate: string
  calendarFirstDay: string
  slots: CalendarSlot[]
  customerEmail: string 
  customerEmailError: string 
  customerPhone: string 
  customerPhoneError: string 
  customerMessage: string
  customerMessageError: string
  inviteTeam: boolean 
  teamMembers: { fullName: string, email: string }[]
  consents: boolean
};

export type BookingAction = 
{ type: 'SET_MENTOR', payload: Pick<BookingState, 'mentor'> } |
{ type: 'SET_SERVICE', payload: Pick<BookingState, 'service'> } |
{ type: 'SET_CALENDAR_WEEK_PREV', payload: Pick<BookingState, 'calendarFirstDay'> } |
{ type: 'SET_SLOTS', payload: Pick<BookingState, 'slots'> } |
{ type: 'SELECT_SLOT', payload: Pick<BookingState, 'selectedDate'> } |
{ type: 'SET_EMAIL', payload: Pick<BookingState, 'customerEmail'|'customerEmailError'> } |
{ type: 'SET_PHONE', payload: Pick<BookingState, 'customerPhone'|'customerPhoneError'> } |
{ type: 'SET_MESSAGE', payload: Pick<BookingState, 'customerMessage'|'customerMessageError'> } |
{ type: 'SWITCH_CONSENTS', payload?: Pick<BookingState, 'consents'> }  |
{ type: 'SWITCH_INVITE_TEAM', payload?: Pick<BookingState, 'inviteTeam'> }  |
{ type: 'UPDATE_TEAM_MEMBERS', payload: Pick<BookingState, 'teamMembers'> } 
