import { useState } from "react";
import "./emailPreview.scss";
import emptyStar from "../../assets/svgs/star-empty.svg";
import archive from "../../assets/svgs/archive.svg";
import openEmail from "../../assets/svgs/email-open.svg";
import trash from "../../assets/svgs/trash.svg";

export const EmailPreview = ({ emailData }) => {
  const [isHover,setIsHover] = useState(false);

  const handleHover = () => {
    setIsHover((prevIsHover) => !prevIsHover);
  }

  return (
    <div className="email-preview" onMouseEnter={handleHover} onMouseLeave={handleHover}>
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
            <img src={trash} alt="trash" />
          </div>
        }
      </div>
    </div>
  );
};
