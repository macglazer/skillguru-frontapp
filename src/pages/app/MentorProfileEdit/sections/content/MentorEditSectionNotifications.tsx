import React from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Typography } from "@mui/material";
import FormInputSwitcher from "../../../../../components/_form/FormInputSwitcher/FormInputSwitcher";
import { UserEditSection } from "src/components/_grouped/user-edit-section/UserEditSection";

export type MentorEditNotificationsFormInput = {
  switch1: boolean;
  switch2: boolean;
  switch3: boolean;
  switch4: boolean;
};

export const MentorEditSectionNotifications = () => {
  const { control, formState, handleSubmit, watch } =
    useForm<MentorEditNotificationsFormInput>({
      defaultValues: {
        switch1: false,
        switch2: false,
        switch3: false,
        switch4: false,
      },
    });

  const inputProps = {
    formState: formState,
    control: control,
    inputProps: { placeholder: "https://example.com" },
    controllerProps: { rules: { required: "Imię jest wymagane" } },
  };

  return (
    <UserEditSection
      title="Powiadomienia i widoczność"
      subtitle="Wybierz, kiedy chcesz dostawać powiadomienia oraz kiedy chcesz być widoczny."
      onClose={() => {
        console.log("onClose");
      }}
      onSubmit={() => {
        console.log("onSubmit");
      }}
    >
      <Typography className={styles.Title} sx={{ display: 'block', marginBottom: '24px' }} variant="buttonMd" color="secondary">
        Wyślij mi e-mail, gdy...
      </Typography>
      <div className={styles.Switchers}>
        <FormInputSwitcher
          label={"Ktoś wysłał mi wiadomość"}
          name={"switch1"}
          control={control}
          formState={formState}
          className={styles.Field}
        />
        <FormInputSwitcher
          label={"Ktoś wysłał mi wiadomość"}
          name={"switch2"}
          control={control}
          formState={formState}
          className={styles.Field}
        />
        <FormInputSwitcher
          label={"Ktoś wysłał mi wiadomość"}
          name={"switch3"}
          control={control}
          formState={formState}
          className={styles.Field}
        />
      </div>
      <hr className={styles.Divider} />
      <div className={styles.Switchers}>
        <FormInputSwitcher
          label={"Ktoś wysłał mi wiadomość"}
          name={"switch4"}
          control={control}
          formState={formState}
          className={styles.Field}
        />
      </div>
    </UserEditSection>
  );
};
