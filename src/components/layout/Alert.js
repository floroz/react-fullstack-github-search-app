import React, { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';

const Alert = props => {
	const ctx = useContext(AlertContext);
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
