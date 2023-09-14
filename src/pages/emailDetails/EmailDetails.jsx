import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { emailService } from '../../services/email.service';
import { EmailFolderList } from '../../components/emailFolderList/EmailFolderList';
import trash from '../../assets/svgs/trash.svg';
import back from '../../assets/svgs/arrow-back.svg';
import './emailDetails.scss';

export const EmailDetails = () => {
	const navigate = useNavigate();
	const { emailId } = useParams();
	const [email, setEmail] = useState(null);

	useEffect(() => {
		getEmailDetails();
	}, [emailId]);

	const getEmailDetails = async () => {
		try {
			const emailDetails = await emailService.getById(emailId);
			emailDetails.isRead = true;
			await emailService.save(emailDetails);
			setEmail(emailDetails);
		} catch (error) {
			console.log('error:', error);
		}
	};

	const onRemoveEmail = async () => {
		try {
			await emailService.remove(email.id);
			navigate('/email');
		} catch (error) {
			console.log('Error:', error);
		}
	};

	if (!email) return <div>Loading...</div>;
	return (
		<div className='email-details'>
			<EmailFolderList />
			<div className='container'>
				<div className='options'>
					<img
						src={back}
						alt='back'
						onClick={() => navigate('/email')}
					/>
					<img
						src={trash}
						alt='delete'
						onClick={onRemoveEmail}
					/>
				</div>
				<div className='email-content'>
					<div className='subject'>{email.subject}</div>
					<div className='from-email'>
						<div>
							<span>From :</span> {email.from}
						</div>
						<div>{email.sentAt}</div>
					</div>
					<div className='body-email'>{email.body}</div>
				</div>
			</div>
		</div>
	);
};
