import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

export const emailService = {
  query,
  //   save,
  //   remove,
  //   getById,
  //   createRobot,
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  const emails = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    console.log("filterBy function");
    return emails;
  }
  return emails;
}

// function getById(id) {
//     return storageService.get(STORAGE_KEY, id)
// }

// function remove(id) {
//     return storageService.remove(STORAGE_KEY, id)
// }

// function save(robotToSave) {
//     if (robotToSave.id) {
//         return storageService.put(STORAGE_KEY, robotToSave)
//     } else {
//         robotToSave.isOn = false
//         return storageService.post(STORAGE_KEY, robotToSave)
//     }
// }

function createEmail(
  subject,
  body,
  isRead,
  isStarred,
  sentAt,
  removedAt = null,
  from,
  to
) {
  return {
    id: utilService.makeId(),
    subject: subject || "Subject",
    body: body || "Body",
    isRead: isRead || false,
    isStarred: isStarred || false,
    sentAt: sentAt || 1551133930594,
    removedAt: removedAt,
    from: from || "momo@momo.com",
    to: to || "user@appsus.com",
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    for (let i = 0; i < 3; i++)
      emails.push(
        createEmail("Miss You!" + i, "Body - Miss You  + i", false, false)
      );

    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
