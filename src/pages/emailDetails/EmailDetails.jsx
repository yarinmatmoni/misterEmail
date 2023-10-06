import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleMap } from '../../components/googleMap/GoogleMap';
import { useParams } from 'react-router-dom';
import { emailService } from '../../services/email.service';
import trash from '../../assets/svgs/trash.svg';
import back from '../../assets/svgs/arrow-back.svg';
import './emailDetails.scss';

export const EmailDetails = ({ onRemoveEmail }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { emailId } = useParams();
	const [email, setEmail] = useState(null);

	useEffect(() => {
		getEmailDetails();
	}, [emailId]);

	const getEmailDetails = async () => {
		try {
			const emailDetails = await emailService.getById(emailId);
			setEmail(emailDetails);
		} catch (error) {
			console.log('error:', error);
		}
	};

	const handleBack = () => {
		navigate(emailService.navigateTo(pathname, 'list'));
	};

	const handleOnRemove = async () => {
		await onRemoveEmail(email);
		navigate(emailService.navigateTo(pathname, 'list'));
	};

	return (
		<>
			{!email ? (
				<div>Loading...</div>
			) : (
				<div className='container'>
					<div className='options'>
						<img src={back} alt='back' onClick={handleBack} />
						<img src={trash} alt='delete' onClick={handleOnRemove} />
					</div>
					<div className='email-content'>
						<div className='subject'>{email.subject}</div>
						<div className='from-email'>
							<div>
								<span>{`${pathname.includes('sent') ? 'TO :' : 'From :'}`}</span> {email.from}
							</div>
							<div>{emailService.getSentAt(email.sentAt)}</div>
						</div>
						<div className='body-email'>{email.body}</div>
						{email.lat && email.lng && <GoogleMap lat={email.lat} lng={email.lng} />}
					</div>
				</div>
			)}
		</>
	);
};
