import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { folderList } from '../../services/email.service';
import newIcon from '../../assets/svgs/edit.svg';
import './emailFolderList.scss';

export const EmailFolderList = ({
	filterBy,
	onSetFilter,
	unreadCount,
	onSendEmail,
	onSaveDraftEmail,
	onToggleMenu,
}) => {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		onSetFilter(filterByToEdit);
	}, [filterByToEdit]);

	const handleSelectFolder = (folderName) => {
		setFilterByToEdit((prevFilter) => ({ ...prevFilter, folder: folderName }));
		onToggleMenu(false);
		navigate(`/email/${folderName}`);
	};

	const onOpenCompose = () => {
		if (!pathname.includes('compose')) navigate(`${pathname}/compose`);
	};

	return (
		<div className='email-folder-list'>
			<div className='email-compose'>
				<button onClick={onOpenCompose}>
					<img src={newIcon} alt='new' />
					Compose
				</button>
			</div>
			<ul className='folder-list'>
				{folderList.map((folder) => (
					<li
						key={folder.name}
						data-folder={pathname.includes(folder.name)}
						onClick={() => handleSelectFolder(folder.name)}
					>
						<img src={folder.icon} alt={folder.name} />
						{folder.text}
						{folder.name === 'inbox' && <span>{unreadCount}</span>}
					</li>
				))}
			</ul>
			<Outlet context={{ onSendEmail, onSaveDraftEmail }} />
		</div>
	);
};
