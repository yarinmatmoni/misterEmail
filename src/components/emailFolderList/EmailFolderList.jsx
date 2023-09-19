import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { folderList } from '../../services/email.service';
import newIcon from '../../assets/svgs/edit.svg';
import './emailFolderList.scss';

export const EmailFolderList = ({ onSaveEmail }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<div className='email-folder-list'>
			<div className='email-compose'>
				<button onClick={() => navigate(`${pathname}/compose`)}>
					<img src={newIcon} alt='new' />
					Compose
				</button>
			</div>
			<ul className='folder-list'>
				{folderList.map((folder) => (
					<li
						key={folder.name}
						data-folder={folder.name === pathname.split('/').at(-1)}
						onClick={() => navigate(`/email/${folder.name}`)}
					>
						<img src={folder.icon} alt={folder.name} />
						{folder.name}
					</li>
				))}
			</ul>
			<Outlet context={{ onSaveEmail }} />
		</div>
	);
};
