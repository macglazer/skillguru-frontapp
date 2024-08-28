// Libraries
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Path, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// Components
import { defaultInput } from "src/components/Input/Input";
import { Title } from "src/components/typography";

// Styles
import styles from "./BookForm.module.scss";
// Types
import { TitleTag, TitleVariant } from "src/components/typography/Title/Title";
import { ServiceSession } from "@customTypes/order";
import { fetchCalendarSession } from "@services/calendar/calendarService";
import WeeklyCalendarPicker, {
  CalendarEvent,
} from "../../../../../components/WeeklyCalendarPicker/WeeklyCalendarPicker";

interface BookFormProps {
  selectTermHandler: (term: Date) => void;
}

type LocationStateType = {
  opt: ServiceSession;
  from: Path;
};
export const Calendar = (props: BookFormProps) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectTermHandler } = props;
  const location = useLocation();

  const locationState = location.state as LocationStateType;
  const sessionData = locationState.opt;

  const [currentEvent, setCurrentEvent] = useState<null | number>(null);
  // TODO is it necessary to use state here (value is unused)?
  const [term, setTerm] = useState<null | Date>(null);
  const [combinedData, setCombinedData] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_BOOK_FORM",
      payload: {
        calendarEventId: currentEvent,
      },
    });
  });

  useEffect(() => {
    id &&
    fetchCalendarSession({
      mentorID: sessionData?.mentorID,
      sessionID: Number.parseInt(sessionData?.id),
    })
      .then((res) => {
        const dataFromApi = res.data;
        const events: CalendarEvent[] = [];
        dataFromApi.forEach((item: any, index: number) => {
          const startDateTime = new Date(item.sessionDate + "T" + item.hour);
          const endDateTime = new Date(
            startDateTime.getTime() + 60 * 60 * 1000
          );
          const event = {
            id: item.calendarEventId,
            title:
              startDateTime.getHours() +
              ":" +
              (startDateTime.getMinutes() < 10 ? "0" : "") +
              startDateTime.getMinutes(),
            allDay: true,
            start: startDateTime,
            end: endDateTime,
            available: item.available,
          };
          events.push(event);
        });
        setCombinedData(events);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych z serwera:", error);
      });
  }, [id, sessionData?.id, sessionData?.mentorID]);

  const [form, setForm] = useState({
    term: defaultInput,
    topic: defaultInput,
    email: defaultInput,
    nip: defaultInput,
    phone: defaultInput,
    guests: {
      ...defaultInput,
      value: {
        guest0: {
          name: defaultInput,
          email: defaultInput,
          message: defaultInput,
        },
      },
    },
    policy: { ...defaultInput, value: false },
  });

  useEffect(() => {
    if (currentEvent !== null) {
      updateFormHandler("term", new Date());
    }
  }, [currentEvent]);

  const updateFormHandler = (name: string, value: any) => {
    setForm({ ...form, [name]: value });
  };

  const onEventClick = (event: CalendarEvent) => {
    setCurrentEvent(event.id);
    selectTermHandler(event.start);
    updateFormHandler("term", event.start);
    setTerm(event.start);
  };

  return (
    <section className={styles.wrapper}>
      <Title
        classes={classNames(styles.title, styles.titleMt0)}
        tag={TitleTag.h3}
        variant={TitleVariant.standard}
      >
        Wybierz termin i godzinę sesji
      </Title>
      <WeeklyCalendarPicker
        onEventClick={onEventClick}
        selectedEventId={currentEvent}
        events={combinedData}
      />
    </section>
  );
};
