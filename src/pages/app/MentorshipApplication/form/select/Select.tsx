import DropdownIcon from "@icons/DropdownIcon";
import React, { MouseEvent, useCallback, useMemo, useState } from "react";
import {
  OverflowMenu,
  OverflowMenuList,
  OverflowMenuOption,
  OverflowMenuToggle,
} from "src/components/_grouped/overflow-menu";
import styles from "./Select.module.scss";
import clx from "classnames";
import { SearchSvg2 } from "@icons/SearchSvg2";

type Option = { value: string | number; label: string };

type Props = {
  name: string;
  value?: Option;
  placeholder?: string;
  options: Option[];
  handleSelect: (name: string, opt: Option) => void;
};

export const Select = ({
  placeholder,
  name,
  value,
  options,
  handleSelect,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<string>("");

  const handleOptionSelect = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const { name, value } = btn;
      const selected = options.find((o) => o.value === value);
      selected && handleSelect(name, selected);
      setOpen(false)
    },
    [handleSelect, options]
  );

  const _options = useMemo(() => {
    return phrase
      ? options.filter(
          (o) =>
            o.label.toLowerCase().includes(phrase.toLowerCase()) ||
            String(o.value).toLowerCase().includes(phrase.toLowerCase())
        )
      : options;
  }, [options, phrase]);

  return (
    <div>
      <OverflowMenu
      onMouseLeave={() => setOpen(false)}
      onClickOutside={() => setOpen(false)}
      >
        <OverflowMenuToggle
          Icon={DropdownIcon}
          onClick={() => setOpen(true)}
          value={"toggle"}
          className={styles.toggle}
        >
          <span className={styles.toggleText}>
            {value ? value.label : placeholder || ""}
          </span>
        </OverflowMenuToggle>
        {open ? (
          <OverflowMenuList style={{ top: 0 }} className={styles.list}>
            <div className={styles.search}>
              <SearchSvg2 />
              <input
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="Szukaj..."
              />
            </div>
            {_options.map((opt) => (
              <OverflowMenuOption
                key={opt.value}
                text={opt.label}
                onClick={handleOptionSelect}
                name={name}
                value={String(opt.value)}
              />
            ))}
          </OverflowMenuList>
        ) : null}
      </OverflowMenu>
    </div>
  );
};
