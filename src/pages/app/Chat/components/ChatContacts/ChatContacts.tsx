import React, { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { ChatContact, ChatContactSkeleton } from "../ChatContact";
import { SearchInput } from "src/components/SearchInput";
import styles from "./ChatContacts.module.scss";
import { ChatContactType } from "@customTypes/chat";
import { useDebounce } from "src/hooks/useDebounce";
 
type Props = {
  selected: ChatContactType|null
  pending: boolean;
  contacts: ChatContactType[];
  total: number | null;
  switchContact: (contact: ChatContactType) => void;
  loadMoreContacts: () => void;
  findContacts: (phrase: string) => void;
};

export const ChatContacts = ({
  selected,
  pending,
  contacts,
  total,
  switchContact,
  loadMoreContacts,
  findContacts,
}: Props) => {
  const [phrase, setPhrase] = useState<string>("");
  const debouncePhrase = useDebounce(phrase);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhrase(e.target.value);
  };

  useEffect(() => {
    if (!debouncePhrase) return;
    findContacts(debouncePhrase);
  }, [debouncePhrase, findContacts]);

  const _contacts = phrase
    ? contacts.filter((c) =>
        c.fullName.toLowerCase().includes(phrase.toLowerCase())
      )
    : contacts;

  const [sentryRef] = useInfiniteScroll({
    loading: pending,
    hasNextPage: true,
    onLoadMore: loadMoreContacts,
  });

  return (
    <section className={styles.box}>
      {pending ? <p>pending</p> : null}
      <SearchInput
        placeholder="Szukaj"
        name="phrase"
        value={phrase}
        onChangePhrase={handleInputChange}
      />
      {_contacts.length ? (
        <ul className={styles.list}>
          {_contacts.map((contact) => (
            <ChatContact
              key={contact.id}
              contact={contact}
              switchContact={() => switchContact(contact)}
              isSelected={selected?.id === contact.id}
            />
          ))}
          {(total && !phrase && total > contacts.length) || pending ? (
            <div ref={pending ? undefined : sentryRef}>
              <ChatContactSkeleton />
            </div>
          ) : null}
        </ul>
      ) : (
        <div className={styles.infoBox}>
          <p>Nie znaleziono</p>
        </div>
      )}
    </section>
  );
};
