// Libraries
import React from "react";
import clx from "classnames";
// Components
import { Title } from "../typography";
// Assets
import CloseSvg from "src/assets/icons/CloseSvg";
// Styles
import styles from "./Modal.module.scss";
// Types
import { Common } from "src/types/main";
import { TitleTag, TitleVariant } from "../typography/Title/Title";

interface ModalProps extends Common {
  className?: string;
  classNameContent?: string;
  title?: string;
  isOpen?: boolean;
  closeHandler: () => void;
}

const Modal = (props: ModalProps) => {
  const { title, children, closeHandler, isOpen = true } = props;

  return isOpen ? (
    <div className={clx(styles.wrapper, props.className)}>
      <div className={clx(styles.content, props.classNameContent)}>
        <button className={styles.close} onClick={closeHandler}>
          <CloseSvg width={16} height={16} />
        </button>
        <Title
          tag={TitleTag.h3}
          variant={TitleVariant.standard}
          classes={styles.title}
        >
          {title}
        </Title>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
