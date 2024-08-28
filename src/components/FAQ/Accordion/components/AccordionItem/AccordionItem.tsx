// Libraries
import React, { useMemo } from "react";
// Styles
import styles from "./AccordionItem.module.scss";
import { ChevronDownIcon } from "@icons/ChevronDownIcon";
import {Expandable} from "src/components/_base/Expandable"

export interface AccordionItemModel {
  id: string;
  title: string;
  description: string;
}

export interface AccordionItemProps extends AccordionItemModel {
  currentId: string | undefined;
  changeIdHandler: (id: string | undefined) => void;
}


const truncateText = (text: string, maxLength: number, link: string): string => {
    if (text.length > maxLength) {
        const truncated = text.slice(0, maxLength);
        const lastSpaceIndex = truncated.lastIndexOf(" ");
        const finalText = lastSpaceIndex !== -1 ? truncated.slice(0, lastSpaceIndex) : truncated;
        return `${finalText}... <a href="${link}" class="read-more-link">Czytaj więcej</a>`;
    }
    return text;
};

const AccordionItem = (props: AccordionItemProps) => {
    const { id, title, description, currentId, changeIdHandler } = props;

    const isCurrent = useMemo(() => id === currentId, [id, currentId]);

    const clickHandler = () => changeIdHandler(isCurrent ? undefined : id);

    const truncatedDescription = useMemo(
        () => truncateText(description, 500, `#${id}`),
        [description, id]
    );

    return (
        <li className={styles.wrapper} data-is-current={isCurrent}>
            <button onClick={clickHandler} className={styles.title}>
                {title}
                <ChevronDownIcon className={styles.expander} />
            </button>
            <Expandable isExpanded={isCurrent}>
                <p
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: truncatedDescription }}
                />
            </Expandable>
        </li>
    );
};

export default AccordionItem;
