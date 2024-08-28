import React, { useEffect, useState } from "react";
import { OtherMentors } from "./OtherMentors";
import { fetchRecommendedMentors } from "@services/mentee/fetchRecommendedMentors.service";
import { FetchRecommendedMentorsOutput } from "@services/mentee/fetchRecommendedMentors.types";
import { Mentor } from "./types";

export const RecommendedMentors = () => {
  const [data, setData] = useState<FetchRecommendedMentorsOutput | null>(null);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await fetchRecommendedMentors({ take: 8 });
      setData(data);
      setPending(false);
    };
    fetchInitialData();
  }, []);

  return (
    <OtherMentors
      title="Proponowani mentorzy"
      mentors={(data ? data.mentors : []) as unknown as Mentor[]}
      ready={!pending && data !== null}
      pending={pending}
    />
  );
};
