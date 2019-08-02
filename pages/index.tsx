import React from 'react';
import { NextPage } from 'next';
import AuthBlock from 'components/auth-block/AuthBlock';
import Header from 'components/header/Header';
import logo from 'assets/svg/logo.svg';
import 'assets/css/App.css';


interface IApp {
	userAgent: string;
}
const App: NextPage<IApp> = (props) => (
	<div className="App">
		<header className="App-header">
			<Header/>
			<img src={logo} className="App-logo" alt="logo" />
			<AuthBlock />
			<p>{props.userAgent}</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				Learn React
			</a>
		</header>
	</div>
	
  );

App.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
	return { userAgent };
};

export default App;


