import React, { MouseEventHandler } from "react";
import Button, { ButtonVariant } from "src/components/Button/Button";
import Modal from "src/components/Modal/Modal";
import { ClientPortal } from "src/components/portal";
import styles from "./ModalConfirm.module.scss";

type Props = {
  selector?: string;
  title?: string;
  description?: string;
  rejectText?: string;
  submitText?: string;
  isOpen?: boolean;
  handleClose?: () => void;
  handleReject?: MouseEventHandler<HTMLButtonElement>;
  handleSubmit?: MouseEventHandler<HTMLButtonElement>;
};

export const ModalConfirm = ({
  selector = "modal-root",
  isOpen = true,
  handleClose = () => {},
  title,
  description,
  rejectText,
  submitText,
  handleReject,
  handleSubmit,
}: Props) => {
  return (
    <ClientPortal selector={selector}>
      <Modal
        className={styles.modal}
        classNameContent={styles.box}
        title={title}
        closeHandler={handleClose}
        isOpen={isOpen}
      >
        {description && <div className={styles.info}>{description}</div>}

        <div className={styles.btnBox}>
          {submitText && handleSubmit ? (
            <Button
              classes={styles.mainBtn}
              variant={ButtonVariant.Transparent}
              onClick={handleSubmit}
            >
              {submitText}
            </Button>
          ) : null}
          {rejectText && handleReject ? (
            <Button variant={ButtonVariant.Light} onClick={handleReject}>
              {rejectText}
            </Button>
          ) : null}
        </div>
      </Modal>
    </ClientPortal>
  );
};
