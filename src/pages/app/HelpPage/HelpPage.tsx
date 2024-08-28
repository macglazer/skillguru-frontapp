import React, { useCallback, useState } from "react";

import Button, { ButtonVariant } from "src/components/Button/Button";
import Container from "src/components/Container/Container";
import Accordion from "src/components/FAQ/Accordion/Accordion";
import { TitleTag, TitleVariant } from "src/components/typography/Title/Title";
import { Tag } from "@customTypes/tags";
import { Text, Title } from "src/components/typography";
import { AddQuestionPopup } from "./components/AddQuestionPopup/AddQuestionPopup";

import styles from "./HelpPage.module.scss";
import { faqList } from "./config";

const HelpPage = () => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const toogleModalOpened = useCallback(() => setPopupOpen((s) => !s), []);

  return (
    <main>
      <AddQuestionPopup isOpen={popupOpen} handleClose={toogleModalOpened} />
      <Container as={Tag.Section} classes={styles.container}>
        <Title
          tag={TitleTag.h2}
          variant={TitleVariant.sectionConst}
          classes={styles.title}
        >
          Pomoc
        </Title>
        <div className={styles.gridContainer}>
          <div className={styles.boxWithBtn}>
            <Text classes={styles.subtitle}>Najczęściej zadawane pytania</Text>
            <Text classes={styles.info}>
              Nie znalazłeś odpowiedzi na swoje pytanie? Napisz do nas, a
              odpowiemy najszybciej jak to możliwe
            </Text>
            <Button
              onClick={toogleModalOpened}
              classes={styles.button}
              variant={ButtonVariant.Primary}
              type="button"
            >
              Wyślij zapytanie
            </Button>
          </div>
          <section className={styles.faqSection}>
            <Accordion title="" elements={faqList} />
          </section>
        </div>
      </Container>
    </main>
  );
};

export default HelpPage;
