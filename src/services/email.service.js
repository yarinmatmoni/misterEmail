import { storageService } from './async-storage.service';
import { utilService } from './util.service';
import inboxIcon from '../assets/svgs/inbox.svg';
import starredIcon from '../assets/svgs/empty-star.svg';
import sentIcon from '../assets/svgs/send.svg';
import draftIcon from '../assets/svgs/draft.svg';
import trashIcon from '../assets/svgs/trash.svg';

export const emailService = {
	query,
	getFilterFromParams,
	getDefaultForm,
	save,
	remove,
	getById,
	getSentAt,
	getSortByParams,
	saveToDraft,
	navigateTo,
};

export const loggedInUser = {
	email: 'user@appsus.com',
	fullName: 'Yarin Matmoni',
};

export const folderList = [
	{ name: 'inbox', icon: inboxIcon },
	{ name: 'starred', icon: starredIcon },
	{ name: 'sent', icon: sentIcon },
	{ name: 'draft', icon: draftIcon },
	{ name: 'trash', icon: trashIcon },
];

const STORAGE_KEY = 'emails';

_createEmails();

async function query(filterBy, sortBy) {
	let emails = await storageService.query(STORAGE_KEY);

	if (filterBy) {
		let { inputSearch, mailStatus, folder } = filterBy;

		switch (folder) {
			case 'starred': {
				emails = emails.filter((email) => email.isStarred);
				break;
			}
			case 'sent': {
				emails = emails.filter((email) => email.from === loggedInUser.email && email.sentAt);
				break;
			}
			case 'trash': {
				emails = emails.filter((email) => email.removedAt);
				break;
			}
			case 'draft': {
				emails = emails.filter((email) => !email.sentAt && !email.removedAt);
				break;
			}
			default: {
				emails = emails.filter((email) => !email.removedAt && email.from !== loggedInUser.email);
				break;
			}
		}

		emails = emails.filter(
			(email) =>
				(!email.isRead && mailStatus === 'unread' && email.subject.toLowerCase().includes(inputSearch.toLowerCase())) ||
				(email.isRead && mailStatus === 'read' && email.subject.toLowerCase().includes(inputSearch.toLowerCase())) ||
				(mailStatus === 'all' && email.subject.toLowerCase().includes(inputSearch.toLowerCase())),
		);
	}

	emails.sort((a, b) => {
		if (a.sentAt !== b.sentAt) {
			return sortBy?.date * (b.sentAt - a.sentAt);
		} else {
			return sortBy?.subject * a.subject.localeCompare(b.subject, undefined, { sensitivity: 'base' });
		}
	});

	return emails;
}

function getById(id) {
	return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
	return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
	if (emailToSave.id) {
		return storageService.put(STORAGE_KEY, emailToSave);
	} else {
		return storageService.post(
			STORAGE_KEY,
			createEmail(emailToSave.subject, emailToSave.body, null, null, Math.floor(Date.now() / 1000)),
		);
	}
}

function saveToDraft(emailToSave) {
	return storageService.post(
		STORAGE_KEY,
		createEmail(emailToSave.subject, emailToSave.body, null, null, null, null, emailToSave.to),
	);
}

function createEmail(
	subject = '[no subject]',
	body = '[no body]',
	isRead = false,
	isStarred = false,
	sentAt = null,
	from = loggedInUser.email,
	to,
) {
	return {
		id: utilService.makeId(),
		subject: subject,
		body: body,
		isRead: isRead,
		isStarred: isStarred,
		sentAt: sentAt,
		removedAt: null,
		from: from,
		to: to,
	};
}

function _createEmails() {
	let emails = utilService.loadFromStorage(STORAGE_KEY);
	if (!emails || !emails.length) {
		emails = [];

		for (let i = 0; i < 20; i++) {
			let mail = createEmail('Miss You!' + i, 'Body - Miss You' + i, null, null, Math.floor(Date.now() / 1000));
			emails.push(mail);
		}

		for (let i = 0; i < 20; i++) {
			let mail = createEmail(
				'Miss You!' + i,
				'Body - Miss You' + i,
				null,
				null,
				Math.floor(Date.now() / 1000),
				'yarinmatmoni@gmail.com',
				loggedInUser.email,
			);
			emails.push(mail);
		}

		utilService.saveToStorage(STORAGE_KEY, emails);
	}
}

function getFilterFromParams(searchParams, folder) {
	const filterBy = {
		inputSearch: searchParams.get('inputSearch') || '',
		mailStatus: searchParams.get('mailStatus') || 'all',
		folder: folder || 'inbox',
	};

	return filterBy;
}

function getSortByParams(sortParams) {
	const sortBy = {
		date: sortParams.get('date') || 1,
		subject: sortParams.get('subject') || 1,
	};
	return sortBy;
}

function getDefaultForm() {
	return {
		to: '',
		subject: '',
		body: '',
	};
}

function getSentAt(sentAtTimeStamp) {
	const todayDate = Math.floor(Date.now() / 1000);
	const timeDifferenceInSeconds = todayDate - sentAtTimeStamp;
	const emailSentTime = new Date(sentAtTimeStamp * 1000);

	if (timeDifferenceInSeconds < 86400) {
		const sentHour = emailSentTime.getHours();
		const sentMinutes = emailSentTime.getMinutes();
		return `${sentHour < 10 ? `0${sentHour}` : sentHour}:${sentMinutes < 10 ? `0${sentMinutes}` : sentMinutes}`;
	}

	const currentDateArray = emailSentTime.toDateString().split(' ');
	return `${currentDateArray[2] < 10 ? currentDateArray[2].slice(1) : currentDateArray[2]} ${currentDateArray[1]}`;
}

function navigateTo(pathName, dest, id) {
	switch (dest) {
		case 'list':
			return `/email/${pathName.split('/').at(2)}`;
		case 'details':
			return `${pathName}/details/${id}`;
		case 'compose':
			return `/email/${pathName.split('/').at(-1)}/compose/${id}`;
		default:
			return `/email/${pathName.split('/').at(2)}`;
	}
}
