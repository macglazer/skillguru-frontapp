import React from "react";
import styles from "./MentorContent.module.scss";
import clx from "classnames";
import {
  LinkedInCircleIcon,
  InstagramCircleIcon,
  FacebookInCircleIcon,
  TwitterCircleIcon,
  YoutubeCircleIcon,
} from "@icons/social-media";

type SocialMediaProvider =
  | "linkedin"
  | "twitter"
  | "instagram"
  | "facebook"
  | "youtube";

type Props = {
  className?: string;
  isDesktop?: boolean;
} & Partial<Record<SocialMediaProvider, string>>;

export const MentorLinks = ({ isDesktop, className, ...social }: Props) => {
  return (
    <div
      className={clx(
        styles.linksSection,
        {
          [styles.border]: isDesktop,
          [styles.desktop]: isDesktop,
        },
        className
      )}
    >
      {isDesktop ? <h5 className={styles.linksTitle}>Linki</h5> : null}
      <div className={styles.socialIcons}>
        {"linkedin" in social && social.linkedin ? (
          <a
            href={social.linkedin}
            rel="noreferrer"
            className={styles.socialIcon}
            target="_blank"
          >
            <LinkedInCircleIcon />
          </a>
        ) : null}
        {"twitter" in social && social.twitter ? (
          <a
            href={social.twitter}
            rel="noreferrer"
            className={styles.socialIcon}
            target="_blank"
          >
            <TwitterCircleIcon />
          </a>
        ) : null}
        {"instagram" in social && social.instagram ? (
          <a
            href={social.instagram}
            rel="noreferrer"
            className={styles.socialIcon}
            target="_blank"
          >
            <InstagramCircleIcon />
          </a>
        ) : null}
        {"facebook" in social && social.facebook ? (
          <a
            href={social.facebook}
            rel="noreferrer"
            className={styles.socialIcon}
            target="_blank"
          >
            <FacebookInCircleIcon />
          </a>
        ) : null}
        {"youtube" in social && social.youtube ? (
          <a
            href={social.youtube}
            rel="noreferrer"
            className={styles.socialIcon}
            target="_blank"
          >
            <YoutubeCircleIcon />
          </a>
        ) : null}
      </div>
    </div>
  );
};
