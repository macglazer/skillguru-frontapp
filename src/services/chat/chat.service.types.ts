import { ChatContactType, ChatMessageType } from "@customTypes/chat";

export type ChatLoadContactsInput = {
  type: 'load-contacts',
  payload?: {
    phrase?: string
    take?: number
    skip?: number
  }  
};

export type ChatLoadMessagesInput = {
  type: 'load-messages',
  payload: {
    contactId: number
    take?: number
    beforeMessageId?: number
  }  
};

export type ChatSwitchContactInput = {
  type: 'switch-contact',
  payload: {
    contactId: number
  }  
};

export type ChatSendMessageInput = {
  type: 'send-message',
  payload: {
    recipient: number
    text: string
  }  
};

export type ChatMessagesOutput = {
  type: 'messages',
  payload: {
    subtype: "append"|"prepend",
    messages: ChatMessageType[]
    total: number
  }  
};

export type ChatContactsOutput = {
  type: 'contacts',
  payload: {
    contacts: ChatContactType[]
    total: number
  }  
};
