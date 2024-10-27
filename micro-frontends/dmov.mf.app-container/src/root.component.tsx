import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import DynamicContextLoader from './components/DynamicContextLoader'; // Adjust the import path as necessary
// import './styles.css';
import './assets/Header.css';

import PublicRouter from './routes/PublicRouter';
import SecureRouter from './routes/SecureRouter';


export default function Root(props) {
	//   const [context, setContext] = useState('@single-spa/welcome'); //Don't use a null context


	const [appInitialized, setAppInitiated] = useState(true);
	const [session, setSession] = useState(true);

	const [login, setLogin] = useState(true);

	const handleLogin = () => {
		setLogin(!login);
	}


	//add a logic usin useeffect to get all the necessary data and set app initialized to true to get the app running

	return (
		<>
			<header className="header">
				<h2>Movie Portal</h2>
				<button id='loginBtn' onClick={handleLogin}>{login ? 'Logout' : 'Login'}</button>
			</header>
			{login ? <SecureRouter /> : <PublicRouter />}

		</>
	);
};