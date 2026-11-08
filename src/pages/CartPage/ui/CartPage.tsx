import s from './CartPage.module.css';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { cartSelectors } from '../../../entities/cart';
import { CartList } from './CartList';
import { CartAmount } from './CartAmount';

export const CartPage = () => {
	const products = useSelector(cartSelectors.getCartProducts);

	if (!products.length) {
		return <h1 className='header-title'>Товаров нет корзине</h1>;
	}

	return (
		<div className={classNames(s['content'], s['container'])}>
			<div className={classNames(s['content-cart'])}>
				<div className={classNames(s['cart-title'])}>
					<span>{products.length}</span> в корзине
				</div>
				<CartList />
				<CartAmount />
			</div>
		</div>
	);
};
