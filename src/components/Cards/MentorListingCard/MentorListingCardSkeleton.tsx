import React from "react";
// Styles
import styles from "./MentorListingCard.module.scss";
import { Skeleton } from "@mui/material";
import Title, {TitleTag, TitleVariant} from "../../typography/Title/Title";

export const MentorListingCardSkeleton: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.user}>
          <Skeleton variant="circular" width={52} height={52} />
          <div className={styles.userHeader}>
            <div className={styles.userNameRow}>
              <Skeleton
                style={{ width: "120px" }}
                variant="text"
                sx={{ fontSize: "1rem" }}
              />
              <div className={styles.reviews}>
                <div className={styles.stars}>
                  <Skeleton
                    style={{ width: "120px" }}
                    variant="circular"
                    width={20}
                    height={20}
                  />
                </div>
                <span>
                  <Skeleton
                    style={{ width: "120px" }}
                    variant="text"
                    sx={{ fontSize: "24px" }}
                  />
                </span>
              </div>
              <Title
                tag={TitleTag.h3}
                variant={TitleVariant.standard}
                classes={styles.special}
              >
                <Skeleton
                  style={{ width: "80px" }}
                  variant="text"
                  sx={{ fontSize: "1em" }}
                />
              </Title>
            </div>
            <Title
              tag={TitleTag.h3}
              variant={TitleVariant.standard}
              classes={styles.profession}
            >
              <Skeleton
                style={{ width: "120px" }}
                variant="text"
                sx={{ fontSize: "1em" }}
              />
            </Title>
          </div>

          <div className={styles.reviewsLg}>
            <div className={styles.stars}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="circular" width={20} height={20} />
            </div>
            <span>
              <Skeleton
                style={{ width: "80px" }}
                variant="text"
                sx={{ fontSize: "1.4em" }}
              />
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
          <Skeleton
            style={{ width: "75%" }}
            variant="text"
            sx={{ fontSize: "1em" }}
          />
        </Title>
        <Title
          tag={TitleTag.h4}
          variant={TitleVariant.standard}
          classes={styles.description}
        >
          <Skeleton variant="text" sx={{ fontSize: "1em" }} />
          <Skeleton variant="text" sx={{ fontSize: "1em" }} />
          <Skeleton
            style={{ width: "55%" }}
            variant="text"
            sx={{ fontSize: "1em" }}
          />
        </Title>
      </div>
      <div className={styles.footer}>
        <ul className={styles.tags}>
          <Skeleton variant="rounded" width={100} height={30} />
          <Skeleton variant="rounded" width={100} height={30} />
          <Skeleton variant="rounded" width={100} height={30} />
          <Skeleton variant="rounded" width={100} height={30} />
        </ul>
        <Title
          tag={TitleTag.h4}
          variant={TitleVariant.standard}
          classes={styles.price}
        >
          <Skeleton
            style={{ width: "120px" }}
            variant="text"
            sx={{ fontSize: "24px" }}
          />
        </Title>
      </div>
    </div>
  );
};
