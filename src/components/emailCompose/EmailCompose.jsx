import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { emailService } from '../../services/email.service';
import close from '../../assets/svgs/close.svg';
import openFullScreen from '../../assets/svgs/open_in_full.svg';
import closeFullScreen from '../../assets/svgs/close_full_screen.svg';
import minimize from '../../assets/svgs/minimize.svg';
import maximize from '../../assets/svgs/maximize.svg';
import './emailCompose.scss';

export const EmailCompose = () => {
	const timeoutId = useRef();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { emailId } = useParams();
	const { onSendEmail, onSaveDraftEmail } = useOutletContext();
	const [editForm, setEditForm] = useState(emailService.getDefaultForm());
	const [viewState, setViewState] = useState('normal');
	const [draft, setDraft] = useState(editForm);
	const [title, setTitle] = useState('New Message');
	const [searchParams] = useSearchParams();
	const [isLocation, setIsLocation] = useState(false);

	useEffect(() => {
		timeoutId.current = setTimeout(() => {
			setDraft((prevDraft) => ({ ...prevDraft, ...editForm }));
			setTitle('Save as draft');
		}, 5000);

		return () => clearTimeout(timeoutId.current);
	}, [editForm]);

	useEffect(() => {
		loadEmail();
	}, []);

	const loadEmail = async () => {
		if (emailId) {
			const email = await emailService.getById(emailId);
			setEditForm(email);
		}
	};

	const handleOnChange = (event) => {
		let { value, name: fieldName } = event.target;
		setEditForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (isLocation) {
			const { lat, lng } = await emailService.getUserLCordinates();
			const emailToSent = { ...editForm, sentAt: Math.floor(Date.now() / 1000), lat, lng };
			onSendEmail(emailToSent);
		} else {
			const emailToSent = { ...editForm, sentAt: Math.floor(Date.now() / 1000) };
			onSendEmail(emailToSent);
		}
		navigate(emailService.navigateTo(pathname, 'list'));
	};

	const onClose = () => {
		if (!emailId) onSaveDraftEmail(draft);
		else onSaveDraftEmail(editForm);
		navigate(emailService.navigateTo(pathname, 'list'));
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
					<div className='top-title'>{title}</div>
					<img
						src={viewState === 'minimize' ? maximize : minimize}
						alt='minimize'
						onClick={() => handleViewState('minimize')}
						className='min'
					/>
					<img
						src={viewState === 'fullScreen' ? closeFullScreen : openFullScreen}
						alt='full screen'
						onClick={() => handleViewState('fullScreen')}
						className='full'
					/>
					<img onClick={onClose} src={close} alt='close' />
				</div>
				<form onSubmit={handleSubmit}>
					<label htmlFor='to'>
						To
						<input
							type='email'
							autoComplete='off'
							id='to'
							value={searchParams.get('to') || editForm.to}
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
							value={searchParams.get('sub') || editForm.subject}
							onChange={handleOnChange}
							name='subject'
						/>
					</label>
					<textarea value={editForm.body} onChange={handleOnChange} name='body' />
					<div className='location'>
						<input
							type='checkbox'
							name='location'
							id='location'
							checked={isLocation}
							onChange={() => setIsLocation(!isLocation)}
						/>
						<label htmlFor='location'>Add my Location</label>
					</div>
					<button>Send</button>
				</form>
			</div>
		</>
	);
};
