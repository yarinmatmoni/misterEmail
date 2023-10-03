import { useState, useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { EmailFilter, EmailList, EmailFolderList } from '../../components/index';
import { emailService } from '../../services/email.service';
import { showUserMsg } from '../../services/event-bus.service';
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
	const [selectMails, setSelectMails] = useState([]);

	useEffect(() => {
		onUpdateUnreadEmail();
	}, [emails]);

	useEffect(() => {
		const addParams = emailService.addParams(searchParams);
		setSearchParams({ ...filterBy, ...sortBy, ...addParams });
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
			const emails = await emailService.query(filterBy, sortBy);
			setEmails(emails);
		} catch (error) {
			console.log('error:', error);
		}
	};

	const onRemoveEmail = async (email) => {
		try {
			if (!email.removedAt) {
				const currentTimestamp = Math.floor(Date.now() / 1000);
				const emailToTrash = { ...email, removedAt: currentTimestamp };
				await emailService.save(emailToTrash);
				showUserMsg('Conversation moved to Bin.');
			} else {
				await emailService.remove(email.id);
				showUserMsg('Conversation deleted forever.');
			}
			setEmails((prevEmails) => prevEmails.filter((e) => e.id !== email.id));
		} catch (error) {
			showUserMsg('Failed to remove conversation.');
			console.log('error:', error);
		}
	};

	const onUpdateEmail = async (updateEmail) => {
		try {
			await emailService.save(updateEmail);
			setEmails((prevEmails) => prevEmails.map((email) => (email.id === updateEmail.id ? updateEmail : email)));
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const onSendEmail = async (email) => {
		try {
			await emailService.save(email);
			loadMails();
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const onSaveDraftEmail = async (email) => {
		try {
			if (!email.id) await emailService.saveToDraft(email); // crate new draft
			else {
				const updateDraft = { ...email, isRead: true };
				await onUpdateEmail(updateDraft); // update the draft + mark as read
			}
			loadMails();
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const onUpdateUnreadEmail = async () => {
		try {
			const allEmails = await emailService.query({ inputSearch: '', mailStatus: 'all', folder: 'inbox' });
			setUnreadCount(allEmails.filter((email) => !email.isRead).length);
		} catch (error) {
			console.log('error:', error);
		}
	};

	const onSelectEmail = (emailId) => {
		if (!selectMails.includes(emailId)) setSelectMails((prevSelected) => [...prevSelected, emailId]);
		else setSelectMails((prevSelected) => prevSelected.filter((emailSelectedId) => emailSelectedId != emailId));
	};

	const onSelectAllEmails = (isSelectedAll) => {
		if (isSelectedAll) emails.map((email) => setSelectMails((prev) => [...prev, email.id]));
		else setSelectMails([]);
	};

	if (!emails) return <div>Loading..</div>;
	return (
		<div className='email-index'>
			<div className='aside-filter'>
				<EmailFolderList
					onSendEmail={onSendEmail}
					filterBy={{ folder: filterBy.folder }}
					onSetFilter={onSetFilter}
					unreadCount={unreadCount}
					onSaveDraftEmail={onSaveDraftEmail}
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
					onSelectAllEmails={onSelectAllEmails}
					selectedMailsSize={selectMails.length}
				/>
			</div>
			<div className='main'>
				{pathname.includes('details') ? (
					<EmailDetails onRemoveEmail={onRemoveEmail} />
				) : (
					<EmailList
						emails={emails}
						onRemoveEmail={onRemoveEmail}
						onUpdateEmail={onUpdateEmail}
						onSelectEmail={onSelectEmail}
						selectMails={selectMails}
					/>
				)}
			</div>
		</div>
	);
};
