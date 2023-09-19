import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { emailService } from '../../services/email.service';
import close from '../../assets/svgs/close.svg';
import './emailCompose.scss';

export const EmailCompose = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [editForm, setEditForm] = useState(emailService.getDefaultForm());

	const handleOnChange = (event) => {
		let { value, name: fieldName } = event.target;
		setEditForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const newEmail = await emailService.save(editForm);
			navigate(`/email/${pathname.split('/')[2]}`, { state: newEmail });
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='compose'>
			<div className='top-details'>
				<div className='top-title'>New Message</div>
				<img
					onClick={() => navigate(`/email/${pathname.split('/')[2]}`)}
					src={close}
					alt='close'
				/>
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
	);
};
