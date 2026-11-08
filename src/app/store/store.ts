import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { authApi } from '../../features/auth';
import { productsApi } from '../../entities/product';
import { userSelectors } from '../../entities/user';
import { configureAccessTokenSelector } from '../../shared/api/rtkQuery';

configureAccessTokenSelector((state: ReturnType<typeof rootReducer>) =>
	userSelectors.getAccessToken(state)
);

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([authApi.middleware, productsApi.middleware]),
});
