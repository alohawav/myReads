import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Shelf from './Shelf';

const Main = (props) => {
  const { books, onUpdate } = props;
  console.log(books);
  if (books.length === 0) {
    return <div />;
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
      </div>
    </div>
  );
};

Main.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Main;
