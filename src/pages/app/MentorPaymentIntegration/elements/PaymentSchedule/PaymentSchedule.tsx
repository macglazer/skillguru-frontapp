import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clx from "classnames";

import { Dropdown } from "src/components/_grouped/dropdown";
import Button, { ButtonVariant } from "src/components/Button/Button";
import DropdownIcon from "@icons/DropdownIcon";

import styles from "./PaymentSchedule.module.scss";

import {
  fetchPaymentSchedule,
  updatePaymentSchedule,
} from "@services/stripe/stripeService";

type ScheduleType = {
  options: { label: string; value: string }[];
  selected: string;
  nextPayment: string;
};

export const PaymentSchedule = ({
  setPayoff,
}: {
  setPayoff: (state: string) => void;
}) => {
  const [schedule, setSchedule] = useState<ScheduleType>();
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeDropdown = () => setIsOpenDropdown(false);
  const openDropdown = () => setIsOpenDropdown(true);

  const selectedPayment = useMemo(
    () =>
      schedule?.options.find((option) => option.value === schedule.selected),
    [schedule?.selected, schedule?.options]
  );

  const [paymentFrequency, setPaymentFrequency] = useState(selectedPayment);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    const value = target instanceof HTMLButtonElement ? target.value : "1/w";

    const selectedPaymentFreq = schedule?.options.find(
      (option) => option.value === value
    );
    if (!selectedPaymentFreq) return;
    setPaymentFrequency(selectedPaymentFreq);
    closeDropdown();
  };

  const fetchSchedule = useCallback(async () => {
    try {
      const schedule = await fetchPaymentSchedule();
      setSchedule(schedule);
      if (schedule) {
        setPayoff(schedule?.nextPayment);
      }
    } catch (error) {
      setError("Error occurred while getting payment schedule.");
      console.error("Error fetching payment schedule", error);
    }
  }, [setPayoff]);

  const saveChanges = async () => {
    try {
      if (paymentFrequency) {
        setIsPending(true);
        const result = await updatePaymentSchedule(paymentFrequency.value);
        if (result) fetchSchedule();
        setIsPending(false);
      }
    } catch (error) {
      setError("Error occurred while changing payment schedule.");
      console.error("Error changing payment schedule", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  useEffect(() => {
    setPaymentFrequency(selectedPayment);
  }, [selectedPayment]);

  return (
    <>
      <p className={styles.scheduleLabel}>Harmonogram wypłat</p>
      <div className={styles.dropdownWrapper}>
        <Dropdown className={styles.dropdown}>
          {isPending && <div className={styles.pending}></div>}
          <Dropdown.Toggle
            onClick={openDropdown}
            className={clx(styles.btn, styles.toogle)}
            toggleRef={toggleRef}
          >
            <p>
              {paymentFrequency?.label}
              <span>{` (następna ${schedule?.nextPayment})`}</span>
            </p>
            <DropdownIcon />
          </Dropdown.Toggle>
          {isOpenDropdown ? (
            <Dropdown.Menu
              toggleRef={toggleRef}
              onClickOutside={closeDropdown}
              className={styles.menu}
            >
              {schedule?.options.map((option) => (
                <Dropdown.Option
                  key={option.value}
                  value={option.value}
                  onClick={handleClick}
                  className={clx(styles.btn, styles.option)}
                >
                  <p className={styles.text}>{option.label}</p>
                </Dropdown.Option>
              ))}
            </Dropdown.Menu>
          ) : null}
        </Dropdown>
        <Button
          className={styles.btnSave}
          onClick={saveChanges}
          variant={ButtonVariant.Light}
          disableButton={isPending}
        >
          Zmień
        </Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};
