import { WithProtection } from '../../../features/auth';
import { WithQuery } from '../../../shared/ui/QueryState';
import { useFavoriteProducts } from '../../../features/toggle-favorite';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { CardList } from '../../../widgets/CardList';

const CardListWithQuery = WithQuery(CardList);

export const FavoritesPage = WithProtection(() => {
	const { isLoading, isError, products, error } = useFavoriteProducts();

	return (
		<>
			<br />
			<ButtonBack />
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</>
	);
});
