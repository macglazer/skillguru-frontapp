import React, { ReactNode } from "react";
import styles from "./Message.module.scss";

export enum MessageVariant {
  message = "message",
  response = "response",
}
type MessageProps = {
  variant: MessageVariant;
  children: ReactNode;
};

export const Message = ({ variant, children }: MessageProps) => {
  return (
    <div className={styles.message} data-variant={variant}>
      <p>{children}</p>
    </div>
  );
};
