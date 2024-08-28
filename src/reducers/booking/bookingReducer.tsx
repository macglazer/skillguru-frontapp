import { bookingInitialState } from "./constants";
import { type BookingAction, type BookingState } from "./types";

export const bookingReducer = (
  state = bookingInitialState,
  action: BookingAction
): BookingState => {
  switch (action.type) {
    case "SET_MENTOR":
      return {
        ...state,
        mentor: action.payload.mentor || null,
      };
    case "SET_SERVICE":
      return {
        ...state,
        service: action.payload.service || null,
      };
    case "SET_CALENDAR_WEEK_PREV":
      return {
        ...state,
        calendarFirstDay:
          action.payload.calendarFirstDay || state.calendarFirstDay || "",
      };
    case "SET_SLOTS":
      return {
        ...state,
        slots: action.payload.slots,
      };
    case "SELECT_SLOT":
      return {
        ...state,
        selectedDate: action.payload.selectedDate,
      };
    case "SET_EMAIL":
      return {
        ...state,
        customerEmail: action.payload.customerEmail,
      };
    case "SET_PHONE":
      return {
        ...state,
        customerPhone: action.payload.customerPhone,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        customerMessage: action.payload.customerMessage,
      };
    case "SWITCH_CONSENTS":
      return {
        ...state,
        consents: action.payload ? action.payload.consents : !state.consents,
      };
    case "SWITCH_INVITE_TEAM":
      return {
        ...state,
        inviteTeam: action.payload ? action.payload.inviteTeam : !state.inviteTeam,
      };
    case "UPDATE_TEAM_MEMBERS":
      return {
        ...state,
        teamMembers: action.payload.teamMembers,
      };

    default:
      return state;
  }
};
