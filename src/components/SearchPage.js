import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BooksGrid from './BooksGrid'


class SearchPage extends Component {

    state = {
        query: '',
        searchResults: []
    }

    updateQuery = (query) => {

        this.setState( { query: query.trim() })

        //get all books that match the input query
        if (query.length > 0) {
            BooksAPI.search(query).then((searchResults) => {
                this.setState({searchResults})
            })
        } else {
            this.clearQuery(query)
        }
    }

    clearQuery = (query) => {
        this.setState({query: ''})
    }


    render() {

        if (this.state.searchResults.length > 0) {

            //set all shelves to 'none'
            for (const book of this.state.searchResults) {
                book.shelf = 'none';
            }

            //set the matching shelves
            for (const shelfBook of this.props.shelfBooks) {
                for (const book of this.state.searchResults) {

                    if (book.id === shelfBook.id) {
                        book.shelf = shelfBook.shelf
                        break
                    }
                }
            }
        }

        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        onClick={ () => this.props.refresh(this.props.shelfBooks)}
                        className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            className='search-contacts'
                            type='text' autoFocus
                            placeholder='Search by title or author'
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        <BooksGrid
                            books={this.state.searchResults}
                            onHandleChange={this.props.updateShelfApp}
                        />
                    </ol>
                </div>
            </div>
        )
    }
}


export default SearchPage

