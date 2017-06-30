import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';
import _ from 'lodash';
import * as BooksAPI from '../API/BooksAPI';
import Book from './Book';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      error: '',
      query: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const query = e.target.value;
    this.setState({ query });
    const that = this;
    const search = () =>
      BooksAPI.search(query)
        .then((result) => {
          if (result.error) {
            return that.setState({ error: 'Ops. I did not found this book.' });
          }
          return that.setState({ result, error: '' });
        })
        .catch(err => that.setState({ error: 'Server problem' }));

    const withThrottle = _.throttle(search, 1000);

    if (query !== '') {
      withThrottle();
    }
  }

  render() {
    const { result, error } = this.state;
    const { onUpdate } = this.props;
    let books;
    if (result.length === 0) {
      books = <p>Let the search begins!</p>;
    } else if (error) {
      books = (
        <p>
          {error}
        </p>
      );
    } else {
      books = result
        .sort(sortBy('title'))
        .map(book => <Book key={Math.random()} book={book} onUpdate={onUpdate} />);
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
