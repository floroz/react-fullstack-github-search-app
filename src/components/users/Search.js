import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../context/github/githubContext';

const Search = props => {
	const githubContext = useContext(GithubContext);

	const [text, setText] = useState('');

	const onChangeHandler = event => setText(event.target.value);

	const onSubmitHandler = event => {
		event.preventDefault();
		if (text === '') {
			githubContext.setAlert('Please enter something', 'light');
		} else {
			githubContext.searchUsers(text);
			setText('');
		}
	};

	return (
		<div>
			<form className="form" onSubmit={onSubmitHandler}>
				<input
					type="text"
					name="text"
					placeholder="Search users.."
					value={text}
					onChange={onChangeHandler}
				/>
				<input
					type="submit"
					value="search"
					className="btn btn-dark btn-block"
				/>
			</form>
			{githubContext.users.length > 0 && (
				<button
					className="btn btn-light btn-block"
					onClick={githubContext.clearUsers}
				>
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {};

export default Search;
