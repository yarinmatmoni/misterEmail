import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { About } from './pages/aboutUs/About';
import { EmailIndex } from './pages/email/EmailIndex';
import { Header, EmailCompose, UserMessage } from './components/index';

export const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/email/:folder' element={<EmailIndex />}>
					<Route path='/email/:folder/details/:emailId' />
					<Route path='/email/:folder/compose/:emailId?' element={<EmailCompose />} />
				</Route>
			</Routes>
			<UserMessage />
		</Router>
	);
};
