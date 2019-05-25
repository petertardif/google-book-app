import React, { Component } from 'react';
import './bookList.css';
import Book from '../book/book'

export default class BookList extends Component {
    render() {
        const books = this.props.searchedBooks
            .map((book, i) => <Book {...book } key={i} />);
        return (
            <div> 
                { books }
            </div>
        );
    }
}

BookList.defaultProps = {
    searchedBooks: []
};
