import React, { ReactNode } from "react";
import clx from "classnames";
import styles from "./styles.module.scss";
import { Typography } from "@mui/material";
import { palette } from "src/styles/theme";
import Button, {ButtonVariant} from "../../Button/Button";

type Props = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  disabledSubmit?: boolean;
  pending?: boolean;
  onClose?: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const UserEditSection = ({
  title,
  subtitle,
  children,
  disabledSubmit,
  pending,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <form className={styles.section} onSubmit={onSubmit}>
      <div className={styles.colTitle}>
        {title ? (
          <Typography
            sx={{ display: "block" }}
            variant="buttonLg"
            color="secondary"
          >
            {title}
          </Typography>
        ) : null}
        {subtitle ? (
          <Typography
            sx={{ display: "block" }}
            variant="caption"
            color={palette.base[60]}
          >
            {subtitle}
          </Typography>
        ) : null}
      </div>
      <div className={styles.colContent}>
        {children ? <div className={styles.Content}>{children}</div> : null}
        {onSubmit || onClose ? (
          <div className={styles.Actions}>
            {onClose ? (
              <Button
                onClick={onClose}
                className={clx(styles.btn, styles.BtnSubmit)}
                variant={ButtonVariant.PrimaryLight}
                disabled={pending}
                type="button"
                fontVariant='button-md'
              >
                Anuluj
              </Button>
            ) : null}
            {onSubmit ? (
              <Button
                // onClick={onSubmit}
                className={clx(styles.btn, styles.BtnSubmit)}
                variant={ButtonVariant.Primary}
                disabled={disabledSubmit || pending}
                type="submit"
                fontVariant='button-md'
              >
                Zapisz zmiany
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
};
