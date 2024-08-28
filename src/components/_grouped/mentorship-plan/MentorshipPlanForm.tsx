import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import styles from "./MentorshipPlan.module.scss";
import clx from "classnames";
import { SubscriptionPlan } from "@customTypes/order";
import { PlusIcon } from "@icons/PlusIcon";
import { ReactSelectOptionType, responseTimeOptions } from "./config";
import {
  OverflowMenu,
  OverflowMenuList,
  OverflowMenuOption,
  OverflowMenuToggle,
} from "../overflow-menu";
import { PlanName } from "src/components/_base/PlanName";
import ReactSelect, { ActionMeta, SingleValue } from "react-select";
import {
  FieldName,
  MentorshipPlanFormValues,
  MentorshipPlanFormErrors,
  MentorshipPlanFormTouched,
  MentorshipPlanFormChangeProp,
} from "./types";
import { parseNameAndIndex } from "./utils";
import { CheckCircleSolidIcon } from "@icons/CheckCircleSolidIcon";
import Button, { ButtonVariant } from "src/components/Button/Button";
import { BinIcon } from "@icons/BinIcon";

type Props = {
  subscriptionVariant: SubscriptionPlan;
  values: MentorshipPlanFormValues;
  errors?: MentorshipPlanFormErrors;
  touched?: MentorshipPlanFormTouched;
  selected?: boolean;
  handleRemove?: (plan: SubscriptionPlan) => void;
  handleClick?: () => void;
  handleBlur?: (name: string) => void;
  handleChange?: (chProps: MentorshipPlanFormChangeProp) => void; //(name: string, value: string | null, index?: number) => void;
  setAdditional?: React.Dispatch<React.SetStateAction<string[]>>;
  setValues?: React.Dispatch<React.SetStateAction<MentorshipPlanFormValues>>; //(cb: (values: Values) => Values) => void;
};

const checkIcon = <CheckCircleSolidIcon className={styles.checkIcon} />;

