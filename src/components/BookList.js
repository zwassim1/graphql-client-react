import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/Queries';
import BookDetails from './BookDetails';

export class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null
		};
	}
	displayBooks() {
		let data = this.props.data;
		if (data.loading) {
			return <div>Loading books...</div>;
		}

		return data.books.map(book => (
			<li
				onClick={e => {
					this.setState({ selected: book.id });
				}}
				key={book.id}
			>
				{book.name}
			</li>
		));
	}
	render() {
		return (
			<div>
				<ul id="book-list">{this.displayBooks()}</ul>
				<BookDetails bookId={this.state.selected} />
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookList);
