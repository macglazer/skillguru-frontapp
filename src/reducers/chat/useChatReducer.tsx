import { chatInitialState } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { ChatState } from "./types";
import { ChatContactType, ChatMessageType } from "@customTypes/chat";
import { useCallback, useMemo } from "react";

type Output = {
  chatState: ChatState;
  addContacts: (contacts: ChatContactType[]) => void;
  setContacts: (contacts: ChatContactType[], phrase: string) => void;
  selectContact: (contact: ChatContactType) => void;
  addMessages: (messages: ChatMessageType[]) => void;
};

export const useChatReducer = (): Output => {
  const chatState: ChatState = useSelector((state) => {
    if (state && typeof state === "object" && "chat" in state) {
      return state?.chat as ChatState;
    }
    return chatInitialState;
  });
  const dispatch = useDispatch();

  const addContacts = useCallback(
    (contacts: ChatContactType[]) =>
      dispatch({
        type: "ADD_CONTACTS",
        payload: {
          contacts,
        },
      }),
    [dispatch]
  );

  const setContacts = useCallback(
    (contacts: ChatContactType[], phrase: string) =>
      dispatch({
        type: "SET_CONTACTS",
        payload: {
          contacts,
          phrase,
        },
      }),
    [dispatch]
  );

  const selectContact = useCallback(
    (selectedContact: ChatContactType) =>
      dispatch({
        type: "SELECT_CONTACT",
        payload: {
          selectedContact,
        },
      }),
    [dispatch]
  );

  const addMessages = useCallback(
    (messages: ChatMessageType[]) =>
      dispatch({
        type: "ADD_MESSAGES",
        payload: {
          messages,
        },
      }),
    [dispatch]
  );

  return {
    chatState: chatState,
    addContacts,
    setContacts,
    selectContact,
    addMessages,
  };
};
