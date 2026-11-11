import { useMemo } from 'react';
import { Card } from './Card';
import s from './CardList.module.css';
import { Product } from '../../../entities/product';

type CardListProps = {
	title: string;
	products: Product[];
};
export const CardList = ({ title, products }: CardListProps) => {
	const cards = useMemo(
		() =>
			products.map((product) => <Card key={product.id} product={product} />),
		[products]
	);

	if (!products.length) {
		return <h1 className='header-title'>Товар не найден</h1>;
	}

	return (
		<div className={s['card-list']}>
			<div className={s['card-list__header']}>
				<h2 className={s['card-list__title']}>{title}</h2>
			</div>
			<div className={s['card-list__items']}>{cards}</div>
		</div>
	);
};
