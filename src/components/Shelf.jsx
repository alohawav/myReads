import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = ({ title, query, books, onUpdate }) =>
  (<div className="bookshelf">
    <div className="bookshelf-title">
      <h2>
        {title}
      </h2>
    </div>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books
          .filter(book => book.shelf === `${query}`)
          .map(book => <Book key={book.id} book={book} onUpdate={onUpdate} />)}
      </ol>
    </div>
  </div>);

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Shelf;
