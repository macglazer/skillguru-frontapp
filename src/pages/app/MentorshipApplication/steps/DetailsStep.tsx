import React, { useMemo } from "react";
import styles from "../MentorshipApplication.module.scss";
import clx from "classnames";
import { useMentAppReducer } from "src/reducers/mentorship-application";
import { Link } from "react-router-dom";
import { ContentWrapper } from "../elements/ContentWrapper";
import ReactSelect from "react-select";
import { Select } from "../form/select";

export const DetailsStep = () => {
  const { state, submitDetails } = useMentAppReducer();
  const { availableTimezones, timezone, location, description, questions } =
    state;

  const tz = useMemo(() => {
    const options = availableTimezones.map((value) => ({
      value,
      label: value,
    }));
    const value = options.find((o) => o.value === timezone);
    return { options, value };
  }, [availableTimezones, timezone]);

  const loc = useMemo(() => {
    const options = [{ label: "Online", value: "online" },{label: "Offline", value: "offline"}];
    const value = options.find((o) => o.value === location);
    return { options, value };
  }, [location]);

  return (
    <ContentWrapper
      title={``}
      subtitle={"Dowiedzmy się więcej o Tobie"}
      description={""}
      submitText={"Zakończ"}
      submitDisabled={!(timezone || location || description || questions)}
      submitHandler={() =>
        submitDetails(
          {
            timezone: state.timezone,
            location: state.location,
            description: state.description,
            questions: state.questions,
          },
          true
        )
      }
      step={3}
      sidebar
    >
      <div className={styles.detailsForm}>
        <div className={styles.inlineFieldset}>
          <label className={styles.label}>Twój timezone</label>
          <Select
            name="timezone"
            placeholder="Wybierz..."
            options={tz.options}
            value={tz.value}
            handleSelect={(name, selected) => {
              submitDetails(
                {
                  location,
                  timezone: String(selected.value),
                  questions,
                  description,
                },
                false
              );
            }}
          />
        </div>

        <div className={styles.inlineFieldset}>
          <label className={styles.label}>Miejsce spotkań</label>
          <Select
            name="location"
            placeholder="Wybierz..."
            options={loc.options}
            value={loc.value}
            handleSelect={(name, selected) => {
              submitDetails(
                {
                  location: String(selected.value),
                  timezone,
                  questions,
                  description,
                },
                false
              );
            }}
          />
        </div>

        <div className={styles.rowsFieldset}>
          <label className={styles.label}>Opowiedz trochę o sobie</label>
          <textarea
            className={clx(styles.control, styles.textarea)}
            name={"description"}
            placeholder="Czym się zajmujesz na codzień? Jakie są Twoje aspiracje? Jakie wyzwanie do tej pory napotkałeś?"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const txt = e.currentTarget as HTMLTextAreaElement;
              const { value } = txt;
              submitDetails(
                {
                  location,
                  timezone,
                  questions,
                  description: value.slice(0, 500),
                },
                false
              );
            }}
          />
          <small className={styles.info}>Pozostało {500 - description.length} znaków</small>
        </div>

        <div className={styles.rowsFieldset}>
          <label className={styles.label}>
            Czy masz jakieś pytania do mentora?
          </label>
          <textarea
            className={clx(styles.control, styles.textarea)}
            placeholder="Zadaj pytanie mentorowi"
            name={"questions"}
            value={questions}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const txt = e.currentTarget as HTMLTextAreaElement;
              const { value } = txt;
              submitDetails(
                {
                  location,
                  timezone,
                  questions: value,
                  description,
                },
                false
              );
            }}
          ></textarea>
        </div>
      </div>
    </ContentWrapper>
  );
};
