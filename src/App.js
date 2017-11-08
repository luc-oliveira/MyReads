import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'

class BooksApp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      books: []
    }

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
