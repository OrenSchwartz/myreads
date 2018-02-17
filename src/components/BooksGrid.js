import React, { Component } from 'react'
import sortBy from 'sort-by'


class BooksGrid extends Component {

    render() {

        const { books, onHandleChange } = this.props 
        if (books.length > 0) {
            books.sort(sortBy('title'));

            return (

                <ol className="books-grid">

                    {books.map((book) => (

                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{
                                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                                    }}></div>
                                    <div className="book-shelf-changer">
                                        <select defaultValue={book.shelf}
                                                onChange={(event) => onHandleChange(event, book)}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.author}</div>
                            </div>
                        </li>
                    ))}
                </ol>
            )
        } else {
            return null
        }
    }
}


export default BooksGrid