import React, {useEffect, useState} from "react";
import {EmbeddedCheckout, EmbeddedCheckoutProvider, useStripe,} from "@stripe/react-stripe-js";
import {useSelector} from "react-redux";
import {createCheckoutSession} from "@services/paymentService";

export const Payment = () => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState("");
  const bookSession = useSelector((state: any) => state.book.bookSessionState);

  useEffect(() => {
    createCheckoutSession(bookSession).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [bookSession]);

  return (
      <div className="book-payment-stripe">
        <EmbeddedCheckoutProvider stripe={stripe} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
  );
};
