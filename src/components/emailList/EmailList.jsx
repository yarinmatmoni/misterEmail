import { EmailPreview } from '../emailPreview/EmailPreview';
import './emailList.scss';

export const EmailList = ({ emails, onRemoveEmail, onUpdateEmail }) => {
	return (
		<div className='email-list'>
			{emails.map((email) => (
				<EmailPreview
					key={email.id}
					emailData={email}
					onRemoveEmail={onRemoveEmail}
					onUpdateEmail={onUpdateEmail}
				/>
			))}
		</div>
	);
};
