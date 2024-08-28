import { type Review as ReviewType } from "@customTypes/mentor";
import React from "react";
import { Stars } from "../stars";
import { formatDate } from "src/utils";
import clx from "classnames";
import styles from "./Reviews.module.scss";

type Props = {
  className?: string;
  review: ReviewType;
};

export const Review = ({ className, review }: Props) => {
  return (
    <div className={clx(styles.item, className)}>
      <Stars rate={review.rate} total={5} className={styles.stars} />
      <h5 className={styles.item_title}>{review.title}</h5>
      <span className={styles.item_subtitle}>
        {review.authorName} {formatDate(review.createdAt, "DD MMMM YYYY")}
      </span>
      <div className={styles.item_content}>{review.content}</div>
    </div>
  );
};
