import { CartProduct, cartActions } from '../../../entities/cart';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

export const useAddToCart = () => {
	const dispatch = useDispatch();
	const addProductToCart = useCallback(
		(cartProduct: CartProduct) => {
			dispatch(cartActions.addCartProduct(cartProduct));
		},
		[dispatch]
	);

	return { addProductToCart };
};
