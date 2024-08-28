import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Message, MessageVariant, MessageRowSkeleton } from "../Message";
import { Avatar } from "src/components/Avatar/Avatar";
import Button, { ButtonVariant } from "src/components/Button/Button";
import SendArrow from "@icons/SendArrow";
import BackIcon from "@icons/BackIcon";
import WebSocketInstance from "@services/chat/chat.service";
import styles from "./ChatMessages.module.scss";
import { ChatContactType, ChatMessageType } from "@customTypes/chat";
import { ChatMessagesOutput } from "@services/chat/chat.service.types";

export enum ChatMessagesVariant {
  mobile = "mobile",
  desktop = "desktop",
}

type ChatMessagesProps = {
  selected: ChatContactType | null;
  pending: boolean;
  messages: ChatMessageType[];
  total: number | null;
  sendMessage: (text: string) => void;
  loadMoreMessages: () => void;
  variant: ChatMessagesVariant;
  setIsMobileMessageShown?: (state: boolean) => void;
};

type ChatMessageWithOptimistic = ChatMessageType & {
  optimistic?: true;
};

const initialLoadSize = 2

export const ChatMessages = ({
  selected,
  pending,
  messages,
  total,
  sendMessage,
  loadMoreMessages,
  variant,
  setIsMobileMessageShown,
}: ChatMessagesProps) => {
  const _messages = React.useMemo(() => [...messages].reverse(), [messages]);
  const hasNextPage = (total || 0) > messages.length;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollTopRef = useRef<number>(0); // Ref to store the previous scroll position
  const isScrollingUpRef = useRef<boolean>(false);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const currentScrollTop = element.scrollTop;
    isScrollingUpRef.current = (currentScrollTop < prevScrollTopRef.current)

    prevScrollTopRef.current = currentScrollTop;
  }, []);

  useEffect(() => {
    if(isScrollingUpRef.current){
      wrapperRef?.current?.scrollTo({ top: prevScrollTopRef.current });
    } else {
      wrapperRef?.current?.scrollTo({
         top: innerRef?.current?.clientHeight
      })
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("text") as HTMLInputElement;
    if (input.value) {
      sendMessage(input.value);
      input.value = "";
    }
  };

  const [sentryRef] = useInfiniteScroll({
    loading: pending,
    hasNextPage,
    onLoadMore: () => {
      loadMoreMessages();
    },
    disabled: !hasNextPage || pending,
    rootMargin: "0px 0px 0px 0px",
  });

  return (
    <section className={styles.section} data-variant={variant}>
      <>
        {selected ? (
          <>
          <header className={styles.header}>
            {setIsMobileMessageShown ? (
              <>
                <button
                  className={styles.back}
                  onClick={() => setIsMobileMessageShown(false)}
                >
                  <BackIcon />
                </button>
                <Avatar
                  size="32px"
                  src={selected.avatarUrl}
                  alt={`${selected.fullName} avatar`}
                />
              </>
            ) : null}
            <h4>{selected?.fullName}</h4>
          </header>
          <div
            className={styles.box}
            ref={wrapperRef}
            onScroll={handleScroll}
          >
            <div className={styles.grid} ref={innerRef}>
            {hasNextPage ? (
              <div ref={sentryRef}>
                <MessageRowSkeleton />
              </div>
            ) : null}
            {_messages.map((m) =>
              Number(m.fromId) ? (
                <div key={m.id} className={styles.flex}>
                  <Avatar
                    classes={styles.avatar}
                    size="32px"
                    src={selected.avatarUrl}
                    alt={`${selected.fullName} avatar`}
                  />
                  <Message variant={MessageVariant.message}>{m.text}</Message>
                </div>
              ) : (
                <div key={m.id} className={styles.msgBox}>
                  <Message key={m.id} variant={MessageVariant.response}>
                    {m.text}
                  </Message>
                </div>
              )
            )}
            </div>
          </div>
          <div className={styles.formBox}>
            <form onSubmit={handleSubmit} className={styles.flex}>
              <textarea className={styles.textarea} name="text" rows={1} />
              <Button
                classes={styles.button}
                variant={ButtonVariant.Primary}
                size="sm"
                type="submit"
              >
                <span>Wyślij </span>
                <SendArrow />
              </Button>
            </form>
          </div>
          </>
        ) : null}
      </>
    </section>
  );
};
