import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailService } from '../../services/email.service';
import emptyStar from '../../assets/svgs/empty-star.svg';
import fullStar from '../../assets/svgs/full-star.svg';
import archive from '../../assets/svgs/archive.svg';
import readEmail from '../../assets/svgs/mark_email_read.svg';
import unReadEmail from '../../assets/svgs/unRead.svg';
import trash from '../../assets/svgs/trash.svg';
import './emailPreview.scss';

export const EmailPreview = ({ emailData, onRemoveEmail }) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState(emailData);

	useEffect(() => {
		updateEmail();
	}, [email]);

	const onPreviewClick = (emailId) => {
		navigate(`/email/${emailId}`);
	};

	const onSetStar = (event) => {
		event.stopPropagation();
		setEmail((prevEmail) => ({ ...prevEmail, isStarred: !prevEmail.isStarred }));
	};

	const onSetRead = (event) => {
		event.stopPropagation();
		setEmail((prevEmail) => ({ ...prevEmail, isRead: !prevEmail.isRead }));
	};

	const updateEmail = async () => {
		await emailService.save(email);
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
