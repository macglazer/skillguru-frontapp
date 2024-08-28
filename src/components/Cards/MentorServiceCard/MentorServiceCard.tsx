import React, {useCallback, useRef, useState} from "react";
import AnimateHeight from "react-animate-height";
// Components
// Styles
import styles from "./MentorServiceCard.module.scss";
import clx from "classnames";
import StarSvg from "@icons/StarSvg";
import {DollarCircleIcon} from "@icons/DollarCircleIcon";
import {ClockSolidCircleIcon} from "@icons/ClockSolidCircleIcon";
import {ServiceInfoBox, ServiceInfoBoxProps} from "../../_grouped";
import Title, {TitleTag, TitleVariant} from "../../typography/Title/Title";

type MentorServiceCardProps = Pick<
  ServiceInfoBoxProps,
  "information" | "maxAttendees" | "meetingForm"
> & {
  avatar_url: string;
  description: string;
  fullName: string;
  profession: string;
  reviewsAvgRate: string;
  reviewsCount: string;
  title: string;
  initialDescriptionHeight?: number | "auto";
  servicePrice: number;
  serviceDuration: number;
};

const DEFAULT_DESCRIPTION_HEIGHT = 60;
const DESC_EXPAND_LENGTH = 90;

export const MentorServiceCard: React.FC<MentorServiceCardProps> = ({
  avatar_url,
  description,
  fullName,
  profession,
  reviewsAvgRate,
  reviewsCount,
  title,
  initialDescriptionHeight = DEFAULT_DESCRIPTION_HEIGHT,
  serviceDuration,
  servicePrice,
  information,
  maxAttendees,
  meetingForm,
}) => {
  const [descriptionHeight, setDescriptionHeight] = useState<number | "auto">(
    initialDescriptionHeight
  );
  const toggleDescriptionExpanded = useCallback(
    () =>
      setDescriptionHeight((h) =>
        h === initialDescriptionHeight ? "auto" : initialDescriptionHeight
      ),
    [initialDescriptionHeight]
  );

  const descMoreRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img src={avatar_url} alt={fullName} className={styles.avatar} />
          <div className={styles.userHeader}>
            <div className={styles.userNameRow}>
              <Title
                tag={TitleTag.h3}
                variant={TitleVariant.standard}
                classes={styles.name}
              >
                {fullName}
              </Title>
            </div>
            <Title
              tag={TitleTag.h3}
              variant={TitleVariant.standard}
              classes={styles.profession}
            >
              {profession}
            </Title>
          </div>
          <div className={styles.reviews}>
            <div className={styles.stars}>
              <StarSvg />
            </div>
            <span>{reviewsCount}</span>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <Title
          tag={TitleTag.h3}
          variant={TitleVariant.standard}
          classes={styles.title}
        >
          {title}
        </Title>
        <div className={styles.descriptionWrapper}>
          {typeof description === 'string' && description.length > DESC_EXPAND_LENGTH ? (
            <>
              <AnimateHeight
                id="description"
                duration={500}
                height={descriptionHeight}
                animateOpacity={true}
                contentClassName={clx(styles.animateDescriptionContent, {
                  [styles.animateDescriptionContentExpanded]:
                    descriptionHeight !== initialDescriptionHeight,
                })}
              >
                <div
                  className={styles.cover}
                  style={{
                    display: descriptionHeight === "auto" ? "none" : "block",
                  }}
                />
                <Title
                  tag={TitleTag.h4}
                  variant={TitleVariant.standard}
                  classes={styles.description}
                >
                  {description}
                </Title>
              </AnimateHeight>
              {initialDescriptionHeight !== "auto" ? (
                <button
                  className={styles.moreBtn}
                  onClick={toggleDescriptionExpanded}
                  type="button"
                  aria-controls="example-panel"
                  aria-expanded={descriptionHeight !== initialDescriptionHeight}
                  ref={descMoreRef}
                >
                  {descriptionHeight === initialDescriptionHeight
                    ? "Pokaż więcej"
                    : "Pokaż mniej"}
                </button>
              ) : null}
            </>
          ) : (
            <>
              <Title
                tag={TitleTag.h4}
                variant={TitleVariant.standard}
                classes={styles.description}
              >
                {description}
              </Title>
            </>
          )}
        </div>
      </div>
      <div className={styles.rowInfo}>
        {servicePrice ? (
          <div className={styles.infoCell}>
            <DollarCircleIcon />
            {Math.ceil(servicePrice)} zł/h
          </div>
        ) : null}
        {serviceDuration ? (
          <div className={styles.infoCell}>
            <ClockSolidCircleIcon />
            {serviceDuration} min
          </div>
        ) : null}
      </div>
      <ServiceInfoBox
        className={styles.footer}
        meetingForm={meetingForm}
        maxAttendees={maxAttendees}
        information={information}
      />
    </div>
  );
};
