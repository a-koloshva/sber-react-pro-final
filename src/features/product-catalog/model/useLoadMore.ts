import { RefObject, useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProducts } from './useProducts';
import { catalogActions, catalogSelectors } from './catalogSlice';

interface UseLoadMoreParams {
	ref: RefObject<HTMLDivElement>;
}
export const useLoadMore = ({ ref }: UseLoadMoreParams) => {
	const dispatch = useDispatch();

	const { products, isFetching, productsCount } = useProducts();

	const page = useSelector(catalogSelectors.getPage);

	const isEndOfList = products.length >= productsCount;

	const fetchMoreProducts = useCallback(() => {
		if (!isEndOfList && !isFetching) {
			dispatch(catalogActions.setPage(page + 1));
		}
	}, [isEndOfList, isFetching, page, dispatch]);

	useLayoutEffect(() => {
		let observer: IntersectionObserver | undefined = undefined;

		if (!isEndOfList && products.length) {
			const options: IntersectionObserverInit = { threshold: 0.5 };
			const callback: IntersectionObserverCallback = (entries) => {
				if (entries[0].isIntersecting) {
					fetchMoreProducts();
				}
			};
			observer = new IntersectionObserver(callback, options);
			ref.current && observer.observe(ref.current);
		}

		return () => {
			observer?.disconnect();
		};
	}, [fetchMoreProducts, isEndOfList, products.length, ref]);

	return { isEndOfList, isFetching };
};
