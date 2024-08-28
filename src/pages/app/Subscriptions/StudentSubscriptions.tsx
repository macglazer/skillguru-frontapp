import React from "react";
import {
  StudentMentors,
} from "src/components/_connected";
import {
  StudentSessionsHistory,
  MentorSessionsHistory,
} from "src/components/_connected/sessions-history";
import Container from "src/components/Container/Container";
import { Tag } from "src/types/tags";
import styles from "./Subscriptions.module.scss";

export const StudentSubscriptionsPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Container as={Tag.Main}>
        <StudentSessionsHistory
          title="Twoje subskrypcje"
          subtitle={
            <>
              Jeżeli chcesz zobaczyć historię swoich transakcji, przejdź do{" "}
              <a href="/reports">Raportów</a>.
            </>
          }
        />
      </Container>

      <StudentMentors
        title="Twoi mentorzy"
      />
    </div>
  );
};
