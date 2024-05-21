import React, {useState} from "react";
import styles from "./MentorContent.module.scss";
import clx from "classnames";
import {Expandable} from "@newComponents/_base/Expandable";
import {CheckCircleIcon} from "@icons/CheckCircleIcon";

type Skill = {
    id: number;
    name: string;
};
type Services = {
    id: number;
    name: string;
};
type Topics = {
    id: number;
    name: string;
};

type Props = {
    title: string;
    contentHtml: string;
    skills: Skill[];
    services: Services[];
    topics: Topics[];
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
                        <Expandable foldedHeight={50} isExpanded={isExpanded}>
                            <div
                                className={styles.content_content}
                                dangerouslySetInnerHTML={{__html: contentHtml}}
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
                        dangerouslySetInnerHTML={{__html: contentHtml}}
                    />
                )}
            </div>

            {skills && skills.length ? (
                <div className={styles.skills}>
                    <h5 className={styles.skillsTitle}>Umiejętności</h5>
                    <ul className={styles.skillsTags}>
                        {skills.map((skill: Skill, i: number) => (
                            <li key={skill.id} className={styles.skillsTag}>
                                {skill.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
            {topics && topics.length ? (
                <div className={styles.skills}>
                    <h5 className={styles.skillsTitle}>Tematy</h5>
                    <ul className={styles.skillsTags}>
                        {topics.map((topic: Topics, i: number) => (
                            <li key={topic.id} className={styles.skillsTag}>
                                {topic.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {services && services.length ? (
                <ul className={styles.servicesTags}>
                    {services.map((service: Services, i: number) => (
                        <li key={service.id} className={styles.servicesTag}>
                            <CheckCircleIcon/>
                            {service.name}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};
