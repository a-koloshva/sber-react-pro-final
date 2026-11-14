import { useRef } from 'react';
import { Button } from '../../../shared/ui/Button';

export const ClickCounter = () => {
	const clickCountRef = useRef(0);

	return (
		<section>
			<p>Количество кликов: {clickCountRef.current}</p>
			<Button onClick={() => clickCountRef.current++}>Увеличить счётчик</Button>
			<p>Значение обновится при следующем рендере страницы.</p>
		</section>
	);
};
