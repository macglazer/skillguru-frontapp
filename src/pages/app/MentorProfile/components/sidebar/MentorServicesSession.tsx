import React, {useState} from "react";
import styles from "./Sidebar.module.scss";
import {ServiceSession} from "@customTypes/order";

import {DollarCircleIcon} from "@icons/DollarCircleIcon";
import {ClockSolidCircleIcon} from "@icons/ClockSolidCircleIcon";
import {ClientPortal} from "../../../../../components/portal";
import Modal from "../../../../../components/Modal/Modal";
import {ServiceInfoBox} from "../../../../../components/_grouped";
import {
    ServiceSessionOptionCard
} from "../../../../../components/Cards/ServiceSessionOptionCard/ServiceSessionOptionCard";

type Props = {
  services: ServiceSession[];
  selected?: ServiceSession | null;
  displayRadioInput?: boolean;
  handleSelect?: (opt: ServiceSession) => void;
  handleSubmit?: (opt: ServiceSession) => void;
};

export const MentorServicesSession = ({
  services,
  selected,
  displayRadioInput,
  handleSelect,
  handleSubmit,
}: Props) => {
  const [detailsService, setDetailsService] = useState<ServiceSession | null>(
    null
  );

  return services.length ? (
    <>
      <ClientPortal selector="modal-root" show={!!detailsService}>
        {detailsService ? (
          <Modal
            title={detailsService.sessionType}
            closeHandler={() => setDetailsService(null)}
          >
            <div className={styles.modalRows}>
              <div className={styles.rowInfo}>
                {detailsService.sessionPrice ? (
                  <div className={styles.infoCell}>
                    <DollarCircleIcon />
                    {Math.ceil(detailsService.sessionPrice)} zł/h
                  </div>
                ) : null}
                {detailsService.meetTime ? (
                  <div className={styles.infoCell}>
                    <ClockSolidCircleIcon />
                    {detailsService.meetTime} min
                  </div>
                ) : null}
              </div>
              <div
                className={styles.rowDescription}
                dangerouslySetInnerHTML={{
                  __html: detailsService.description,
                }}
              />
            </div>
          </Modal>
        ) : null}
      </ClientPortal>
      <div className={styles.cards}>
        {services.map((s) => (
          <ServiceSessionOptionCard
            key={s.id}
            {...s}
            displayRadioInput={displayRadioInput}
            handleSelect={handleSelect ? () => handleSelect(s) : undefined}
            selected={s === selected}
            handleDetails={() => setDetailsService(s)}
          />
        ))}
      </div>
      {handleSubmit ? (
        <button
          onClick={selected ? () => handleSubmit(selected) : undefined}
          className={styles.submitBtn}
        >
          Zarezerwuj termin
        </button>
      ) : null}

      <ServiceInfoBox
        title="Informacje dotyczące sesji"
        meetingForm="video"
        maxAttendees={5}
        information="Link do spotkania dostaniesz po zatwierdzeniu terminu"
      />
    </>
  ) : (
    <p>Brak usług do wyświetlenia</p>
  );
};
