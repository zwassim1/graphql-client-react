import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/Queries';

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
        let data = this.props.data;
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
        console.log(this.state);
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
                        <option>
                            Select author
                        </option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default graphql(getAuthorsQuery)(AddBook);
