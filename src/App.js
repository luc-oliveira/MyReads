import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  onUpdateBook = (book, shelf) => {
    BooksAPI.update(book,shelf).then(books => this.componentDidMount())
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={ ({ history }) =>
        (
          <Search 
            onUpdateBook={ (book, shelf) => {
              this.onUpdateBook(book,shelf)
              history.push('/')
            }}
            booksFromStands = {this.state.books} 
          /> 
        )} />
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onUpdateBook={(book,shelf) => {this.onUpdateBook(book,shelf)}} /> 
        )} />
      </div>
    )
  }
}

export default BooksApp
