import { useNavigate, useLocation } from 'react-router-dom';
import { emailService } from '../../services/email.service';
import { showUserMsg } from '../../services/event-bus.service';
import emptyStar from '../../assets/svgs/empty-star.svg';
import fullStar from '../../assets/svgs/full-star.svg';
import readEmail from '../../assets/svgs/mark_email_read.svg';
import unReadEmail from '../../assets/svgs/unRead.svg';
import trash from '../../assets/svgs/trash.svg';
import './emailPreview.scss';

export const EmailPreview = ({ emailData, onRemoveEmail, onUpdateEmail, onSelectEmail, selectMails }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const onPreviewClick = (emailId) => {
		if (!emailData.isRead) {
			const newEmail = { ...emailData, isRead: true };
			onUpdateEmail(newEmail);
		}

		if (emailData.sentAt) navigate(emailService.navigateTo(pathname, 'details', emailId));
		else navigate(emailService.navigateTo(pathname, 'compose', emailId));
	};

	const onSetStar = async (event) => {
		event.stopPropagation();
		const newEmail = { ...emailData, isStarred: !emailData.isStarred };
		onUpdateEmail(newEmail);
	};

	const onSetRead = async (event) => {
		event.stopPropagation();
		const newEmail = { ...emailData, isRead: !emailData.isRead };
		onUpdateEmail(newEmail);
		if (newEmail.isRead) showUserMsg('Conversation marked as read.');
		else showUserMsg('Conversation marked as unread.');
	};

	const onDeleteMail = async (event) => {
		event.stopPropagation();
		await onRemoveEmail(emailData);
	};

	return (
		<div className='email-preview' data-is-read={emailData.isRead}>
			<input
				type='checkbox'
				onChange={() => onSelectEmail(emailData.id)}
				checked={selectMails.includes(emailData.id)}
			/>
			<div className='emails-preview-details' onClick={() => onPreviewClick(emailData.id)}>
				<img src={emailData.isStarred ? fullStar : emptyStar} alt='star' onClick={onSetStar} />
				{!emailData.sentAt ? <div className='draft'>Draft</div> : <div className='from-email'>{emailData.from}</div>}
				<div className='subject'>{emailData.subject || '[no subject]'}</div>
				<div className='body'>{emailData.body || '[no body]'}</div>
				<div className='date'>{emailData.sentAt && emailService.getSentAt(emailData.sentAt)}</div>
				<div className='email-options'>
					<img src={emailData.isRead ? unReadEmail : readEmail} alt='open email' onClick={onSetRead} />
					<img src={trash} alt='trash' onClick={(event) => onDeleteMail(event)} />
				</div>
			</div>
		</div>
	);
};
