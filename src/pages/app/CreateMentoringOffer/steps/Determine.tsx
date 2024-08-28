import React, { useCallback, useState } from "react";

import { CreateOfferTemplates } from "../CreateOfferTemplates";
import Button, { ButtonVariant } from "src/components/Button/Button";
import { RadioButton } from "../elements/RadioButton";

import styles from "../CreateMentoringOffer.module.scss";

import { useCreateOfferReducer } from "src/reducers/createOffer";

type Quantity = 1 | 2 | 3;

type PlanTypes = {
  id: string;
  quantity: Quantity;
  label: string;
};

const planList: PlanTypes[] = [
  { id: "one", quantity: 1, label: "1 plan" },
  { id: "two", quantity: 2, label: "2 plany (w tym jeden Pro)" },
  { id: "three", quantity: 3, label: "3 plany (w tym jeden Pro)" },
];

export const Determine = () => {
  const { createOfferState: state, submitDetermine } = useCreateOfferReducer();
  const { numberOfPlans } = state

  const onRadioButtonClick = (number: Quantity) => {
    if (!number) return;
    submitDetermine(number, false);
  };

  const handleSubmit = useCallback(() => {
    if (numberOfPlans) {
      submitDetermine(numberOfPlans, true);
    }
  }, [numberOfPlans, submitDetermine]);
  
  return (
    <CreateOfferTemplates
      title="Ilość planów"
      subtitle="Proponujemy utworzyć więcej niż jeden plan, oferując tym samym jedną z nich jako Plan Pro."
      step={2}
    >
      <div>
        <legend className={styles.legend}>Chcę utworzyć:</legend>
        <div className={styles.radioBox}>
          {planList.map(({ id, quantity, label }) => (
            <RadioButton
              key={id}
              name="plan-qty"
              id={id}
              checked={numberOfPlans === quantity}
              onChange={() => onRadioButtonClick(quantity)}
              label={label}
            />
          ))}
        </div>
      </div>

      <div className={styles.btnBox}>
        <Button
          onClick={handleSubmit}
          disableButton={!numberOfPlans}
          fullWidth
          variant={ButtonVariant.Primary}
          type="button"
        >
          Dalej
        </Button>
      </div>
    </CreateOfferTemplates>
  );
};
