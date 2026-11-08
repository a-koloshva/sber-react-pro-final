import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from '../../../shared/assets/icons/like.svg';
import classNames from 'classnames';
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

	const isLike = isLiked(product.likes, user?.id);

	const toggleLike = async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}
		let response;
		if (isLike) {
			response = await deleteLike({ productId: product.id });
		} else {
			response = await setLike({ productId: product.id });
		}

		if (response.error) {
			toast.error(
				getMessageFromError(response.error, 'Не удалось изменить избранное')
			);
		}
	};

	return (
		<Button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: isLike,
			})}
			onClick={toggleLike}>
			<LikeSvg />
		</Button>
	);
};
