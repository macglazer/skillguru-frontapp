import { ChatContactType, ChatMessageType } from "@customTypes/chat";

export type ActionType =
  | "ADD_CONTACTS"
  | "SET_CONTACTS"
  | "SELECT_CONTACT"
  | "ADD_MESSAGES"
  | "SET_PHRASE"
  | "SEND_MESSAGE";

export type ChatState = {
  contacts: ChatContactType[];
  selectedContact: ChatContactType | null;
  messages: ChatMessageType[];
  phrase: string;
};

export type ChatAction =
  | { type: "ADD_CONTACTS"; payload: { contacts: ChatContactType[] } }
  | { type: "SET_CONTACTS"; payload: { contacts: ChatContactType[], phrase: string } }
  | { type: "SELECT_CONTACT"; payload: { selectedContact: ChatContactType } }
  | { type: "ADD_MESSAGES"; payload: { messages: ChatMessageType[] } }
  // | { type: "SET_PHRASE"; payload: { phrase: string } }
  | { type: "SEND_MESSAGE"; payload: { message: ChatMessageType } };
