import { WithProtection } from '../../../features/auth';
import { WithQuery } from '../../../shared/ui/QueryState';
import { LoadMore, useProducts } from '../../../features/product-catalog';
import { CardList } from '../../../widgets/CardList';
import { ClickCounter } from './ClickCounter';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<>
			<ClickCounter />
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	);
});
