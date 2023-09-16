import { storageService } from './async-storage.service';
import { utilService } from './util.service';

import inboxIcon from '../assets/svgs/inbox.svg';
import starredIcon from '../assets/svgs/empty-star.svg';
import sentIcon from '../assets/svgs/send.svg';
import draftIcon from '../assets/svgs/draft.svg';
import trashIcon from '../assets/svgs/trash.svg';

export const emailService = {
	query,
	getDefaultFilter,
	save,
	remove,
	getById,
	getSentAt,
	//   createRobot,
};

const STORAGE_KEY = 'emails';

_createEmails();

async function query(filterBy) {
	let emails = await storageService.query(STORAGE_KEY);
	if (filterBy) {
		let { inputSearch, mailStatus, folder } = filterBy;

		switch (folder) {
			case 'Starred': {
				emails = emails.filter((email) => email.isStarred);
				break;
			}
			//TODO: all the other folders
			// case 'Trash': {
			// 	emails = emails.filter((email) => email.removedAt !== null);
			// 	break;
			// }
			// case 'Sent': {
			// 	emails = emails.filter((email) => email.from === userEmail);
			// }
			// case 'Draft': {
			// }
			default:
				break;
		}

		emails = emails.filter(
			(email) =>
				(!email.isRead && mailStatus === 'unread' && email.subject.toLowerCase().includes(inputSearch.toLowerCase())) ||
				(email.isRead && mailStatus === 'read' && email.subject.toLowerCase().includes(inputSearch.toLowerCase())) ||
				(mailStatus === 'all' && email.subject.toLowerCase().includes(inputSearch.toLowerCase())),
		);
	}
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
		return storageService.post(STORAGE_KEY, emailToSave);
	}
}

function createEmail(subject, body, isRead, isStarred, from, to) {
	return {
		id: utilService.makeId(),
		subject: subject || 'Subject',
		body: body || 'Body',
		isRead: isRead || false,
		isStarred: isStarred || false,
		sentAt: Math.floor(Date.now() / 1000),
		removedAt: null,
		from: from || 'momo@momo.com',
		to: to || 'user@appsus.com',
	};
}

function _createEmails() {
	let emails = utilService.loadFromStorage(STORAGE_KEY);
	if (!emails || !emails.length) {
		emails = [];

		for (let i = 0; i < 20; i++) {
			let mail = createEmail('Miss You!' + i, 'Body - Miss You  + i', false, false);
			emails.push(mail);
		}

		utilService.saveToStorage(STORAGE_KEY, emails);
	}
}

function getDefaultFilter() {
	return {
		inputSearch: '',
		mailStatus: 'all',
		folder: 'Inbox',
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

export const folderList = [
	{ name: 'Inbox', icon: inboxIcon },
	{ name: 'Starred', icon: starredIcon },
	{ name: 'Sent', icon: sentIcon },
	{ name: 'Draft', icon: draftIcon },
	{ name: 'Trash', icon: trashIcon },
];
