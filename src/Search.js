import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { DebounceInput } from 'react-debounce-input';
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class Search extends Component{
    constructor(props){
        super(props);  

        this.state = {
            query: '',
            books:[],
            error: ''
        }

        this.updateQuery = this.updateQuery.bind(this);
    }

    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired,
        booksFromStands: PropTypes.array.isRequired
    }

    updateQuery = (event) => {
        this.setState({ query: event.target.value});
        if (this.state.query && this.searchBoooks(this.state.query));
    }

    searchBoooks(query){

        this.setState({error: ''});

        const MAX_RESULTS = 20;
        BooksAPI.search(query, MAX_RESULTS)
        .then(searchedBooks => {

            if(searchedBooks.error){
                searchedBooks.error === 'empty query' ?
                    this.setState({error: 'Pesquisa não gerou resultados'}) :
                    this.setState({error: searchedBooks.error}) ;
                searchedBooks = [];
            }

            this.setState({books: this.merge(searchedBooks, this.props.booksFromStands, "id")});
        })
    }

    handleSearch = ( book,shelf) => {
        if(this.props.onUpdateBook)
            this.props.onUpdateBook(book, shelf);
    }

    /**
    * @description Verifica os itens do array b no array e os substitui
    * @param {array}  a
    * @param {array}  b
    * @returns {array} itens do a com substituição pelos itens de b se existirem
    */
    merge = (a, b, prop) => {
        var reduced =  a.filter( aitem => ! b.find ( bitem => aitem[prop] === bitem[prop]) );
        return reduced.concat(b.filter(bitem => a.find(aitem => aitem[prop] === bitem[prop])));
    }

    render(){
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                     <DebounceInput
                        minLength={3}
                        debounceTimeout={500}
                        placeholder="Search by title or author"
                        onChange={this.updateQuery} />
                </div>
              </div>
              <div className="search-books-results">
                {(this.state.error && 
                    <div>
                        <h3>{this.state.error}</h3>
                    </div>
                )}
                <ol className="books-grid">
                    {this.state.books.length > 0 && (
                        <ListBooks 
                            books={this.state.books} 
                            onUpdateBook={this.handleSearch}
                        />
                    )}
                </ol>
              </div>
            </div>
        )
    }
}

export default Search