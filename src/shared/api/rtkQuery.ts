import { fetchBaseQuery } from '@reduxjs/toolkit/query';

let selectAccessToken: ((state: unknown) => string | undefined) | undefined;

export const configureAccessTokenSelector = <State>(
	selector: (state: State) => string | undefined
) => {
	selectAccessToken = (state) => selector(state as State);
};

export const customBaseQuery = fetchBaseQuery({
	baseUrl: process.env.API_URL,
	prepareHeaders: (headers, { getState }) => {
		if (!selectAccessToken) {
			throw new Error('Access token selector must be configured by the app');
		}

		const accessToken = selectAccessToken(getState());

		if (accessToken) {
			headers.set('authorization', accessToken);
		}
		return headers;
	},
});
