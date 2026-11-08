import { CartItem } from '../../CartItem';
import s from '../../CartPage.module.css';
import classNames from 'classnames';
import { cartSelectors } from '../../../../../entities/cart';
import { useSelector } from 'react-redux';

export const CartList = () => {
	const products = useSelector(cartSelectors.getCartProducts);

	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<CartItem product={p} key={p.id} />
			))}
		</div>
	);
};
