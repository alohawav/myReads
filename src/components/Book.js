import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, onUpdate }) =>
  (<li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            background: `url(${book.imageLinks.thumbnail})`,
            backgroundSize: 'cover',
            width: '128px',
            height: '170px',
          }}
        />
        <div className="book-shelf-changer">
          <select onChange={e => onUpdate(book, e.target.value)} defaultValue="def">
            <option value="def" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">
        {book.title}
      </div>
      <div className="book-authors">
        {book.authors.map(author =>
          (<p key={author}>
            {author}
          </p>),
        )}
      </div>
    </div>
  </li>);

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Book;
