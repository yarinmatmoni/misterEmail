import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { emailService } from '../../services/email.service';
import emptyStar from '../../assets/svgs/empty-star.svg';
import fullStar from '../../assets/svgs/full-star.svg';
import archive from '../../assets/svgs/archive.svg';
import readEmail from '../../assets/svgs/mark_email_read.svg';
import unReadEmail from '../../assets/svgs/unRead.svg';
import trash from '../../assets/svgs/trash.svg';
import './emailPreview.scss';

export const EmailPreview = ({ emailData, onRemoveEmail, onUpdateEmail }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [email, setEmail] = useState(emailData);

	const onPreviewClick = (emailId) => {
		navigate(`${pathname}/details/${emailId}`);
	};

	const onSetStar = async (event) => {
		event.stopPropagation();
		emailData.isStarred = !emailData.isStarred;
		setEmail(await onUpdateEmail(emailData));
	};

	const onSetRead = async (event) => {
		event.stopPropagation();
		emailData.isRead = !emailData.isRead;
		setEmail(await onUpdateEmail(emailData));
	};

	return (
		<div
			className='email-preview'
			data-is-read={email.isRead}
			onClick={() => onPreviewClick(email.id)}
		>
			<img
				src={email.isStarred ? fullStar : emptyStar}
				alt='star'
				onClick={onSetStar}
			/>
			<div className='emails-preview-details'>
				<div className='from-email'>{email.from}</div>
				<div className='subject'>{email.subject}</div>
				<div className='body'>{email.body}</div>
				<div className='date'>{emailService.getSentAt(email.sentAt)}</div>
				<div className='email-options'>
					<img
						src={archive}
						alt='archive'
					/>
					<img
						src={email.isRead ? unReadEmail : readEmail}
						alt='open email'
						onClick={onSetRead}
					/>
					<img
						src={trash}
						alt='trash'
						onClick={(event) => onRemoveEmail(event, email.id)}
					/>
				</div>
			</div>
		</div>
	);
};
