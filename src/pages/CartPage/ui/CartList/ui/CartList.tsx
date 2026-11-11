import { useMemo } from 'react';
import { CartItem } from '../../CartItem';
import s from '../../CartPage.module.css';
import classNames from 'classnames';
import { cartSelectors } from '../../../../../entities/cart';
import { useSelector } from 'react-redux';

export const CartList = () => {
	const products = useSelector(cartSelectors.getCartProducts);
	const items = useMemo(
		() =>
			products.map((product) => (
				<CartItem product={product} key={product.id} />
			)),
		[products]
	);

	return <div className={classNames(s['cart-list'])}>{items}</div>;
};
