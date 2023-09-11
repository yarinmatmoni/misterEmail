import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

export const emailService = {
  query,
  //   save,
    remove,
  //   getById,
  //   createRobot,
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    // let { search, all, read, unread } = filterBy;
    // emails = emails.filter((email) => 
    // email.all === true && 
    // email.subject.toLowerCase().includes(search.toLowerCase()) || 
    // email.body.toLowerCase().includes(search.toLowerCase())
    // );
  }
  return emails;
}

// function getById(id) {
//     return storageService.get(STORAGE_KEY, id)
// }

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

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
  from,
  to
) {
  return {
    id: utilService.makeId(),
    subject: subject || "Subject",
    body: body || "Body",
    isRead: isRead || false,
    isStarred: isStarred || false,
    sentAt: new Date().getTime(),
    removedAt: null,
    from: from || "momo@momo.com",
    to: to || "user@appsus.com",
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [];
    
    for (let i = 0; i < 20; i++){
      let mail = createEmail("Miss You!" + i, "Body - Miss You  + i",false,false);
      emails.push(mail);
    }

    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
