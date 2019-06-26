import {
	SET_ALERT,
	SEARCH_USERS,
	CLEAR_USERS,
	GET_USER,
	GET_USERS,
	GET_REPOS,
	SET_LOADING
} from '../types';

export default (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case SEARCH_USERS:
			return {
				...state,
				users: payload,
				loading: false
			};
		case GET_USER:
			return {
				...state,
				user: payload,
				loading: false
			};
		case GET_USERS:
			return {
				...state,
				users: payload,
				loading: false
			};
		case CLEAR_USERS:
			return {
				...state,
				users: [],
				loading: false
			};
		case GET_REPOS:
			return {
				...state,
				repos: payload,
				loading: false
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		case SET_ALERT:
			return {
				...state,
				alert: payload,
				loading: false
			};
		default:
			return state;
	}
};
