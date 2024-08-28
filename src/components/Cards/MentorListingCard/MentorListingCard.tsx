import React, { useCallback, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
import { Link } from "react-router-dom";
// Components
import Tag from "src/components/Tag/Tag";
// Styles
import styles from "./MentorListingCard.module.scss";

import clx from "classnames";
import StarSvg from "@icons/StarSvg";
import { FiltersSelected, SpecialVariant } from "@customTypes/mentor";
import { DropdownOption } from "@customTypes/dropdownOption";
import Title, { TitleTag, TitleVariant } from "../../typography/Title/Title";

interface MentorListingCardProps {
  avatar_url: string;
  description: string;
  fullName: string;
  id: string;
  link: string;
  price: string;
  profession: string;
  company: string;
  reviewsAvgRate: string;
  reviewsCount: string;
  special: string;
  specialVariant: SpecialVariant;
  skill: DropdownOption[];
  title: string;
  tagsDisplay?: number;
  initialDescriptionHeight?: number | "auto";
  filters: Partial<FiltersSelected>
}

const DEFAULT_TAGS_DISPLAY = 4;
const DEFAULT_DESCRIPTION_HEIGHT = 50;
const DESC_EXPAND_LENGTH = 90;

export const MentorListingCard: React.FC<MentorListingCardProps> = ({
  avatar_url,
  company,
  description,
  fullName,
  link,
  price,
  profession,
  reviewsAvgRate,
  reviewsCount,
  special,
  specialVariant,
  skill,
  title,
  tagsDisplay = DEFAULT_TAGS_DISPLAY,
  initialDescriptionHeight = DEFAULT_DESCRIPTION_HEIGHT,
  filters,
}) => {
  const [tagsExpanded, setTagsExpanded] = useState<boolean>(false);
  const toggleTagsExpanded = useCallback(() => setTagsExpanded((s) => !s), []);
  const hiddenTags = skill.length - tagsDisplay;

  const [descriptionHeight, setDescriptionHeight] = useState<number | "auto">(
    initialDescriptionHeight
  );
  const toggleDescriptionExpanded = useCallback(
    () =>
      setDescriptionHeight((h) =>
        h === initialDescriptionHeight ? "auto" : initialDescriptionHeight
      ),
    []
  );

  const descMoreRef = useRef<HTMLButtonElement>(null);
  const tagMoreRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const clickOnDescMore =
        descMoreRef.current &&
        descMoreRef.current.contains(event.target as Node);
      const clickOnTagsMore =
        tagMoreRef.current && tagMoreRef.current.contains(event.target as Node);
      if (clickOnDescMore || clickOnTagsMore) {
        event.preventDefault();
      }
    },
    []
  );

  return (
    <Link
      state={{ from:  "/search-mentors", filters }}
      className={styles.wrapper}
      to={link}
      onClick={handleClick}
    >
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
              <div className={styles.reviews}>
                <div className={styles.stars}>
                  <StarSvg />
                </div>
                <span>{reviewsCount}</span>
              </div>
              <Title
                tag={TitleTag.h3}
                variant={TitleVariant.standard}
                classes={clx(styles.special, {
                  [styles[`special__${specialVariant}`]]: !!specialVariant,
                })}
              >
                {special}
              </Title>
            </div>
            <Title
              tag={TitleTag.h3}
              variant={TitleVariant.standard}
              classes={styles.profession}
            >
              {profession} {company ? `w ${company}` : ``}
            </Title>
          </div>

          <div className={styles.reviewsLg}>
            <div className={styles.stars}>
              {new Array(Number(reviewsAvgRate)).fill("").map((_, i) => (
                <StarSvg key={i} />
              ))}
            </div>
            <span>
              {"("}
              {reviewsCount} opinii{")"}
            </span>
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
          {description.length > DESC_EXPAND_LENGTH ? (
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
      <div className={styles.footer}>
        <ul className={styles.tags}>
          {skill
            ?.slice(0, tagsExpanded ? undefined : 4)
            .map((element) => (
              <Tag
                key={element.value}
                classes={styles.tag}
                name={element.label}
                bgColor=""
              />
            ))}
          {hiddenTags > 0 && !tagsExpanded ? (
            <div ref={tagMoreRef}>
              <Tag
                onClick={toggleTagsExpanded}
                classes={clx(styles.tag, styles.clickable)}
                name={`+${hiddenTags}`}
                bgColor=""
              />
            </div>
          ) : null}
        </ul>
        {price && (
          <Title
            tag={TitleTag.h4}
            variant={TitleVariant.standard}
            classes={styles.price}
          >
            {price}
          </Title>
        )}
      </div>
    </Link>
  );
};
