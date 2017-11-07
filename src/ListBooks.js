import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component {
  static propTypes = {
    onUpdateBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  render(){
    const { books } = this.props
    let {booksCurrentlyReading, booksWantToRead, booksRead, booksNoEspecified} = []

    booksCurrentlyReading = books.filter(book => book.shelf === "currentlyReading")
    booksWantToRead = books.filter(book => book.shelf === "wantToRead")
    booksRead = books.filter(book => book.shelf === "read")
    booksNoEspecified = books.filter(book => book.shelf === null || book.shelf === undefined)

    return (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                {booksCurrentlyReading.length > 0 && (
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                            {booksCurrentlyReading.map(book => 
                                <li key={book.id}><Book book={book} onUpdateBook={this.props.onUpdateBook}/></li>
                            )}
                        </ol>
                        </div>
                    </div>
                )}
                {booksWantToRead.length > 0 && (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksWantToRead.map(book => 
                            <li key={book.id}><Book book={book} onUpdateBook={this.props.onUpdateBook}/></li>
                        )}
                    </ol>
                    </div>
                </div>
                )}
                {booksRead.length > 0 && (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksRead.map(book => 
                            <li key={book.id}><Book book={book} onUpdateBook={this.props.onUpdateBook}/></li>
                        )}
                    </ol>
                    </div>
                </div>
                )}
                {booksNoEspecified.length > 0 && (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">None</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksNoEspecified.map(book => 
                            <li key={book.id}><Book book={book} onUpdateBook={this.props.onUpdateBook}/></li>
                        )}
                    </ol>
                    </div>
                </div>
                )}
            </div>
        </div>
            <div className="open-search">
            <Link to="/search"></Link>
            </div>
        </div>
      )
  }
}

export default ListBooks