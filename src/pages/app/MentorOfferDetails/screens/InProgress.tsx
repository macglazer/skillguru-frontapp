import React, { useState } from "react";
import clx from "classnames";
import styles from "../MentorOfferDetails.module.scss";
import { ServiceMentoring } from "@customTypes/order";
import { OfferDetails, OfferStatus } from "@services/offer/offer.service";
import { ContentWrapper } from "../elements";
import { useMentorOfferDetails } from "../context/MentorOfferDetailsContext";
import Button, { ButtonVariant } from "src/components/Button/Button";
import { UserIdentity } from "src/components/_base/UserIdentity";
import { CheckboxIcon } from "@icons/CheckboxIcon";
import { ClientPortal } from "src/components/portal";
import Modal from "src/components/Modal/Modal";
import { ModalConfirm } from "src/components/_grouped/modal/ModalConfirm";

export const InProgress = () => {
  const { offer, pending, handleAccept, handleReject, handleFeedback } = useMentorOfferDetails();
  const [rejecting, setRejecting] = useState<boolean>(false);
  const [accepting, setAccepting] = useState<boolean>(false);


  return !offer ? null : (
    <>
      <ModalConfirm
        selector="modal-root"
        title="Czy napewno chcesz zrezygnować z tej oferty?"
        description=""
        rejectText="Zaczekaj"
        submitText="Tak, zrezygnuj"
        isOpen={rejecting}
        handleClose={() => setRejecting(false)}
        handleReject={() => setRejecting(false)}
        handleSubmit={async () => {handleReject();
          setRejecting(false);}}
      />
      <ModalConfirm
        selector="modal-root"
        title="Czy napewno chcesz przyjąć tą ofertę?"
        description="Przyjęcie oferty oznacza rozpoczęcie współpracy ze studentem."
        rejectText="Zaczekaj"
        submitText="Tak, rozpocznij mentoring"
        isOpen={accepting}
        handleClose={() => setAccepting(false)}
        handleReject={() => setAccepting(false)}
        handleSubmit={async () => {
          handleAccept();
          setAccepting(false);
        }}
      />
      <ContentWrapper
        title={`Aplikacja`}
        description={""}
        sidebar
        backArrow
        sidebarFirst
      >
        <div>
          <div className={styles.details}>
            <UserIdentity
              avatarSize={40}
              avatarUrl={offer.userAvatarUrl}
              avatarAlt={offer.userFullName}
              title={offer.userFullName}
              className={styles.userIdentity}
              noPadding
            />

            <div className={clx(styles.fieldCheckboxes)}>
              <label className={styles.label}>Główne cele</label>
              <div className={styles.checkboxes}>
                {offer.mainGoals.map((a, i) => {
                  return (
                    <label className={styles.checkboxFieldset}>
                      <CheckboxIcon
                        className={styles.checkIcon}
                        checked={true}
                      />
                      <span>{a}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className={styles.hr} />

            <div className={clx(styles.fieldSelects)}>
              <div>
                <label className={styles.label}>Miejsce spotkań</label>
                <span>{offer.location}</span>
              </div>
              <div>
                <label className={styles.label}>Timezone</label>
                <span>{offer.timezone}</span>
              </div>
            </div>

            <div className={styles.hr} />

            <div className={clx(styles.fieldText)}>
              <label className={styles.label}>O mentee</label>
              <div className={styles.readTextarea}>
                {offer.aboutStudent}
              </div>
            </div>

            <div className={clx(styles.fieldText)}>
              <label className={styles.label}>Pytania do mentora</label>
              <div className={styles.readTextarea}>
                {offer.questionForMentor}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              size="sm"
              classes={styles.btn}
              variant={ButtonVariant.DangerOutline}
              onClick={() => setRejecting(true)}
              noWrap
              fontVariant='button-md'
            >
              Odrzuć
            </Button>
            <Button
              size="sm"
              noWrap
              classes={styles.btn}
              variant={ButtonVariant.Primary}
              onClick={() => setAccepting(true)}
              fontVariant='button-md'
            >
              Zaakceptuj aplikację
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};
