import React, { useState } from "react";
import styles from "./MentorContent.module.scss";
import clx from "classnames";
import { DropdownOption } from "@customTypes/dropdownOption";

type Props = {
    title: string
  tags: DropdownOption[];
  variant: "primary" | "secondary";
};

const DEFAULT_DISPLAY_LIMIT = 6

export const MentorTags = ({ title, tags, variant }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const _tags = expanded ? tags : Array.isArray(tags) ? tags.slice(0, DEFAULT_DISPLAY_LIMIT) : []

  return tags && tags.length > 0 ? (
    <div className={styles.skills}>
      <h5 className={styles.skillsTitle}>{title}</h5>
      <ul className={styles.skillsTags}>
        {_tags.map((element: DropdownOption, i: number) => (
          <li key={element.value} className={clx(styles.skillsTag, {
            [styles.skillsTagPrimary]: variant === "primary",
            [styles.skillsTagSecondary]: variant === "secondary",
          })}>
            {element.label}
          </li>
        ))}
        {!expanded && tags.length > DEFAULT_DISPLAY_LIMIT ? (
          <li className={clx(styles.skillsTag, styles.skillsTagShowMore, {
            [styles.skillsTagPrimary]: variant === "primary",
            [styles.skillsTagSecondary]: variant === "secondary",
          })} onClick={() => setExpanded(true)}>
            + pokaż wszystkie
          </li>
        ) : null}
      </ul>
    </div>
  ) : null;
};
