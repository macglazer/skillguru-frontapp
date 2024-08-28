import React, { ReactNode } from "react";
import { Title } from "src/components/typography";
import styles from "./CreateMentoringOffer.module.scss";
import { TitleTag, TitleVariant } from "src/components/typography/Title/Title";

type CreateOfferTemplatesProps = {
  title: string;
  subtitle: string;
  step: number;
  children: ReactNode;
};
export const CreateOfferTemplates = ({
  title,
  subtitle,
  step,
  children,
}: CreateOfferTemplatesProps) => {
  const progressSteps = Array.from(Array(4).keys());
  return (
    <>
      <div className={styles.progressBar}>
        {progressSteps.map((item) => (
          <div
            key={item}
            className={styles.step}
            data-variant={item + 1 > step ? null : "active"}
          ></div>
        ))}
      </div>
      <Title
        tag={TitleTag.h3}
        variant={TitleVariant.section}
        classes={styles.title}
      >
        {title}
      </Title>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.contentWrapper}>{children}</div>
    </>
  );
};
