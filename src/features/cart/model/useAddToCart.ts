import { CartProduct, cartActions } from '../../../entities/cart';
import { useDispatch } from 'react-redux';

export const useAddToCart = () => {
	const dispatch = useDispatch();
	const addProductToCart = (cartProduct: CartProduct) => {
		dispatch(cartActions.addCartProduct(cartProduct));
	};

	return { addProductToCart };
};
