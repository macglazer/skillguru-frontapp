import { BookingState } from "./types";

export const bookingInitialState: BookingState = {
  mentor: null,
  service: null,
  selectedDate: "",
  slots: [],
  calendarFirstDay: '',
  customerEmail: "",
  customerEmailError: "",
  customerPhone: "",
  customerPhoneError: "",
  customerMessage: "",
  customerMessageError: "",
  inviteTeam: false,
  teamMembers: [],
  consents: false,
};
