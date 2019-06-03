import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/Queries';

export class BookDetails extends Component {
	displayBookDetails = () => {
		const { book } = this.props.data;
		if (!book) {
			return <div>No book selected</div>;
		}

		return (
			<div>
				<h2>{book.name}</h2>
				<p>{book.genre}</p>
				<p>{book.author.name}</p>
				<p>All Books By this author</p>
				<ul className="other-books">
					{book.author.books.map(b => (
						<li key={b.id}>{b.name}</li>
					))}
				</ul>
			</div>
		);
	};

	render() {
		return <div id="book-details">{this.displayBookDetails()}</div>;
	}
}

export default graphql(getBookQuery, {
	options: props => {
		return {
			variables: {
				id: props.bookId
			}
		};
	}
})(BookDetails);
