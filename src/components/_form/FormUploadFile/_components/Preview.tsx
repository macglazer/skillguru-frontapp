import React from "react";
import styles from "../styles.module.scss";

type Props = {
  value: File[];
  // alt: string
  // src: string
  onRemove?: () => void;
};

export const Preview = ({ value, onRemove }: Props) => {
  const file = value.length > 0 ? value[0] : null;
  const url = file ? URL.createObjectURL(file) : null;

  return url ? (
    <div className={styles.previewWrapper}>
      <img src={url} alt="Miniaturka" height={64} width={64} />

      {onRemove ? <button onClick={onRemove}>Usuń</button> : null}
    </div>
  ) : null;
};
