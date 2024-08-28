import React from "react";
import styles from "./ServiceInfoBox.module.scss";
import clx from "classnames";
import Camera from "@icons/Camera";
import People from "@icons/People";
import { LinkIcon } from "@icons/LinkIcon";

export type ServiceInfoBoxProps = {
  meetingForm?: "video";
  maxAttendees?: number;
  information?: string;
  title?: string;
  className?: string
};

export const ServiceInfoBox = ({
  meetingForm,
  maxAttendees,
  information,
  title,
  className,
}: ServiceInfoBoxProps) => {
  return meetingForm || maxAttendees || information ? (
    <div className={clx(styles.infoBox, styles.border, className)}>
      {title ? (
        <p className={styles.infoBox_title}>{title}</p>
      ) : null}

      <ul className={styles.infoBox_list}>
        {meetingForm && meetingForm === "video" ? (
          <li className={styles.infoBox_row}>
            <div className={styles.infoBox__icon_wrapper}>
              <Camera />
            </div>{" "}
            <span>Spotkanie w formie video</span>
          </li>
        ) : null}
        {maxAttendees ? (
          <li className={styles.infoBox_row}>
            <div className={styles.infoBox__icon_wrapper}>
              <People />
            </div>{" "}
            <span>Max. {maxAttendees} osób z Twojego zespołu</span>
          </li>
        ) : null}
        {information ? (
          <li className={styles.infoBox_row}>
            <div className={styles.infoBox__icon_wrapper}>
              <LinkIcon />
            </div>{" "}
            <span>{information}</span>
          </li>
        ) : null}
      </ul>
    </div>
  ) : null;
};
