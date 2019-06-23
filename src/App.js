import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null
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
		const { users, loading } = this.state;
		return (
			<div className="App">
				<Navbar />
				<div className="container">
					<Alert alert={this.state.alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={users.length > 0}
						setAlert={this.setAlert}
					/>
					<User loading={loading} users={users} />
				</div>
			</div>
		);
	}
}

export default App;
