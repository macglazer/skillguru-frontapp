import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import clx from "classnames";
import styles from "./SimilarMentors.module.scss";
import {FetchSimilarMentorsOutput} from "@services/mentor/fetchSimilarMentors.types";
import {fetchSimilarMentors} from "@services/mentor/fetchSimilarMentors.service";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ],
};

export const SimilarMentors = () => {
    const [similar, setSimilar] = useState<FetchSimilarMentorsOutput | null>(
        null
    );

    useEffect(() => {

        const fetchInitialData = async () => {
            const data = await fetchSimilarMentors({take: 8});
            setSimilar(data);
        };
        fetchInitialData();
    }, []);

    return similar ? (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Podobni do Ciebie</h3>

            <div className={styles.grid}>
                <Slider {...settings}>
                    {similar.mentors.map((m) => (
                        <div key={m.id}>
                            <div className={styles.card}>
                                <div className={styles.user}>
                                    <img src={m.avatarUrl} alt={m.fullName}/>
                                    <div>
                                        <h4>{m.fullName}</h4>
                                        <p>{m.profession}</p>
                                    </div>
                                </div>
                                <ul className={styles.tags}>
                                    <li className={styles.tag}>
                                        <a href={`/mentor/${m.userName}`} className={styles.link}>Zobacz profil</a>
                                    </li>
                                    {/*{m.skill.map((t) => (*/}
                                    {/*  <li className={styles.tag}>{t}</li>*/}
                                    {/*  ))}*/}
                                </ul>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    ) : null;
};
