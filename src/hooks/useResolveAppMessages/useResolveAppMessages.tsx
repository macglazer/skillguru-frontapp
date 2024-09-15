import {useUserMessages} from "../../reducers/userMessages/useUserMessages";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import paths from "../../paths";

const useResolveAppMessages = () => {
    // Use this logic to dispatch messages to the user
    const [_, dispatchMessage] = useUserMessages();

    const authState = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (!authState.user?.stripeIntegrationStatus && authState.user?.role === "M") {
            dispatchMessage({
                type: "SET_MESSAGE",
                payload: {
                    message: () => (
                        <span>
                            Konfiguracja Stripe jest wymagana, aby móc korzystać ze wszystkich funcjonalności aplikacji.
                            {' '}
                            <Link to={paths.payment}>Przejdź do konfiguracji</Link>
                        </span>
                    ),
                    severity: "warning"
                }
            });
        } else {
            dispatchMessage({type: "CLEAR_MESSAGE"});
        }
    }, [authState]);

}

export default useResolveAppMessages;