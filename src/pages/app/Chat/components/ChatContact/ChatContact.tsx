import React, { MouseEventHandler } from "react";
import { Avatar } from "src/components/Avatar/Avatar";
import clx from "classnames";
import styles from "./ChatContact.module.scss";
import { ChatContactType } from "@customTypes/chat";

type ChatContactProps = {
  isSelected?: boolean;
  contact: ChatContactType;
  switchContact: MouseEventHandler<HTMLButtonElement>;
};

export const ChatContact = ({
  isSelected,
  contact: { avatarUrl, fullName, lastMessage, unreadMessages },
  switchContact,
}: ChatContactProps) => {
  const generateShortMsg = (message: string) => {
    return message.length > 25 ? `${message.slice(0, 25)}...` : message;
  };

  return (
    <li className={styles.contact}>
      <button
        onClick={switchContact}
        className={clx(styles.button, {
          [styles.isSelected]: isSelected,
        })}
      >
        <Avatar src={avatarUrl} alt={`${fullName} avatar`} />
        <div>
          <h4 className={styles.title}>{fullName}</h4>
          <p className={styles.message}>{generateShortMsg(lastMessage)}</p>
        </div>
        {unreadMessages ? (
          <div className={styles.unread}>
            <p>{unreadMessages}</p>
          </div>
        ) : null}
      </button>
    </li>
  );
};
