import s from './ProductCartCounter.module.css';
import classNames from 'classnames';
import { useNewCartProductCount } from '../model/useNewCartProductCount';
import { useAddToCart } from '../model/useAddToCart';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { Product } from '../../../entities/product';

type ProductCartCounterProps = {
	product: Product;
};
export const ProductCartCounter = ({ product }: ProductCartCounterProps) => {
	const { count, handleCount, handleCountMinus, handleCountPlus } =
		useNewCartProductCount();
	const { addProductToCart } = useAddToCart();

	const handleAddToCart = () => addProductToCart({ ...product, count });

	return (
		<div className={classNames('product__btn-wrap')}>
			<div className={s['button-count']}>
				<Button className={s['button-count__minus']} onClick={handleCountMinus}>
					-
				</Button>
				<Input
					type='number'
					className={s['button-count__num']}
					value={count}
					onChange={handleCount}
				/>
				<Button className={s['button-count__plus']} onClick={handleCountPlus}>
					+
				</Button>
			</div>
			<Button
				onClick={handleAddToCart}
				className={classNames(s['button'], s['button_type_primary'])}>
				В корзину
			</Button>
		</div>
	);
};
