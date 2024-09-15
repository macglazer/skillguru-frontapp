import {ReactNode} from "react";

export type UserMessageSeverity = 'error' | 'warning' | 'info';

type Message = {
        message: () => ReactNode;
        severity: UserMessageSeverity;
    }

export type UserMessagesState = {
    currentMessage: null | Message;
};

export type UserMessagesAction =
    | { type: 'SET_MESSAGE'; payload: Message }
    | { type: 'CLEAR_MESSAGE' };