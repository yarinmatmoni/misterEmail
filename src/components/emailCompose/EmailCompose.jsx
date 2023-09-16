import { useNavigate } from 'react-router-dom';
import close from '../../assets/svgs/close.svg';
import './emailCompose.scss';

export const EmailCompose = () => {
	const navigate = useNavigate();

	return (
		<div className='compose'>
			<div className='top-details'>
				<div className='top-title'>New Message</div>
				<img
					onClick={() => navigate('/email')}
					src={close}
					alt='close'
				/>
			</div>
			<form>FORM</form>
			<div className='options'>OPTIONS</div>
		</div>
	);
};
