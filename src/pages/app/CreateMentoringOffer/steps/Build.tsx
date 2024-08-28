import React, { useCallback, useMemo, useState } from "react";
import styles from "../CreateMentoringOffer.module.scss";
import { useCreateOfferReducer } from "src/reducers/createOffer";
import { CreateOfferTemplates } from "../CreateOfferTemplates";
import Button, { ButtonVariant } from "src/components/Button/Button";
import { RadioButton } from "../elements/RadioButton";
import { OfferPlan } from "../elements/OfferPlan";
import { SubscriptionPlan } from "@customTypes/order";
import { PlanInput } from "@customTypes/create-mentoring";
import { CreateOfferState, Data } from "src/reducers/createOffer/types";
import { getStateErrorMessage, validateState } from "../utils";
import { createOfferInitialState } from "src/reducers/createOffer/constants";

export const Build = () => {
  const co = useCreateOfferReducer();
  const state = co.createOfferState;
  const [selected, setSelected] = useState<SubscriptionPlan | null>(null);

  const valid = useMemo(() => {
    return validateState(state);
  }, [state]);

  const validMsg = getStateErrorMessage(valid);

  const addPlan = () => {
    const newData: Data = {
      saved: state.saved,
      numberOfPlans: state.numberOfPlans,
      providesMaterials: state.providesMaterials,
      basic: state.basic,
    };
    if (state.numberOfPlans === 1) {
      newData.basic = state.basic;
      newData.pro = createOfferInitialState.pro;
      newData.numberOfPlans = 2;
    }
    if (state.numberOfPlans === 2) {
      newData.basic = state.basic;
      newData.advanced = createOfferInitialState.advanced;
      newData.pro = state.pro;
      newData.numberOfPlans = 3;
    }
    co.loadOffers(newData);
  };

  const removePlan = (plan: "basic" | "advanced" | "pro") => {
    const newData: Data = {
      saved: state.saved,
      numberOfPlans: state.numberOfPlans,
      providesMaterials: state.providesMaterials,
      basic: state.basic,
    };
    if (state.numberOfPlans === 2 && plan === "basic") {
      newData.basic = state.pro;
      newData.numberOfPlans = 1;
    }
    if (state.numberOfPlans === 2 && plan === "pro") {
      newData.basic = state.basic;
      newData.numberOfPlans = 1;
    }
    if (state.numberOfPlans === 3 && plan === "basic") {
      newData.basic = state.advanced;
      newData.pro = state.pro;
      newData.numberOfPlans = 2;
    }
    if (state.numberOfPlans === 3 && plan === "advanced") {
      newData.basic = state.basic;
      newData.pro = state.pro;
      newData.numberOfPlans = 2;
    }
    if (state.numberOfPlans === 3 && plan === "pro") {
      newData.basic = state.basic;
      newData.pro = state.advanced;
      newData.numberOfPlans = 2;
    }
    co.loadOffers(newData);
  };

  return (
    <div>
      <CreateOfferTemplates
        title="Setup Twoich planów"
        subtitle="Uzupełnij pola."
        step={3}
      >
        <div className={styles.plansWrapper}>
          <OfferPlan
            errors={valid.errors.basic}
            plan="basic"
            selected={selected === "basic"}
            setSelected={setSelected}
            onRemove={state.numberOfPlans > 1 ? removePlan : undefined}
          />

          {co.createOfferState.numberOfPlans > 2 ? (
            <OfferPlan
              errors={valid.errors.advanced}
              plan="advanced"
              selected={selected === "advanced"}
              setSelected={setSelected}
              onRemove={state.numberOfPlans > 1 ? removePlan : undefined}
            />
          ) : null}

          {co.createOfferState.numberOfPlans > 1 && (
            <OfferPlan
              errors={valid.errors.pro}
              plan="pro"
              selected={selected === "pro"}
              setSelected={setSelected}
              onRemove={state.numberOfPlans > 1 ? removePlan : undefined}
            />
          )}

          {state.numberOfPlans < 3 ? (
            <div>
              <Button variant={ButtonVariant.Primary} onClick={addPlan}>
                Dodaj plan
              </Button>
            </div>
          ) : null}
        </div>

        <div className={styles.legendBuild}>
          <div className={styles.left}>
            <h6>Czy dostarczasz materiały?</h6>
            <p>Tutaj jakiś opis wyjaśniający.</p>
          </div>
          <div className={styles.right}>
            <RadioButton
              id="yes"
              name="materials-provider"
              label="Tak"
              onChange={() => {
                co.submitBuild(
                  {
                    ...state,
                    providesMaterials: true,
                  },
                  false
                );
              }}
              checked={co.createOfferState.providesMaterials === true}
            />
            <RadioButton
              id="no"
              name="materials-provider"
              label="Nie"
              onChange={() => {
                co.submitBuild(
                  {
                    ...state,
                    providesMaterials: false,
                  },
                  false
                );
              }}
              checked={co.createOfferState.providesMaterials === false}
            />
          </div>
        </div>

        {validMsg ? <p className={styles.validMsg}>{validMsg}</p> : null}

        <div className={styles.btnBox}>
          <Button
            onClick={co.prevStep}
            variant={ButtonVariant.PrimaryLight}
            type="button"
            fullWidth
          >
            Wróć
          </Button>
          <Button
            onClick={() => {
              co.submitBuild(co.createOfferState, true);
            }}
            variant={ButtonVariant.Primary}
            type="button"
            fullWidth
            disableButton={!valid.isValid}
          >
            Dalej
          </Button>
        </div>
      </CreateOfferTemplates>
    </div>
  );
};
