import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired
    }

    state = {
        book: this.props.book,
        shelf: this.props.book.shelf
    }

    handleBook = (event, book,shelf) => {
        event.preventDefault()
        if(this.props.onUpdateBook)
            this.props.onUpdateBook(book, shelf)
    }
    
    render (){
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                        style={{ 
                            width: 128, 
                            height: 193, 
                            backgroundImage: `url(${this.state.book.imageLinks.thumbnail})` 
                        }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={this.state.shelf === null || this.state.shelf ===undefined ? 'none' : this.state.shelf} 
                        onChange={(event) => this.handleBook(event, this.state.book, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.state.book.title}</div>
                <div className="book-authors">{this.state.book.authors}</div>
            </div>
        )
    }
}

export default Book