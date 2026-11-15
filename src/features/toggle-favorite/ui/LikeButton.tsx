import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from '../../../shared/assets/icons/like.svg';
import classNames from 'classnames';
import { useOptimistic, useTransition } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../entities/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
} from '../api/favoriteApi';
import { toast } from 'react-toastify';
import { Button } from '../../../shared/ui/Button';
import { getMessageFromError } from '../../../shared/utils';
import { Product } from '../../../entities/product';
import { isLiked } from '../lib/isLiked';

type TLikeButtonProps = {
	product: Product;
};
export const LikeButton = ({ product }: TLikeButtonProps) => {
	const accessToken = useSelector(userSelectors.getAccessToken);
	const user = useSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();
	const [isPending, startTransition] = useTransition();

	const isLikedByUser = isLiked(product.likes, user?.id);
	const [optimisticIsLiked, setOptimisticIsLiked] =
		useOptimistic(isLikedByUser);

	const toggleLike = () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		if (isPending) return;

		const nextIsLiked = !optimisticIsLiked;
		startTransition(async () => {
			setOptimisticIsLiked(nextIsLiked);

			try {
				if (nextIsLiked) {
					await setLike({ productId: product.id }).unwrap();
				} else {
					await deleteLike({ productId: product.id }).unwrap();
				}
			} catch (error) {
				toast.error(
					getMessageFromError(error, 'Не удалось изменить избранное')
				);
			}
		});
	};

	return (
		<Button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: optimisticIsLiked,
			})}
			aria-pressed={optimisticIsLiked}
			disabled={isPending}
			onClick={toggleLike}>
			<LikeSvg />
		</Button>
	);
};
