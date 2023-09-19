import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { About } from './pages/aboutUs/About';
import { EmailIndex } from './pages/email/EmailIndex';
import { Header } from './components/header/Header';
import { EmailCompose } from './components/emailCompose/EmailCompose';

export const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/email/:folder' element={<EmailIndex />}>
					<Route path='/email/:folder/details/:emailId'></Route>
					<Route
						path='/email/:folder/compose'
						element={<EmailCompose />}
					></Route>
				</Route>
			</Routes>
		</Router>
	);
};
