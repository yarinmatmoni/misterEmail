import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EmailFilter } from '../../components/emailFilter/EmailFilter';
import { EmailList } from '../../components/emailList/EmailList';
import { emailService } from '../../services/email.service';
import { EmailFolderList } from '../../components/emailFolderList/EmailFolderList';
import { EmailDetails } from '../emailDetails/EmailDetails';
import './emailIndex.scss';

export const EmailIndex = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [emails, setEmails] = useState(null);
	const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

	useEffect(() => {
		loadMails();
	}, [filterBy]);

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
			setEmails((prevEmails) =>
				prevEmails.filter((email) => email.id !== emailId),
			);
		} catch (error) {
			console.log('error:', error);
		}
	};

	const onUpdateEmail = async (updateEmail) => {
		try {
			const updatedEmail = await emailService.save(updateEmail);
			setEmails((prevEmails) =>
				prevEmails.map((email) =>
					email.id === updateEmail.id ? updatedEmail : email,
				),
			);
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const onSaveEmail = async (email) => {
		try {
			const emailToSave = await emailService.save(email);
			setEmails((prevEmails) => [emailToSave, ...prevEmails]);
			navigate(`/email/${pathname.split('/').at(-2)}`);
		} catch (error) {
			console.log('Error:', error);
		}
	};

	if (!emails) return <div>Loading..</div>;
	return (
		<div className='email-index'>
			<div className='aside-filter'>
				<EmailFolderList
					onSaveEmail={onSaveEmail}
					filterBy={{ folder: filterBy.folder }}
					onSetFilter={onSetFilter}
				/>
			</div>
			<div className='top-filter'>
				<EmailFilter
					filterBy={{
						inputSearch: filterBy.inputSearch,
						mailStatus: filterBy.mailStatus,
					}}
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
						onUpdateEmail={onUpdateEmail}
					/>
				)}
			</div>
		</div>
	);
};
