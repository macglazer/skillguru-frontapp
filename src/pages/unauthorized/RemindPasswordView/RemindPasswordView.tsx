import React from "react";
import Typography from "@mui/material/Typography";
import {SubmitHandler, useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import sendRemindPasswordEmailService from "../../../services/auth/sendRemindPasswordEmail.service";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import paths from "../../../paths";
import FormInputText from "../../../components/_form/FormInputText/FormInputText";

type RemindPasswordFormInput = {
    email: string;
}

const RemindPasswordView = () => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar()

    const {control, formState, handleSubmit} = useForm<RemindPasswordFormInput>({
        defaultValues: {email: ''},
    })

    const onSubmit: SubmitHandler<RemindPasswordFormInput> = async ({email}) => {
        const {success} = await sendRemindPasswordEmailService(email)
        console.log(success)
        if(success) navigate(paths.passwordResetLinkSent)
        else enqueueSnackbar('Nie udało się wysłać e-maila z linkiem do resetowania hasła', {variant: 'error'})
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: 'grid', gap: 2}}>
                <Typography variant='h2' textAlign='center'>Zapomniałem hasła</Typography>
                <Typography color="base.80" variant='caption' sx={{ marginTop: 1, marginBottom: 1}}>
                    Podaj nam swój adres e-mail, a my wyślemy Ci link do zresetowania hasła.
                </Typography>
                <FormInputText<RemindPasswordFormInput>
                    name='email'
                    control={control}
                    formState={formState}
                    label='E-mail'
                    inputProps={{placeholder: 'adres@email.com', type: 'email'}}
                    controllerProps={{
                        rules: {
                            required: 'Email jest wymagany',
                            pattern: {value: /\S+@\S+\.\S+/, message: 'Niepoprawny email'},
                        }
                    }}
                />
                <Button disabled={!formState.isValid && formState.isDirty} type='submit' variant='contained'>
                    Wyślij e-mail
                </Button>
            </Box>
        </form>
    )
}

export default RemindPasswordView;