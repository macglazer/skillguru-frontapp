import React, {createContext, useEffect} from 'react';
import axios from "axios";

export const AuthContext = createContext({
});

const AuthContextProvider = (props) => {

	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response?.status === 401) {
				}
				return error;
			}
		);

		return () => {
			axios.interceptors.response.eject(interceptor);
		};
	}, []);

	const value = {};

	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
};

export default AuthContextProvider;
