import { useGetProductsQuery } from '../../../entities/product';
import { catalogSelectors } from './catalogSlice';
import { useSelector } from 'react-redux';

export const useProducts = () => {
	const { searchText, page, perPage, sort } = useSelector(
		catalogSelectors.getProductsState
	);

	const { isLoading, isError, error, data, isFetching } = useGetProductsQuery({
		searchText,
		sort,
		page,
		perPage,
	});

	const products = data?.products || [];

	const productsCount = data?.length || 0;

	return {
		products,
		isLoading,
		isError,
		isFetching,
		error,
		productsCount,
	};
};
