import { combineReducers } from 'redux';
import { userSlice } from '../../entities/user';
import { cartSlice } from '../../entities/cart';
import { catalogSlice } from '../../features/product-catalog';
import { authApi } from '../../features/auth';
import { favoriteApi } from '../../features/toggle-favorite';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[catalogSlice.name]: catalogSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[favoriteApi.reducerPath]: favoriteApi.reducer,
});
