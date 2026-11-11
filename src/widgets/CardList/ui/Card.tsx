import classNames from 'classnames';
import s from './Card.module.css';
import { Price } from '../../../shared/ui/Price';
import { Link } from 'react-router-dom';
import { LikeButton } from '../../../features/toggle-favorite';
import { useSelector } from 'react-redux';
import { cartSelectors } from '../../../entities/cart';
import { useAddToCart, CartCounter } from '../../../features/cart';
import { Button } from '../../../shared/ui/Button';
import { Product } from '../../../entities/product';
import { useCallback, useMemo } from 'react';

type CardProps = {
	product: Product;
};
export const Card = ({ product }: CardProps) => {
	const { discount, price, name, tags, id, images } = product;
	const cartProducts = useSelector(cartSelectors.getCartProducts);
	const isProductInCart = useMemo(
		() => cartProducts.some((p) => p.id === id),
		[cartProducts, id]
	);
	const { addProductToCart } = useAddToCart();

	const handleAddToCart = useCallback(
		() => addProductToCart({ ...product, count: 1 }),
		[addProductToCart, product]
	);

	return (
		<article className={s['card']}>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-left']
				)}>
				<span className={s['card__discount']}>{discount}</span>
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-right']
				)}>
				<LikeButton product={product} />
			</div>
			<Link className={s['card__link']} to={`/products/${id}`}>
				<img
					src={images}
					alt={name}
					className={s['card__image']}
					loading='lazy'
				/>
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			{isProductInCart ? (
				<CartCounter productId={id} />
			) : (
				<Button
					onClick={handleAddToCart}
					disabled={isProductInCart}
					className={classNames(
						s['card__cart'],
						s['card__btn'],
						s['card__btn_type_primary']
					)}>
					В корзину
				</Button>
			)}
		</article>
	);
};
