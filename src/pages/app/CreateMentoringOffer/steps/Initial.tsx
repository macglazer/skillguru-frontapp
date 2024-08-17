import React, { useEffect } from "react";

import { useCreateOfferReducer } from "src/reducers/createOffer";
import { CreateOfferTemplates } from "../CreateOfferTemplates";
import Button, { ButtonVariant } from "src/components/Button/Button";

import styles from "../CreateMentoringOffer.module.scss";

export const Initial = () => {
  const { submitInitial, submitDetermine, createOfferState } =
    useCreateOfferReducer();

  // useEffect(() => {
  //   if (createOfferState.saved) {
  //     submitInitial();
  //   }
  // }, [co]);

  useEffect(() => {
    if (createOfferState.saved) {
      submitDetermine(createOfferState.numberOfPlans, true);
    }
  }, [submitDetermine, createOfferState.numberOfPlans, createOfferState.saved]);

  return (
    <CreateOfferTemplates
      title="Ustal, jak będzie wyglądał Twój mentoring"
      subtitle="Twoje plany, które zaraz utworzysz będą się pojawiały po prawej stronie Twojego profilu."
      step={1}
    >
      <div className={styles.imgBox}>
        <img
          //width="308.33px"
          height="600px"
          src="/images/mentoring-offer-ex.svg"
          alt="woman payment"
        />
        <img
          width="177px"
          height="54.13px"
          src="/images/mentoring-text.svg"
          alt="woman payment"
        />
      </div>
      <div className={styles.btnBox}>
        <Button
          onClick={submitInitial}
          fullWidth
          variant={ButtonVariant.Primary}
          type="button"
        >
          Zaczynajmy
        </Button>
      </div>
    </CreateOfferTemplates>
  );
};
