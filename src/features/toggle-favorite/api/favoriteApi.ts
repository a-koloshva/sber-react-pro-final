import { productsApi } from '../../../entities/product';
import type { ProductLike } from '../../../entities/product';

type SetLikeResponse = {
	like: ProductLike;
	message: string;
};

type DeleteLikeResponse = {
	product: ProductLike;
	message: string;
};

export const favoriteApi = productsApi.injectEndpoints({
	endpoints: (builder) => ({
		setLikeProduct: builder.mutation<
			SetLikeResponse,
			Pick<ProductLike, 'productId'>
		>({
			query: ({ productId }) => ({
				url: `/products/${productId}/likes`,
				method: 'PUT',
			}),
			invalidatesTags: (response) => [
				{ type: 'Products', id: 'list' },
				{ type: 'Products', id: response?.like.productId },
			],
		}),
		deleteLikeProduct: builder.mutation<
			DeleteLikeResponse,
			Pick<ProductLike, 'productId'>
		>({
			query: ({ productId }) => ({
				url: `/products/${productId}/likes`,
				method: 'DELETE',
			}),
			invalidatesTags: (response) => [
				{ type: 'Products', id: 'list' },
				{ type: 'Products', id: response?.product.productId },
			],
		}),
	}),
});

export const { useSetLikeProductMutation, useDeleteLikeProductMutation } =
	favoriteApi;
