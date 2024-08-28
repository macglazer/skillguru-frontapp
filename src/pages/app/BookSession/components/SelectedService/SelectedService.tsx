import React from "react";
import { useBookingReducer } from "src/reducers/booking";
import {useLocation} from "react-router-dom";
import {ServiceSession} from "@customTypes/order";
import {MentorServiceCard} from "../../../../../components/Cards/MentorServiceCard";

type LocationState = {
  opt: ServiceSession;
  from: string;
};

export const SelectedService = () => {
  const [state] = useBookingReducer();
  const location = useLocation();

  const sessionData = location.state as ServiceSession;
  const service = location.state as LocationState;
  return state.mentor && state.service ? (
    <MentorServiceCard
      meetingForm="video"
      maxAttendees={5}
      information="Link do spotkania dostaniesz po zatwierdzeniu terminu"
      avatar_url={state.mentor.avatar_url}
      description={ service.opt.description}
      fullName={service.opt.sessionName}
      profession={state.mentor.profession}
      reviewsAvgRate={String(state.mentor.reviewsAvgRate)}
      reviewsCount={String(state.mentor.reviewsCount)}
      title={service.opt.sessionType}
      initialDescriptionHeight={90}
      servicePrice={service.opt.sessionPrice}
      serviceDuration={sessionData?.meetTime}
    />
  ) : null;
};
