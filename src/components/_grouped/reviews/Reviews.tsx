import React, { ReactNode } from "react";
import { Stars } from "../stars";
import clx from "classnames";
import styles from "./Reviews.module.scss";

type Props = {
  avgRate: number;
  children?: React.ReactNode;
  className?: string;
  title: string;
  total: number;
};

export const Reviews = ({
  children,
  className,
  title,
  total = 0,
  avgRate = 0,
}: Props) => {
  return (
    <div className={clx(styles.reviewsWrapper, className)}>
      {title ? (
        <div className={styles.header}>
          <h3 className={styles.header_title}>{title}</h3>
          <span className={styles.header_subtitle}>
            <Stars rate={avgRate} total={5} className={styles.stars} />{" "}
            {`(${total} opinii)`}
          </span>
        </div>
      ) : null}
      {children}
    </div>
  );
};

Reviews.List = (props: { children: ReactNode }) => (
  <div className={styles.list}>{props.children}</div>
);

Reviews.Footer = (props: { children: ReactNode }) => (
  <div className={styles.footer}>{props.children}</div>
);

Reviews.Message = (props: { children: ReactNode }) => (
  <div className={styles.msg}>{props.children}</div>
);
