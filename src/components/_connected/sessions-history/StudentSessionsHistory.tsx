import React, { ReactNode, useEffect, useRef } from "react";
import { PER_PAGE, useSessionsReducer } from "src/reducers/sessions";
import { SessionsHistory } from "./SessionsHistory";
import { fetchStudentSessions } from "@services/mentee/fetchStudentSessions.service";

type Props = {
  title?: string
  subtitle?: ReactNode
}

export const StudentSessionsHistory = ({ title, subtitle } : Props) => {
  const sr = useSessionsReducer();
  const pageRef = useRef<number>(0);

  useEffect(() => {
    const fetchData = async (page: number) => {
      sr.setPending(true);
      try {
        const { mentors, total } = await fetchStudentSessions({
          sortBy: "status",
          sortMethod: "ASC",
          skip: PER_PAGE * (page - 1),
          take: PER_PAGE,
        });
        sr.updateRecords(mentors, total);
      } catch (e) {
        sr.updateStatus("Wystąpił błąd podczas pobierania danych.");
      }
      sr.setPending(false);
    };
    if (pageRef.current === 0 || pageRef.current !== sr.sessionsState.page) {
      fetchData(sr.sessionsState.page);
      pageRef.current = sr.sessionsState.page;
    }
  }, [sr, sr.sessionsState.page]);

  return <SessionsHistory title={title} subtitle={subtitle} getProfileLink={(username: string) => `/mentor/${username}`} />;
};
