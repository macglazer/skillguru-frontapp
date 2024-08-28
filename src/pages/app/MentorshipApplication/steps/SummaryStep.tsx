import React, { useEffect, useRef, useState } from "react";
import styles from "../MentorshipApplication.module.scss";
import clx from "classnames";
import { useMentAppReducer } from "src/reducers/mentorship-application";
import { Link, useNavigate } from "react-router-dom";
import { ContentWrapper } from "../elements/ContentWrapper";
import { Loader } from "src/components/_grouped/loader";
import { sendMentorshipApplication } from "@services/mentorship/sendMentorshipApplication";

export const SummaryStep = () => {
  const { state, reset, setStatus } = useMentAppReducer();
  const {
    errorMessage,
    success,
    selectedGoals,
    timezone,
    location,
    description,
    questions,
    selectedPlan,
    pending,
  } = state;
  const fetchRef = useRef<boolean>(false);

  useEffect(() => {
    const run = async () => {
      try {
        setStatus({
          pending: true,
        });
        const status = await sendMentorshipApplication({
          planId: selectedPlan ? selectedPlan.id : 0,
          selectedGoals,
          timezone,
          location,
          description,
          questions,
        });
        setStatus({
          success: status ? true : false,
          errorMessage: status ? "" : "Error",
        });
      } catch (e) {
        setStatus({
          success: false,
          errorMessage: "Error",
        });
      }
      setStatus({
        pending: false,
      });
    };
    if (selectedPlan && !fetchRef.current && !success) {
      run();
      fetchRef.current = true;
    }
  }, [
    success,
    selectedPlan,
    selectedGoals,
    timezone,
    location,
    description,
    questions,
    setStatus,
  ]);

  const navigate = useNavigate();

  if (errorMessage) {
    return <p>Wystąpił błąd podczas przesyłania aplikacji</p>;
  }

  return (
    <>
      {pending ? <Loader spinner spinnerSize="lg" overlay shadow /> : null}

      <ContentWrapper
        title={``}
        subtitle={"Zgłoszenie wysłane"}
        description={
          <>
            Powinieneś dostać odpowiedź od Anny w przeciągu najbliższych kilku
            dni. Status swojej aplikacji możesz zawsze sprawdzić w zakładce{" "}
            <Link to={"/mentee-subscriptions"}>Subskrypcje</Link>.
          </>
        }
        submitText={"Powrót do strony głównej"}
        submitHandler={() => {
          reset();
          navigate("/");
        }}
        step={4}
        sidebar
      ></ContentWrapper>
    </>
  );
};
