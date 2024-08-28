import React from "react";
import { useBookingReducer } from "src/reducers/booking";
import styles from "./UserDetails.module.scss";
import Input from "../../../../../components/Input/Input";

export const UserDetails = () => {
  const [state, dispatch] = useBookingReducer();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputs}>
        <Input
          id="email"
          name="email"
          type="email"
          label="E-mail"
          placeholder={"E-mail"}
          value={state.customerEmail}
          errorMessage={state.customerEmailError}
          isValid={!!state.customerEmailError}
          valueChangeHandler={(name, value) =>
            dispatch({
              type: "SET_EMAIL",
              payload: { customerEmail: value.value, customerEmailError: "" },
            })
          }
        />
        <Input
          id="phone"
          name="phone"
          type="phone"
          label="Telefon"
          placeholder={"Telefon"}
          value={state.customerPhone}
          errorMessage={state.customerPhoneError}
          isValid={!!state.customerPhoneError}
          valueChangeHandler={(name, value) =>
            dispatch({
              type: "SET_PHONE",
              payload: { customerPhone: value.value, customerPhoneError: "" },
            })
          }
        />
        <Input
          id="topic"
          name="topic"
          as="textarea"
          label="Temat spotkania"
          classes={styles.textarea}
          placeholder={"Opisz co chciałbyś przerobić na sesji z mentorem"}
          value={state.customerMessage}
          errorMessage={state.customerMessageError}
          isValid={!!state.customerMessageError}
          textMaxLength={500}
          valueChangeHandler={(name, value) =>
            dispatch({
              type: "SET_MESSAGE",
              payload: {
                customerMessage: value.value.slice(0, 500),
                customerMessageError: "",
              },
            })
          }
        />
      </div>
    </div>
  );
};
