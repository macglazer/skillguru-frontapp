import React, {useEffect, useState} from "react";
import {LinksList, LinksListRow} from "src/components/FAQ/LinksList";
import clx from "classnames";

import {Reports} from "../elements/Reports";
import {PaymentSchedule} from "../elements/PaymentSchedule";
import Button, {ButtonVariant} from "src/components/Button/Button";
import {payment} from "src/components/FAQ/Accordion/content/payment";
import FAQ from "src/components/FAQ/Accordion/Accordion";
import Container from "src/components/Container/Container";

import styles from "../styles.module.scss";

import {Tag} from "@customTypes/tags";

type Props = {
    price: number;
    error: string;
    handleCreateAccountLink: () => void;
};

export const Connected = ({price, error, handleCreateAccountLink}: Props) => {

    console.log('jestem w Connected i price wynosi: ', price)
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


    return (
        <Container as={Tag.Section} classes={styles.wrapper}>
            <h1 className={styles.title}>Płatności</h1>
            <p className={styles.description}>
                Płatności na platformie obsługuje firma Stripe. Jeżeli chcesz edytować
                jakieś dane lub wypłacić środki, kliknij "Przejdź do Stripe".
            </p>

            <div className={styles.priceCtaWrapper}>
                <div className={styles.priceCtaBox}>
                    {formattedPrice ? (
                        <div className={styles.flex}>
                            <p className={styles.priceLabel}>
                                Obecne saldo wynosi
                                <span className={styles.priceAmount}>{formattedPrice} zł</span>
                            </p>
                            {/* TODO */}
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
                            <Button
                                onClick={withdrawPayment}
                                variant={ButtonVariant.Light}
                                classes={styles.paymentBtn}
                            >
                                Wypłać
                            </Button>
                        </div>
                        {error && (
                            <p className={styles.error}>
                                Error occurred while processing your request.
                            </p>
                        )}
                    </div>
                </div>
                <div className={styles.scheduleWrapper}>
                    <PaymentSchedule setPayoff={setPayoff}/>
                </div>
            </div>

            <section>
                <Reports/>
            </section>
            <section>
                <div className={styles.faqBox}>
                    <FAQ title="FAQ" elements={payment}/>
                </div>
            </section>
        </Container>
    );
};
