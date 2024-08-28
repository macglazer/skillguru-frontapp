import { ChatMessageType } from "@customTypes/chat";
import { chatInitialState } from "./constants";
import { type ChatAction, type ChatState } from "./types";

const sortMessagesByDate = (a: ChatMessageType, b: ChatMessageType) => {
  const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
}

export const chatReducer = (
  state = chatInitialState,
  action: ChatAction
): ChatState => {
  switch (action.type) {
    case "ADD_CONTACTS":
      return {
        ...state,
        contacts: [
          ...state.contacts,
          ...action.payload.contacts,
        ],
      };
      case "SET_CONTACTS":
        return {
          ...state,
          contacts: action.payload.contacts || [],
          phrase: action.payload.phrase || '',
        };
    case "SELECT_CONTACT":
      return {
        ...state,
        selectedContact: action.payload.selectedContact,
        messages: [],
      };
    case "ADD_MESSAGES":
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages,
        ].sort(sortMessagesByDate),
      };
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [
          action.payload.message,
          ...state.messages,
        ].sort(sortMessagesByDate),
      };
    
    default:
      return state;
  }
};
