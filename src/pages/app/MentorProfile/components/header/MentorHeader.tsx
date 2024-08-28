import React from "react";
import styles from "./MentorHeader.module.scss";
import {MapMarkIcon} from "@icons/MapMarkIcon";
import {MentorLangs} from "../../../../../components/_grouped/languages/MentorLangs";
import {LangSwitcherConnected} from "../../../../../components/_connected/lang-switcher/LangSwitcher";

type JobPosition = {
  id: number;
  name: string;
};

type Props = {
  avatarUrl?: string;
  fullname?: string;
  location?: string;
  profession?: JobPosition[];
  company?: string;
};

export const MentorHeader = ({
  avatarUrl,
  fullname,
  location,
  profession,
  company,
}: Props) => {
  return (
    <>
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
              {profession && profession.length ? (
              <span>
                  {profession.map((job: JobPosition, i: number) => (
                      <li key={job.id} className={styles.skillsTag}>{job.name}</li>
                  ))} w {company}
              </span>
              ) : null}

              <div className={styles.dot} />
              <span className={styles.location}>
                <MapMarkIcon /> {location}
              </span>
            </div>
          </div>
          <div className={styles.languages}>
            {/* <LangSwitcherConnected /> */}
            <MentorLangs
            langs={[
              { value: "pl", label: "Polski" },
              { value: "en", label: "Angielski" },
            ]}
          />
          </div>
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
              {profession && profession.length ? (
               <span>
                  {profession.map((job: JobPosition, i: number) => (
                      <li key={job.id} className={styles.skillsTag}>{job.name}</li>
                  ))} w {company}
              </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.bar2nd}>
          <div className={styles.languages}>
            <LangSwitcherConnected />
          </div>
          <span className={styles.location}>
            <MapMarkIcon /> {location}
          </span>
        </div>
      </div>
    </>
  );
};
