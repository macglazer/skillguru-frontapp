import React from "react";
import clx from "classnames";
import styles from "../styles.module.scss";
import Button, { ButtonVariant } from "src/components/Button/Button";
import FAQ from "../../../../components/FAQ/Accordion/Accordion";
import { stripeIntegration } from "../../../../components/FAQ/Accordion/content/stripe-integration";
import {Box, CircularProgress} from "@mui/material";

type Props = {
    error: string;
    handleCreateAccount: () => void;
    accountCreatePending: boolean; // Dodany props dla stanu ładowania
};

export const NotConnected = ({ error, handleCreateAccount, accountCreatePending }: Props) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Rozliczenia</h1>
            <p className={styles.description}>
                Płatności na platformie obsługuje firma Stripe. Po kliknięciu w
                "Konfiguruj płatności", zostaniesz przekierowany do formularza
                konfiguracji. Stripe poprosi Cię o dane niezbędne do wypłacenia środków.
            </p>
            <div className={clx(styles.cols2, styles.cols2Reverse)}>
                <div className={styles.imgCtaWrapper}>
                    <div className={styles.imgCtaBox}>
                        <img
                            width="308.33px"
                            height="308.33px"
                            src="/images/m0043-36_1.svg"
                            alt="woman payment"
                        />
                        <div>
                            {accountCreatePending ? (
                                <Box sx={{ display: 'flex', paddingTop: 6, justifyContent: 'center' }}>
                                    <CircularProgress size={45} />
                                </Box>
                            ) : (
                                <Button
                                    onClick={handleCreateAccount}
                                    fullWidth
                                    variant={ButtonVariant.Primary}
                                >
                                    Konfiguruj płatności
                                </Button>
                            )}

                            {error && <p>Error occurred while processing your request.</p>}
                        </div>
                    </div>
                </div>
                <div className={styles.faqWrapper}></div>
            </div>
            <section>
                <div className={styles.faqBox}>
                    <FAQ title="FAQ" elements={stripeIntegration} />
                </div>
            </section>
        </div>
    );
};
