import React, { useContext } from 'react';
import GithubContext from '../context/github/githubContext';

const Alert = props => {
	const ctx = useContext(GithubContext);
	const { alert } = ctx;
	return (
		alert !== null && (
			<div className={`alert alert-${alert.type}`}>
				<i className="fas fa-info-circle" /> {alert.msg}
			</div>
		)
	);
};

export default Alert;
