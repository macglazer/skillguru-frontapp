import AppLayout from "../../../component/AppLayout";
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContextProvider";

const AccountView = () => {

    return (
        <AppLayout>
            <>
                <div>
                    <h1>Twoje Konto</h1>
                </div>
            </>
        </AppLayout>
    );
};

export default AccountView;