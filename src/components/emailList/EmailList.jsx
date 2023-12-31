import { EmailPreview } from '../emailPreview/EmailPreview';
import './emailList.scss';

export const EmailList = ({ emails, onRemoveEmail, onUpdateEmail, onSelectEmail, selectMails }) => {
	return (
		<div className='email-list'>
			{emails.length === 0 && <div>Nothing to see here...</div>}
			{emails.map((email) => (
				<EmailPreview
					key={email.id}
					emailData={email}
					onRemoveEmail={onRemoveEmail}
					onUpdateEmail={onUpdateEmail}
					onSelectEmail={onSelectEmail}
					selectMails={selectMails}
				/>
			))}
		</div>
	);
};
