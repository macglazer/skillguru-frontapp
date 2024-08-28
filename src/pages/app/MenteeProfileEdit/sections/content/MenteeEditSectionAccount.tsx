import React, {useState} from "react";

import {SubmitHandler, useForm} from "react-hook-form";
import styles from "./styles.module.scss";
import Pencil from "src/pages/app/Schedules/components/icons/Pencil";
import {JobPosition} from "@services/mentee/fetchMenteeServices.service";
import {ChangePasswordDTO} from "@services/auth/setNewPassword.types";
import changeNewPasswordService from "@services/auth/changeNewPassword";
import {enqueueSnackbar} from "notistack";
import {UserEditSection} from "../../../../../components/_grouped";
import FormInputText from "../../../../../components/_form/FormInputText/FormInputText";


export type MenteeEditAccountFormInput = {
    email: string;
    password: string;
    password2: string;
};


type Props = {
    menteeData: MenteeDTO;
};

export interface MenteeDTO {
    email: string;
    coverUrl: string;
    avatarUrl: string;
    id: string;
    firstName: string;
    lastName: string;
    location: string;
    profession: string;
    jobPosition: JobPosition[];
}

export const MenteeEditSectionAccount = ({menteeData}: Props) => {
    const {control, formState, handleSubmit, watch} =
        useForm<ChangePasswordDTO>({
            defaultValues: {
                email: "",
                password: "",
                repeatPassword: "",
            },
        });

    const inputProps = {
        formState: formState,
        control: control,
        inputProps: {
            type: 'password',
            placeholder: "Wprowadź hasło"
        },
        controllerProps: {rules: {required: "Imię jest wymagane"}},
    };

    const [editPassword, setEditPassword] = useState<boolean>(false);

    const onSubmit: SubmitHandler<ChangePasswordDTO> = async (data) => {
        const response = await changeNewPasswordService({
            password: data.password,
            repeatPassword: data.repeatPassword,
            email: menteeData?.email
        });
        if (response.success) {
            enqueueSnackbar({
                message: 'Hasło zostało pomyślnie zmienione, zaloguj się z użyciem nowego hasła.',
                variant: 'success'
            })
        } else {
            enqueueSnackbar({
                message: response.errorMessage,
                variant: 'error'
            })
        }
    }

    return (
        <UserEditSection
            title="Informacje kontaktowe"
            subtitle="Zmień swoje hasło."
            onClose={
                editPassword
                    ? () => {
                        setEditPassword(false);
                    }
                    : undefined
            }
            onSubmit={handleSubmit(onSubmit)}>

            <div className={styles.Inputs}>
                <div className={styles.PopupInput}>
                    <span>Twój aktualny e-mail to {control._formValues.email}</span>
                </div>
                <div className={styles.PopupInput}>
                    <span>Zmień hasło</span>
                    {editPassword ? null : (
                        <button
                            className={styles.EditBtn}
                            onClick={() => setEditPassword(true)}
                        >
                            <Pencil color="currentColor"/>
                        </button>
                    )}
                </div>
                {editPassword ? (
                    <div>
                        <FormInputText<ChangePasswordDTO>
                            {...inputProps}
                            label="Nowe hasło"
                            name="password"
                            controllerProps={{
                                rules: {
                                    required: 'To pole jest wymagane',
                                    validate: (value, {password}) => {
                                        return value === password ? true : 'Hasła muszą być takie same';
                                    }
                                }
                            }}
                        />
                        <FormInputText<ChangePasswordDTO>
                            {...inputProps}
                            label="Powtórz hasło"
                            name="repeatPassword"
                            controllerProps={{
                                rules: {
                                    required: 'To pole jest wymagane',
                                    validate: (value, {password}) => {
                                        return value === password ? true : 'Hasła muszą być takie same';
                                    }
                                }
                            }}
                        />
                    </div>
                ) : null}
            </div>
        </UserEditSection>
    );
};
