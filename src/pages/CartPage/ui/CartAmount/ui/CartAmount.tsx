import { useCallback, useMemo } from 'react';
import s from '../../CartPage.module.css';
import classNames from 'classnames';
import { cartSelectors } from '../../../../../entities/cart';
import { useSelector } from 'react-redux';
import { Button } from '../../../../../shared/ui/Button';

export const CartAmount = () => {
	const products = useSelector(cartSelectors.getCartProducts);

	const { allPrice, allDiscount } = useMemo(
		() =>
			products.reduce(
				(totals, product) => ({
					allPrice: totals.allPrice + product.price * product.count,
					allDiscount: totals.allDiscount + product.discount * product.count,
				}),
				{ allPrice: 0, allDiscount: 0 }
			),
		[products]
	);

	const handleSubmitCart = useCallback(() => {
		const order = products.map((p) => ({ id: p.id, count: p.count }));
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2));
	}, [products]);

	return (
		<div className={classNames(s['cart-amount'])}>
			<h1 className={classNames(s['cart-amount__title'])}>Ваша корзина</h1>
			<div className={classNames(s['cart-amount__table'])}>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						{`Товары (${products.length})`}
					</span>
					<span className={classNames(s['cart-amount__table-value'])}>
						{`${allPrice} ₽`}
					</span>
				</div>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						Скидка
					</span>
					<span
						className={classNames(
							s['cart-amount__table-value'],
							s['cart-amount__table-value-discount']
						)}>
						{`${allDiscount} ₽`}
					</span>
				</div>
			</div>
			<div className={classNames(s['cart-amount__total-cost'])}>
				<h2 className={classNames(s['cart-amount__total-cost-title'])}>
					Общая стоимость
				</h2>
				<span className={classNames(s['cart-amount__total-cost-value'])}>
					{`${allPrice - allDiscount} ₽`}
				</span>
			</div>
			<Button
				onClick={handleSubmitCart}
				className={classNames(
					s['button'],
					s['button_type_primary'],
					s['button_type_wide']
				)}>
				Оформить заказ
			</Button>
		</div>
	);
};