export const MentorshipPlanForm = ({
  subscriptionVariant,
  values,
  errors,
  touched,
  selected,
  handleClick,
  handleBlur,
  handleChange,
  handleRemove,
  setValues,
}: Props) => {
  const [overflowMenuIndex, setOverflowMenuIndex] = useState<number | null>(
    null
  );
  const [planOverflow, setPlanOverflow] = useState<boolean>(false);
  const switchPlanOverflow = () => setPlanOverflow((s) => !s);

  const menuClickHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const value = Number(btn.value);
    if (isNaN(value)) {
      return;
    }
    setOverflowMenuIndex((curr) => {
      if (curr === value) {
        return null;
      }
      if (curr === null || (typeof curr === "number" && curr !== value)) {
        return value;
      }
      return null;
    });
  }, []);

  const handleAddAdditionalRow = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const i = Number(btn.value);
      if (isNaN(i)) {
        return;
      }
      handleChange && handleChange({ name: "planIncludes", value: "", i });
      setValues &&
        setValues((curr: MentorshipPlanFormValues) => ({
          ...curr,
          planIncludes: [...curr.planIncludes, ""],
        }));
    },
    [handleChange, setValues]
  );

  const handleRemoveAdditionalRow = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const i = Number(btn.value);
      if (isNaN(i)) {
        return;
      }
      handleChange &&
        handleChange({
          name: "planIncludes",
          i,
        });
      setValues &&
        setValues((curr: MentorshipPlanFormValues) => ({
          ...curr,
          planIncludes: curr.planIncludes.filter((_, j) => j !== i),
        }));
    },
    [handleChange, setValues]
  );

  const inputBlurHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inp = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const { name } = inp;
      handleBlur && handleBlur(name);
    },
    [handleBlur]
  );

  const inputChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inp = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const { name, i } = parseNameAndIndex(e);

      switch (name) {
        case "description":
          const strValue = String(inp.value);
          handleChange && handleChange({ name, value: strValue });
          setValues &&
            setValues((curr: MentorshipPlanFormValues) => ({
              ...curr,
              [name]: strValue,
            }));
          break;
        case "price":
        case "responseTime":
        case "sessionDuration":
        case "sessionsPerMonth":
          const numValue = Number(inp.value);
          handleChange && handleChange({ name, value: numValue });
          setValues &&
            setValues((curr: MentorshipPlanFormValues) => ({
              ...curr,
              [name]: numValue,
            }));
          break;
        case "planIncludes":
          if (typeof i !== "number" || isNaN(i)) {
            break;
          }
          const strValue2 = String(inp.value);
          handleChange && handleChange({ name, value: strValue2, i });
          setValues &&
            setValues((curr: MentorshipPlanFormValues) => ({
              ...curr,
              planIncludes: curr.planIncludes.map((c, j) =>
                j === i ? strValue2 : c
              ),
            }));
          return;
      }
    },
    [handleChange, setValues]
  );

  const inputReactSelectHandler = useCallback(
    (opt: SingleValue<{}>, actionMeta: ActionMeta<{}>) => {
      const { value } = opt as ReactSelectOptionType;
      const name = (actionMeta?.name || "") as FieldName;
      switch (name) {
        case "responseTime":
        case "sessionDuration":
          const numValue = Number(value);
          handleChange && handleChange({ name, value: numValue });
          setValues &&
            setValues((curr: MentorshipPlanFormValues) => ({
              ...curr,
              [name]: numValue,
            }));
          break;
      }
    },
    [handleChange, setValues]
  );

  const hasEmptyRow = useMemo(() => {
    if (!values.planIncludes || values.planIncludes.length === 0) {
      return false;
    }
    const emptyIndex = values.planIncludes.findIndex((v) => v === "" || !v);
    return typeof emptyIndex === "number" && emptyIndex >= 0 ? true : false;
  }, [values.planIncludes]);

  return (
    <div
      className={clx(styles.wrapper, {
        [styles.selected]: selected,
      })}
      onClick={handleClick}
    >
      <div className={styles.rows}>
        <div className={styles.headline}>
          <PlanName
            className={clx(styles.planName, {
              [styles.planNameWithMenu]: !!handleRemove,
            })}
            plan={subscriptionVariant}
            fontVariant="subtitle-1"
            iconSize={20}
            iconPosition="trailing"
            noPadding
          />
          {handleRemove ? (
            <OverflowMenu onMouseLeave={() => setPlanOverflow(false)} className={styles.menuOverflow}>
              <OverflowMenuToggle className={styles.menuOverflowToggle} onClick={switchPlanOverflow} />
              {planOverflow ? (
                <OverflowMenuList className={styles.menuOverflowList} style={{ top: '26px' }}> 
                  <OverflowMenuOption
                    variant="danger"
                    LeadingIcon={BinIcon}
                    text="Usuń plan"
                    onClick={() => handleRemove(subscriptionVariant)}
                  />
                </OverflowMenuList>
              ) : null}
            </OverflowMenu>
          ) : null}
        </div>
        <div className={clx(styles.row, styles.priceRow)}>
          <input
            className={clx(styles.input, styles.text, styles.priceInput)}
            type="number"
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            name={"price"}
            value={values.price}
          />
          <span className={styles.textCurrency}>zł</span>
          <span>miesięcznie</span>
        </div>
        <div className={clx(styles.row)}>
          <textarea
            className={clx(
              styles.input,
              styles.description,
              styles.text,
              styles.textareaInput
            )}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            name={"description"}
            value={values.description}
            placeholder="Krótki opis planu"
          />
        </div>
        <h6 className={styles.subtitle}>Plan obejmuje</h6>
        {"sessionsPerMonth" in values ? (
          <div className={clx(styles.row)}>
            {checkIcon}
            <div className={clx(styles.rowMiddle)}>
              <input
                className={clx(styles.input, styles.text)}
                type="text"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                name={"sessionsPerMonth"}
                value={values.sessionsPerMonth}
              />
              <span className={styles.text}>
                sesje mentoringowe na miesiąc{" "}
                {values.sessionDuration
                  ? `(każda po ${values.sessionDuration} minut)`
                  : ``}
              </span>
            </div>
          </div>
        ) : null}
        {"responseTime" in values ? (
          <div className={clx(styles.row)}>
            {checkIcon}
            <div className={clx(styles.rowMiddle)}>
              <span className={styles.text}>Odpowiedź w przeciągu</span>
              <ReactSelect
                className={styles.select}
                classNamePrefix={"xyz"}
                options={responseTimeOptions}
                value={
                  values.responseTime
                    ? responseTimeOptions.find(
                        (v) => Number(v.value) === values.responseTime
                      )
                    : {}
                }
                defaultValue={
                  values.responseTime
                    ? responseTimeOptions.find(
                        (v) => Number(v.value) === values.responseTime
                      )
                    : {}
                }
                onChange={inputReactSelectHandler}
                name="responseTime"
              />
            </div>
          </div>
        ) : null}
        {"planIncludes" in values &&
          values.planIncludes.map((r, i) => (
            <div className={clx(styles.row)} key={i}>
              {checkIcon}
              <textarea
                value={r}
                name={`planIncludes[${i}]`}
                onChange={inputChangeHandler}
                className={clx(
                  styles.input,
                  styles.rowMiddle,
                  styles.text,
                  styles.textareaInput
                )}
              />
              <OverflowMenu
                onMouseLeave={() => setOverflowMenuIndex(null)}
                onClickOutside={() => setOverflowMenuIndex(null)}
              >
                <OverflowMenuToggle
                  onClick={menuClickHandler}
                  value={String(i)}
                  className={styles.toggle}
                />
                {overflowMenuIndex === i ? (
                  <OverflowMenuList className={styles.overflowList}>
                    <OverflowMenuOption
                      className={styles.overflowOption}
                      text="Usuń"
                      onClick={handleRemoveAdditionalRow}
                      name="suspend"
                      value={String(i)}
                    />
                  </OverflowMenuList>
                ) : null}
              </OverflowMenu>
            </div>
          ))}
      </div>

      <div className={styles.action}>
        <button
          className={styles.btnAdd}
          disabled={hasEmptyRow}
          value={values.planIncludes.length}
          onClick={handleAddAdditionalRow}
        >
          <PlusIcon />
          <span>Dodaj kolejny punkt</span>
        </button>
      </div>
    </div>
  );
};
