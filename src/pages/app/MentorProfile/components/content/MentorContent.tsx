import React, { useState } from "react";
import styles from "./MentorContent.module.scss";
import clx from "classnames";
import { CheckCircleIcon } from "@icons/CheckCircleIcon";
import { DropdownOption } from "@customTypes/dropdownOption";
import { MentorTags } from "./MentorTags";
import {Expandable} from "../../../../../components/_base/Expandable";

type Props = {
  title: string;
  contentHtml: string;
  skills: DropdownOption[];
  services: DropdownOption[];
  topics: DropdownOption[];
  contentExpandable?: boolean;
};

export const MentorContent = ({
  title,
  contentHtml,
  services,
  skills,
  topics,
  contentExpandable,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className={clx(styles.MentorContent)}>
      <p className={styles.content_title}>{title}</p>
      <div>
        {contentExpandable ? (
          <>
            <Expandable foldedHeight={50} isExpanded={isExpanded} withOverlay>
              <div
                className={styles.content_content}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </Expandable>
            <button
              className={styles.showMore}
              type="button"
              onClick={() => setIsExpanded((s) => !s)}
            >
              {isExpanded ? "Pokaż mniej" : "Pokaż więcej"}
            </button>
          </>
        ) : (
          <div
            className={styles.content_content}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}
      </div>

      {skills && skills.length ? (
        <MentorTags title="Umiejętności" tags={skills} variant="primary" />
      ) : null}

      {topics && topics.length ? (
        <MentorTags title="Tematy" tags={topics} variant="primary" />
      ) : null}

      {services && services.length ? (
        <ul className={styles.servicesTags}>
          {services.map((service: DropdownOption, i: number) => (
            <li key={service.value} className={styles.servicesTag}>
              <CheckCircleIcon />
              {service.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
