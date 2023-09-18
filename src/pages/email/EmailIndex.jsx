import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { EmailFilter } from '../../components/emailFilter/EmailFilter';
import { EmailList } from '../../components/emailList/EmailList';
import { emailService } from '../../services/email.service';
import { EmailFolderList } from '../../components/emailFolderList/EmailFolderList';
import { EmailDetails } from '../emailDetails/EmailDetails';
import './emailIndex.scss';

export const EmailIndex = () => {
	const { state, pathname } = useLocation();
	const [emails, setEmails] = useState(null);
	const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

	useEffect(() => {
		loadMails();
	}, [filterBy, state]);

	const onSetFilter = (fieldsToUpdate) => {
		setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }));
	};

	const loadMails = async () => {
		try {
			const emailsResponse = await emailService.query(filterBy);
			setEmails(emailsResponse);
		} catch (error) {
			console.log('error:', error);
		}
	};

	const onRemoveEmail = async (event, emailId) => {
		event.stopPropagation();
		try {
			await emailService.remove(emailId);
			setEmails((prevEmails) => prevEmails.filter((email) => email.id !== emailId));
		} catch (error) {
			console.log('error:', error);
		}
	};

	if (!emails) return <div>Loading..</div>;
	return (
		<div className='email-index'>
			<div className='aside-filter'>
				<EmailFolderList />
			</div>
			<div className='top-filter'>
				<EmailFilter
					filterBy={filterBy}
					onSetFilter={onSetFilter}
				/>
			</div>
			<div className='main'>
				{pathname.includes('details') ? (
					<EmailDetails />
				) : (
					<EmailList
						emails={emails}
						onRemoveEmail={onRemoveEmail}
					/>
				)}
			</div>
		</div>
	);
};
