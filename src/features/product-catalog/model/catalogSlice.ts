import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CatalogSort } from './types';

export type ProductsState = {
	sort: CatalogSort;
	page: number;
	perPage: number;
	searchText: string;
};

const initialState: ProductsState = {
	searchText: '',
	sort: 'newest',
	page: 1,
	perPage: 6,
};

export const catalogSlice = createSlice({
	name: 'products',
	initialState: initialState,
	reducers: {
		setSort: (state, action: PayloadAction<CatalogSort>) => ({
			...state,
			sort: action.payload,
		}),
		setSearchText: (state, action: PayloadAction<string>) => ({
			...state,
			searchText: action.payload,
		}),
		setPage: (state, action: PayloadAction<number>) => ({
			...state,
			page: action.payload,
		}),
	},

	selectors: {
		getSort: (state: ProductsState) => state.sort,
		getSearchText: (state: ProductsState) => state.searchText,
		getPage: (state: ProductsState) => state.page,
		getPerPage: (state: ProductsState) => state.perPage,
		getProductsState: (state: ProductsState) => state,
	},
});

export const catalogActions = { ...catalogSlice.actions };
export const catalogSelectors = catalogSlice.selectors;
