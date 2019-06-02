import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/Queries";

export class BookList extends Component {
    displayBooks() {
        let data = this.props.data;
        if (data.loading) {
            return <div>Loading books...</div>;
        }

        return data.books.map(book => <li key={book.id}>{book.name}</li>);
    }
    render() {
        return (
            <div>
                <ul id="book-list">{this.displayBooks()}</ul>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
