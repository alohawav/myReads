import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as BooksAPI from '../API/BooksAPI';
import Main from './Main';
import Search from './Search';

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      result: [],
      error: '',
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  handleUpdate(book, shelf) {
    BooksAPI.update(book, shelf).then(this.fetchData());
  }

  handleSearch(query) {
    BooksAPI.search(query, 20).then((result) => {
      if (Array.isArray(result)) {
        this.setState({ result, error: '' });
      } else {
        this.setState({ error: 'error' });
      }
    });
  }

  render() {
    const { books, result, error } = this.state;
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={props => <Main {...props} books={books} onUpdate={this.handleUpdate} />}
          />
          <Route
            path="/search"
            render={props =>
              (<Search
                {...props}
                result={result}
                error={error}
                onUpdate={this.handleUpdate}
                onSearch={this.handleSearch}
              />)}
          />
        </div>
      </Router>
    );
  }
}
