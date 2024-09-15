import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import paths from "../../paths";

const useResolveAppMessages = () => {
    // Use this logic to dispatch messages to the user
    const [_, dispatchMessage] = useUserMessages();

    const authState = useSelector((state: any) => state.auth);

    useEffect(() => {
        console.log('authState.user?.stripeIntegrationStatus: ',authState.user?.stripeIntegrationStatus)
        if (!authState.user?.stripeIntegrationStatus && authState.user?.role === "M") {
            dispatchMessage({
                type: "SET_MESSAGE",
                payload: {
                    message: "Konfiguracja Stripe jest wymagana, aby móc korzystać ze wszystkich funcjonalności aplikacji",
                    severity: "warning"
                }
            });
        } else {
            // dispatchMessage({type: "CLEAR_MESSAGE"});
            dispatchMessage({
                type: "SET_MESSAGE",
                payload: {
                    message: <div>
                        Konfiguracja Stripe jest wymagana, aby móc korzystać ze wszystkich funcjonalności aplikacji.
                        <Link to={paths.accountView}>Przejdź do konfiguracji</Link>
                    </div>,
                    severity: "warning"
                }
            });
        }
    }, [authState]);

}

export default useResolveAppMessages;