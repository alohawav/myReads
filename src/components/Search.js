import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';
import Book from './Book';

const Search = ({ result, onUpdate, onSearch, error }) => {
  let books;
  if (result.lenght === 0) {
    books = <p>Let the search begins!</p>;
  } else if (error) {
    books = <p>Ops. I did not found this book.</p>;
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
            placeholder="Search by title or author"
            onChange={(e) => {
              if (e.target.value !== '') {
                onSearch(e.target.value);
              }
            }}
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
};

Search.propTypes = {
  result: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Search;
