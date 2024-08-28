// Libraries
import React, { useCallback } from "react";
// Components
import Input from "src/components/Input/Input";
// Styles
import styles from "./Team.module.scss";
import { useBookingReducer } from "src/reducers/booking";
import CrossIcon from "src/assets/icons/CloseSvg";
import { PlusIcon } from "@icons/PlusIcon";
import {Switcher} from "../../../../../components/_base/Switcher";

const LIMIT = 5;

export const Team = () => {
  const [state, dispatch] = useBookingReducer();

  const switchHandler = useCallback(() => {
    dispatch({
      type: "SWITCH_INVITE_TEAM",
    });
  }, [dispatch]);

  const addHandler = useCallback(() => {
    dispatch({
      type: "UPDATE_TEAM_MEMBERS",
      payload: {
        teamMembers: [
          ...state.teamMembers,
          {
            fullName: "",
            email: "",
          },
        ],
      },
    });
  }, [dispatch, state]);
 
  const removeHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { value } = e.currentTarget as HTMLButtonElement;
      const i = Number(value);
      dispatch({
        type: "UPDATE_TEAM_MEMBERS",
        payload: {
          teamMembers: state.teamMembers.filter((_, j) => j !== i),
        },
      });
    },
    [dispatch, state]
  );

  const changeHandler = useCallback(
    (name: string, v: any) => {
      const field = name.startsWith("fullName") ? "fullName" : "email";
      const i = Number(name.replace(`${field}-`, ""));
      const value =
        typeof v === "object" && "value" in v ? String(v.value) : "";

      const newTeamMembers = state.teamMembers.map((member, index) => {
        if (index === i) {
          return { ...member, [field]: value };
        }
        return member;
      });

      dispatch({
        type: "UPDATE_TEAM_MEMBERS",
        payload: {
          teamMembers: newTeamMembers,
        },
      });
    },
    [dispatch, state.teamMembers]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label>
          <Switcher checked={state.inviteTeam} onChange={switchHandler} />
          <span className={styles.label}>{`Chcę zaprosić zespół (max. 5 osób)`}</span>
        </label>
      </div>
      {state.inviteTeam ? (
        <>
          <ul className={styles.rows}>
            {state.teamMembers.map((m, i) => {
              return (
                <li key={i} className={styles.row}>
                  <div className={styles.circle}>{i + 1}</div>
                  <Input
                    id={m.email}
                    name={`fullName-${String(i)}`}
                    type={"text"}
                    placeholder={"Imię i nazwisko"}
                    label={"Imię i nazwisko"}
                    value={m.fullName}
                    errorMessage={""}
                    valueChangeHandler={changeHandler}
                    classes={styles.input}
                  />
                  <Input
                    id={m.email}
                    name={`email-${String(i)}`}
                    type={"text"}
                    placeholder={"Email"}
                    label="E-mail"
                    value={m.email}
                    errorMessage={""}
                    valueChangeHandler={changeHandler}
                    classes={styles.input}
                  />
                  <button
                    value={i}
                    className={styles.btnRemove}
                    onClick={removeHandler}
                  >
                    <CrossIcon />
                  </button>
                </li>
              );
            })}
          </ul>
          {LIMIT > state.teamMembers.length ? (
            <div className={styles.footer}>
              <button
                className={styles.button}
                onClick={addHandler}
                type="button"
              >
                <PlusIcon />
                Dodaj kolejną osobę
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};
