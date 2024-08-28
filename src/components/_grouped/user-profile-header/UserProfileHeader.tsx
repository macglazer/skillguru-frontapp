import React, { ReactNode } from "react";
import clx from "classnames";
import styles from "./UserProfileHeader.module.scss";
import { MapMarkIcon } from "@icons/MapMarkIcon";
import { Tag } from "src/types/tags";
import Container from "src/components/Container/Container";
import Button, { ButtonVariant } from "../../Button/Button";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Arrow from "@icons/Arrow";
import { LocationTypes } from "src/pages/app/SearchMentors/SearchMentors";

type Props = {
  avatarUrl?: string;
  btnText?: string;
  btnHref?: string;
  className?: string;
  company?: string;
  coverUrl?: string;
  fullname?: string;
  langSwitcher?: ReactNode;
  location?: string;
  profession?: string;
  handleBtnClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

const DEFAULT_COVER_URL = "/images/header-banner-bg.jpg";

export const UserProfileHeader = ({
  avatarUrl,
  btnText,
  btnHref,
  className,
  company,
  coverUrl,
  fullname,
  langSwitcher,
  location,
  profession,
  handleBtnClick,
}: Props) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { state } = loc as LocationTypes;

  const handleGoBack = () => {
    if (state?.filters && state?.from) {
      navigate(state?.from, {
        state: {
          filters: state?.filters,
        },
      });
    } else {
      navigate("/search-mentors");
    }
  };

  return (
    <div className={clx(styles.wrapper, className)}>
      {state?.from === "/search-mentors" ? (
        <Container as={Tag.Div}>
          <button className={styles.backBtn} onClick={handleGoBack}>
            <Arrow /> <span> Powrót do listy mentorów</span>
          </button>
        </Container>
      ) : null}

      <img
        className={styles.bg}
        alt="Mentor Cover Bg"
        src={coverUrl || DEFAULT_COVER_URL}
      />
      <Container as={Tag.Section}>
        <div className={styles.desktop}>
          <div className={styles.bar}>
            {avatarUrl ? (
              <div className={styles.avatar}>
                <img alt={`Mentor ${fullname} Avatar`} src={avatarUrl} />
              </div>
            ) : null}
            <div className={styles.main}>
              <h2 className={styles.fullname}>{fullname}</h2>
              <div className={styles.subtitle}>
                <span>
                  {profession} w {company}
                </span>
                <div className={styles.dot} />
                <span className={styles.location}>
                  <MapMarkIcon /> {location}
                </span>
              </div>
            </div>
            {langSwitcher || btnText ? (
              <div className={styles.actions}>
                {langSwitcher ? (
                  <div className={styles.languages}>{langSwitcher}</div>
                ) : null}
                {btnText ? (
                  <div className={styles.action}>
                    <Button
                      variant={ButtonVariant.PrimaryLight}
                      size="sm"
                      onClick={handleBtnClick}
                      href={btnHref}
                    >
                      <Typography color="primary" variant="buttonMd">
                        {btnText}
                      </Typography>
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.mobile}>
          <div className={styles.bar}>
            {avatarUrl ? (
              <div className={styles.avatar}>
                <img alt={`Mentor ${fullname} Avatar`} src={avatarUrl} />
              </div>
            ) : null}
            <div className={styles.main}>
              <h2 className={styles.fullname}>{fullname}</h2>
              <div className={styles.subtitle}>
                <span>
                  {profession} w {company}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.bar2nd}>
            {langSwitcher ? (
              <div className={styles.languages}>{langSwitcher}</div>
            ) : null}
            <span className={styles.location}>
              <MapMarkIcon /> {location}
            </span>
          </div>
          {btnText ? (
            <div className={styles.action}>
              <Button
                variant={ButtonVariant.PrimaryLight}
                size="sm"
                onClick={handleBtnClick}
                href={btnHref}
              >
                {btnText}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
};
