import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emptyStar from "../../assets/svgs/empty-star.svg";
import archive from "../../assets/svgs/archive.svg";
import openEmail from "../../assets/svgs/mark_email_read.svg";
import trash from "../../assets/svgs/trash.svg";
import "./emailPreview.scss";

export const EmailPreview = ({ emailData , onRemoveEmail }) => {
  const navigate = useNavigate();
  const [isHover,setIsHover] = useState(false);

  const onPreviewClick = (emailId) => {
    navigate(`/email/${emailId}`);
  }

  return (
    <div className="email-preview" data-is-read={emailData.isRead} onClick={() => onPreviewClick(emailData.id)} onMouseEnter={() => setIsHover(true)} onMouseLeave={() =>setIsHover(false)}>
      <img src={emptyStar} alt="star" />
      <div className="emails-preview-details">
        <div className="from-email">{emailData.from}</div>
        <div className="subject">{emailData.subject}</div>
        <div className="body">{emailData.body}</div>
        {!isHover && <div className="date">{emailData.sentAt}</div>}
        { isHover && 
          <div className="email-options">
            <img src={archive} alt="archive" />
            <img src={openEmail} alt="open email" />
            <img src={trash} alt="trash" onClick={() => onRemoveEmail(emailData.id)}/>
          </div>
        }
      </div>
    </div>
  );
};
