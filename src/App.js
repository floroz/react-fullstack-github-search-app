import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
	state = {
		users: [],
		user: {},
		loading: false,
		alert: null
	};

	getUser = async username => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${
				process.env.REACT_APP_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
		);
		this.setState({ user: res.data, loading: false });
	};

	searchUsers = async searchText => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${searchText}&client_id=${
				process.env.REACT_APP_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
		);
		this.setState({ users: res.data.items, loading: false });
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });
		setTimeout(() => {
			this.setState({ alert: null });
		}, 3500);
	};

	render() {
		const { users, loading, user } = this.state;
		return (
			<div className="App">
				<Navbar />
				<div className="container">
					<Switch>
						<Route
							path="/"
							exact
							render={props => (
								<>
									<Search
										searchUsers={this.searchUsers}
										clearUsers={this.clearUsers}
										showClear={users.length > 0}
										setAlert={this.setAlert}
									/>
									<Users loading={loading} users={users} />
								</>
							)}
						/>
						<Route path="/about" exact component={About} />
						<Route
							path="/user/:login"
							exact
							render={props => (
								<User
									{...props}
									getUser={this.getUser}
									user={user}
									loading={loading}
								/>
							)}
						/>
					</Switch>
					<Alert alert={this.state.alert} />
				</div>
			</div>
		);
	}
}

export default App;
