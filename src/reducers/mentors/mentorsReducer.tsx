import { mentorsInitialState } from "./constants";
import { type MentorsAction, type MentorsState } from "./types";

export const mentorsReducer = (
  state = mentorsInitialState,
  action: MentorsAction
): MentorsState => {
  switch (action.type) {
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload.filters,
        },
      };
    case "UPDATE_PAGE":
      return {
        ...state,
        page: action.payload.page || 1,
      };
    case "UPDATE_REQUEST_STATE":
      return {
        ...state,
        error: action.payload.error || "",
        pending: action.payload.pending || false,
      };
    case "ADD_RESULTS":
      return {
        ...state,
        mentors: [...state.mentors, ...(action.payload.mentors || [])],
        total: action.payload.total || state.total,
      };
    case "UPDATE_RESULTS":
      return {
        ...state,
        mentors: action.payload.mentors || [],
        total: action.payload.total || 0,
      };

    default:
      return state;
  }
};
