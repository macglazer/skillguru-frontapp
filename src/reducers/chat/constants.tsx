import { ChatState } from "./types";

export const chatInitialState: ChatState = {
  contacts: [],
  selectedContact: null,
  messages: [],
  phrase: '',
};
