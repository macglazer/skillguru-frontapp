import React from "react";
import styles from "./MentorOfferDetails.module.scss";
import {Accepted, InProgress, Rejected} from "./screens";
import {useParams} from "react-router-dom";
import {Loader} from "src/components/_grouped/loader";
import {MentorOfferDetailsProvider, useMentorOfferDetails} from "./context/MentorOfferDetailsContext";

const MentorOfferDetailsContent = () => {
  const { offer, pending, handleAccept, handleReject, handleFeedback } = useMentorOfferDetails();

  if (pending) {
    return <Loader className={styles.loader} spinner />;
  }

  if (!offer) {
    return null;
  }

  if (offer.status === "rejected") {
    return (
      <Rejected />
    );
  }

  if (offer.status === "accepted") {
    return <Accepted />;
  }

  if (offer.status === "awaiting") {
    return (
      <InProgress />
    );
  }

  return null;
};

export const MentorOfferDetails = () => {
  const { id } = useParams();
  const offerId = Number(id);

  return isNaN(offerId) ? null : (
    <MentorOfferDetailsProvider>
      <MentorOfferDetailsContent />
    </MentorOfferDetailsProvider>
  );
};
