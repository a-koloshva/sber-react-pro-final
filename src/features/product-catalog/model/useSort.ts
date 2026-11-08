import { useDispatch, useSelector } from 'react-redux';
import { catalogActions, catalogSelectors } from './catalogSlice';
import { CatalogSort } from './types';

interface SortParams {
	title: string;
	value: CatalogSort;
	href: string;
}
export const useSort = () => {
	const dispatch = useDispatch();

	const sort = useSelector(catalogSelectors.getSort);

	const setSort = (newSort: CatalogSort) => {
		dispatch(catalogActions.setSort(newSort));
	};

	const sortParams: SortParams[] = [
		{
			title: 'Дешевые',
			value: 'low-price',
			href: '#',
		},
		{
			title: 'Дорогие',
			value: 'high-price',
			href: '#',
		},
		{
			title: 'Новые',
			value: 'newest',
			href: '#',
		},
		{
			title: 'Старые',
			value: 'oldest',
			href: '#',
		},
	];
	return { sort, setSort, sortParams };
};
