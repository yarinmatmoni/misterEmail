import { Link } from 'react-router-dom';
import './home.scss';

export const Home = () => {
	return (
		<div className='homePage'>
			<h1>Mister Email</h1>
			<Link to={`/email/inbox/compose?to=help@gmail.com&sub=Help`}>Need Some Help ?</Link>
		</div>
	);
};
