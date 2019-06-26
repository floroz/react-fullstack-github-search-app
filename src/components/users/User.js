import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

export default class User extends Component {
	static propTypes = {
		loading: PropTypes.bool.isRequired,
		user: PropTypes.object.isRequired,
		getUser: PropTypes.func.isRequired
	};

	async componentDidMount() {
		const login = this.props.match.params.login;
		await this.props.getUser(login);
	}
	render() {
		const {
			name,
			avatar_url,
			location,
			bio,
			blog,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable
		} = this.props.user;

		const { loading } = this.props;
		if (loading) return <Spinner />;

		return (
			<>
				<Link to="/" className="btn btn-light">
					Back To Search
				</Link>
				Hireable:{' '}
				{hireable ? (
					<i className="fas fa-check text-success" />
				) : (
					<i className="fas fa-times text-danger" />
				)}
				<div className="card grid-2">
					<div className="all-center">
						<img
							src={avatar_url}
							alt=""
							className="round-img"
							style={{ width: '150px' }}
						/>
						<h1>{name}</h1>
						<p>{location}</p>
					</div>
				</div>
			</>
		);
	}
}
