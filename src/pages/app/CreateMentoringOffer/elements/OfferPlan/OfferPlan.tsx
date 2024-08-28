import Container from "src/components/Container/Container";
import React from "react";
import { Tag } from "@customTypes/tags";
import styles from "../../CreateMentoringOffer.module.scss";
import { PlanInput } from "@customTypes/create-mentoring";
import { ListStyleIcon } from "@icons/ListStyleIcon";
import DropdownIcon from "@icons/DropdownIcon";
import { ProPlanIcon } from "@icons/ProPlanIcon";
import Add from "@icons/Add";
import { Dropdown } from "src/components/_grouped/dropdown";
import { useForm } from "react-hook-form";
import { responseTimeOptions, sessionDurationOptions } from "../../config";
import { MentorshipPlanForm } from "src/components/_grouped/mentorship-plan";
import { SubscriptionPlan } from "@customTypes/order";
import { useCreateOfferReducer } from "src/reducers/createOffer";
import { Select } from "../../form/select";
import { ScheduleOption } from "src/reducers/createOffer/types";
import {
  MentorshipPlanFormChangeProp,
  MentorshipPlanFormErrors,
} from "src/components/_grouped/mentorship-plan/types";

type Props = {
  plan: SubscriptionPlan;
  selected: boolean;
  errors: MentorshipPlanFormErrors;
  setSelected: (plan: SubscriptionPlan) => void;
  onRemove?: (plan: SubscriptionPlan) => void;
};

export const OfferPlan = ({ errors, plan, selected, setSelected, onRemove }: Props) => {
  const { createOfferState, submitBuild } = useCreateOfferReducer();
  const planState = createOfferState[plan];
  const errorValues = Array.from(Object.values(errors)).filter((e) => !!e);

  return (
    <div onClick={() => setSelected(plan)}>
      <div className={styles.containerSchedule}>
        <p className={styles.scheduleSubtitle}>
          Harmonogram dla Planu{" "}
          {plan === "basic"
            ? "Podstawowego"
            : plan === "advanced"
              ? "Zaawansowanego"
              : "Pro"}
        </p>
        <Select
          className={styles.select}
          name={`schedule-${plan}`}
          value={createOfferState.availableSchedules.find(
            (s) => String(s.value) === String(planState.schedule)
          )}
          placeholder="Wybierz harmonogram"
          options={createOfferState.availableSchedules}
          handleSelect={(name: string, opt: ScheduleOption) => {
            submitBuild(
              {
                ...createOfferState,
                [plan]: {
                  ...planState,
                  schedule: String(opt.value),
                },
              },
              false
            );
          }}
        />
      </div>
      <MentorshipPlanForm
        subscriptionVariant={plan}
        values={planState}
        selected={selected}
        errors={errors}
        handleRemove={onRemove}
        handleChange={(props: MentorshipPlanFormChangeProp) => {
          const newValues = { ...planState };

          switch (props.name) {
            case "description":
              newValues[props.name] = String(props.value);
              break;
            case "price":
            case "sessionDuration":
            case "responseTime":
            case "sessionsPerMonth":
              newValues[props.name] = Number(props.value);
              break;
            case "planIncludes":
              const { value, i } = props;
              const newAdds = [...planState.planIncludes];
              if (typeof value === "undefined") {
                newAdds.splice(i, 1);
              }
              if (typeof value === "string") {
                newAdds[i] = value;
              }
              newValues.planIncludes = newAdds;
          }
          submitBuild(
            {
              ...createOfferState,
              [plan]: {
                ...planState,
                ...newValues,
              },
            },
            false
          );
        }}
      />
      {errorValues.length ? (
        <ul className={styles.planErrors}>
          {errorValues.map((e, i) =>
            typeof e === "string" ? <li key={i}>{e}</li> : null
          )}
        </ul>
      ) : null}
    </div>
  );
};
