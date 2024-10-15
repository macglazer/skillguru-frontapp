import React, { useState } from "react";

import { Reports } from "../elements/Reports";
// import { PaymentSchedule } from "../elements/PaymentSchedule";
import Button, { ButtonVariant } from "src/components/Button/Button";

import styles from "../styles.module.scss";

import { SectionTemplate } from "src/components/SectionTemplate";
import { StripeSvg } from "@icons/StripeSvg";

type Props = {
  price: number;
  error: string;
  handleCreateAccountLink: () => void;
};

export const Connected = ({ price, error, handleCreateAccountLink }: Props) => {
  const formattedPrice = price
      ? (price / 100).toLocaleString("pl-PL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      : "";
  const [payoff, setPayoff] = useState<string>();

  const withdrawPayment = () => {
    // TODO
  };

  const isDisabled = true; // Ustawienie na true, aby wyłączyć funkcje

  return (
      <SectionTemplate
          title="Płatności"
          description='Płatności na platformie obsługuje firma Stripe. Jeżeli chcesz edytować jakieś dane lub wypłacić środki, kliknij "Przejdź do Stripe".'
          className={styles.sectionTemplate}
          additionalContent={
            <div className={styles.stripeContainer}>
              <StripeSvg />
            </div>
          }
      >
        <div className={styles.priceCtaWrapper}>
          <div className={styles.priceCtaBox}>
            {formattedPrice ? (
                <div className={styles.flex}>
                  <p className={styles.priceLabel}>
                    Obecne saldo wynosi
                    <span className={styles.priceAmount}>{formattedPrice} zł</span>
                  </p>
                  <p className={styles.payoff}>
                    Wypłata środków zaplanowana na <span>{payoff}</span>
                  </p>
                </div>
            ) : null}
            <div>
              <div className={styles.buttonWrapper}>
                <Button
                    onClick={handleCreateAccountLink}
                    variant={ButtonVariant.Light}
                    classes={styles.paymentBtn}
                >
                  Przejdż do Stripe
                </Button>
                <div className={styles.tooltipContainer}>
                  <Button
                      onClick={isDisabled ? undefined : withdrawPayment}
                      variant={ButtonVariant.Light}
                      classes={`${styles.paymentBtn} ${isDisabled ? styles.disabled : ''}`}
                      disabled={isDisabled}
                  >
                    Wypłać
                  </Button>
                  {isDisabled && (
                      <span className={styles.tooltip}>
                    Funkcja chwilowo dostępna tylko z konta Stripe
                  </span>
                  )}
                </div>
              </div>
              {error && (
                  <p className={styles.error}>
                    Error occurred while processing your request.
                  </p>
              )}
            </div>
          </div>
          {/*TODO add payment schedule in next release !!!! */}
          {/*<div className={`${styles.scheduleWrapper}  ''}`}>*/}
          {/*  <PaymentSchedule setPayoff={setPayoff} />*/}
          {/*  {isDisabled && (*/}
          {/*      <span className={styles.tooltip}>*/}
          {/*    Harmonogram chwilowo niedostępny*/}
          {/*  </span>*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
        <Reports />
      </SectionTemplate>
  );
};
