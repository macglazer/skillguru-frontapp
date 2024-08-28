import React, { TouchEvent, useRef, useState } from "react";
import styles from "./style.module.scss";
import clx from "classnames";
import {Dropdown} from "../../_grouped/dropdown";

type LangCode = "pl" | "en";

type LangOption = {
  value: LangCode;
  title: string;
  flagUrl: string;
};

const options: LangOption[] = [
  { value: "pl", title: "Polski", flagUrl: "/images/flag/pl.svg" },
  { value: "en", title: "Angielski", flagUrl: "/images/flag/en.jpg" },
];

type Props = {
  className?: string;
};

export const LangSwitcherConnected = ({ className }: Props) => {
  const [lang, setLang] = useState<string>("pl");
  const [open, setOpen] = useState<boolean>(false);
  const selectedLang = options.find((l) => l.value === lang);
  const toggle = () => setOpen((s) => !s);
  const close = () => setOpen(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    const value = target instanceof HTMLButtonElement ? target.value : lang;
    setLang(value);
    close()
  };

  return (
    <Dropdown className={clx(styles.wrapper, className)}>
      <Dropdown.Toggle
        onClick={open ? undefined : toggle}
        className={clx(styles.btn, styles.toggle)}
        toggleRef={toggleRef}
      >
        <img
          src={selectedLang?.flagUrl}
          alt={selectedLang?.title}
          className={styles.img}
        />
        <span className={styles.text}>{selectedLang?.title}</span>
      </Dropdown.Toggle>
      {open ? (
        <Dropdown.Menu
          toggleRef={toggleRef}
          onClickOutside={close}
          className={styles.menu}
        >
          {options.map((opt) => (
            <Dropdown.Option
              value={opt.value}
              onClick={handleClick}
              className={clx(styles.btn, styles.option)}
            >
              <img src={opt?.flagUrl} alt={opt?.title} className={styles.img} />
              <span className={styles.text}>{opt?.title}</span>
            </Dropdown.Option>
          ))}
        </Dropdown.Menu>
      ) : null}
    </Dropdown>
  );
};
