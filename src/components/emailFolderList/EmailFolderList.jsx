import { folderList } from '../../services/email.service';
import newIcon from '../../assets/svgs/edit.svg';
import './emailFolderList.scss';

export const EmailFolderList = () => {
	return (
		<div className='email-folder-list'>
			<div className='email-compose'>
				<button>
					<img
						src={newIcon}
						alt='new'
					/>
					Compose
				</button>
			</div>
			<ul className='folder-list'>
				{folderList.map((folder) => (
					<li key={folder.name}>
						<img
							src={folder.icon}
							alt={folder.name}
						/>
						{folder.name}
					</li>
				))}
			</ul>
		</div>
	);
};
