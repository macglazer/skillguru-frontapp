import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import usePasswordValidation from "../../../hooks/usePasswordValidation";
import {Button} from "@mui/material";
import {useSnackbar} from "notistack";
import paths from "../../../paths";
import setNewPasswordService from "../../../services/auth/setNewPassword.service";
import FormInputText from "../../../components/_form/FormInputText/FormInputText";

type SetNewPasswordFormInput = {
    password: string;
    repeatPassword: string;
}

const PASSWORD_MIN_LENGTH = 8;

const SetNewPasswordView = () => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar()
    const params = useParams() as { userToken: string };
    // const { resetToken } = useParams();


    const {control, formState, handleSubmit, watch} = useForm<SetNewPasswordFormInput>({
        defaultValues: {
            password: '',
            repeatPassword: ''
        }
    });


    const passwordValue = watch("password");
    const {passwordFeedback, isPasswordValid} = usePasswordValidation(passwordValue, {minLength: PASSWORD_MIN_LENGTH});


    const onSubmit: SubmitHandler<SetNewPasswordFormInput> = async (data) => {
        const response = await setNewPasswordService({
            password: data.password,
            repeatPassword: data.repeatPassword,
            // changeToken: params.changeToken,
            userToken: params.userToken,
        });
        if (response.success) {
            navigate(paths.login, {replace: true});
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
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{display: 'grid', gap: 2}}>
            <Typography variant='h2' textAlign='center'>Ustal nowe hasło</Typography>
            <Typography variant='caption' sx={{marginTop: 2, marginBottom: 2}}>
                Hasło powinno mieć co najmmiej {PASSWORD_MIN_LENGTH} znaków
            </Typography>
            <FormInputText<SetNewPasswordFormInput>
                formState={formState}
                label='Nowe hasło'
                name='password'
                control={control}
                inputProps={{placeholder: 'Nowe hasło', type: 'password'}}
                controllerProps={{rules: {required: 'To pole jest wymagane'}}}
                customFeedback={passwordFeedback}
            />
            <FormInputText<SetNewPasswordFormInput>
                formState={formState}
                label='Powtórz nowe hasło'
                name='repeatPassword'
                control={control}
                inputProps={{placeholder: 'Nowe hasło', type: 'password'}}
                controllerProps={{
                    rules: {
                        required: 'To pole jest wymagane',
                        validate: (value, {password}) => {
                            return value === password ? true : 'Hasła muszą być takie same';
                        }
                    }
                }}
            />
            <Button
                type='submit'
                variant='contained'
                disabled={(!formState.isValid || !isPasswordValid) && formState.isSubmitted}
            >
                Zapisz
            </Button>
        </Box>
    )
}

export default SetNewPasswordView;