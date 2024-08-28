import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Reports} from "./elements/Reports";
import {Loader} from "../../../components/_grouped/loader";
import styles from "./styles.module.scss";
import FAQ from "../../../components/FAQ/Accordion/Accordion";
import {payment} from "../../../components/FAQ/Accordion/content/payment";
import Container from "src/components/Container/Container";
import { Tag } from "@customTypes/tags";

export const MenteePaymentReports = () => {
    const [price, setPrice] = useState(0);

    const [initialDataPending, setInitialDataPending] = useState<boolean>(true);
    const [connectedAccountId, setConnectedAccountId] = useState<string | null>(
        null
    );
    const [accountCreatePending, setAccountCreatePending] = useState(false);
    const [accountLinkCreatePending, setAccountLinkCreatePending] =
        useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();


    return (
        <Container as={Tag.Main} classes={styles.container}>
            <Loader
                open={accountLinkCreatePending || initialDataPending}
                spinner
                shadow
                overlay="global"
                spinnerSize="lg"
            />

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
export default MenteePaymentReports;