import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { emailService } from "../../services/email.service";
import "./emailDetails.scss";

export const EmailDetails = () => {
  const { emailId } = useParams();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    getEmailDetails();
  }, [emailId]);

  const getEmailDetails = async () => {
    try {
      const emailDetails = await emailService.getById(emailId);
      emailDetails.isRead = true;
      await emailService.save(emailDetails);
      setEmail(emailDetails);
    } catch (error) {
      console.log("error:", error);
    }
  };

  if (!email) return <div>Loading...</div>;
  return <div className="email-details">EmailDetails of {emailId}</div>;
};
