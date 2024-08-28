import React, { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import styles from "./OtherMentors.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton } from "@mui/material";
import { Mentor } from "./types";
import { useViewportSize } from "src/hooks/useViewportSize";
import { useTallestElementHeight } from "src/hooks/useTallestElementHeight";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1060,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 560,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

type Props = {
  title: string;
  mentors: Mentor[];
  pending?: boolean;
  ready?: boolean;
};

export const OtherMentors = ({ pending, ready, title, mentors }: Props) => {
  const [slideHeight, setSlideHeight] = useState<number | null>(null);
  const { width, height } = useViewportSize();
  const [counter, setCounter] = useState<number>(0)

  useEffect(() => {
    setSlideHeight(0)
    const timer = setTimeout(() => {
      setCounter(n => n + 1)
    }, 100)

    return () => clearTimeout(timer)
  }, [width, height])

  const { addToRefs } = useTallestElementHeight(setSlideHeight, [counter])

  return mentors ? (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.grid}>
        {pending ? (
          <Slider {...settings} className={styles.slick}>
            {mentors.map((m) => (
              <div key={m.mentorId} className={styles.slickItem}>
                <div className={styles.card}>
                  <div className={styles.user}>
                    <Skeleton
                      className={styles.img}
                      variant="circular"
                      width={20}
                      height={20}
                    />
                    <div>
                      <h4>
                        <Skeleton style={{ width: "90%" }} variant="text" />
                      </h4>
                      <p>
                        <Skeleton style={{ width: "90%" }} variant="text" />
                      </p>
                    </div>
                  </div>
                  <ul className={styles.tags}>
                    <li className={styles.tag}>
                      <Skeleton style={{ width: "90%" }} variant="text" />
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </Slider>
        ) : null}
        {ready ? (
          <Slider {...settings} className={styles.slick}>
            {mentors.map((m) => (
              <div key={m.mentorId} className={styles.slickItem}>
                <div
                  className={styles.card}
                  ref={addToRefs}
                  style={{
                    minHeight: slideHeight
                      ? `${slideHeight}px`
                      : "unset",
                  }}
                >
                  <div className={styles.user}>
                    <img
                      className={styles.img}
                      src={m.avatarUrl}
                      alt={m.fullName}
                    />
                    <div>
                      <h4>{m.fullName}</h4>
                      <p>{m.profession}</p>
                    </div>
                  </div>
                  <ul className={styles.tags}>
                    <li className={styles.tag}>
                      <a href={`/mentor/${m.userName}`} className={styles.link}>
                        Zobacz profil
                      </a>
                    </li>
                    {/*{m.skill.map((t) => (*/}
                    {/*  <li className={styles.tag}>{t}</li>*/}
                    {/*  ))}*/}
                  </ul>
                </div>
              </div>
            ))}
          </Slider>
        ) : null}
      </div>
    </div>
  ) : null;
};
