import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Shelf from './Shelf';

const Main = ({ books, onUpdate }) => {
  if (books.length === 0) {
    return <p>No books available</p>;
  }
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>My Reads</h1>
      </div>
      <div className="list-books-content">
        <Shelf
          title="Currently reading"
          query="currentlyReading"
          books={books}
          onUpdate={onUpdate}
        />
        <Shelf title="Want to read" query="wantToRead" books={books} onUpdate={onUpdate} />
        <Shelf title="Read" query="read" books={books} onUpdate={onUpdate} />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Main;
