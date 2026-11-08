import { useCartProductCount } from '../model/useCartProductCount';
import s from './CartCounter.module.css';
import classNames from 'classnames';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

type TCartCounter = {
	productId: string;
};
export const CartCounter = ({ productId }: TCartCounter) => {
	const { count, stock, handleSetCount, handleIncrement, handleDecrement } =
		useCartProductCount(productId);

	const plusButtonDisabled = count >= stock;

	return (
		<>
			<div className={classNames(s['button-count'])}>
				<Button
					onClick={handleDecrement}
					className={classNames(s['button-count__minus'])}>
					-
				</Button>
				<Input
					onChange={handleSetCount}
					type='number'
					className={classNames(s['button-count__num'])}
					value={count}
				/>
				<Button
					onClick={handleIncrement}
					className={classNames(s['button-count__plus'])}
					disabled={plusButtonDisabled}>
					+
				</Button>
			</div>
		</>
	);
};
