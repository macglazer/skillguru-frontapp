
import React from "react";
import styles from "./Actions.module.scss";
import { useBookingReducer } from "src/reducers/booking";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../../../../components/Checkbox/Checkbox";
import Button from "../../../../../components/Button/Button";

export const Actions = () => {
  const [state, dispatch] = useBookingReducer();
  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/session-book/1/payment`);
  };

  return (
    <div className={styles.wrapper}>
      <Checkbox
        id="policy"
        name="policy"
        classes={styles.checkbox}
        value={state.consents}
        errorMessage={state.consents ? "" : ""}
        isValid={state.consents ? true : false}
        valueChangeHandler={() => {
          dispatch({ type: "SWITCH_CONSENTS" });
        }}
        label="Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie [tutaj zakres przetwarzania
						danych] przez [dane administratora danych osobowych: nazwa, imię, nazwisko, adres] w celu [cel przetwarzania danych osobowych]."
      />
      <Button
        onClick={handleSubmit}
        size="lg"
        type="submit"
        classes={styles.button}
        fullWidth
      >
        Przejdź do płatności
      </Button>
    </div>
  );
};
