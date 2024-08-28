// Libraries
import {NavigateFunction} from 'react-router-dom';
// Services
import paths from "../paths";
import {registerAccount} from "@services/auth/authenticationService";

export const register = (
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	agreement: boolean,
	navigate: NavigateFunction
) => {
	registerAccount(firstName, lastName, email, password, agreement)
		.then((res) => {
			navigate(paths.login);
		})
		.catch((err) => {
			console.log(err);
		});
};
