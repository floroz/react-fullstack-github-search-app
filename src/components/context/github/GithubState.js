import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
	SET_ALERT,
	SEARCH_USERS,
	CLEAR_USERS,
	GET_USER,
	GET_USERS,
	GET_REPOS,
	SET_LOADING
} from '../types';

const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search users
	const searchUsers = async searchText => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/search/users?q=${searchText}&client_id=${
				process.env.REACT_APP_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
		);
		dispatch({ type: SEARCH_USERS, payload: res.data.items });
	};

	// Get user
	const getUser = async username => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${
				process.env.REACT_APP_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
		);
		setUser(res.data);
	};

	// get user repos
	const getUserRepos = async username => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
				process.env.REACT_APP_CLIENT_ID
			}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
		);
		setRepos(res.data);
	};

	// Show Alert
	const showAlert = (msg, type) => {
		setAlert({ msg, type });
		setTimeout(() => setAlert(null), 3500);
	};

	// Clear users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	// Set User
	const setUser = user => dispatch({ type: GET_USER, payload: user });

	// Set Repos
	const setRepos = user => dispatch({ type: GET_REPOS, payload: user });

	// Set Alert
	const setAlert = alert => dispatch({ type: SET_ALERT, payload: alert });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				repos: state.repos,
				user: state.user,
				loading: state.loading,
				alert: state.alert,
				searchUsers,
				getUser,
				getUserRepos,
				clearUsers,
				showAlert
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
