import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailService } from '../../services/email.service';
import close from '../../assets/svgs/close.svg';
import './emailCompose.scss';

export const EmailCompose = () => {
	const navigate = useNavigate();
	const [editForm, setEditForm] = useState(emailService.getDefaultForm());

	const handleOnChange = (event) => {
		let { value, name: fieldName } = event.target;
		setEditForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
	};

	const handleSubmit = (event) => {
		//TODO: handleSubmit function
		event.preventDefault();
	};

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
			<form onSubmit={handleSubmit}>
				<label htmlFor='to'>
					To
					<input
						type='text'
						id='to'
						value={editForm.to}
						onChange={handleOnChange}
						name='to'
					/>
				</label>
				<label htmlFor='subject'>
					Subject
					<input
						type='text'
						id='subject'
						value={editForm.subject}
						onChange={handleOnChange}
						name='subject'
					/>
				</label>
				<textarea
					value={editForm.message}
					onChange={handleOnChange}
					name='message'
				/>
				<button>Send</button>
			</form>
		</div>
	);
};
