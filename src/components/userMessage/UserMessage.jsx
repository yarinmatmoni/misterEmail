import { useEffect, useState } from 'react';
import { eventBusService } from '../../services/event-bus.service';
import close from '../../assets/svgs/close.svg';
import './UserMessage.scss';

export const UserMessage = () => {
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
			setMessage(msg);

			setTimeout(() => {
				onCloseMessage();
			}, 3000);
		});

		return () => unsubscribe;
	}, []);

	const onCloseMessage = () => {
		setMessage(null);
	};

	if (!message) return <></>;
	return (
		<div className='user-msg'>
			<p>{message}</p>
			<img src={close} onClick={onCloseMessage} />
		</div>
	);
};
