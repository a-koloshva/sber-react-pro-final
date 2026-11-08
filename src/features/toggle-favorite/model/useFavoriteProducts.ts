import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../../entities/product';
import { userSelectors } from '../../../entities/user';
import { isLiked } from '../lib/isLiked';

export const useFavoriteProducts = () => {
	const user = useSelector(userSelectors.getUser);
	const { data, ...queryState } = useGetProductsQuery({
		searchText: '',
		page: 1,
	});
	const products = data?.products ?? [];

	return {
		...queryState,
		products: products.filter((product) => isLiked(product.likes, user?.id)),
	};
};
