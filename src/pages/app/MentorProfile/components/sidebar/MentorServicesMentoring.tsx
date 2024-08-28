import React from "react";
import styles from "./Sidebar.module.scss";
import { ServiceMentoringOptionCard } from "../../../../../components/Cards/ServiceMentoringOptionCard";
import { ServiceInfoBox } from "../../../../../components/_grouped";
import {
  MentorshipDTO,
  MentorshipPlanDTO,
} from "@services/mentor/fetchMentorServices.service";
import {
  MentorshipPlan,
  ServiceMentoring,
  ServiceSession,
} from "@customTypes/order";

type Props = {
  services: MentorshipPlanDTO[];
  selected?: MentorshipPlanDTO | null;
  displayRadioInput?: boolean;
  handleSelect?: (opt: MentorshipPlanDTO) => void;
  handleSubmit?: (opt: MentorshipPlanDTO) => void;
};

export const MentorServicesMentoring = ({
  services,
  selected,
  displayRadioInput,
  handleSelect,
  handleSubmit,
}: Props) => {
  return services && services.length ? (
    <>
      <div className={styles.cards}>
        {services.map((s) => (
          <ServiceMentoringOptionCard
            key={s.id}
            {...s}
            displayRadioInput={displayRadioInput}
            handleSelect={handleSelect ? () => handleSelect(s) : undefined}
            selected={s === selected}
          />
        ))}
      </div>
      {handleSubmit ? (
        <button
          onClick={selected ? () => handleSubmit(selected) : undefined}
          className={styles.submitBtn}
        >
          Zarezerwuj termin
        </button>
      ) : null}

      <ServiceInfoBox
        title="Informacje dotyczące sesji"
        meetingForm="video"
        maxAttendees={5}
        information="Link do spotkania dostaniesz po zatwierdzeniu terminu"
      />
    </>
  ) : (
    <p>Brak usług do wyświetlenia</p>
  );
};
