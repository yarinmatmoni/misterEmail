import { useState } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { emailService } from '../../services/email.service';
import close from '../../assets/svgs/close.svg';
import openFullScreen from '../../assets/svgs/open_in_full.svg';
import closeFullScreen from '../../assets/svgs/close_full_screen.svg';
import minimize from '../../assets/svgs/minimize.svg';
import maximize from '../../assets/svgs/maximize.svg';
import './emailCompose.scss';

export const EmailCompose = () => {
	const navigate = useNavigate();
	const { onSaveEmail } = useOutletContext();
	const { pathname } = useLocation();
	const [editForm, setEditForm] = useState(emailService.getDefaultForm());
	const [viewState, setViewState] = useState('normal');

	const handleOnChange = (event) => {
		let { value, name: fieldName } = event.target;
		setEditForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		onSaveEmail(editForm);
	};

	const handleViewState = (view) => {
		switch (view) {
			case 'minimize': {
				if (viewState === 'normal' || viewState === 'fullScreen') setViewState('minimize');
				else setViewState('normal');
				break;
			}
			case 'fullScreen': {
				if (viewState === 'normal' || viewState === 'minimize') setViewState('fullScreen');
				else setViewState('normal');
				break;
			}
			default:
				setViewState('normal');
		}
	};

	return (
		<>
			{viewState === 'fullScreen' && <div className='dark'></div>}
			<div className={`compose ${viewState}`}>
				<div className='top-details'>
					<div className='top-title'>New Message</div>
					<img
						src={viewState === 'minimize' ? maximize : minimize}
						alt='minimize'
						onClick={() => handleViewState('minimize')}
					/>
					<img
						src={viewState === 'fullScreen' ? closeFullScreen : openFullScreen}
						alt='full screen'
						onClick={() => handleViewState('fullScreen')}
					/>
					<img onClick={() => navigate(`/email/${pathname.split('/')[2]}`)} src={close} alt='close' />
				</div>
				<form onSubmit={handleSubmit}>
					<label htmlFor='to'>
						To
						<input
							type='email'
							autoComplete='off'
							id='to'
							value={editForm.to}
							onChange={handleOnChange}
							name='to'
							required
						/>
					</label>
					<label htmlFor='subject'>
						Subject
						<input
							type='text'
							autoComplete='off'
							id='subject'
							value={editForm.subject}
							onChange={handleOnChange}
							name='subject'
						/>
					</label>
					<textarea value={editForm.body} onChange={handleOnChange} name='body' />
					<button>Send</button>
				</form>
			</div>
		</>
	);
};
