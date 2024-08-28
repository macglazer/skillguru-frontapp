import React, {useRef} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Collapse} from "@mui/material";
import paths, {pathAnchors} from "../../../paths";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {loginUserByEmail} from "../../../helpers/login";
import {useDispatch} from "react-redux";
import {ReactComponent as GoogleIcon} from '../../../assets/icons/svg/google.svg'
import useGoogleLogin from "../../../hooks/useGoogleLogin";
import FormInputText from "../../../components/_form/FormInputText/FormInputText";
import FormInputCheckbox from "../../../components/_form/FormInputCheckbox/FormInputCheckbox";
import TextLink from "../../../components/TextLink/TextLink";
import styles from './style.module.scss'

type LoginFormInput = {
    email: string;
    password: string;
    rememberMe: boolean;
}

const LoginView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const hashValue = useLocation().hash.replace('#', '');
    const updateHash = (hash: string) => window.location.hash = hash;

    const [globalError, setGlobalError] = React.useState<string | null>(null);

    const {control, formState, handleSubmit} = useForm<LoginFormInput>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        },
    })

    const onSubmit: SubmitHandler<LoginFormInput> = async ({password, email, rememberMe}) => {
        setGlobalError(null);
        const response = await loginUserByEmail(email, password, rememberMe);

        if (response.success) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    id: response.userData.id,
                    email: response.userData.email,
                    role: response.userData.role[0],
                    username: response.userData.username
                },
            });
            navigate(paths.home);
        } else {
            setGlobalError(response.errorMessage);
        }
    };

    const googleButtonRef = useRef<HTMLDivElement>(null);
    const {onGoogleLogin} = useGoogleLogin(googleButtonRef);

    return (
        <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: 'grid', gap: 2}}>
                <Typography color="#252B61" variant='h2' textAlign='center'>Zaloguj się</Typography>
                <Tabs
                
                    sx={{marginBottom: 2}}
                    value={hashValue || 'mentee'}
                    onChange={(_e, value) => updateHash(value)}
                    textColor="inherit"
                    variant="fullWidth"
                >
                    <Tab  sx={{fontSize: '12px'}} label="Jestem uczniem" value={pathAnchors.loginView.mentee}/>
                    <Tab sx={{fontSize: '12px'}} label="Jestem mentorem" value={pathAnchors.loginView.mentor}/>
                </Tabs>
                <FormInputText<LoginFormInput>
                    name='email'
                    control={control}
                    formState={formState}
                    label='E-mail'
                    inputProps={{placeholder: 'adres@email.com', type: 'email'}}
                    controllerProps={{rules: {required: 'E-mail jest wymagany'}}}
                />
                <FormInputText<LoginFormInput>
                    name='password'
                    control={control}
                    formState={formState}
                    label='Hasło'
                    inputProps={{placeholder: 'Hasło', type: 'password'}}
                    controllerProps={{rules: {required: 'Hasło jest wymagane'}}}
                />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignContent: 'center', flexWrap: 'wrap', marginTop: 1}}>
                <FormInputCheckbox<LoginFormInput>
                    inputProps={{color: 'error'}}
                    label='Zapamiętaj mnie'
                    name="rememberMe"
                    control={control}
                    formState={formState}
                />
                <Link className={styles.link} to={paths.remindPassword}>
                    Zapomniałem hasła
                </Link>
            </Box>
            <Collapse in={!!globalError}>
                <Typography sx={{marginBottom: 2, marginTop: 2}} color='error' variant='caption'>
                    {globalError}
                </Typography>
            </Collapse>
            <Box sx={{display: 'grid', marginTop: 3}}>
                <Button
                    disabled={!formState.isValid && formState.isSubmitted}
                    sx={{marginBottom: 3}}
                    type='submit'
                    variant='contained'
                >
                    Zaloguj się
                </Button>
                <Collapse in={hashValue !== pathAnchors.loginView.mentor}>
                    <Button
                        sx={{
                            width: '100%',
                            marginBottom: 3,
                            display: 'flex',
                            gap: 2,
                            borderRadius: '8px',
                            borderColor: 'base.40'
                        }}
                        color={'secondary'}
                        variant='outlined'
                        onClick={onGoogleLogin}
                    >
                        <GoogleIcon/>
                        Google
                    </Button>
                    <Box sx={{visibility: 'hidden', display: 'none'}} ref={googleButtonRef}></Box>
                </Collapse>
                <Typography color="base.80"  variant='body2' textAlign='center'>Nie masz jeszcze konta?{' '}
                    <TextLink
                        typographyProps={{variant: 'body2'}}
                        linkProps={{to: hashValue === pathAnchors.loginView.mentor ? paths.registerMentor : paths.registerMentee}}
                    >
                        Zarejestruj się
                    </TextLink>
                </Typography>
            </Box>
        </form>
    )
}

export default LoginView