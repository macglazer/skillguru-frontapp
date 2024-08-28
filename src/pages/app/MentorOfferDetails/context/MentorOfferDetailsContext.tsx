import { SubscriptionPlan } from '@customTypes/order';
import { acceptMentorship } from '@services/mentorship/acceptMentorship';
import { rejectMentorship } from '@services/mentorship/rejectMentorhsip';
import { fetchOfferDetails, OfferDetails, sendRejectionFeedback } from '@services/offer/offer.service';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type MentorOfferDetailsContextType = {
  plan: Plan|null;
  pending: boolean;
  offer: OfferDetails|null;
  handleAccept: () => void;
  handleReject: () => void;
  handleFeedback: (feedback: string) => void;
};

const MentorOfferDetailsContext = createContext<MentorOfferDetailsContextType | undefined>(undefined);

type Props = {
  children: ReactNode
}

type Plan = {
  id: number
  price: number
  sessionDuration: number
  responseTime: number
  sessionsPerMonth: number
  planIncludes: string[]
  subscriptionVariant: SubscriptionPlan;
}

export const MentorOfferDetailsProvider = ({ children } : Props) => {
  const { id } = useParams();
  const offerId = Number(id);
  const [pending, setPending] = useState<boolean>(true);
  const [details, setDetails] = useState<OfferDetails | null>(null);
  const [plan, setPlan] = useState<Plan|null>(null)

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const data = await fetchOfferDetails(offerId);
        setDetails(data.offer);
        setPlan(data.plan)
      } catch (e) {}
      setPending(false);
    };
    getInitialData();
  }, [offerId]);

  // accept offer
  const handleAccept = async () => {
    setPending(true)
    try {
      await acceptMentorship(offerId)
      setDetails((prev) => prev ? ({ 
        ...prev,
        status: 'accepted',
       }) : null);
    } catch (e) {}
    setPending(false)
  };

  // reject offer
  const handleReject = async () => {
    setPending(true)
    try {
      await rejectMentorship(offerId)
      setDetails((prev) => prev ? ({ 
        ...prev,
        status: 'rejected',
       }) : null);
    } catch (e) {}
    setPending(false)
  };

  // send feedback
  const handleFeedback = async (rejectionFeedback: string) => {
    setPending(true)
    try {
      await sendRejectionFeedback(offerId, rejectionFeedback)
      setDetails((prev) => prev ? ({ 
        ...prev,
        status: 'rejected',
        rejectionFeedback,
       }) : null);
    } catch (e) {}
    setPending(false)    
  };

  return (
    <MentorOfferDetailsContext.Provider value={{ plan, offer: details, pending, handleAccept, handleReject, handleFeedback }}>
      {children}
    </MentorOfferDetailsContext.Provider>
  );
};

export const useMentorOfferDetails = () => {
  const context = useContext(MentorOfferDetailsContext);
  if (!context) {
    throw new Error('useMentorOfferDetails must be used within an MentorOfferDetailsProvider');
  }
  return context;
};
