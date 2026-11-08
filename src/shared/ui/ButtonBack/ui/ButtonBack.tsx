import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackSvg } from './../../../assets/icons/back.svg';
import { Button } from '../../Button';

export const ButtonBack = () => {
	const navigate = useNavigate();

	const handleBack = () => navigate(-1);

	return (
		<Button onClick={handleBack}>
			<BackSvg />
		</Button>
	);
};
