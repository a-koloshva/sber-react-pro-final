import { ChangeEvent } from 'react';
import { cartActions, cartSelectors } from '../../../entities/cart';
import { useDispatch, useSelector } from 'react-redux';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useCartProductCount = (productId: string) => {
	const dispatch = useDispatch();
	const product = useSelector(
		(state: Parameters<typeof cartSelectors.getCartProducts>[0]) =>
			cartSelectors
				.getCartProducts(state)
				.find((cartProduct) => cartProduct.id === productId)
	);

	if (!product) {
		throw new Error(`Cart product ${productId} was not found`);
	}
	const { id, count, stock } = product;
	const handleIncrement = () => {
		const newCount = count + 1;
		const validCount = newCount > MAX_COUNT ? MAX_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	const handleDecrement = () => {
		const newCount = count - 1;
		const validCount = newCount < MIN_COUNT ? MIN_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	const handleSetCount = (e: ChangeEvent<HTMLInputElement>) => {
		const newCount = +e.target.value;
		const validCount =
			newCount > MAX_COUNT
				? MAX_COUNT
				: newCount < MIN_COUNT
				? MIN_COUNT
				: newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	return { count, stock, handleSetCount, handleIncrement, handleDecrement };
};
