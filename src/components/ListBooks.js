import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'
import '../App.css'


class ListBooks extends React.Component {

    state = {
        oneBook: {}
    }

    static propTypes = {
        shelfBooks: PropTypes.array.isRequired
    }


    render() {

        const { shelfBooks, updateShelfApp, refresh } = this.props

        let currentlyReading = shelfBooks.filter((book) => book.shelf === 'currentlyReading')
        let wantToRead = shelfBooks.filter((book) => book.shelf === 'wantToRead')
        let read = shelfBooks.filter((book) => book.shelf === 'read')

        return (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">

                                <BooksGrid
                                    books={currentlyReading}
                                    onHandleChange={updateShelfApp}
                                />

                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <BooksGrid
                                    books={wantToRead}
                                    onHandleChange={updateShelfApp}
                                />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <BooksGrid
                                    books={read}
                                    onHandleChange={updateShelfApp}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to={`/search`}
                        onClick={ () => refresh(shelfBooks)}>
                        Add a Book
                    </Link>
                </div>
            </div>
        )
    }
}

export default ListBooks
