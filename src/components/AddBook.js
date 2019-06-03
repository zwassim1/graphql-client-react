import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery
} from '../queries/Queries';

export class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			genre: '',
			authorId: ''
		};
	}

	displayAuthors() {
		let data = this.props.getAuthorsQuery;
		if (data.loading) {
			return <option disabled>Loading authors...</option>;
		}

		return data.authors.map(author => (
			<option key={author.id} value={author.id}>
				{author.name}
			</option>
		));
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.addBookMutation({
			variables: this.state,
			refetchQueries: [{ query: getBooksQuery }]
		});
		this.setState({ name: '', genre: '', authorId: '' });
	};
	render() {
		return (
			<form onSubmit={this.handleSubmit} id="add-book">
				<div className="field">
					<label>Book name:</label>
					<input
						value={this.state.name}
						onChange={e => this.setState({ name: e.target.value })}
						type="text"
					/>
				</div>
				<div className="field">
					<label>Genre:</label>
					<input
						value={this.state.genre}
						onChange={e => this.setState({ genre: e.target.value })}
						type="text"
					/>
				</div>
				<div className="field">
					<label>Author:</label>
					<select
						onChange={e =>
							this.setState({ authorId: e.target.value })
						}
					>
						<option>Select author</option>
						{this.displayAuthors()}
					</select>
				</div>
				<button>+</button>
			</form>
		);
	}
}

export default compose(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
