import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import GithubState from './components/context/github/GithubState';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

const App = props => {
	// const showAlert = (msg, type) => {
	// 	setAlert({ msg, type });
	// 	setTimeout(() => {
	// 		setAlert(null);
	// 	}, 3500);
	// };

	return (
		<GithubState>
			<div className="App">
				<Navbar />
				<div className="container">
					<Switch>
						<Route
							path="/"
							exact
							render={props => (
								<>
									<Search />
									<Users />
								</>
							)}
						/>
						<Route path="/about" exact component={About} />
						<Route path="/user/:login" exact component={User} />
					</Switch>
					<Alert />
				</div>
			</div>
		</GithubState>
	);
};

export default App;
