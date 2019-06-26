import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import GithubContext from '../context/github/githubContext';

const Users = props => {
	const githubCtx = useContext(GithubContext);
	return (
		<div style={userStyle}>
			{githubCtx.PropTypesloading ? (
				<Spinner />
			) : (
				githubCtx.users.map(user => <UserItem key={user.id} user={user} />)
			)}
		</div>
	);
};

Users.propTypes = {};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
};

export default Users;
