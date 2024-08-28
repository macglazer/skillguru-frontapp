import {useSnackbar} from "notistack";
import {RefObject, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {loginUserByGoogle} from "../helpers/login";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import paths from "../paths";


const useGoogleLogin = (buttonRef: RefObject<HTMLElement>) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const googleLoginFallback = () => {
        enqueueSnackbar({variant: "warning", message: 'Logowanie przez Google aktualnie nie jest dostępne'})
    }

    const [googleService, setGoogleService] = useState({click: googleLoginFallback});

    const onGoogleLogin = () => googleService.click();

    const handleGoogleLoginSuccess = async ({credential: token}: { credential: string }) => {
        try {
            const userData: { email: string } = jwtDecode(token) || {};

            const response = await loginUserByGoogle(userData.email, token);

            if (response.success) {
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        id: response.userData.id,
                        email: response.userData.email,
                        role: response.userData.role,
                        username: response.userData.username
                    },
                });
                navigate(paths.home);
            } else {
                throw new Error(response.errorMessage);
            }
        } catch (e) {
            console.error(e)
            enqueueSnackbar({variant: "error", message: 'Logowanie przez Google nie powiodło się'})
        }
    };

    useEffect(() => {
        if (!window.google) return;
        (window.google as any).accounts.id.initialize({
            client_id: '853231990547-b2o012vethlh2ooccr0fbrl8b9bqqh2g.apps.googleusercontent.com',
            callback: handleGoogleLoginSuccess,
        });

        (window.google as any).accounts.id.renderButton(buttonRef.current, {});

        const googleLoginWrapperButton: HTMLButtonElement = buttonRef.current?.querySelector('div[role=button]')!;

        setGoogleService({click: () => googleLoginWrapperButton.click()});
    }, [window.google]);

    return {onGoogleLogin}
};

export default useGoogleLogin;