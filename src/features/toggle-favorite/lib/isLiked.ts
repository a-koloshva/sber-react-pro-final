import type { ProductLike } from '../../../entities/product';

export const isLiked = (likes: ProductLike[], userId: string | undefined) =>
	likes.some((favorite) => favorite.userId === userId);
