import { useState, useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { EmailFilter, EmailList, EmailFolderList } from '../../components/index';
import { emailService, loggedInUser } from '../../services/email.service';
import { EmailDetails } from '../emailDetails/EmailDetails';
import './emailIndex.scss';

export const EmailIndex = () => {
	const { pathname } = useLocation();
	const { folder } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [emails, setEmails] = useState(null);
	const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams, folder));
	const [sortBy, setSortBy] = useState(emailService.getSortByParams(searchParams));
	const [unreadCount, setUnreadCount] = useState(null);

	useEffect(() => {
		onUpdateUnreadEmail();
		loadMails();
	}, [emails]);

	useEffect(() => {
		setSearchParams({ ...filterBy, ...sortBy });
		loadMails();
	}, [filterBy, sortBy]);

	const onSetFilter = (fieldsToUpdate) => {
		setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }));
	};

	const onSetSort = (fieldsToSort) => {
		setSortBy((prevSortBy) => ({ ...prevSortBy, ...fieldsToSort }));
	};

	const loadMails = async () => {
		try {
			const emailsResponse = await emailService.query(filterBy, sortBy);
			setEmails(emailsResponse);
		} catch (error) {
			console.log('error:', error);
		}
	};

	const onRemoveEmail = async (emailId) => {
		try {
			await emailService.remove(emailId);
		} catch (error) {
			console.log('error:', error);
		}
	};

	const onUpdateEmail = async (updateEmail) => {
		try {
			await emailService.save(updateEmail);
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const onSaveEmail = async (email, saveAsDraft = false) => {
		try {
			if (saveAsDraft) {
				if (!email.id) await emailService.saveToDraft(email);
				else await onUpdateEmail(email);
			} else {
				await emailService.save(email);
			}
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const onUpdateUnreadEmail = async () => {
		try {
			const unReadEmailsResponse = await emailService.query();
			setUnreadCount(unReadEmailsResponse.filter((email) => !email.isRead && email.from !== loggedInUser.email).length);
		} catch (error) {
			console.log('error:', error);
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
					unreadCount={unreadCount}
				/>
			</div>
			<div className='top-filter'>
				<EmailFilter
					filterBy={{
						inputSearch: filterBy.inputSearch,
						mailStatus: filterBy.mailStatus,
					}}
					onSetFilter={onSetFilter}
					sortBy={sortBy}
					onSetSort={onSetSort}
				/>
			</div>
			<div className='main'>
				{pathname.includes('details') ? (
					<EmailDetails onRemoveEmail={onRemoveEmail} onUpdateEmail={onUpdateEmail} />
				) : (
					<EmailList emails={emails} onRemoveEmail={onRemoveEmail} onUpdateEmail={onUpdateEmail} />
				)}
			</div>
		</div>
	);
};
