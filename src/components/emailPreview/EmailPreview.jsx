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

	const onPreviewClick = (emailId) => {
		if (!emailData.isRead) {
			const newEmail = { ...emailData, isRead: true };
			onUpdateEmail(newEmail);
		}
		navigate(`${pathname}/details/${emailId}`);
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
	};

	const onDeleteMail = async (event, emailId, removedAt) => {
		event.stopPropagation();
		if (!removedAt) {
			const currentTimestamp = Date.now();
			const emailToTrash = { ...emailData, removedAt: currentTimestamp };
			onUpdateEmail(emailToTrash);
		} else onRemoveEmail(emailId);
	};

	return (
		<div className='email-preview' data-is-read={emailData.isRead} onClick={() => onPreviewClick(emailData.id)}>
			<img src={emailData.isStarred ? fullStar : emptyStar} alt='star' onClick={onSetStar} />
			<div className='emails-preview-details'>
				<div className='from-email'>{emailData.from}</div>
				<div className='subject'>{emailData.subject}</div>
				<div className='body'>{emailData.body}</div>
				<div className='date'>{emailService.getSentAt(emailData.sentAt)}</div>
				<div className='email-options'>
					<img src={archive} alt='archive' />
					<img src={emailData.isRead ? unReadEmail : readEmail} alt='open email' onClick={onSetRead} />
					<img src={trash} alt='trash' onClick={(event) => onDeleteMail(event, emailData.id, emailData.removedAt)} />
				</div>
			</div>
		</div>
	);
};
