import { emailService } from "../../services/email.service";
import { useState, useEffect } from "react";

export const EmailIndex = () => {
  const [emails, setEmails] = useState(null);

  useEffect(() => {
    loadMails();
  }, []);

  const loadMails = async () => {
    try {
      const emails = await emailService.query();
      setEmails(emails);
    } catch (error) {
      console.log("error:", error);
    }
  };

  if (!emails) return <div>Loading..</div>
  return <div>{JSON.stringify(emails)}</div>;
};
