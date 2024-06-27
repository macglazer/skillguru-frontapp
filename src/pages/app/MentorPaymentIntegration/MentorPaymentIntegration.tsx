import React, {useEffect, useState} from "react";
import {createStripeAccount, createStripeAccountLink, getStripeAccount,} from "@services/stripe/stripeService";
import {Connected, NotConnected} from "./screens";
import {Loader} from "src/components/_grouped/loader";

export const MentorPaymentIntegration = () => {
  const [initialDataPending, setInitialDataPending] = useState<boolean>(true)
  const [connectedAccountId, setConnectedAccountId] = useState<string | null>(
    null
  );
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStripeAccount = async () => {
      try {
        const accountId = await getStripeAccount();
        setConnectedAccountId(accountId);
        setInitialDataPending(false)
      } catch (error) {
        console.error("Error fetching Stripe account:", error);
      }
      setInitialDataPending(false)
    };

    fetchStripeAccount();
  }, []);

  const handleCreateAccount = async () => {
    try {
      setAccountCreatePending(true);
      setError(false);

      const account = await createStripeAccount(); // Załóżmy, że createStripeAccount zwraca accountId

      setAccountCreatePending(false);

      if (account) {
        setConnectedAccountId(account);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error creating Stripe account:", error);
      setError(true);
      setAccountCreatePending(false);
    }
  };

  const handleCreateAccountLink = async () => {
    try {
      setAccountLinkCreatePending(true);
      setError(false);

      if (!connectedAccountId) {
        throw new Error("No connected account id available"); // Obsługa błędu, jeśli nie ma ID konta
      }

      const url = await createStripeAccountLink(connectedAccountId);

      setAccountLinkCreatePending(false);

      if (url) {
        window.location.href = url; // Przekierowanie do Stripe
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error creating Stripe account link:", error);
      setError(true);
      setAccountLinkCreatePending(false);
    }
  };

  if(initialDataPending || accountLinkCreatePending) {
    return ( 
      <Loader spinner shadow overflow spinnerSize="lg" />
    )
  }

  if (connectedAccountId) {
    return (
      <Connected
        price={4700} // @TODO
        error={error ? "Error occurred while processing your request." : ""}
        handleCreateAccountLink={handleCreateAccountLink}
      />
    );
  }

  return (
    <NotConnected
      error={error ? "Error occurred while processing your request." : ""}
      handleCreateAccount={handleCreateAccount}
    />
  );
};

export default MentorPaymentIntegration;
